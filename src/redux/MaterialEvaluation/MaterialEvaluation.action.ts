import { MaterialEvaluationActionTypes } from "./MaterialEvaluation.type";

/**
 * Fetch All MaterialEvaluation
 *
 * @param payload
 */
export const fetchAllMaterialEvaluation = (payload?: any) => ({
  type: MaterialEvaluationActionTypes.FETCH_ALL_MATERIAL_EVALUATION,
  payload: payload,
});

/**
 * Fetch All MaterialEvaluation
 *
 * @param payload
 */
export const fetchOneMaterialEvaluation = (payload?: any) => ({
  type: MaterialEvaluationActionTypes.FETCH_ONE_MATERIAL_EVALUATION,
  payload: payload,
});

/**
 * Reset Fetch MaterialEvaluation State
 *
 * @param payload
 */
export const fetchAllMaterialEvaluationReset = (payload?: any) => ({
  type: MaterialEvaluationActionTypes.FETCH_ALL_MATERIAL_EVALUATION_RESET,
  payload: payload,
});
