import {
  TaskCategoryStateTypes,
  TaskCategoryActionTypes,
} from "./TaskCategory.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: TaskCategoryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchAllForm: resetApiCallState([]),
  fetchAllDetailed: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const TaskCategoryReducer = (
  state: TaskCategoryStateTypes = INITIAL_STATE,
  action: any
): TaskCategoryStateTypes => {
  switch (action.type) {
    case TaskCategoryActionTypes.FETCH_ALL_TASK_CATEGORY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TaskCategoryActionTypes.FETCH_ALL_TASK_CATEGORY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TaskCategoryActionTypes.FETCH_ALL_TASK_CATEGORY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TaskCategoryActionTypes.FETCH_ALL_TASK_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    // -----------------------------

    case TaskCategoryActionTypes.FETCH_ALL_FORM_TASK_CATEGORY:
      return {
        ...state,
        fetchAllForm: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TaskCategoryActionTypes.FETCH_ALL_FORM_TASK_CATEGORY_RESET:
      return {
        ...state,
        fetchAllForm: resetApiCallState([]),
      };
    case TaskCategoryActionTypes.FETCH_ALL_FORM_TASK_CATEGORY_FAILURE:
      return {
        ...state,
        fetchAllForm: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TaskCategoryActionTypes.FETCH_ALL_FORM_TASK_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchAllForm: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    // -----------------------------

    case TaskCategoryActionTypes.FETCH_ALL_DETAILED_TASK_CATEGORY:
      return {
        ...state,
        fetchAllDetailed: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TaskCategoryActionTypes.FETCH_ALL_DETAILED_TASK_CATEGORY_RESET:
      return {
        ...state,
        fetchAllDetailed: resetApiCallState([]),
      };
    case TaskCategoryActionTypes.FETCH_ALL_DETAILED_TASK_CATEGORY_FAILURE:
      return {
        ...state,
        fetchAllDetailed: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TaskCategoryActionTypes.FETCH_ALL_DETAILED_TASK_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchAllDetailed: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    // -----------------------------

    case TaskCategoryActionTypes.FETCH_ONE_TASK_CATEGORY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case TaskCategoryActionTypes.FETCH_ONE_TASK_CATEGORY_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case TaskCategoryActionTypes.FETCH_ONE_TASK_CATEGORY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TaskCategoryActionTypes.FETCH_ONE_TASK_CATEGORY_SUCCESS:
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

export default TaskCategoryReducer;
