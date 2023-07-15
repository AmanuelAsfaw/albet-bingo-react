import axios from "axios";
import { ApiCallState } from "../../../../redux/Utils";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { SubCategory } from "../../../../redux/SubCategory/SubCategory.type";
import { Category } from "../../../../redux/Category/Category.type";
import { KenoReportSummary } from "../../../../redux/KenoReport/Summary/Summary.type";
import { KenoInstantReportSummary } from "../../../../redux/KenoReport/InstantReport/InstantReport.type";
import { KenoA_GameReportSummary } from "../../../../redux/KenoReport/A-GameReport/A-GameReport.type";
import { KenoAnyDayReportSummary } from "../../../../redux/KenoReport/AnyDayReport/AnyDayReport.type";
import { KenoAnyDayByGameReportSummary } from "../../../../redux/KenoReport/A-GameAnyDayReport/A-GameAnyDayReport.type";

export type InRangePropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
    fetchSummary: Function;
};
export type ScannerPropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
  fetchSummary: Function;
};
export type DailyPropType = {
    summary: ApiCallState<KenoInstantReportSummary>;
    fetchSummary: Function;
};
export type A_GamePropType = {
    summary: ApiCallState<KenoA_GameReportSummary>;
    fetchSummary: Function;
};
export type AllGameAnyDayPropType = {
    summary: ApiCallState<KenoAnyDayReportSummary>;
    fetchSummary: Function;
};
export type A_GameAnyDayPropType = {
    summary: ApiCallState<KenoAnyDayByGameReportSummary>;
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
