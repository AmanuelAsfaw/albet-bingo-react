import { SiteDiaryActionTypes } from "./SiteDiary.type";

/**
 * Fetch All SiteDiary
 *
 * @param payload
 */
export const fetchAllSiteDiary = (payload?: any) => ({
  type: SiteDiaryActionTypes.FETCH_ALL_SITE_DIARY,
  payload: payload,
});

/**
 * Reset Fetch SiteDiary State
 *
 * @param payload
 */
export const fetchAllSiteDiarysReset = (payload?: any) => ({
  type: SiteDiaryActionTypes.FETCH_ALL_SITE_DIARY_RESET,
  payload: payload,
});
