import { TestEvaluationActionTypes } from "./TestEvaluation.type";

/**
 * Fetch All TestEvaluation
 *
 * @param payload
 */
export const fetchAllTestEvaluation = (payload?: any) => ({
  type: TestEvaluationActionTypes.FETCH_ALL_TEST_EVALUATION,
  payload: payload,
});

/**
 * Fetch All TestEvaluation
 *
 * @param payload
 */
export const fetchOneTestEvaluation = (payload?: any) => ({
  type: TestEvaluationActionTypes.FETCH_ONE_TEST_EVALUATION,
  payload: payload,
});

/**
 * Reset Fetch TestEvaluation State
 *
 * @param payload
 */
export const fetchAllTestEvaluationReset = (payload?: any) => ({
  type: TestEvaluationActionTypes.FETCH_ALL_TEST_EVALUATION_RESET,
  payload: payload,
});
