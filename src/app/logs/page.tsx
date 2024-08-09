import Log from "@/components/Log";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
export const metadata: Metadata = {
  title: "DTR Logs",
  description: "Electronic Daily Time Record Monitoring Application",
};

const LogPage = () => {
  return (
    <DefaultLayout>
      <Log />
    </DefaultLayout>
  );
};

export default LogPage;
