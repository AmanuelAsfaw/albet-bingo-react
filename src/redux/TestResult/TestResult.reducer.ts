import { TestResultStateTypes, TestResultActionTypes } from "./TestResult.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: TestResultStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState(null),
};

const TestResultReducer = (
  state: TestResultStateTypes = INITIAL_STATE,
  action: any
): TestResultStateTypes => {
  switch (action.type) {
    /**
    |--------------------------------------------------
    | FETCH ALL
    |--------------------------------------------------
    */
    case TestResultActionTypes.FETCH_ALL_TEST_RESULT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TestResultActionTypes.FETCH_ALL_TEST_RESULT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TestResultActionTypes.FETCH_ALL_TEST_RESULT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TestResultActionTypes.FETCH_ALL_TEST_RESULT_SUCCESS:
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
    case TestResultActionTypes.FETCH_ONE_TEST_RESULT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: null,
          isPending: true,
          isSuccessful: false,
        },
      };
    case TestResultActionTypes.FETCH_ONE_TEST_RESULT_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState(null),
      };
    case TestResultActionTypes.FETCH_ONE_TEST_RESULT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: null,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TestResultActionTypes.FETCH_ONE_TEST_RESULT_SUCCESS:
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

export default TestResultReducer;
