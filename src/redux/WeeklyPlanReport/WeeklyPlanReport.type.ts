import { Moment } from "moment";
import {
  GoalOfTheWeekType,
  ProjectActivityType,
  WeeklyPlanType,
} from "../../components/ProjectMenu/WeeklyPlanReport/components/Add/AddWeeklyPlanReport.utils";
import { ApiCallState, PagedData } from "../Utils";

export type WeekDaysType = {
  name: string;
  week_plan: WeeklyPlanType[];
};

export type WeeklyPlanReport = {
  id?: number;
  date: string | Moment;
  project_id: number;
  follow_up_resident: string;
  goals_for_the_week: GoalOfTheWeekType[];
  remark?: string;
  weekly_plan: WeekDaysType[];
  project_activity_schedule: ProjectActivityType[];
};

export type WeeklyPlanReportStateTypes = {
  fetchAll: ApiCallState<WeeklyPlanReport[]>;
  fetchOne: ApiCallState<WeeklyPlanReport | {}>;
  fetchPaged: ApiCallState<PagedData<WeeklyPlanReport[]>>;
};

export const WeeklyPlanReportActionTypes = {
  FETCH_ALL_WEEKLY_PLAN_REPORT: "FETCH_ALL_WEEKLY_PLAN_REPORT",
  FETCH_ALL_WEEKLY_PLAN_REPORT_RESET: "FETCH_ALL_WEEKLY_PLAN_REPORT_RESET",
  FETCH_ALL_WEEKLY_PLAN_REPORT_FAILURE: "FETCH_ALL_WEEKLY_PLAN_REPORT_FAILURE",
  FETCH_ALL_WEEKLY_PLAN_REPORT_SUCCESS: "FETCH_ALL_WEEKLY_PLAN_REPORT_SUCCESS",

  FETCH_PAGED_WEEKLY_PLAN_REPORT: "FETCH_PAGED_WEEKLY_PLAN_REPORT",
  FETCH_PAGED_WEEKLY_PLAN_REPORT_RESET: "FETCH_PAGED_WEEKLY_PLAN_REPORT_RESET",
  FETCH_PAGED_WEEKLY_PLAN_REPORT_FAILURE:
    "FETCH_PAGED_WEEKLY_PLAN_REPORT_FAILURE",
  FETCH_PAGED_WEEKLY_PLAN_REPORT_SUCCESS:
    "FETCH_PAGED_WEEKLY_PLAN_REPORT_SUCCESS",

  FETCH_ONE_WEEKLY_PLAN_REPORT: "FETCH_ONE_WEEKLY_PLAN_REPORT",
  FETCH_ONE_WEEKLY_PLAN_REPORT_RESET: "FETCH_ONE_WEEKLY_PLAN_REPORT_RESET",
  FETCH_ONE_WEEKLY_PLAN_REPORT_FAILURE: "FETCH_ONE_WEEKLY_PLAN_REPORT_FAILURE",
  FETCH_ONE_WEEKLY_PLAN_REPORT_SUCCESS: "FETCH_ONE_WEEKLY_PLAN_REPORT_SUCCESS",
};
