import { TestRequestStateTypes, TestRequestActionTypes } from "./TestRequest.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: TestRequestStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState(null),
};

const TestRequestReducer = (
  state: TestRequestStateTypes = INITIAL_STATE,
  action: any
): TestRequestStateTypes => {
  switch (action.type) {
    /**
    |--------------------------------------------------
    | FETCH ALL
    |--------------------------------------------------
    */
    case TestRequestActionTypes.FETCH_ALL_TEST_REQUEST:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TestRequestActionTypes.FETCH_ALL_TEST_REQUEST_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TestRequestActionTypes.FETCH_ALL_TEST_REQUEST_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TestRequestActionTypes.FETCH_ALL_TEST_REQUEST_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    /**
    |--------------------------------------------------
    | FETCH ONE
    |--------------------------------------------------
    */
    case TestRequestActionTypes.FETCH_ONE_TEST_REQUEST:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: null,
          isPending: true,
          isSuccessful: false,
        },
      };
    case TestRequestActionTypes.FETCH_ONE_TEST_REQUEST_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState(null),
      };
    case TestRequestActionTypes.FETCH_ONE_TEST_REQUEST_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: null,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TestRequestActionTypes.FETCH_ONE_TEST_REQUEST_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    default:
      return state;
  }
};

export default TestRequestReducer;
