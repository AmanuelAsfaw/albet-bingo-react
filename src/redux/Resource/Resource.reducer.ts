import { ResourceStateTypes, ResourceActionTypes } from "./Resource.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ResourceStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ResourceReducer = (
  state: ResourceStateTypes = INITIAL_STATE,
  action: any
): ResourceStateTypes => {
  switch (action.type) {
    case ResourceActionTypes.FETCH_ALL_RESOURCE:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ResourceActionTypes.FETCH_ALL_RESOURCE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ResourceActionTypes.FETCH_ALL_RESOURCE_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ResourceActionTypes.FETCH_ALL_RESOURCE_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ResourceActionTypes.FETCH_ONE_RESOURCE:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ResourceActionTypes.FETCH_ONE_RESOURCE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ResourceActionTypes.FETCH_ONE_RESOURCE_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ResourceActionTypes.FETCH_ONE_RESOURCE_SUCCESS:
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

export default ResourceReducer;
