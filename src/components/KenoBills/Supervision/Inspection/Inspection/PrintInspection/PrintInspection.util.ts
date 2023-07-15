import {
  Inspection,
  InspectionItem,
} from "../../../../../../redux/Inspection/Inspection.type";
import { InspectionFormItem } from "../../../../../../redux/InspectionForm/InspectionForm.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type PrintInspectionPropType = {
  inspection: Inspection | null;
  project: ApiCallState<Project>;
};

export const parseTableData = (
  inspection_items: InspectionItem[] | undefined,
  inspection_form_items: InspectionFormItem[] | undefined
) => {
  return undefined;
};
