import { Project } from "../../../../../redux/Project/Project.type";

export type AddWeeklyPlanReportPropType = {
  project: Project[];
  selectedProject: number | any;
  fetchAll: Function;
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
