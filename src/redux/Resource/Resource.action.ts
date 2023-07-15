import { ResourceActionTypes } from "./Resource.type";

/**
 * Fetch All Resource
 *
 * @param payload
 */
export const fetchAllResource = (payload?: any) => ({
  type: ResourceActionTypes.FETCH_ALL_RESOURCE,
  payload: payload,
});

/**
 * Fetch All Resource
 *
 * @param payload
 */
export const fetchOneResource = (payload?: any) => ({
  type: ResourceActionTypes.FETCH_ONE_RESOURCE,
  payload: payload,
});

/**
 * Reset Fetch Resource State
 *
 * @param payload
 */
export const fetchAllResourceReset = (payload?: any) => ({
  type: ResourceActionTypes.FETCH_ALL_RESOURCE_RESET,
  payload: payload,
});
