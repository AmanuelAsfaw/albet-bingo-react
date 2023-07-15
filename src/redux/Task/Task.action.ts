import { TaskActionTypes } from "./Task.type";

/**
 * Fetch All Task
 *
 * @param payload
 */
export const fetchAllTask = (payload?: any) => ({
  type: TaskActionTypes.FETCH_ALL_TASK,
  payload: payload,
});

/**
 * Reset Fetch Task State
 *
 * @param payload
 */
export const fetchAllReset = (payload?: any) => ({
  type: TaskActionTypes.FETCH_ALL_TASK_RESET,
  payload: payload,
});

/**
 * Fetch All Task
 *
 * @param payload
 */
export const fetchAllFormTask = (payload?: any) => ({
  type: TaskActionTypes.FETCH_ALL_FORM_TASK,
  payload: payload,
});

/**
 * Fetch All Task
 *
 * @param payload
 */
export const fetchTaskReport = (payload?: any) => ({
  type: TaskActionTypes.FETCH_TASK_REPORT,
  payload: payload,
});

/**
 * Fetch All Task
 *
 * @param payload
 */
export const fetchOneTask = (payload?: any) => ({
  type: TaskActionTypes.FETCH_ONE_TASK,
  payload: payload,
});

/**
 * Reset Fetch One Task State
 *
 * @param payload
 */
export const fetchAllOneReset = (payload?: any) => ({
  type: TaskActionTypes.FETCH_ONE_TASK_RESET,
  payload: payload,
});
