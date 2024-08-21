import moment from "moment";
import Log from "@/interfaces/Log";
type Props = {
  logs: Log[];
};
const TableThree: React.FC<Props> = ({ logs }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[50px] px-4 py-4 font-medium text-black dark:text-white">
                ID #
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Employee name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Time
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                In/Out
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{log.IDNUM}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {log.EMPNAME}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {moment(log.LOGTIME).format("MMM DD, yyyy")}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {moment(log.LOGTIME).format("hh:mm a")}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {log.INOUT === 0 ? "IN" : "OUT"} <br />{" "}
                    {(log.LAT && log.LON) || log.LAT == 0 ? null : "NO GPS"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
