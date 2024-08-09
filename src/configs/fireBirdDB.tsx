import Firebird from "node-firebird";

const options = {
  host: "172.20.82.101",
  port: 3050,
  database: "d:/programs/dbdilg.fdb",
  user: "ZTMAHUMOC",
  password: "zoilo",
};

const CheckConnection = () => {
  Firebird.attach(options, function (err, db) {
    if (err) throw err;

    db.query(
      'SELECT r.LOGTIME, r.IDNUM, r.INOUT, r.OVERRIDE, r.DEVICEID,r."HASH", r.LOG_RAW, r.LON, r.LAT FROM LOG r where r.IDNUM = ? order by r.LOGTIME desc',
      ["0199"],
      function (errQry: any, result: any) {
        if (errQry) throw errQry;

        console.log(result);
        db.detach();
      },
    );
  });
};

export { CheckConnection, options };
