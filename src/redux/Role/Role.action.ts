import { RoleActionTypes } from "./Role.type";

/**
 * Fetch All Role
 *
 * @param payload
 */
export const fetchAllRole = (payload?: any) => ({
  type: RoleActionTypes.FETCH_ALL_ROLE,
  payload: payload,
});

/**
 * Fetch All Role
 *
 * @param payload
 */
export const fetchOneRole = (payload?: any) => ({
  type: RoleActionTypes.FETCH_ONE_ROLE,
  payload: payload,
});

/**
 * Reset Fetch Role State
 *
 * @param payload
 */
export const fetchAllRoleReset = (payload?: any) => ({
  type: RoleActionTypes.FETCH_ALL_ROLE_RESET,
  payload: payload,
});
