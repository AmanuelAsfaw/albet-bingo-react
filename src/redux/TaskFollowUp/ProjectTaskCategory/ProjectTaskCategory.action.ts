import { ProjectTaskCategoryActionTypes } from "./ProjectTaskCategory.type";

/**
 * Fetch All ProjectTaskCategory
 *
 * @param payload
 */
export const fetchAllProjectTaskCategory = (payload?: any) => ({
  type: ProjectTaskCategoryActionTypes.FETCH_ALL_PROJECT_TASK_CATEGORY,
  payload: payload,
});

/**
 * Fetch Paged Category
 *
 * @param payload
 */
export const fetchPagedProjectTaskCategory = (payload?: any) => ({
  type: ProjectTaskCategoryActionTypes.FETCH_PAGED_PROJECT_TASK_CATEGORY,
  payload: payload,
});

/**
 * Fetch All ProjectTaskCategory
 *
 * @param payload
 */
export const fetchOneProjectTaskCategory = (payload?: any) => ({
  type: ProjectTaskCategoryActionTypes.FETCH_ONE_PROJECT_TASK_CATEGORY,
  payload: payload,
});

/**
 * Reset Fetch ProjectTaskCategory State
 *
 * @param payload
 */
export const fetchAllProjectTaskCategoryReset = (payload?: any) => ({
  type: ProjectTaskCategoryActionTypes.FETCH_ALL_PROJECT_TASK_CATEGORY_RESET,
  payload: payload,
});
