import { RiskLogActionTypes } from "./RiskLog.type";

/**
 * Fetch All RiskLog
 *
 * @param payload
 */
export const fetchAllRiskLog = (payload?: any) => ({
  type: RiskLogActionTypes.FETCH_ALL_RISK_LOG,
  payload: payload,
});

/**
 * Fetch All RiskLog
 *
 * @param payload
 */
export const fetchOneRiskLog = (payload?: any) => ({
  type: RiskLogActionTypes.FETCH_ONE_RISK_LOG,
  payload: payload,
});

/**
 * Reset Fetch RiskLog State
 *
 * @param payload
 */
export const fetchAllRiskLogReset = (payload?: any) => ({
  type: RiskLogActionTypes.FETCH_ALL_RISK_LOG_RESET,
  payload: payload,
});
