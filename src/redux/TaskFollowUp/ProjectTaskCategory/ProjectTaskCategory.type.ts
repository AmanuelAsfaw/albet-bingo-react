import { ApiCallState, PagedData } from "../../Utils";

export type ProjectTaskCategory = {
  id?: number;
  project_id: number;
  description: string;
};

export type ProjectTaskCategoryStateTypes = {
  fetchAll: ApiCallState<ProjectTaskCategory[]>;
  fetchOne: ApiCallState<ProjectTaskCategory | {}>;
  fetchPaged: ApiCallState<PagedData<ProjectTaskCategory[]>>;
};

export const ProjectTaskCategoryActionTypes = {
  FETCH_ALL_PROJECT_TASK_CATEGORY: "FETCH_ALL_PROJECT_TASK_CATEGORY",
  FETCH_ALL_PROJECT_TASK_CATEGORY_RESET: "FETCH_ALL_PROJECT_TASK_CATEGORY_RESET",
  FETCH_ALL_PROJECT_TASK_CATEGORY_FAILURE: "FETCH_ALL_PROJECT_TASK_CATEGORY_FAILURE",
  FETCH_ALL_PROJECT_TASK_CATEGORY_SUCCESS: "FETCH_ALL_PROJECT_TASK_CATEGORY_SUCCESS",

  FETCH_PAGED_PROJECT_TASK_CATEGORY: "FETCH_PAGED_PROJECT_TASK_CATEGORY",
  FETCH_PAGED_PROJECT_TASK_CATEGORY_RESET: "FETCH_PAGED_PROJECT_TASK_CATEGORY_RESET",
  FETCH_PAGED_PROJECT_TASK_CATEGORY_FAILURE: "FETCH_PAGED_PROJECT_TASK_CATEGORY_FAILURE",
  FETCH_PAGED_PROJECT_TASK_CATEGORY_SUCCESS: "FETCH_PAGED_PROJECT_TASK_CATEGORY_SUCCESS",

  FETCH_ONE_PROJECT_TASK_CATEGORY: "FETCH_ONE_PROJECT_TASK_CATEGORY",
  FETCH_ONE_PROJECT_TASK_CATEGORY_RESET: "FETCH_ONE_PROJECT_TASK_CATEGORY_RESET",
  FETCH_ONE_PROJECT_TASK_CATEGORY_FAILURE: "FETCH_ONE_PROJECT_TASK_CATEGORY_FAILURE",
  FETCH_ONE_PROJECT_TASK_CATEGORY_SUCCESS: "FETCH_ONE_PROJECT_TASK_CATEGORY_SUCCESS",
};
