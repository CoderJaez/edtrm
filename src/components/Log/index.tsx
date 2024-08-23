"use server";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import { GetLogs } from "@/services/logs";
import GetDivision from "@/services/division";
import MapOne from "@/components/Maps/MapOne";
import Option from "@/types/options";
import Division from "@/interfaces/Division";
import Filter from "@/components/Log/Filter";
import React from "react";

type Prop = {
  searchParams: { division_code: string | undefined };
};
const Log = async ({ searchParams }: Prop) => {
  const page = 1;
  const pageSize = 100;
  const logs = await GetLogs(page, pageSize);
  const divisions = await GetDivision();
  const options: Option[] = divisions.map((div: Division) => ({
    value: div.DIVISIONCODE,
    label: div.DIVISIONCODE,
  }));
  return (
    <div className="mx-5 max-w-7xl">
      <Breadcrumb pageName="Log" />
      {searchParams.division_code}
      <div className="my-4">
        <Filter options={options} />
      </div>
      <div className="min-h-[500px]">
        <MapOne Logs={logs} />
      </div>
      <div className="mt-4">
        <TableThree logs={logs} />
      </div>
    </div>
  );
};

export default Log;
