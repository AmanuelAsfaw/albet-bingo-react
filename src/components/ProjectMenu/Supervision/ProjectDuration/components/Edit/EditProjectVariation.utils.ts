import { ProjectDuration } from "../../../../../../redux/ProjectDuration/ProjectDuration.type";
import { ProjectVariation } from "../../../../../../redux/ProjectVariation/ProjectVariation.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type ProjectVariationType = {
  project_variation: ApiCallState<ProjectVariation>;
  fetchAll: Function;
  fetchOne: Function;
  id?: number;
};
