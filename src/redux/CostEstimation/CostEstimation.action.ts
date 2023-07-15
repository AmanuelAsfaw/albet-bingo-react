import { CostEstimationActionTypes } from "./CostEstimation.type";

/**
 * Fetch All CostEstimation
 *
 * @param payload
 */
export const fetchAllCostEstimations = (payload?: any) => ({
  type: CostEstimationActionTypes.FETCH_ALL_COST_ESTIMATION,
  payload: payload,
});

/**
 * Fetch All CostEstimation
 *
 * @param payload
 */
export const fetchOneCostEstimation = (payload?: any) => ({
  type: CostEstimationActionTypes.FETCH_ONE_COST_ESTIMATION,
  payload: payload,
});

/**
 * Reset Fetch CostEstimation State
 *
 * @param payload
 */
export const fetchAllCostEstimationsReset = (payload?: any) => ({
  type: CostEstimationActionTypes.FETCH_ALL_COST_ESTIMATION_RESET,
  payload: payload,
});
