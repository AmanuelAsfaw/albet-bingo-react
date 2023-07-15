import { TodayByGameKenoBillActionTypes } from "./TodayByGame.type";

/**
 * Fetch All TodayKenoBill
 *
 * @param payload
 */
export const fetchAllTodayKenoBill = (payload?: any) => ({
  type: TodayByGameKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_BY_GAME,
  payload: payload,
});

/**
 * Fetch All TodayKenoBill
 *
 * @param payload
 */
export const fetchOneTodayKenoBill = (payload?: any) => ({
  type: TodayByGameKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_BY_GAME,
  payload: payload,
});

/**
 * Reset Fetch TodayKenoBill State
 *
 * @param payload
 */
export const fetchAllTodayKenoBillReset = (payload?: any) => ({
  type: TodayByGameKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_BY_GAME_RESET,
  payload: payload,
});
