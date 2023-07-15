import axios from "axios";

import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../redux/Utils";
import { WeeklyPlan } from "../../../../../../../redux/WeeklyPlan/WeeklyPlan.type";

import { authHeader } from "../../../../../../../utilities/utilities";

export const addWeeklyReportUtil = (data: any) =>
  axios.post(API_BASE_URI + "/weekly-report", data, authHeader());

export type DescriptionType = {
  key: number;
  item_no: string;
  activity_desc: string;
  block_no: string;
  planned_qty: string;
  executed_qty: string;
  total: string;
};
export type ManPowerType = {
  key: number;
  trade_name: string;
  planned: string;
  available: string;
};
export type EquipmentType = {
  key: number;

  trade_name: string;
  planned: string;
  available: string;
};
export type MaterialType = {
  key: number;
  trade_name: string;
  planned: string;
  available: string;
};
export type ProblemType = {
  key: number;
  problem_encountered: string;
  soln_by_client: string;
  soln_by_contractor: string;
  affected_days_no: string;
};

export type AddWeeklyReportPropTypes = {
  user: User[];
  project: ApiCallState<Project>;
  fetchAllWeekReports: Function;
  weekly_plan: ApiCallState<WeeklyPlan | null>;
  fetchWeeklyPlan: Function;
};

export const formatFieldName = (field_name: string) => {
  const fieldNameArr = field_name.split("_");
  fieldNameArr.shift();
  console.log(fieldNameArr);
  // return fieldNameArr;
  return fieldNameArr
    .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");
};
