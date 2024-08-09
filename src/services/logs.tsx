import { options } from "@/configs/fireBirdDB";
import Firebird from "node-firebird";
import Log from "@/interfaces/Log";

const GetLogs = async () => {
  return new Promise<Log[]>((resolve, reject) => {
    Firebird.attach(options, function (err, db) {
      if (err) {
        reject(err);
        return;
      }

      db.query(
        "SELECT FIRST 50 SKIP 0 r.LOGTIME, r.IDNUM, r.INOUT, r.LON, r.LAT, (SELECT e.EMPNAME FROM EMPLOYEE e WHERE e.EMPCODE = '0' || r.IDNUM ) as EMP_NAME FROM LOG r order by r.LOGTIME desc",
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
