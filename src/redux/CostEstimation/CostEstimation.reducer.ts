import { CostEstimationStateTypes, CostEstimationActionTypes } from "./CostEstimation.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: CostEstimationStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const CostEstimationReducer = (
  state: CostEstimationStateTypes = INITIAL_STATE,
  action: any
): CostEstimationStateTypes => {
  switch (action.type) {
    case CostEstimationActionTypes.FETCH_ALL_COST_ESTIMATION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CostEstimationActionTypes.FETCH_ALL_COST_ESTIMATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case CostEstimationActionTypes.FETCH_ALL_COST_ESTIMATION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CostEstimationActionTypes.FETCH_ALL_COST_ESTIMATION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CostEstimationActionTypes.FETCH_ONE_COST_ESTIMATION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case CostEstimationActionTypes.FETCH_ONE_COST_ESTIMATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case CostEstimationActionTypes.FETCH_ONE_COST_ESTIMATION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CostEstimationActionTypes.FETCH_ONE_COST_ESTIMATION_SUCCESS:
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

export default CostEstimationReducer;
