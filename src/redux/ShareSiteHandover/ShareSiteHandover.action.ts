import { ShareSiteHandoverActionTypes } from "./ShareSiteHandover.type";

/**
 * Fetch All ShareSiteHandover
 *
 * @param payload
 */
export const fetchAllShareSiteHandover = (payload?: any) => ({
  type: ShareSiteHandoverActionTypes.FETCH_ALL_SHARE_SITE_HANDOVER,
  payload: payload,
});

/**
 * Fetch All ShareSiteHandover
 *
 * @param payload
 */
export const fetchOneShareSiteHandover = (payload?: any) => ({
  type: ShareSiteHandoverActionTypes.FETCH_ONE_SHARE_SITE_HANDOVER,
  payload: payload,
});

/**
 * Reset Fetch ShareSiteHandover State
 *
 * @param payload
 */
export const fetchAllShareSiteHandoverReset = (payload?: any) => ({
  type: ShareSiteHandoverActionTypes.FETCH_ALL_SHARE_SITE_HANDOVER_RESET,
  payload: payload,
});
