import { SHEActionTypes } from "./SHE.type";

/**
 * Fetch All SHEs
 *
 * @param payload
 */
export const fetchAllSHEs = (payload?: any) => ({
  type: SHEActionTypes.FETCH_ALL_SHE,
  payload: payload,
});

/**
 * Reset Fetch SHEs State
 *
 * @param payload
 */
export const fetchAllSHEsReset = (payload?: any) => ({
  type: SHEActionTypes.FETCH_ALL_SHE_RESET,
  payload: payload,
});
