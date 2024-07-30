import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

const Calendar = () => {
  return (
    <div className="mx-5 max-w-7xl">
      <Breadcrumb pageName="Log" />
      <TableThree />
    </div>
  );
};

export default Calendar;
