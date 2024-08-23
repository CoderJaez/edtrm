import { options } from "@/configs/fireBirdDB";
import Firebird from "node-firebird";
import Log from "@/interfaces/Log";
import LogMetaData from "@/interfaces/LogMetaData";

type LogData = {
  logs: Log[];
  metaData: LogMetaData;
};
const GetLogs = async (page: number, pageSize: number) => {
  return new Promise<LogData>((resolve, reject) => {
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
            `SELECT FIRST ${pageSize} SKIP ${skip} r.LOGTIME, r.IDNUM, r.INOUT, r.LON, r.LAT,e.EMPNAME  FROM LOG r inner join EMPLOYEE e on e.BIONUM = r.IDNUM order by r.LOGTIME desc`,
            [],
            function (errQry1, result: Log[]) {
              if (errQry1) {
                console.log("Error1: ", errQry1);

                transaction.rollback();
                reject(errQry1);
                return;
              }

              transaction.query(
                `SELECT COUNT(r.IDNUM) as total FROM LOG r inner join EMPLOYEE e on e.BIONUM = r.IDNUM `,
                [],
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
