import { Project } from "../../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type ImportMaterialOnSitePropType = {
  setMaterialOnSite: Function;
  project: ApiCallState<Project>;
};
