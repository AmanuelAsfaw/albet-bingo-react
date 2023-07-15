import axios from "axios";

import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Material } from "../../../../../../redux/Material/Material.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { MaterialRequest } from "../../../../../../redux/MaterialRequest/MaterialRequest.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

import { authHeader } from "../../../../../../utilities/utilities";

export const addMaterialRequest = (data: any) =>
  axios.post(API_BASE_URI + "/material-request", data, authHeader());

export type AddMaterialRequestPropType = {
  material: ApiCallState<Material[]>;
  material_request: ApiCallState<MaterialRequest[]>;
  users: ApiCallState<User[]>;
  project: ApiCallState<Project>;
  fetchMaterialRequest: Function;
  index: number;
};
