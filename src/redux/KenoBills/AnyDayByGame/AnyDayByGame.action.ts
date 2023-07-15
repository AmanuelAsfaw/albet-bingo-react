import { AnyDayByGameKenoBillActionTypes } from "./AnyDayByGame.type";

/**
 * Fetch All TodayKenoBill
 *
 * @param payload
 */
export const fetchAllTodayKenoBill = (payload?: any) => ({
  type: AnyDayByGameKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_BY_GAME,
  payload: payload,
});

/**
 * Fetch All TodayKenoBill
 *
 * @param payload
 */
export const fetchOneTodayKenoBill = (payload?: any) => ({
  type: AnyDayByGameKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_BY_GAME,
  payload: payload,
});

/**
 * Reset Fetch TodayKenoBill State
 *
 * @param payload
 */
export const fetchAllTodayKenoBillReset = (payload?: any) => ({
  type: AnyDayByGameKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_BY_GAME_RESET,
  payload: payload,
});
