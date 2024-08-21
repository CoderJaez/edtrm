"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import Accordion from "@/components/Accordions";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Input from "@/components/FormElements/Input";
import Option from "@/types/options";
import Division from "@/interfaces/Division";
import GetDivision from "@/services/division";

type Prop = {
  options: Option[];
};
const Filter: React.FC<Prop> = ({ options }) => {
  return (
    <>
      <Accordion title="Advance Search">
        <form>
          <div className="grid grid-cols-4 gap-4">
            <SelectGroupOne
              label="Division"
              name="division_code"
              options={options}
            />
            <Input
              label="Employee"
              name="employee"
              placeholder="Search Employee"
            />
          </div>
          <div className="my-4 ">
            <input
              type="submit"
              value="Filter"
              className="w-22 cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
            />
          </div>
        </form>
      </Accordion>
    </>
  );
};

export default Filter;
