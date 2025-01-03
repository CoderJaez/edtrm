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
) => {
  if (division_code && time_inout && employee) {
    return {
      clause: "WHERE e.DIVISIONCODE = ? AND e.EMPNAME LIKE ? AND r.INOUT = ?",
      values: [division_code, `%${employee}%`, time_inout],
    };
  } else if (division_code && employee) {
    return {
      clause: "WHERE e.DIVISIONCODE = ? AND e.EMPNAME LIKE ? ",
      values: [division_code, `%${employee}%`],
    };
  } else if (division_code && time_inout) {
    return {
      clause: "WHERE e.DIVISIONCODE = ? AND r.INOUT = ? ",
      values: [division_code, time_inout],
    };
  } else if (time_inout && employee) {
    return {
      clause: "WHERE e.EMPNAME LIKE ? AND r.INOUT = ?",
      values: [`%${employee}%`, time_inout],
    };
  } else if (division_code) {
    return {
      clause: "WHERE e.DIVISIONCODE = ?",
      values: [division_code],
    };
  } else if (time_inout) {
    return {
      clause: "WHERE r.INOUT = ?",
      values: [time_inout],
    };
  } else if (employee) {
    return {
      clause: "WHERE  e.EMPNAME LIKE  ?",
      values: [`%${employee}%`],
    };
  }
  return { clause: null, values: null };
};
const GetLogs = async (
  page: number,
  pageSize: number,
  division_code?: string,
  time_inout?: string,
  employee?: string,
) => {
  return new Promise<LogData>((resolve, reject) => {
    const { clause, values } = whereClause(division_code, time_inout, employee);
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
