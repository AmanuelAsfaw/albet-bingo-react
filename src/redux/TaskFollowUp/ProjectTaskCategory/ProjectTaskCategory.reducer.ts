import { InitPagedData } from "../../Utils";
import { ProjectTaskCategoryStateTypes, ProjectTaskCategoryActionTypes } from "./ProjectTaskCategory.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: ProjectTaskCategoryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const CategoryReducer = (
  state: ProjectTaskCategoryStateTypes = INITIAL_STATE,
  action: any
): ProjectTaskCategoryStateTypes => {
  switch (action.type) {
    case ProjectTaskCategoryActionTypes.FETCH_ALL_PROJECT_TASK_CATEGORY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectTaskCategoryActionTypes.FETCH_ALL_PROJECT_TASK_CATEGORY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectTaskCategoryActionTypes.FETCH_ALL_PROJECT_TASK_CATEGORY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectTaskCategoryActionTypes.FETCH_ALL_PROJECT_TASK_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case ProjectTaskCategoryActionTypes.FETCH_PAGED_PROJECT_TASK_CATEGORY:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectTaskCategoryActionTypes.FETCH_PAGED_PROJECT_TASK_CATEGORY_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case ProjectTaskCategoryActionTypes.FETCH_PAGED_PROJECT_TASK_CATEGORY_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectTaskCategoryActionTypes.FETCH_PAGED_PROJECT_TASK_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectTaskCategoryActionTypes.FETCH_ONE_PROJECT_TASK_CATEGORY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectTaskCategoryActionTypes.FETCH_ONE_PROJECT_TASK_CATEGORY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectTaskCategoryActionTypes.FETCH_ONE_PROJECT_TASK_CATEGORY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectTaskCategoryActionTypes.FETCH_ONE_PROJECT_TASK_CATEGORY_SUCCESS:
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

export default CategoryReducer;
