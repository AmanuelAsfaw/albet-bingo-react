import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { CheckList } from "../../../../../../../redux/CheckList/CheckList.type";

export type CheckListStatusPropType = {
  data: CheckList;
  fetchData: Function;
};

export const sendData = (data: any) =>
  axios.put(API_BASE_URI + "/checklist", data);
