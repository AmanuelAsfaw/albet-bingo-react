import { InitPagedData } from "../Utils";
import {
  ProjectVariationStateTypes,
  ProjectVariationActionTypes,
} from "./ProjectVariation.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ProjectVariationStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const ProjectVariationReducer = (
  state: ProjectVariationStateTypes = INITIAL_STATE,
  action: any
): ProjectVariationStateTypes => {
  switch (action.type) {
    case ProjectVariationActionTypes.FETCH_ALL_PROJECT_VARIATION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectVariationActionTypes.FETCH_ALL_PROJECT_VARIATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectVariationActionTypes.FETCH_ALL_PROJECT_VARIATION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectVariationActionTypes.FETCH_ALL_PROJECT_VARIATION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case ProjectVariationActionTypes.FETCH_PAGED_PROJECT_VARIATION:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectVariationActionTypes.FETCH_PAGED_PROJECT_VARIATION_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case ProjectVariationActionTypes.FETCH_PAGED_PROJECT_VARIATION_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectVariationActionTypes.FETCH_PAGED_PROJECT_VARIATION_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectVariationActionTypes.FETCH_ONE_PROJECT_VARIATION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectVariationActionTypes.FETCH_ONE_PROJECT_VARIATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectVariationActionTypes.FETCH_ONE_PROJECT_VARIATION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectVariationActionTypes.FETCH_ONE_PROJECT_VARIATION_SUCCESS:
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

export default ProjectVariationReducer;
