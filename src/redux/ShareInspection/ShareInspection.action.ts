import { ShareInspectionActionTypes } from "./ShareInspection.type";

/**
 * Fetch All ShareInspection
 *
 * @param payload
 */
export const fetchAllShareInspection = (payload?: any) => ({
  type: ShareInspectionActionTypes.FETCH_ALL_SHARE_INSPECTION,
  payload: payload,
});

/**
 * Fetch All ShareInspection
 *
 * @param payload
 */
export const fetchOneShareInspection = (payload?: any) => ({
  type: ShareInspectionActionTypes.FETCH_ONE_SHARE_INSPECTION,
  payload: payload,
});

/**
 * Reset Fetch ShareInspection State
 *
 * @param payload
 */
export const fetchAllShareInspectionReset = (payload?: any) => ({
  type: ShareInspectionActionTypes.FETCH_ALL_SHARE_INSPECTION_RESET,
  payload: payload,
});
