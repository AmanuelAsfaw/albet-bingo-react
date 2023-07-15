import { ProjectBoardTaskStateTypes, ProjectBoardTaskActionTypes } from "./ProjectBoardTask.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: ProjectBoardTaskStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchLoggedIn: resetApiCallState({}),
  fetchFeature: resetApiCallState([]),
};

const ProjectBoardTaskReducer = (
  state: ProjectBoardTaskStateTypes = INITIAL_STATE,
  action: any
): ProjectBoardTaskStateTypes => {
  switch (action.type) {
    case ProjectBoardTaskActionTypes.FETCH_ALL_PROJECT_BOARD_TASK:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectBoardTaskActionTypes.FETCH_ALL_PROJECT_BOARD_TASK_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectBoardTaskActionTypes.FETCH_ALL_PROJECT_BOARD_TASK_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectBoardTaskActionTypes.FETCH_ALL_PROJECT_BOARD_TASK_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectBoardTaskActionTypes.FETCH_ONE_PROJECT_BOARD_TASK:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectBoardTaskActionTypes.FETCH_ONE_PROJECT_BOARD_TASK_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState({}),
      };
    case ProjectBoardTaskActionTypes.FETCH_ONE_PROJECT_BOARD_TASK_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectBoardTaskActionTypes.FETCH_ONE_PROJECT_BOARD_TASK_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectBoardTaskActionTypes.FETCH_LOGGED_IN_PROJECT_BOARD_TASK:
      return {
        ...state,
        fetchLoggedIn: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectBoardTaskActionTypes.FETCH_LOGGED_IN_PROJECT_BOARD_TASK_RESET:
      return {
        ...state,
        fetchLoggedIn: resetApiCallState({}),
      };
    case ProjectBoardTaskActionTypes.FETCH_LOGGED_IN_PROJECT_BOARD_TASK_FAILURE:
      return {
        ...state,
        fetchLoggedIn: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectBoardTaskActionTypes.FETCH_LOGGED_IN_PROJECT_BOARD_TASK_SUCCESS:
      return {
        ...state,
        fetchLoggedIn: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case ProjectBoardTaskActionTypes.FETCH_FEATURE_PROJECT_BOARD_TASK:
      return {
        ...state,
        fetchFeature: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectBoardTaskActionTypes.FETCH_FEATURE_PROJECT_BOARD_TASK_RESET:
      return {
        ...state,
        fetchFeature: resetApiCallState([]),
      };
    case ProjectBoardTaskActionTypes.FETCH_FEATURE_PROJECT_BOARD_TASK_FAILURE:
      return {
        ...state,
        fetchFeature: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectBoardTaskActionTypes.FETCH_FEATURE_PROJECT_BOARD_TASK_SUCCESS:
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

export default ProjectBoardTaskReducer;
