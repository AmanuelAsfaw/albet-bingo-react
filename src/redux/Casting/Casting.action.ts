import { CastingActionTypes } from "./Casting.type";

/**
 * Fetch All Casting
 *
 * @param payload
 */
export const fetchAllCasting = (payload?: any) => ({
  type: CastingActionTypes.FETCH_ALL_CASTING,
  payload: payload,
});

/**
 * Reset Fetch Casting State
 *
 * @param payload
 */
export const fetchAllCastingReset = (payload?: any) => ({
  type: CastingActionTypes.FETCH_ALL_CASTING_RESET,
  payload: payload,
});
