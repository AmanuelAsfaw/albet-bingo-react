import { SiteHandoverActionTypes } from "./SiteHandover.type";

/**
 * Fetch All SiteHandover
 *
 * @param payload
 */
export const fetchAllSiteHandover = (payload?: any) => ({
  type: SiteHandoverActionTypes.FETCH_ALL_SITE_HANDOVER,
  payload: payload,
});

/**
 * Fetch All SiteHandover
 *
 * @param payload
 */
export const fetchOneSiteHandover = (payload?: any) => ({
  type: SiteHandoverActionTypes.FETCH_ONE_SITE_HANDOVER,
  payload: payload,
});

/**
 * Reset Fetch SiteHandover State
 *
 * @param payload
 */
export const fetchAllSiteHandoverReset = (payload?: any) => ({
  type: SiteHandoverActionTypes.FETCH_ALL_SITE_HANDOVER_RESET,
  payload: payload,
});
