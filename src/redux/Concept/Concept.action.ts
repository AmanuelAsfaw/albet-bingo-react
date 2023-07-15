import { ConceptActionTypes } from "./Concept.type";

/**
 * Fetch All PreConcept
 *
 * @param payload
 */
export const fetchAllConcepts = (payload?: any) => ({
  type: ConceptActionTypes.FETCH_ALL_CONCEPT,
  payload: payload,
});

/**
 * Fetch Paged PreConcept
 *
 * @param payload
 */
export const fetchPagedConcept = (payload?: any) => ({
  type: ConceptActionTypes.FETCH_PAGED_CONCEPT,
  payload: payload,
});

/**
 * Fetch All PreConcept
 *
 * @param payload
 */
export const fetchOneConcept = (payload?: any) => ({
  type: ConceptActionTypes.FETCH_ONE_CONCEPT,
  payload: payload,
});

/**
 * Reset Fetch PreConcept State
 *
 * @param payload
 */
export const fetchAllConceptReset = (payload?: any) => ({
  type: ConceptActionTypes.FETCH_ALL_CONCEPT_RESET,
  payload: payload,
});
