import { Project } from "../../../../../redux/Project/Project.type";
import { WeeklyPlanReport } from "../../../../../redux/WeeklyPlanReport/WeeklyPlanReport.type";

export type ViewWeeklyPlanReportPropType = {
  weekly_plan_report: WeeklyPlanReport;
  project: Project[];
};
