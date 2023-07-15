import { Document } from "../Document/Document.type";
import { Project } from "../Project/Project.type";
import { TaskCategory } from "../TaskCategory/TaskCategory.type";
import { ApiCallState } from "../Utils";

export type Task = {
  id: number;

  user_id: number;
  project_id: number;
  task_category_id: number;
  document_id: number;

  description: string;

  assigned_to: number[];

  start_date: string;
  due_date: string;

  stage_updated_date?: string;

  priority: string;
  stage: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  project: Project;
  task_category: TaskCategory;
  document?: Document;
};

export type TaskReport = {
  total: number;
  completed: number;
  incomplete: number;
  overdue: number;
  completion_percentage: number;
  completion_over_time: {
    date: string;
    total: number;
    completed: number;
    remaining: number;
  }[];
};

export type TaskStateTypes = {
  fetchAll: ApiCallState<Task[]>;
  fetchAllForm: ApiCallState<Task[]>;
  fetchReport: ApiCallState<TaskReport | null>;
  fetchOne: ApiCallState<Task | {}>;
};

export const TaskActionTypes = {
  FETCH_ALL_TASK: "FETCH_ALL_TASK",
  FETCH_ALL_TASK_RESET: "FETCH_ALL_TASK_RESET",
  FETCH_ALL_TASK_FAILURE: "FETCH_ALL_TASK_FAILURE",
  FETCH_ALL_TASK_SUCCESS: "FETCH_ALL_TASK_SUCCESS",

  FETCH_ALL_FORM_TASK: "FETCH_ALL_FORM_TASK",
  FETCH_ALL_FORM_TASK_RESET: "FETCH_ALL_FORM_TASK_RESET",
  FETCH_ALL_FORM_TASK_FAILURE: "FETCH_ALL_FORM_TASK_FAILURE",
  FETCH_ALL_FORM_TASK_SUCCESS: "FETCH_ALL_FORM_TASK_SUCCESS",

  FETCH_TASK_REPORT: "FETCH_TASK_REPORT",
  FETCH_TASK_REPORT_RESET: "FETCH_TASK_REPORT_RESET",
  FETCH_TASK_REPORT_FAILURE: "FETCH_TASK_REPORT_FAILURE",
  FETCH_TASK_REPORT_SUCCESS: "FETCH_TASK_REPORT_SUCCESS",

  FETCH_ONE_TASK: "FETCH_ONE_TASK",
  FETCH_ONE_TASK_RESET: "FETCH_ONE_TASK_RESET",
  FETCH_ONE_TASK_FAILURE: "FETCH_ONE_TASK_FAILURE",
  FETCH_ONE_TASK_SUCCESS: "FETCH_ONE_TASK_SUCCESS",
};
