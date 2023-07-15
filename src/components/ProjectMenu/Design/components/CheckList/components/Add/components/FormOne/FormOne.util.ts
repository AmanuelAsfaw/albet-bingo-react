import { Project } from "../../../../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../../../redux/Utils";

export type FormOnePropType = {
  module: string;
  dataAction: any;
  submitAction: any;
  resetAction: any;
  next: Function;
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  fetchAllUser: Function;
};
