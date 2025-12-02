import { options } from "@/configs/fireBirdDB";
import Firebird from "node-firebird";
import Log from "@/interfaces/Log";
import LogMetaData from "@/interfaces/LogMetaData";

type LogData = {
  logs: Log[];
  metaData: LogMetaData;
};

const whereClause = (
  division_code?: string,
  time_inout?: string,
  employee?: string,
  start_date?: string,
  end_date?: string,
) => {
  const clauses: string[] = [];
  const values: (string | number)[] = [];

  if (division_code) {
    clauses.push("e.DIVISIONCODE = ?");
    values.push(division_code);
  }

  if (employee) {
    clauses.push("e.EMPNAME LIKE ?");
    values.push(`%${employee.toUpperCase()}%`);
  }

  if (time_inout) {
    clauses.push("r.INOUT = ?");
    values.push(time_inout);
  }

  if (start_date) {
    clauses.push("CAST(r.LOGTIME AS DATE) >= ?");
    values.push(start_date);
  }

  if (end_date) {
    clauses.push("CAST(r.LOGTIME AS DATE) <= ?");
    values.push(end_date);
  }

  if (clauses.length === 0) {
    return { clause: null, values: null };
  }

  return {
    clause: `WHERE ${clauses.join(" AND ")}`,
    values,
  };
};
const GetLogs = async (
  page: number,
  pageSize: number,
  division_code?: string,
  time_inout?: string,
  employee?: string,
  start_date?: string,
  end_date?: string,
) => {
  return new Promise<LogData>((resolve, reject) => {
    const { clause, values } = whereClause(
      division_code,
      time_inout,
      employee,
      start_date,
      end_date,
    );
    // console.log(division_code, time_inout, employee);
    // console.log(clause);
    Firebird.attach(options, function (err, db) {
      if (err) {
        reject(err);
        return;
      }

      const skip = (page - 1) * pageSize;
      db.transaction(
        Firebird.ISOLATION_READ_COMMITTED,
        function (err, transaction) {
          transaction.query(
            `SELECT FIRST ${pageSize} SKIP ${skip} r.LOGTIME, r.IDNUM, r.INOUT, r.LON, r.LAT,e.EMPNAME, e.DIVISIONCODE  FROM LOG r inner join EMPLOYEE e on e.BIONUM = r.IDNUM ${clause ? clause : ""}  order by r.LOGTIME desc`,
            values ? values : [],
            function (errQry1, result: Log[]) {
              if (errQry1) {
                console.log("Error1: ", errQry1);

                transaction.rollback();
                reject(errQry1);
                return;
              }

              transaction.query(
                `SELECT COUNT(r.IDNUM) as total FROM LOG r inner join EMPLOYEE e on e.BIONUM = r.IDNUM ${clause ? clause : ""} `,
                values ? values : [],
                function (errQry2, resultCount) {
                  if (errQry2) {
                    console.log("Error2: ", errQry2);

                    transaction.rollback();
                    reject(errQry2);
                    return;
                  }
                  const data: LogData = {
                    logs: result,
                    metaData: {
                      page: page,
                      total: resultCount[0].TOTAL,
                      totalPages: Math.ceil(resultCount[0].TOTAL / pageSize),
                    },
                  };
                  resolve(data);

                  //Commit
                  transaction.commit(function (err) {
                    if (err) {
                      console.log("Error Commit: ", err);
                      transaction.rollback(() => db.detach());
                    } else db.detach();
                  });
                },
              );
            },
          );
        },
      );
    });
  });
};

export { GetLogs };
