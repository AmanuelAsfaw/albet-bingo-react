import { RequestForTestActionTypes } from "./RequestForTest.type";

/**
 * Fetch All RequestForTest
 *
 * @param payload
 */
export const fetchAllRequestForTest = (payload?: any) => ({
  type: RequestForTestActionTypes.FETCH_ALL_REQUEST_FOR_TEST,
  payload: payload,
});

/**
 * Fetch All RequestForTest
 *
 * @param payload
 */
export const fetchOneRequestForTest = (payload?: any) => ({
  type: RequestForTestActionTypes.FETCH_ONE_REQUEST_FOR_TEST,
  payload: payload,
});

/**
 * Reset Fetch RequestForTest State
 *
 * @param payload
 */
export const fetchAllRequestForTestReset = (payload?: any) => ({
  type: RequestForTestActionTypes.FETCH_ALL_REQUEST_FOR_TEST_RESET,
  payload: payload,
});
