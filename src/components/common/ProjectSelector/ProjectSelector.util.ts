import { Project } from "../../../redux/Project/Project.type";
import { ApiCallState } from "../../../redux/Utils";

export type ProjectSelectorPropType = {
  onChange: any;
  projects: ApiCallState<Project[]>;
  fetchProjects: Function;
  project_id: number | null;
};
