import Edtrm from "@/components/Dashboard/E-dtrm";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { sequelize } from "@/configs/mysqlDB";
import { CheckConnection } from "@/configs/fireBirdDB";
export const metadata: Metadata = {
  title: "E-DTRM",
  description: "Electronic Daily Time Record Monitoring Application",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Edtrm />
      </DefaultLayout>
    </>
  );
}
