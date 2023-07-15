import { Material } from "../../../../../../../redux/Material/Material.type";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { SiteDiary } from "../../../../../../../redux/SiteDiary/SiteDiary.type";
import { User } from "../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type EditSiteDiaryPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  site_diary: SiteDiary;
  fetchSiteDiaries: Function;
  index: number;
  material: ApiCallState<Material[]>;
};
