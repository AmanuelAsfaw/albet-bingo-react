import { LogStateTypes, LogActionTypes } from "./Log.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: LogStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const LogReducer = (
  state: LogStateTypes = INITIAL_STATE,
  action: any
): LogStateTypes => {
  switch (action.type) {
    case LogActionTypes.FETCH_ALL_LOG:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case LogActionTypes.FETCH_ALL_LOG_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case LogActionTypes.FETCH_ALL_LOG_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case LogActionTypes.FETCH_ALL_LOG_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case LogActionTypes.FETCH_ONE_LOG:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case LogActionTypes.FETCH_ONE_LOG_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case LogActionTypes.FETCH_ONE_LOG_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case LogActionTypes.FETCH_ONE_LOG_SUCCESS:
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

export default LogReducer;
