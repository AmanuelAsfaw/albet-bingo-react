import axios from "axios";
import { Project } from "../../../../redux/Project/Project.type";
import { Task } from "../../../../redux/Task/Task.type";
import { TaskCategory } from "../../../../redux/TaskCategory/TaskCategory.type";
import { ApiCallState } from "../../../../redux/Utils";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { groupBy } from "lodash";
import { User } from "../../../../redux/User/User.type";

export const DATE_FORMAT = "YYYY-MM-DD";
export const DUE_DATE_FORMAT = "YYYY-MM-DD HH:mm A";

export const TASK_START_DATE_FORMAT = "DD-MM-YYYY";
export const TASK_DUE_DATE_FORMAT = "DD-MM-YYYY HH:mm A";

export type TaskProp = {
  projects: ApiCallState<Project[]>;
  task_categories: ApiCallState<TaskCategory[]>;
  tasks: ApiCallState<Task[]>;
  fetchProjects: Function;
  fetchTaskCategories: Function;
  fetchTasks: Function;
  users: ApiCallState<User[]>;
  fetchUsers: Function;
};

export type AddTaskCategoryProp = {
  projects: ApiCallState<Project[]>;
  fetchProjects: Function;
  selected_project_id: number | null;
  fetchTableData: Function;
};

export type EditTaskCategoryProp = {
  data: TaskCategory;
  projects: ApiCallState<Project[]>;
  fetchProjects: Function;
  fetchTableData: Function;
};

export type AddTaskProp = {
  projects: ApiCallState<Project[]>;
  task_categories: ApiCallState<TaskCategory[]>;
  fetchProjects: Function;
  fetchTaskCategories: Function;
  selected_project_id: number | null;
  fetchTableData: Function;
  users: ApiCallState<User[]>;
  fetchUsers: Function;
};

export type EditTaskProp = {
  data: Task;
  projects: ApiCallState<Project[]>;
  task_categories: ApiCallState<TaskCategory[]>;
  fetchProjects: Function;
  fetchTaskCategories: Function;
  fetchTableData: Function;
  users: ApiCallState<User[]>;
  fetchUsers: Function;
};

export type ReportTaskProp = {
  data: Task;
  fetchTableData: Function;
  task: ApiCallState<Task>;
  fetchTask: Function;
  users: ApiCallState<User[]>;
  fetchUsers: Function;
};

export type ViewTaskProp = {
  data: Task;
  task: ApiCallState<Task>;
  fetchTask: Function;
  users: ApiCallState<User[]>;
  fetchUsers: Function;
};

export const parseTableData = (
  tasks: Task[],
  task_categories: TaskCategory[]
) => {
  let output: any[] = [];

  const grouped_tasks = groupBy(tasks, (task) => task.task_category_id);
  const task_category_keys = Object.keys(grouped_tasks).map((e) => Number(e));
  const solo_categories = task_categories.filter(
    (e) => !task_category_keys.includes(e.id)
  );

  task_category_keys.forEach((task_category_id) => {
    const task_category = task_categories.find(
      (e) => e.id === task_category_id
    );

    const category_tasks = tasks.filter(
      (e) => e.task_category_id === task_category_id
    );

    if (task_category) {
      output.push({
        ...task_category,
        type: "category",
      });

      category_tasks.forEach((e, idx) => {
        output.push({
          ...e,
          index: idx + 1,
          type: "task",
          percentage: 100 / (tasks.length + 1),
        });
      });
    } else {
      output.push({
        type: "category",
        id: null,
        description: "-",
      });

      category_tasks.forEach((e, idx) => {
        output.push({
          ...e,
          index: idx + 1,
          type: "task",
        });
      });
    }
  });

  solo_categories.forEach((task_category) => {
    output.push({
      ...task_category,
      type: "category",
    });
  });

  return output;
};

export const POST_TASK_CATEGORY = (data: any) =>
  axios.post(API_BASE_URI + `/task-category`, data);

export const PUT_TASK_CATEGORY = (data: any) =>
  axios.put(API_BASE_URI + `/task-category`, data);

export const DELETE_TASK_CATEGORY = (id: any) =>
  axios.delete(API_BASE_URI + `/task-category/${id}`);

export const POST_TASK = (data: any) =>
  axios.post(API_BASE_URI + `/task`, data);

export const PUT_TASK = (data: any) => axios.put(API_BASE_URI + `/task`, data);

export const PUT_TASK_STAGE = (data: any) =>
  axios.put(API_BASE_URI + `/task/stage`, data);

export const DELETE_TASK = (id: any) =>
  axios.delete(API_BASE_URI + `/task/${id}`);
