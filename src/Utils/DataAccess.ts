import { options } from "@/configs/fireBirdDB";
import Firebird from "node-firebird";

function DataAccess<T>(query: string, params: any[]): T[] {
    // @ts-expect-error Async
    return new Promise<T[]>((resolve, reject) => {
        Firebird.attach(options, function (err, db) {
            if (err) {
                reject(err);
                return;
            }

            db.query(
                query,
                params,
                function (errQry: any, result: T[]) {
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

export { DataAccess };
