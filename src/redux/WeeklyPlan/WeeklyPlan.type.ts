import { ApiCallState } from "../Utils";

export type WeeklyPlan = {
  id: number;
  project_id: number;
  date: string;
  shared_users: number[];
  weekly_plan_items: WeeklyPlanItem[];
  user_id: number;
};

export type WeeklyPlanItem = {
  item_no: string;
  description: string;
  contract_amount: number;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
  key: number;
  id?: number;
};

export type WeeklyPlanStateTypes = {
  fetchAll: ApiCallState<WeeklyPlan[]>;
  fetchOne: ApiCallState<WeeklyPlan | {}>;
};

export const WeeklyPlanActionTypes = {
  FETCH_ALL_WEEKLY_PLAN: "FETCH_ALL_WEEKLY_PLAN",
  FETCH_ALL_WEEKLY_PLAN_RESET: "FETCH_ALL_WEEKLY_PLAN_RESET",
  FETCH_ALL_WEEKLY_PLAN_FAILURE: "FETCH_ALL_WEEKLY_PLAN_FAILURE",
  FETCH_ALL_WEEKLY_PLAN_SUCCESS: "FETCH_ALL_WEEKLY_PLAN_SUCCESS",

  FETCH_ONE_WEEKLY_PLAN: "FETCH_ONE_WEEKLY_PLAN",
  FETCH_ONE_WEEKLY_PLAN_RESET: "FETCH_ONE_WEEKLY_PLAN_RESET",
  FETCH_ONE_WEEKLY_PLAN_FAILURE: "FETCH_ONE_WEEKLY_PLAN_FAILURE",
  FETCH_ONE_WEEKLY_PLAN_SUCCESS: "FETCH_ONE_WEEKLY_PLAN_SUCCESS",

  SET_WEEKLY_PLAN: "SET_WEEKLY_PLAN",
};
