import { DataStateTypes, DataActionTypes } from "./Data.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: DataStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: DataStateTypes = INITIAL_STATE,
  action: any
): DataStateTypes => {
  switch (action.type) {
    case DataActionTypes.FETCH_ALL_DATA:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case DataActionTypes.FETCH_ALL_DATA_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case DataActionTypes.FETCH_ALL_DATA_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case DataActionTypes.FETCH_ALL_DATA_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case DataActionTypes.FETCH_ONE_DATA:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case DataActionTypes.FETCH_ONE_DATA_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case DataActionTypes.FETCH_ONE_DATA_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case DataActionTypes.FETCH_ONE_DATA_SUCCESS:
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

export default DataReducer;
