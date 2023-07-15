import { StatusBoardStateTypes, StatusBoardActionTypes } from "./StatusBoard.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: StatusBoardStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchLoggedIn: resetApiCallState({}),
  fetchFeature: resetApiCallState([]),
};

const StatusBoardReducer = (
  state: StatusBoardStateTypes = INITIAL_STATE,
  action: any
): StatusBoardStateTypes => {
  switch (action.type) {
    case StatusBoardActionTypes.FETCH_ALL_STATUS_BOARD:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case StatusBoardActionTypes.FETCH_ALL_STATUS_BOARD_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case StatusBoardActionTypes.FETCH_ALL_STATUS_BOARD_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case StatusBoardActionTypes.FETCH_ALL_STATUS_BOARD_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case StatusBoardActionTypes.FETCH_ONE_STATUS_BOARD:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case StatusBoardActionTypes.FETCH_ONE_STATUS_BOARD_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState({}),
      };
    case StatusBoardActionTypes.FETCH_ONE_STATUS_BOARD_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case StatusBoardActionTypes.FETCH_ONE_STATUS_BOARD_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case StatusBoardActionTypes.FETCH_LOGGED_IN_STATUS_BOARD:
      return {
        ...state,
        fetchLoggedIn: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case StatusBoardActionTypes.FETCH_LOGGED_IN_STATUS_BOARD_RESET:
      return {
        ...state,
        fetchLoggedIn: resetApiCallState({}),
      };
    case StatusBoardActionTypes.FETCH_LOGGED_IN_STATUS_BOARD_FAILURE:
      return {
        ...state,
        fetchLoggedIn: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case StatusBoardActionTypes.FETCH_LOGGED_IN_STATUS_BOARD_SUCCESS:
      return {
        ...state,
        fetchLoggedIn: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case StatusBoardActionTypes.FETCH_FEATURE_STATUS_BOARD:
      return {
        ...state,
        fetchFeature: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case StatusBoardActionTypes.FETCH_FEATURE_STATUS_BOARD_RESET:
      return {
        ...state,
        fetchFeature: resetApiCallState([]),
      };
    case StatusBoardActionTypes.FETCH_FEATURE_STATUS_BOARD_FAILURE:
      return {
        ...state,
        fetchFeature: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case StatusBoardActionTypes.FETCH_FEATURE_STATUS_BOARD_SUCCESS:
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

export default StatusBoardReducer;
