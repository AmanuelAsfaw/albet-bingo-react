import axios from "axios";
import { ApiCallState } from "../../../../redux/Utils";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { SubCategory } from "../../../../redux/SubCategory/SubCategory.type";
import { Category } from "../../../../redux/Category/Category.type";
import { KenoReportSummary } from "../../../../redux/KenoReport/Summary/Summary.type";
import { TodayKenoBill } from "../../../../redux/KenoBills/Today/Today.type";
import { TodayByGameKenoBill } from "../../../../redux/KenoBills/TodayByGame/TodayByGame.type";
import { AnyDayByGameKenoBill } from "../../../../redux/KenoBills/AnyDayByGame/AnyDayByGame.type";
import { ThisWeekKenoBill } from "../../../../redux/KenoBills/ThisWeekBill/ThisWeekBill.type";
import { AnyWeekKenoBill } from "../../../../redux/KenoBills/AnyWeekBill/AnyWeekBill.type";
import { ThisMonthKenoBill } from "../../../../redux/KenoBills/ThisMonth/ThisMonthBill.type";
import { AnyMonthKenoBill } from "../../../../redux/KenoBills/AnyMonth/AnyMonthBill.type";

export type ThisMonthPropType = {
    bills: ApiCallState<ThisMonthKenoBill[]>;
    fetchBills: Function;
};
export type AnyMonthPropType = {
    bills: ApiCallState<AnyMonthKenoBill[]>;
    fetchBills: Function;
};
export type TodayByGamePropType = {
    bills: ApiCallState<TodayByGameKenoBill[]>;
    fetchBills: Function;
};
export type AnyDayByGamePropType = {
    bills: ApiCallState<AnyDayByGameKenoBill[]>;
    fetchBills: Function;
};
export type ScannerPropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
  fetchSummary: Function;
};
export type DailyPropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
    fetchSummary: Function;
};
export type A_GamePropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
    fetchSummary: Function;
};
export type AllGameAnyDayPropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
    fetchSummary: Function;
};
export type A_GameAnyDayPropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
    fetchSummary: Function;
};
export type WeeklyPropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
    fetchSummary: Function;
};
export type MonthlyPropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
    fetchSummary: Function;
};
export type AnnualPropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
    fetchSummary: Function;
};
export type AddSubCategoryPropType = {
  category: ApiCallState<Category[]>;
  fetchAllCategory: Function;
  fetchAll: Function;
  defaultCategory: any;
};

export type EditSubCategoryType = {
  sub_category: ApiCallState<SubCategory>;
  category: ApiCallState<Category[]>;
  fetchAll: Function;
  fetchAllCategory: Function;
  fetchOne: Function;
  id?: number;
};

export const sendSubCategory = (data: any) =>
  axios.post(API_BASE_URI + "/sub_category", data);

export const deleteSubCategory = (id: any) =>
  axios.delete(API_BASE_URI + `/sub_category/${id}`);

export const deleteCategory = (id: any) =>
  axios.delete(API_BASE_URI + `/category/${id}`);