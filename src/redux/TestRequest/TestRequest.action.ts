import { TestRequestActionTypes } from "./TestRequest.type";

/**
 * Fetch All Test
 *
 * @param payload
 */
export const fetchAllTestRequest = (payload?: any) => ({
  type: TestRequestActionTypes.FETCH_ALL_TEST_REQUEST,
  payload: payload,
});

/**
 * Reset Fetch All Test State
 *
 * @param payload
 */
export const fetchAllTestRequestReset = (payload?: any) => ({
  type: TestRequestActionTypes.FETCH_ALL_TEST_REQUEST_RESET,
  payload: payload,
});

/**
 * Fetch One Test
 *
 * @param payload
 */
export const fetchOneTestRequest = (payload?: any) => ({
  type: TestRequestActionTypes.FETCH_ONE_TEST_REQUEST,
  payload: payload,
});

/**
 * Reset Fetch One Test State
 *
 * @param payload
 */
export const fetchOneTestRequestReset = (payload?: any) => ({
  type: TestRequestActionTypes.FETCH_ONE_TEST_REQUEST_RESET,
  payload: payload,
});
