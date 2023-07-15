import { RiskLogStateTypes, RiskLogActionTypes } from "./RiskLog.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: RiskLogStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const RiskLogReducer = (
  state: RiskLogStateTypes = INITIAL_STATE,
  action: any
): RiskLogStateTypes => {
  switch (action.type) {
    case RiskLogActionTypes.FETCH_ALL_RISK_LOG:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case RiskLogActionTypes.FETCH_ALL_RISK_LOG_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RiskLogActionTypes.FETCH_ALL_RISK_LOG_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RiskLogActionTypes.FETCH_ALL_RISK_LOG_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case RiskLogActionTypes.FETCH_ONE_RISK_LOG:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case RiskLogActionTypes.FETCH_ONE_RISK_LOG_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RiskLogActionTypes.FETCH_ONE_RISK_LOG_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RiskLogActionTypes.FETCH_ONE_RISK_LOG_SUCCESS:
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

export default RiskLogReducer;
