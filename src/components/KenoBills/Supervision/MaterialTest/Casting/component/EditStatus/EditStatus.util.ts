import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { Casting } from "../../../../../../../redux/Casting/Casting.type";
import { authHeader } from "../../../../../../../utilities/utilities";

export type EditCastingStatusPropType = {
  casting: Casting;
  fetchAllCasting: Function;
};

export const sendData = (id: any, data: any) =>
  axios.put(API_BASE_URI + `/casting/${id}/date`, data, authHeader());
