import axios from "axios";

import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { Material } from "../../../../../../../redux/Material/Material.type";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { SiteDiary } from "../../../../../../../redux/SiteDiary/SiteDiary.type";
import { User } from "../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

import { authHeader } from "../../../../../../../utilities/utilities";

export const addSiteDiary = (data: any) =>
  axios.post(API_BASE_URI + "/site-diary", data, authHeader());

export type AddSiteDiaryPropType = {
  material: ApiCallState<Material[]>;
  site_diary: ApiCallState<SiteDiary[]>;
  users: ApiCallState<User[]>;
  project: ApiCallState<Project>;
  fetchSiteDiary: Function;
  index: number;
};
