import { ApiCallState, PagedData } from "../Utils";

export type Financial = {
  id?: number;
  key: number;
  date: string;
  contract_amount_in_birr: number;
  previous_planned_in_birr: number;
  previous_executed_in_birr: number;
  this_month_planned_in_birr: number;
  this_month_executed_in_birr: number;
  this_month_comp_from_plan: number;
  to_date_planned_in_birr: number;
  to_date_executed_in_birr: number;
  to_date_comp_from_plan: number;
  accmp_in_percent: number;
  sub_category_id: number;
};

export type FinancialStateTypes = {
  fetchAll: ApiCallState<Financial[]>;
  fetchOne: ApiCallState<Financial | {}>;
  fetchPaged: ApiCallState<PagedData<Financial[]>>;
};

export const FinancialActionTypes = {
  FETCH_ALL_FINANCIAL: "FETCH_ALL_FINANCIAL",
  FETCH_ALL_FINANCIAL_RESET: "FETCH_ALL_FINANCIAL_RESET",
  FETCH_ALL_FINANCIAL_FAILURE: "FETCH_ALL_FINANCIAL_FAILURE",
  FETCH_ALL_FINANCIAL_SUCCESS: "FETCH_ALL_FINANCIAL_SUCCESS",

  FETCH_PAGED_FINANCIAL: "FETCH_PAGED_FINANCIAL",
  FETCH_PAGED_FINANCIAL_RESET: "FETCH_PAGED_FINANCIAL_RESET",
  FETCH_PAGED_FINANCIAL_FAILURE: "FETCH_PAGED_FINANCIAL_FAILURE",
  FETCH_PAGED_FINANCIAL_SUCCESS: "FETCH_PAGED_FINANCIAL_SUCCESS",

  FETCH_ONE_FINANCIAL: "FETCH_ONE_FINANCIAL",
  FETCH_ONE_FINANCIAL_RESET: "FETCH_ONE_FINANCIAL_RESET",
  FETCH_ONE_FINANCIAL_FAILURE: "FETCH_ONE_FINANCIAL_FAILURE",
  FETCH_ONE_FINANCIAL_SUCCESS: "FETCH_ONE_FINANCIAL_SUCCESS",
};
