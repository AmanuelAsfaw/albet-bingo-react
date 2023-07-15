import { KenoGameActionTypes } from "./KenoGame.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: KenoGameActionTypes.FETCH_ALL_KENO_GAME,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: KenoGameActionTypes.FETCH_ONE_KENO_GAME,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: KenoGameActionTypes.FETCH_ALL_KENO_GAME_RESET,
  payload: payload,
});
