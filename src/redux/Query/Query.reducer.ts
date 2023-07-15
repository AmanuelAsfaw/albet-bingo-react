import { QueryStateTypes, QueryActionTypes } from "./Query.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: QueryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const QueryReducer = (
  state: QueryStateTypes = INITIAL_STATE,
  action: any
): QueryStateTypes => {
  switch (action.type) {
    case QueryActionTypes.FETCH_ALL_QUERY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case QueryActionTypes.FETCH_ALL_QUERY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case QueryActionTypes.FETCH_ALL_QUERY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case QueryActionTypes.FETCH_ALL_QUERY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case QueryActionTypes.FETCH_ONE_QUERY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case QueryActionTypes.FETCH_ONE_QUERY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case QueryActionTypes.FETCH_ONE_QUERY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case QueryActionTypes.FETCH_ONE_QUERY_SUCCESS:
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

export default QueryReducer;
