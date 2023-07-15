import { TestResultActionTypes } from "./TestResult.type";

/**
 * Fetch All Test
 *
 * @param payload
 */
export const fetchAllTestResult = (payload?: any) => ({
  type: TestResultActionTypes.FETCH_ALL_TEST_RESULT,
  payload: payload,
});

/**
 * Reset Fetch All Test State
 *
 * @param payload
 */
export const fetchAllTestResultReset = (payload?: any) => ({
  type: TestResultActionTypes.FETCH_ALL_TEST_RESULT_RESET,
  payload: payload,
});

/**
 * Fetch One Test
 *
 * @param payload
 */
export const fetchOneTestResult = (payload?: any) => ({
  type: TestResultActionTypes.FETCH_ONE_TEST_RESULT,
  payload: payload,
});

/**
 * Reset Fetch One Test State
 *
 * @param payload
 */
export const fetchOneTestResultReset = (payload?: any) => ({
  type: TestResultActionTypes.FETCH_ONE_TEST_RESULT_RESET,
  payload: payload,
});
