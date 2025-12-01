import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import { GetLogs } from "@/services/logs";
import GetDivision from "@/services/division";
import MapOne from "@/components/Maps/MapOne";
import Option from "@/types/options";
import Division from "@/interfaces/Division";
import Filter from "@/components/Log/Filter";
import { Pagination } from "@/components/Pagination";

import React from "react";

export const metadata: Metadata = {
  title: "DTR Logs",
  description: "Electronic Daily Time Record Monitoring Application",
};
type Prop = {
  searchParams: {
    division_code: string | undefined;
    employee: string | undefined;
    page: number | undefined;
    time_inout: string | undefined;
    start_date: string | undefined;
    end_date: string | undefined;
  };
};
const LogPage: React.FC<Prop> = async ({ searchParams }) => {
  const page = searchParams.page ? searchParams.page : 1;
  const pageSize = 200;
  const { logs, metaData } = await GetLogs(
    page,
    pageSize,
    searchParams.division_code,
    searchParams.time_inout,
    searchParams.employee,
    searchParams.start_date,
    searchParams.end_date,
  );
  const divisions = await GetDivision();
  const options: Option[] = divisions.map((div: Division) => ({
    value: div.DIVISIONCODE,
    label: div.DIVISIONCODE,
  }));
  return (
    <DefaultLayout>
      <div className="mx-5 max-w-7xl">
        <Breadcrumb pageName="Log" />
        <div className="my-4">
          <Filter options={options} />
        </div>
        <div className="min-h-[500px]">
          <MapOne Logs={logs} />
        </div>
        <div className="mt-4">
          <Pagination
            currentPage={metaData.page}
            totalPages={metaData.totalPages}
            baseUrl="/logs"
          />
          <TableThree logs={logs} />
          <Pagination
            currentPage={metaData.page}
            totalPages={metaData.totalPages}
            baseUrl="/logs"
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LogPage;
