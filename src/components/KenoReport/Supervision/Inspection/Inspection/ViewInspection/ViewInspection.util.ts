import {
  InspectionForm,
  InspectionFormItem,
} from "../../../../../../redux/InspectionForm/InspectionForm.type";
import { ApiCallState } from "../../../../../../redux/Utils";

import {
  Inspection,
  InspectionItem,
} from "../../../../../../redux/Inspection/Inspection.type";
import { Project } from "../../../../../../redux/Project/Project.type";

export type ViewInspectionPropType = {
  inspection: Inspection;
  project: ApiCallState<Project>;
};
