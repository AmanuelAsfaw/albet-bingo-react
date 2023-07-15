import { QueryActionTypes } from "./Query.type";

/**
 * Fetch All Query
 *
 * @param payload
 */
export const fetchAllQuery = (payload?: any) => ({
  type: QueryActionTypes.FETCH_ALL_QUERY,
  payload: payload,
});

/**
 * Fetch All Query
 *
 * @param payload
 */
export const fetchOneQuery = (payload?: any) => ({
  type: QueryActionTypes.FETCH_ONE_QUERY,
  payload: payload,
});

/**
 * Reset Fetch Query State
 *
 * @param payload
 */
export const fetchAllQueryReset = (payload?: any) => ({
  type: QueryActionTypes.FETCH_ALL_QUERY_RESET,
  payload: payload,
});
