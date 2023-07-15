import { InitPagedData } from "./../Utils";
import {
  DesignChangeLogStateTypes,
  DesignChangeLogActionTypes,
} from "./DesignChangeLog.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: DesignChangeLogStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const DesignChangeLogReducer = (
  state: DesignChangeLogStateTypes = INITIAL_STATE,
  action: any
): DesignChangeLogStateTypes => {
  switch (action.type) {
    case DesignChangeLogActionTypes.FETCH_ALL_DESIGN_CHANGE_LOG:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case DesignChangeLogActionTypes.FETCH_ALL_DESIGN_CHANGE_LOG_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case DesignChangeLogActionTypes.FETCH_ALL_DESIGN_CHANGE_LOG_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case DesignChangeLogActionTypes.FETCH_ALL_DESIGN_CHANGE_LOG_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case DesignChangeLogActionTypes.FETCH_PAGED_DESIGN_CHANGE_LOG:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case DesignChangeLogActionTypes.FETCH_PAGED_DESIGN_CHANGE_LOG_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case DesignChangeLogActionTypes.FETCH_PAGED_DESIGN_CHANGE_LOG_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case DesignChangeLogActionTypes.FETCH_PAGED_DESIGN_CHANGE_LOG_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case DesignChangeLogActionTypes.FETCH_ONE_DESIGN_CHANGE_LOG:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case DesignChangeLogActionTypes.FETCH_ONE_DESIGN_CHANGE_LOG_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case DesignChangeLogActionTypes.FETCH_ONE_DESIGN_CHANGE_LOG_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case DesignChangeLogActionTypes.FETCH_ONE_DESIGN_CHANGE_LOG_SUCCESS:
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

export default DesignChangeLogReducer;
