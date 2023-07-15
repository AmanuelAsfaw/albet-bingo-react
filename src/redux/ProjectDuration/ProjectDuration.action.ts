import { ProjectDurationActionTypes } from "./ProjectDuration.type";

/**
 * Fetch All ProjectDuration
 *
 * @param payload
 */
export const fetchAllProjectDuration = (payload?: any) => ({
  type: ProjectDurationActionTypes.FETCH_ALL_PROJECT_DURATION,
  payload: payload,
});

/**
 * Fetch Paged ProjectDuration
 *
 * @param payload
 */
export const fetchPagedProjectDuration = (payload?: any) => ({
  type: ProjectDurationActionTypes.FETCH_PAGED_PROJECT_DURATION,
  payload: payload,
});

/**
 * Fetch All ProjectDuration
 *
 * @param payload
 */
export const fetchOneProjectDuration = (payload?: any) => ({
  type: ProjectDurationActionTypes.FETCH_ONE_PROJECT_DURATION,
  payload: payload,
});

/**
 * Reset Fetch ProjectDuration State
 *
 * @param payload
 */
export const fetchAllProjectDurationReset = (payload?: any) => ({
  type: ProjectDurationActionTypes.FETCH_ALL_PROJECT_DURATION_RESET,
  payload: payload,
});
