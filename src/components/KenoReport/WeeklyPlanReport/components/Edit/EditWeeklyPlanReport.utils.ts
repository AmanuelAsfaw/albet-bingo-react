import { Project } from "../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { WeeklyPlanReport } from "../../../../../redux/WeeklyPlanReport/WeeklyPlanReport.type";

export type EditWeeklyPlanReportPropType = {
  project: Project[];
  fetchOne: Function;
  fetchAll: Function;
  id: number;
  weekly_plan: ApiCallState<WeeklyPlanReport>;
};
export type GoalOfTheWeekType = {
  goal_for_the_week: string;
  key: any;
};
export type ProjectActivityType = {
  project_activity_schedule: string;
  key: any;
};
export type WeeklyPlanType = {
  week_plan: string;
  key: any;
};
export type WeekDaysType = {
  name: string;
  week_plan: WeeklyPlanType[];
};
