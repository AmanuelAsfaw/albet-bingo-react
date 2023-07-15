import { API_BASE_URI } from "../../../../../redux/ApiCall";
import axios from "axios";
import { Project } from "../../../../../redux/Project/Project.type";
import { RiskLog } from "../../../../../redux/RiskLog/RiskLog.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type RiskLogPropType = {
  risk_logs: ApiCallState<RiskLog[]>;
  fetchRiskLogs: Function;
  project: ApiCallState<Project>;
};

export type AddRiskLogPropType = {
  fetchRiskLogs: Function;
  project: ApiCallState<Project>;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/risk-log", data);
