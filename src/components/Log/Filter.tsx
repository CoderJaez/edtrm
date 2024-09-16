"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import Accordion from "@/components/Accordions";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Input from "@/components/FormElements/Input";
import Option from "@/types/options";

type Prop = {
  options: Option[];
};
const Filter: React.FC<Prop> = ({ options }) => {
  const params = useSearchParams();
  const router = useRouter();
  const page =
    params.get("page") && Number(params.get("page"))
      ? Number(params.get("page"))
      : 1;
  const timeOptions: Option[] = [
    { label: "In", value: "0" },
    { label: "Out", value: "1" },
  ];
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const division_code =
      formData.get("division_code") && formData.get("division_code") !== ""
        ? `&division_code=${formData.get("division_code")}`
        : "";
    const time_inout =
      formData.get("time_inout") && formData.get("time_inout") !== ""
        ? `&time_inout=${formData.get("time_inout")}`
        : "";
    const employee =
      formData.get("employee") && formData.get("employee") !== ""
        ? `&employee=${formData.get("employee")}`
        : "";
    router.push(`/logs?page=${page}${division_code}${time_inout}${employee}`);
  };
  return (
    <>
      <Accordion title="Advance Search">
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-4 gap-4">
            <SelectGroupOne
              label="Division"
              name="division_code"
              options={options}
            />
            <SelectGroupOne
              label="Time In/Out"
              name="time_inout"
              options={timeOptions}
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
