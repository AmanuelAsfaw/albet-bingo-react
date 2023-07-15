import { Material } from "../../../../../../redux/Material/Material.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { MaterialRequest } from "../../../../../../redux/MaterialRequest/MaterialRequest.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type EditMaterialRequestPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  material_request: MaterialRequest;
  fetchMaterialRequest: Function;
  index: number;
  material: ApiCallState<Material[]>;
  material_requests: ApiCallState<MaterialRequest[]>;
};
