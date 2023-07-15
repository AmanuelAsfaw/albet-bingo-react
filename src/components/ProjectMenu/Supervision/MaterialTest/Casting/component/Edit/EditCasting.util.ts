import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { Casting } from "../../../../../../../redux/Casting/Casting.type";
import { authHeader } from "../../../../../../../utilities/utilities";

export type EditCastingComponentPropType = {
  data: Casting;
  fetchAllCasting: Function;
};

export const sendData = (id: any, data: any) =>
  axios.put(API_BASE_URI + `/casting/${id}`, data, authHeader());
