import { Project } from "../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type AddProjectVariationPropType = {
  fetchAll: Function;
  fetchAllProject: Function;
  project: ApiCallState<Project[]>;
};
