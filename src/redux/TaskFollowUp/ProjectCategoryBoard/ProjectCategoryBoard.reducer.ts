import { ProjectCategoryBoardStateTypes, ProjectCategoryBoardActionTypes } from "./ProjectCategoryBoard.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: ProjectCategoryBoardStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchLoggedIn: resetApiCallState({}),
  fetchFeature: resetApiCallState([]),
};

const StatusBoardReducer = (
  state: ProjectCategoryBoardStateTypes = INITIAL_STATE,
  action: any
): ProjectCategoryBoardStateTypes => {
  switch (action.type) {
    case ProjectCategoryBoardActionTypes.FETCH_ALL_PROJECT_CATEGORY_BOARD:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectCategoryBoardActionTypes.FETCH_ALL_PROJECT_CATEGORY_BOARD_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectCategoryBoardActionTypes.FETCH_ALL_PROJECT_CATEGORY_BOARD_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectCategoryBoardActionTypes.FETCH_ALL_PROJECT_CATEGORY_BOARD_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectCategoryBoardActionTypes.FETCH_ONE_PROJECT_CATEGORY_BOARD:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectCategoryBoardActionTypes.FETCH_ONE_PROJECT_CATEGORY_BOARD_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState({}),
      };
    case ProjectCategoryBoardActionTypes.FETCH_ONE_PROJECT_CATEGORY_BOARD_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectCategoryBoardActionTypes.FETCH_ONE_PROJECT_CATEGORY_BOARD_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectCategoryBoardActionTypes.FETCH_LOGGED_IN_PROJECT_CATEGORY_BOARD:
      return {
        ...state,
        fetchLoggedIn: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectCategoryBoardActionTypes.FETCH_LOGGED_IN_PROJECT_CATEGORY_BOARD_RESET:
      return {
        ...state,
        fetchLoggedIn: resetApiCallState({}),
      };
    case ProjectCategoryBoardActionTypes.FETCH_LOGGED_IN_PROJECT_CATEGORY_BOARD_FAILURE:
      return {
        ...state,
        fetchLoggedIn: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectCategoryBoardActionTypes.FETCH_LOGGED_IN_PROJECT_CATEGORY_BOARD_SUCCESS:
      return {
        ...state,
        fetchLoggedIn: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case ProjectCategoryBoardActionTypes.FETCH_FEATURE_PROJECT_CATEGORY_BOARD:
      return {
        ...state,
        fetchFeature: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectCategoryBoardActionTypes.FETCH_FEATURE_PROJECT_CATEGORY_BOARD_RESET:
      return {
        ...state,
        fetchFeature: resetApiCallState([]),
      };
    case ProjectCategoryBoardActionTypes.FETCH_FEATURE_PROJECT_CATEGORY_BOARD_FAILURE:
      return {
        ...state,
        fetchFeature: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectCategoryBoardActionTypes.FETCH_FEATURE_PROJECT_CATEGORY_BOARD_SUCCESS:
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
