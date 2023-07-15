import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";

export type AddCheckListFormPropType = {
  module: string;
  fetchData: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/checklist-form", data);

export const checkListFormItemObject = (
  key: any,
  parent_id = null,
  index = "-1"
) => {
  return {
    key,
    index,
    parent_id,
    description: null,
    is_subtitle: false,
    is_numbered: true,
    children: [],
  };
};
