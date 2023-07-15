import { Boq } from "../../../../redux/Boq/Boq.type";
import { Project } from "../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../redux/Utils";

export type BoqSelectorPropType = {
  project_id: number;
  required: boolean;
  fetchProject: Function;
  project: ApiCallState<Project>;
  boq: any;
  setBoq: Function;
};
export type BoqModalPropType = {
  boq: any;
  setBoq: Function;
  project: ApiCallState<Project>;
};
