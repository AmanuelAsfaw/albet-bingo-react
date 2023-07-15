import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Project } from "../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";
import {
  WeeklyPlan,
  WeeklyPlanItem,
} from "../../../../../../redux/WeeklyPlan/WeeklyPlan.type";

export type WeeklyPlanPropType = {
  weekly_plans: ApiCallState<WeeklyPlan[]>;
  fetchWeeklyPlans: Function;
  project: ApiCallState<Project>;
  fetchUsers: Function;
};

export type AddWeeklyPlanPropType = {
  fetchWeeklyPlans: Function;
  project: ApiCallState<Project>;
};

export type ViewWeeklyPlanPropType = {
  weekly_plan: WeeklyPlan;
};

export type ShareWeeklyPlanPropType = {
  weekly_plans: ApiCallState<WeeklyPlan[]>;
  users: ApiCallState<User[]>;

  project: ApiCallState<Project>;
  setWeeklyPlan: Function;
  weekly_plan: WeeklyPlan;
};

export type PrintWeeklyPlanPropType = {
  weekly_plan: WeeklyPlan | null;
};

export type EditWeeklyPlanPropType = {
  fetchWeeklyPlans: Function;
  weekly_plan: WeeklyPlan;
  project: ApiCallState<Project>;
};

export type BoqModalPropType = {
  dataAction: [
    WeeklyPlanItem[],
    React.Dispatch<React.SetStateAction<WeeklyPlanItem[]>>
  ];
  project: ApiCallState<Project>;
};

export const POST = (data: any) =>
  axios.post(`${API_BASE_URI}/weekly-plan`, data);

export const DELETE = (id: number) =>
  axios.delete(`${API_BASE_URI}/weekly-plan/${id}`);

export const PUT = (data: any) =>
  axios.put(`${API_BASE_URI}/weekly-plan`, data);
