import {
  TestEvaluationStateTypes,
  TestEvaluationActionTypes,
} from "./TestEvaluation.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: TestEvaluationStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const TestEvaluationReducer = (
  state: TestEvaluationStateTypes = INITIAL_STATE,
  action: any
): TestEvaluationStateTypes => {
  switch (action.type) {
    case TestEvaluationActionTypes.FETCH_ALL_TEST_EVALUATION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TestEvaluationActionTypes.FETCH_ALL_TEST_EVALUATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TestEvaluationActionTypes.FETCH_ALL_TEST_EVALUATION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TestEvaluationActionTypes.FETCH_ALL_TEST_EVALUATION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case TestEvaluationActionTypes.FETCH_ONE_TEST_EVALUATION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case TestEvaluationActionTypes.FETCH_ONE_TEST_EVALUATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TestEvaluationActionTypes.FETCH_ONE_TEST_EVALUATION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TestEvaluationActionTypes.FETCH_ONE_TEST_EVALUATION_SUCCESS:
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

export default TestEvaluationReducer;
