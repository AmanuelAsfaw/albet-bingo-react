import { CheckListForm } from "../../../../../../../redux/CheckListForm/CheckListForm.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type ViewCheckListFormPropType = {
  data: CheckListForm;
  fetchOne: ApiCallState<CheckListForm>;
  fetchOneCheckListForm: Function;
};
