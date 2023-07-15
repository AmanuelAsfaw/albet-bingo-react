import { toNumber } from "lodash";
import moment, { Moment } from "moment";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../../redux/Utils";
import { WeeklyPlan } from "../../../../../../../redux/WeeklyPlan/WeeklyPlan.type";
import { WeekReport } from "../../../../../../../redux/WeekReport/WeekReport.type";

export type FinancialProgressPropType = {
  weeklyReport: ApiCallState<WeekReport[]>;
  project: ApiCallState<Project>;
  fetchAllWeekReports: Function;
  weekly_plan: ApiCallState<WeeklyPlan[]>;
  fetchAllWeeklyPlan: Function;
};

export type PrintPropType = {
  printData: any;
  project: Project;
  is_visible: boolean;
  setVisibility: Function;
  loading: boolean;
  reporting_week: Moment;
  week_no: number;
};

export const descriptionData = (array: any) => {
  let arr: any = [];
  for (let i = 0; i < array.length; i++) {
    array[i].description
      .split("---")
      .map((data: any) => arr.push(JSON.parse(data)));
  }
  return arr;
};

export const parseWeeklyPlan = (array: any) => {
  let arr: any = [];
  for (let i = 0; i < array.length; i++) {
    array[i].weekly_plan_items.map((data: any) => arr.push(data));
  }
  return arr;
};

export const findWeekNumber = (week: moment.Moment) => {
  let num: number = 0;
  let date = week.clone().endOf("week").format("D");
  if (toNumber(date) >= 1 && toNumber(date) <= 7) {
    num = 1;
  } else if (toNumber(date) > 7 && toNumber(date) <= 14) {
    num = 2;
  } else if (toNumber(date) > 14 && toNumber(date) <= 21) {
    num = 3;
  } else if (toNumber(date) > 21 && toNumber(date) <= 31) {
    num = 4;
  }
  return num;
};

export const getWeekNumber = (date: Moment) => {
  let start_week = date.clone().startOf("week");
  let start_month = date.clone().startOf("month");
  if (start_month.isSame(start_week, "M")) {
    return {
      week: Math.ceil(toNumber(start_week.format("DD")) / 7),
    };
  } else {
    return {
      week: 4,
    };
  }
};
