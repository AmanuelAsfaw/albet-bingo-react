import { ProjectStateTypes, ProjectActionTypes } from "./Project.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ProjectStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchAllPreContract: resetApiCallState([]),
  fetchOnePreContract: resetApiCallState({}),
  fetchList: resetApiCallState([]),
};

const ProjectReducer = (
  state: ProjectStateTypes = INITIAL_STATE,
  action: any
): ProjectStateTypes => {
  switch (action.type) {
    case ProjectActionTypes.FETCH_ALL_PROJECT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectActionTypes.FETCH_ALL_PROJECT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectActionTypes.FETCH_ALL_PROJECT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectActionTypes.FETCH_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectActionTypes.FETCH_ALL_PROJECT_LIST:
      return {
        ...state,
        fetchList: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectActionTypes.FETCH_ALL_PROJECT_LIST_RESET:
      return {
        ...state,
        fetchList: resetApiCallState([]),
      };
    case ProjectActionTypes.FETCH_ALL_PROJECT_LIST_FAILURE:
      return {
        ...state,
        fetchList: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectActionTypes.FETCH_ALL_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        fetchList: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectActionTypes.FETCH_ONE_PROJECT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: null,
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectActionTypes.FETCH_ONE_PROJECT_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case ProjectActionTypes.FETCH_ONE_PROJECT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: null,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectActionTypes.FETCH_ONE_PROJECT_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectActionTypes.FETCH_ALL_PRE_PROJECT:
      return {
        ...state,
        fetchAllPreContract: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectActionTypes.FETCH_ALL_PRE_PROJECT_RESET:
      return {
        ...state,
        fetchAllPreContract: resetApiCallState([]),
      };
    case ProjectActionTypes.FETCH_ALL_PRE_PROJECT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectActionTypes.FETCH_ALL_PRE_PROJECT_SUCCESS:
      return {
        ...state,
        fetchAllPreContract: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectActionTypes.FETCH_ONE_PRE_PROJECT:
      return {
        ...state,
        fetchOnePreContract: {
          error: null,
          payload: null,
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectActionTypes.FETCH_ONE_PRE_PROJECT_RESET:
      return {
        ...state,
        fetchOnePreContract: resetApiCallState({}),
      };
    case ProjectActionTypes.FETCH_ONE_PRE_PROJECT_FAILURE:
      return {
        ...state,
        fetchOnePreContract: {
          payload: null,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectActionTypes.FETCH_ONE_PRE_PROJECT_SUCCESS:
      return {
        ...state,
        fetchOnePreContract: {
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

export default ProjectReducer;
