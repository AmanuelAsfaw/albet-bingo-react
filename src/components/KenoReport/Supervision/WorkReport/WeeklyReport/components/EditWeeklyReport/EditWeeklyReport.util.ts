import axios from "axios";

import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../redux/Utils";
import { WeeklyPlan } from "../../../../../../../redux/WeeklyPlan/WeeklyPlan.type";
import { WeekReport } from "../../../../../../../redux/WeekReport/WeekReport.type";

import { authHeader } from "../../../../../../../utilities/utilities";

export const editWeeklyReportUtil = (id: number, data: any) =>
  axios.put(API_BASE_URI + `/weekly-report/${id}`, data, authHeader());

export type EditWeeklyReportPropType = {
  weekReport: WeekReport;
  project: Project;
  users: ApiCallState<User[]>;
  fetchAllWeekReports: Function;
  weekly_plan: ApiCallState<WeeklyPlan | null>;
  fetchWeeklyPlan: Function;
};
