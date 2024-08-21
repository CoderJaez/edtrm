import { options } from "@/configs/fireBirdDB";
import Firebird from "node-firebird";
import Log from "@/interfaces/Log";

const GetLogs = async (page: number, pageSize: number) => {
  return new Promise<Log[]>((resolve, reject) => {
    Firebird.attach(options, function (err, db) {
      if (err) {
        reject(err);
        return;
      }

      const skip = (page - 1) * pageSize;

      db.query(
        `SELECT FIRST ${pageSize} SKIP ${skip} r.LOGTIME, r.IDNUM, r.INOUT, r.LON, r.LAT,e.EMPNAME  FROM LOG r inner join EMPLOYEE e on e.BIONUM = r.IDNUM order by r.LOGTIME desc`,
        [],
        function (errQry: any, result: Log[]) {
          db.detach();

          if (errQry) {
            reject(errQry);
            return;
          }

          resolve(result);
        },
      );
    });
  });
};

export { GetLogs };
