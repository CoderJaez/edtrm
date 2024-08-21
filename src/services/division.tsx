import { options } from "@/configs/fireBirdDB";
import Firebird from "node-firebird";
import Division from "@/interfaces/Division";
import { DataAccess } from "@/Utils/DataAccess";

const GetDivision = async () => {
  return await DataAccess<Division>("SELECT DIVISIONCODE FROM DIVISION", []);
};
export default GetDivision;
