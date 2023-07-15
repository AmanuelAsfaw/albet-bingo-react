import { Project } from "../../../../../../../redux/Project/Project.type";
import { SiteDiary } from "../../../../../../../redux/SiteDiary/SiteDiary.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type ViewSiteDiaryPropType = {
  project: ApiCallState<Project>;
  site_diary: SiteDiary;
  index: number;
};
