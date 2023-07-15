import { Project } from "../../../../redux/Project/Project.type";
import { TaskReport } from "../../../../redux/Task/Task.type";
import { ApiCallState } from "../../../../redux/Utils";

export type DashboardProp = {
  fetchTaskReport: Function;
  task_report: ApiCallState<TaskReport | null>;
  projects: ApiCallState<Project[]>;
  fetchProjects: Function;
};

export type CardsProp = {
  task_report: ApiCallState<TaskReport | null>;
};

export type CompletionStatusProp = {
  task_report: ApiCallState<TaskReport | null>;
};

export type CompletionOverTimeProp = {
  task_report: ApiCallState<TaskReport | null>;
};
