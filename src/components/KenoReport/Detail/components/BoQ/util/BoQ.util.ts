import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Project } from "../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type BoQPropType = {
  project: ApiCallState<Project>;
  fetchProject: Function;
};

export type BoQRegistrationStructure = {
  is_super_title: boolean;
  is_title: boolean;
  is_sub_title: boolean | null;
  description: string;
  item_no: string;
  unit: string;
  quantity: number;
  unit_price: number;
  amount: number;
  key: number;
  reference_id: any;
  sheet_name: string;
};

export const sendData = (data: any) => axios.post(API_BASE_URI + "/boq", data);

export const Validation = (data: BoQRegistrationStructure[]) => {
  return true;
};
