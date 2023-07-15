import { ProjectVariationActionTypes } from "./ProjectVariation.type";

/**
 * Fetch All ProjectDuration
 *
 * @param payload
 */
export const fetchAllProjectVariations = (payload?: any) => ({
  type: ProjectVariationActionTypes.FETCH_ALL_PROJECT_VARIATION,
  payload: payload,
});

/**
 * Fetch Paged ProjectDuration
 *
 * @param payload
 */
export const fetchPagedProjectVariations = (payload?: any) => ({
  type: ProjectVariationActionTypes.FETCH_PAGED_PROJECT_VARIATION,
  payload: payload,
});

/**
 * Fetch All ProjectDuration
 *
 * @param payload
 */
export const fetchOneProjectVariation = (payload?: any) => ({
  type: ProjectVariationActionTypes.FETCH_ONE_PROJECT_VARIATION,
  payload: payload,
});

/**
 * Reset Fetch ProjectDuration State
 *
 * @param payload
 */
export const fetchAllProjectVariationReset = (payload?: any) => ({
  type: ProjectVariationActionTypes.FETCH_ALL_PROJECT_VARIATION_RESET,
  payload: payload,
});
