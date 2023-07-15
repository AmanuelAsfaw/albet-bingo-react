import { ShareDataActionTypes } from "./ShareData.type";

/**
 * Fetch All ShareData
 *
 * @param payload
 */
export const fetchAllShareData = (payload?: any) => ({
  type: ShareDataActionTypes.FETCH_ALL_SHARE_DATA,
  payload: payload,
});

/**
 * Fetch All ShareData
 *
 * @param payload
 */
export const fetchOneShareData = (payload?: any) => ({
  type: ShareDataActionTypes.FETCH_ONE_SHARE_DATA,
  payload: payload,
});

/**
 * Reset Fetch ShareData State
 *
 * @param payload
 */
export const fetchAllShareDataReset = (payload?: any) => ({
  type: ShareDataActionTypes.FETCH_ALL_SHARE_DATA_RESET,
  payload: payload,
});
