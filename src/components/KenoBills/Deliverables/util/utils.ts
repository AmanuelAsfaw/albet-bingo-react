import { ApiCallState } from "../../../../redux/Utils";
import { Project } from "../../../../redux/Project/Project.type";

export type DeliverablesComponentPropType = {
  project: ApiCallState<Project>
};
