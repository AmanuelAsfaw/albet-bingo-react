import { BoardProjectStateTypes, BoardProjectActionTypes } from "./BoardProject.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: BoardProjectStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchLoggedIn: resetApiCallState({}),
  fetchFeature: resetApiCallState([]),
};

const BoardProjectReducer = (
  state: BoardProjectStateTypes = INITIAL_STATE,
  action: any
): BoardProjectStateTypes => {
  switch (action.type) {
    case BoardProjectActionTypes.FETCH_ALL_BOARD_PROJECT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case BoardProjectActionTypes.FETCH_ALL_BOARD_PROJECT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case BoardProjectActionTypes.FETCH_ALL_BOARD_PROJECT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case BoardProjectActionTypes.FETCH_ALL_BOARD_PROJECT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case BoardProjectActionTypes.FETCH_ONE_BOARD_PROJECT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case BoardProjectActionTypes.FETCH_ONE_BOARD_PROJECT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState({}),
      };
    case BoardProjectActionTypes.FETCH_ONE_BOARD_PROJECT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case BoardProjectActionTypes.FETCH_ONE_BOARD_PROJECT_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case BoardProjectActionTypes.FETCH_LOGGED_IN_BOARD_PROJECT:
      return {
        ...state,
        fetchLoggedIn: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case BoardProjectActionTypes.FETCH_LOGGED_IN_BOARD_PROJECT_RESET:
      return {
        ...state,
        fetchLoggedIn: resetApiCallState({}),
      };
    case BoardProjectActionTypes.FETCH_LOGGED_IN_BOARD_PROJECT_FAILURE:
      return {
        ...state,
        fetchLoggedIn: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case BoardProjectActionTypes.FETCH_LOGGED_IN_BOARD_PROJECT_SUCCESS:
      return {
        ...state,
        fetchLoggedIn: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case BoardProjectActionTypes.FETCH_FEATURE_BOARD_PROJECT:
      return {
        ...state,
        fetchFeature: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case BoardProjectActionTypes.FETCH_FEATURE_BOARD_PROJECT_RESET:
      return {
        ...state,
        fetchFeature: resetApiCallState([]),
      };
    case BoardProjectActionTypes.FETCH_FEATURE_BOARD_PROJECT_FAILURE:
      return {
        ...state,
        fetchFeature: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case BoardProjectActionTypes.FETCH_FEATURE_BOARD_PROJECT_SUCCESS:
      return {
        ...state,
        fetchFeature: {
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

export default BoardProjectReducer;
