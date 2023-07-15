import { ApiCallState } from "../../../../../redux/Utils";
import { Project } from "../../../../../redux/Project/Project.type";

export type ProjectReportPropType = {
  projects: ApiCallState<Project>;
  fetchOne: Function;
};
