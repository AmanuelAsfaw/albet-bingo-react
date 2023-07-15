import axios from "axios";

import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { WeekReport } from "../../../../../../../redux/WeekReport/WeekReport.type";

import { authHeader } from "../../../../../../../utilities/utilities";

export const deleteWeeklyReport = (id: any) =>
  axios.delete(API_BASE_URI + `/weekly-report/${id}`, authHeader());

export type ViewWeeklyReportPropType = {
  weekReport: WeekReport;
  project: Project;
};
