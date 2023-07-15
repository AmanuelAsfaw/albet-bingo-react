import { PreConceptActionTypes } from "./PreConcept.type";

/**
 * Fetch All PreConcept
 *
 * @param payload
 */
export const fetchAllPreConcept = (payload?: any) => ({
  type: PreConceptActionTypes.FETCH_ALL_PRE_CONCEPT,
  payload: payload,
});

/**
 * Fetch Paged PreConcept
 *
 * @param payload
 */
export const fetchPagedPreConcept = (payload?: any) => ({
  type: PreConceptActionTypes.FETCH_PAGED_PRE_CONCEPT,
  payload: payload,
});

/**
 * Fetch All PreConcept
 *
 * @param payload
 */
export const fetchOnePreConcept = (payload?: any) => ({
  type: PreConceptActionTypes.FETCH_ONE_PRE_CONCEPT,
  payload: payload,
});

/**
 * Reset Fetch PreConcept State
 *
 * @param payload
 */
export const fetchAllPreConceptReset = (payload?: any) => ({
  type: PreConceptActionTypes.FETCH_ALL_PRE_CONCEPT_RESET,
  payload: payload,
});
