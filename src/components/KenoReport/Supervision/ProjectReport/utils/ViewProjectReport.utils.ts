import { ApiCallState } from "../../../../../redux/Utils";
import { Project } from "../../../../../redux/Project/Project.type";
import { ProjectVariation } from "../../../../../redux/ProjectVariation/ProjectVariation.type";
import { TimeExtension } from "../../../../../redux/TimeExtension/TimeExtension.type";
import { ProjectDuration } from "../../../../../redux/ProjectDuration/ProjectDuration.type";
import { Financial } from "../../../../../redux/Financial/Financial.type";

export type ViewProjectReportPropType = {
  project: Project;
  project_variation: ApiCallState<ProjectVariation[]>;
  fetchAllProjectVariation: Function;
  time_extension: ApiCallState<TimeExtension[]>;
  fetchAllTimeExtension: Function;
  project_duration: ApiCallState<ProjectDuration[]>;
  fetchAllProjectDuration: Function;
  financial: ApiCallState<Financial[]>;
  fetchAllFinancial: Function;
};
