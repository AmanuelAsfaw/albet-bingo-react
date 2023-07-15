import { Project } from "../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../redux/Utils";

export type RootCheckListPropType = {
  module: string;
  project: ApiCallState<Project>;
};
