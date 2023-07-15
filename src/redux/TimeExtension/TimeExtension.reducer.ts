import { InitPagedData } from "./../Utils";
import {
  TimeExtensionStateTypes,
  TimeExtensionActionTypes,
} from "./TimeExtension.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: TimeExtensionStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const TimeExtensionReducer = (
  state: TimeExtensionStateTypes = INITIAL_STATE,
  action: any
): TimeExtensionStateTypes => {
  switch (action.type) {
    case TimeExtensionActionTypes.FETCH_ALL_TIME_EXTENSION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TimeExtensionActionTypes.FETCH_ALL_TIME_EXTENSION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TimeExtensionActionTypes.FETCH_ALL_TIME_EXTENSION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TimeExtensionActionTypes.FETCH_ALL_TIME_EXTENSION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case TimeExtensionActionTypes.FETCH_PAGED_TIME_EXTENSION:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case TimeExtensionActionTypes.FETCH_PAGED_TIME_EXTENSION_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case TimeExtensionActionTypes.FETCH_PAGED_TIME_EXTENSION_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TimeExtensionActionTypes.FETCH_PAGED_TIME_EXTENSION_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case TimeExtensionActionTypes.FETCH_ONE_TIME_EXTENSION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case TimeExtensionActionTypes.FETCH_ONE_TIME_EXTENSION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TimeExtensionActionTypes.FETCH_ONE_TIME_EXTENSION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TimeExtensionActionTypes.FETCH_ONE_TIME_EXTENSION_SUCCESS:
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

export default TimeExtensionReducer;
