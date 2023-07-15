import { Project } from "../../../../../../redux/Project/Project.type";
import { MaterialRequest } from "../../../../../../redux/MaterialRequest/MaterialRequest.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type DetailMaterialRequestPropType = {
  project: ApiCallState<Project>;
  material_request: MaterialRequest;
  index: number;
};
