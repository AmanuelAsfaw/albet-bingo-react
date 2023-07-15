import { BoqActionTypes } from "./Boq.type";

/**
 * Fetch All Boqs
 *
 * @param payload
 */
export const fetchAllBoqs = (payload?: any) => ({
  type: BoqActionTypes.FETCH_ALL_BOQ,
  payload: payload,
});

/**
 * Reset Fetch Boqs State
 *
 * @param payload
 */
export const fetchAllBoqsReset = (payload?: any) => ({
  type: BoqActionTypes.FETCH_ALL_BOQ_RESET,
  payload: payload,
});

/**
 * Fetch All Boqs
 *
 * @param payload
 */
export const fetchOneBoqs = (payload?: any) => ({
  type: BoqActionTypes.FETCH_ONE_BOQ,
  payload: payload,
});

/**
 * Reset Fetch Boqs State
 *
 * @param payload
 */
export const fetchOneBoqsReset = (payload?: any) => ({
  type: BoqActionTypes.FETCH_ONE_BOQ_RESET,
  payload: payload,
});

/**
 * Fetch All Boqs
 *
 * @param payload
 */
export const fetchDetailBoqs = (payload?: any) => ({
  type: BoqActionTypes.FETCH_DETAIL_BOQ,
  payload: payload,
});

/**
 * Reset Fetch Boqs State
 *
 * @param payload
 */
export const fetchDetailBoqsReset = (payload?: any) => ({
  type: BoqActionTypes.FETCH_DETAIL_BOQ_RESET,
  payload: payload,
});
