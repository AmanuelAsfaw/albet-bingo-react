import { TaskCategoryActionTypes } from "./TaskCategory.type";

/**
 * Fetch All TaskCategory
 *
 * @param payload
 */
export const fetchAllTaskCategory = (payload?: any) => ({
  type: TaskCategoryActionTypes.FETCH_ALL_TASK_CATEGORY,
  payload: payload,
});

/**
 * Fetch All TaskCategory
 *
 * @param payload
 */
export const fetchAllFormTaskCategory = (payload?: any) => ({
  type: TaskCategoryActionTypes.FETCH_ALL_FORM_TASK_CATEGORY,
  payload: payload,
});

/**
 * Fetch All TaskCategory
 *
 * @param payload
 */
export const fetchAllDetailedTaskCategory = (payload?: any) => ({
  type: TaskCategoryActionTypes.FETCH_ALL_DETAILED_TASK_CATEGORY,
  payload: payload,
});

/**
 * Fetch All TaskCategory
 *
 * @param payload
 */
export const fetchOneTaskCategory = (payload?: any) => ({
  type: TaskCategoryActionTypes.FETCH_ONE_TASK_CATEGORY,
  payload: payload,
});

/**
 * Reset Fetch TaskCategory State
 *
 * @param payload
 */
export const fetchAllTaskCategoryReset = (payload?: any) => ({
  type: TaskCategoryActionTypes.FETCH_ALL_TASK_CATEGORY_RESET,
  payload: payload,
});

/**
 * Reset Fetch One TaskCategory State
 *
 * @param payload
 */
export const fetchOneTaskCategoryReset = (payload?: any) => ({
  type: TaskCategoryActionTypes.FETCH_ONE_TASK_CATEGORY_RESET,
  payload: payload,
});
