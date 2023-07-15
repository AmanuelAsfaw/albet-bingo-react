import { InspectionForm } from "../../../../../../redux/InspectionForm/InspectionForm.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type ViewInspectionFormPropType = {
  id: number;
  name: string;
  fetchOneInspectionForm: Function;
  fetchOneInspectionFormReset: Function;
  fetchOne: ApiCallState<InspectionForm>;
};
