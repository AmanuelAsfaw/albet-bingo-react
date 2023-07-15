import {
  MaterialEvaluationStateTypes,
  MaterialEvaluationActionTypes,
} from "./MaterialEvaluation.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: MaterialEvaluationStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const MaterialEvaluationReducer = (
  state: MaterialEvaluationStateTypes = INITIAL_STATE,
  action: any
): MaterialEvaluationStateTypes => {
  switch (action.type) {
    case MaterialEvaluationActionTypes.FETCH_ALL_MATERIAL_EVALUATION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case MaterialEvaluationActionTypes.FETCH_ALL_MATERIAL_EVALUATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MaterialEvaluationActionTypes.FETCH_ALL_MATERIAL_EVALUATION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MaterialEvaluationActionTypes.FETCH_ALL_MATERIAL_EVALUATION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case MaterialEvaluationActionTypes.FETCH_ONE_MATERIAL_EVALUATION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case MaterialEvaluationActionTypes.FETCH_ONE_MATERIAL_EVALUATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MaterialEvaluationActionTypes.FETCH_ONE_MATERIAL_EVALUATION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MaterialEvaluationActionTypes.FETCH_ONE_MATERIAL_EVALUATION_SUCCESS:
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

export default MaterialEvaluationReducer;
