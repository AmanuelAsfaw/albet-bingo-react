import { TaskStateTypes, TaskActionTypes } from "./Task.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: TaskStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchAllForm: resetApiCallState([]),
  fetchReport: resetApiCallState({}),
  fetchOne: resetApiCallState({}),
};

const TaskReducer = (
  state: TaskStateTypes = INITIAL_STATE,
  action: any
): TaskStateTypes => {
  switch (action.type) {
    case TaskActionTypes.FETCH_ALL_TASK:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TaskActionTypes.FETCH_ALL_TASK_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TaskActionTypes.FETCH_ALL_TASK_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TaskActionTypes.FETCH_ALL_TASK_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    // -------------------------

    case TaskActionTypes.FETCH_ALL_FORM_TASK:
      return {
        ...state,
        fetchAllForm: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TaskActionTypes.FETCH_ALL_FORM_TASK_RESET:
      return {
        ...state,
        fetchAllForm: resetApiCallState([]),
      };
    case TaskActionTypes.FETCH_ALL_FORM_TASK_FAILURE:
      return {
        ...state,
        fetchAllForm: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TaskActionTypes.FETCH_ALL_FORM_TASK_SUCCESS:
      return {
        ...state,
        fetchAllForm: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    // -------------------------

    case TaskActionTypes.FETCH_TASK_REPORT:
      return {
        ...state,
        fetchReport: {
          error: null,
          payload: null,
          isPending: true,
          isSuccessful: false,
        },
      };
    case TaskActionTypes.FETCH_TASK_REPORT_RESET:
      return {
        ...state,
        fetchReport: resetApiCallState(null),
      };
    case TaskActionTypes.FETCH_TASK_REPORT_FAILURE:
      return {
        ...state,
        fetchReport: {
          payload: null,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TaskActionTypes.FETCH_TASK_REPORT_SUCCESS:
      return {
        ...state,
        fetchReport: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    // -------------------------

    case TaskActionTypes.FETCH_ONE_TASK:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case TaskActionTypes.FETCH_ONE_TASK_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case TaskActionTypes.FETCH_ONE_TASK_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TaskActionTypes.FETCH_ONE_TASK_SUCCESS:
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

export default TaskReducer;
