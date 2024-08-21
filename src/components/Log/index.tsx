"use server";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import { GetLogs } from "@/services/logs";
import GetDivision from "@/services/division";
import MapOne from "@/components/Maps/MapOne";
import Accordion from "@/components/Accordions";
import Option from "@/types/options";
import Division from "@/interfaces/Division";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import Input from "@/components/FormElements/Input";
import { redirect } from "next/navigation";
import Filter from "@/components/Log/FIlter";
import React from "react";
import { NextRequest } from "next/server";

const Log = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

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
      {searchParams.get("division_code")}
      <Breadcrumb pageName="Log" />
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
