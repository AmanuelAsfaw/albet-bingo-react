import axios from "axios";
import { ApiCallState } from "../../../../redux/Utils";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { SubCategory } from "../../../../redux/SubCategory/SubCategory.type";
import { Category } from "../../../../redux/Category/Category.type";
import { KenoReportSummary } from "../../../../redux/KenoReport/Summary/Summary.type";
import { KenoThisWeekReportSummary } from "../../../../redux/KenoReport/ThisWeekReport/ThisWeekReport.type";
import { KenoAnyWeekReportSummary } from "../../../../redux/KenoReport/AnyWeekReport/AnyWeekReport.type";

export type InRangePropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
    fetchSummary: Function;
};
export type ScannerPropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
  fetchSummary: Function;
};
export type DailyPropType = {
    summaries: ApiCallState<KenoReportSummary[]>;
    fetchSummary: Function;
};
export type ThisWeekPropType = {
    summary: ApiCallState<KenoThisWeekReportSummary>;
    fetchSummary: Function;
};
export type AnyWeekPropType = {
    summary: ApiCallState<KenoAnyWeekReportSummary>;
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
