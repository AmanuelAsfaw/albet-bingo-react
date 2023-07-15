import { InitPagedData } from "./../Utils";
import {
  ProjectDurationStateTypes,
  ProjectDurationActionTypes,
} from "./ProjectDuration.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ProjectDurationStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const ProjectDurationReducer = (
  state: ProjectDurationStateTypes = INITIAL_STATE,
  action: any
): ProjectDurationStateTypes => {
  switch (action.type) {
    case ProjectDurationActionTypes.FETCH_ALL_PROJECT_DURATION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectDurationActionTypes.FETCH_ALL_PROJECT_DURATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectDurationActionTypes.FETCH_ALL_PROJECT_DURATION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectDurationActionTypes.FETCH_ALL_PROJECT_DURATION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case ProjectDurationActionTypes.FETCH_PAGED_PROJECT_DURATION:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectDurationActionTypes.FETCH_PAGED_PROJECT_DURATION_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case ProjectDurationActionTypes.FETCH_PAGED_PROJECT_DURATION_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectDurationActionTypes.FETCH_PAGED_PROJECT_DURATION_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectDurationActionTypes.FETCH_ONE_PROJECT_DURATION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectDurationActionTypes.FETCH_ONE_PROJECT_DURATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectDurationActionTypes.FETCH_ONE_PROJECT_DURATION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectDurationActionTypes.FETCH_ONE_PROJECT_DURATION_SUCCESS:
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

export default ProjectDurationReducer;
