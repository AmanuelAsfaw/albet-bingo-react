import { ApiCallState } from "../Utils";

export type RiskLog = {
  id: number;
  project_id: number;
  category: string;
  risk: string;
  risk_cause: string;
  impact: string;
  raised_by: string;
  date_rased: string;
  cost_impact: boolean;
  schedule_impact: boolean;
  response_strategy: string;
  response_plan: string;
  risk_owner: string;
  status: string;
  note: string;
};

export type RiskLogStateTypes = {
  fetchAll: ApiCallState<RiskLog[]>;
  fetchOne: ApiCallState<RiskLog | {}>;
};

export const RiskLogActionTypes = {
  FETCH_ALL_RISK_LOG: "FETCH_ALL_RISK_LOG",
  FETCH_ALL_RISK_LOG_RESET: "FETCH_ALL_RISK_LOG_RESET",
  FETCH_ALL_RISK_LOG_FAILURE: "FETCH_ALL_RISK_LOG_FAILURE",
  FETCH_ALL_RISK_LOG_SUCCESS: "FETCH_ALL_RISK_LOG_SUCCESS",

  FETCH_ONE_RISK_LOG: "FETCH_ONE_RISK_LOG",
  FETCH_ONE_RISK_LOG_RESET: "FETCH_ONE_RISK_LOG_RESET",
  FETCH_ONE_RISK_LOG_FAILURE: "FETCH_ONE_RISK_LOG_FAILURE",
  FETCH_ONE_RISK_LOG_SUCCESS: "FETCH_ONE_RISK_LOG_SUCCESS",
};
