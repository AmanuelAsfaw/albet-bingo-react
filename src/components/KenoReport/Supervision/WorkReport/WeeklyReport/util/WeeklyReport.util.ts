import { ApiCallState } from "../../../../../../redux/Utils";

import { Project } from "../../../../../../redux/Project/Project.type";
import { WeekReport } from "../../../../../../redux/WeekReport/WeekReport.type";
import axios from "axios";
import { authHeader } from "../../../../../../utilities/utilities";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { User } from "../../../../../../redux/User/User.type";

export type WeeklyReportPropType = {
  weeklyReport: ApiCallState<WeekReport[]>;
  project: ApiCallState<Project>;
  fetchAllWeekReports: Function;
  users: ApiCallState<User[]>;
  fetchUsers: Function;
};

export type ShareWeeklyReportPropType = {
  users: ApiCallState<User[]>;
  setWeeklyReport: Function;
  weekly_reports: ApiCallState<WeekReport[]>;
  weekly_report: WeekReport;
  project: ApiCallState<Project>;
};

export const deleteWeeklyReport = (id: number) =>
  axios.delete(API_BASE_URI + `/weekly-report/${id}`, authHeader());

export const pendingWeeklyReport = (id: number) =>
  axios.put(API_BASE_URI + `/weekly-report/pending`, { id }, authHeader());

export const PUT = (data: any) =>
  axios.put(API_BASE_URI + `/weekly-report`, data);
