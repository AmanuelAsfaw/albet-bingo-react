import { Project } from "../../../../redux/Project/Project.type";
import { TaskCategory } from "../../../../redux/TaskCategory/TaskCategory.type";
import { User } from "../../../../redux/User/User.type";
import { ApiCallState } from "../../../../redux/Utils";

export type BoardProp = {
  task_categories: ApiCallState<TaskCategory[]>;
  fetchTaskCategories: Function;
  users: ApiCallState<User[]>;
  fetchUsers: Function;
  projects: ApiCallState<Project[]>;
  fetchProjects: Function;
};
