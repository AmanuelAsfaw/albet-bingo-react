import { KenoA_GameReportSummaryActionTypes } from "./A-GameReport.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: KenoA_GameReportSummaryActionTypes.FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: KenoA_GameReportSummaryActionTypes.FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: KenoA_GameReportSummaryActionTypes.FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY_RESET,
  payload: payload,
});
