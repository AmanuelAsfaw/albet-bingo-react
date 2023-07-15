import axios from "axios";
import { Project } from "../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../redux/Utils";
import { WeeklyPlanReport } from "../../../../redux/WeeklyPlanReport/WeeklyPlanReport.type";
import { API_BASE_URI } from "../../../../redux/ApiCall";

export type WeeklyPlanReportPropType = {
  fetchAllProject: Function;
  fetchAll: Function;
  project: ApiCallState<Project[]>;
  weekly_plan_report: ApiCallState<WeeklyPlanReport[]>;
};

export const CreateWeeklyPlanReport = (data: any) =>
  axios.post(API_BASE_URI + `/weekly_plan_report`, data);

export const DeleteWeeklyPlanReport = (id: number) =>
  axios.delete(API_BASE_URI + `/weekly_plan_report/${id}`);
