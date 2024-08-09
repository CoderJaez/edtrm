import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { GetLogs } from "@/services/logs";
import MapOne from "@/components/Maps/MapOne";
import Accordion from "@/components/Accordions";
const Log = async () => {
  const logs = await GetLogs();

  return (
    <div className="mx-5 max-w-7xl">
      <Breadcrumb pageName="Log" />
      <div className="my-4">
        <Accordion title="Advance Search">
          <div className="grid grid-cols-4 gap-4">
            <DatePickerOne />
            <DatePickerOne />
          </div>
        </Accordion>
      </div>
      <div className="min-h-[300px]">
        <MapOne Logs={logs} />
      </div>
      <div className="mt-4">
        <TableThree logs={logs} />
      </div>
    </div>
  );
};

export default Log;
