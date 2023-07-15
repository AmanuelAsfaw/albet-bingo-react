import { CheckListForm } from "../../../../../../../../../redux/CheckListForm/CheckListForm.type";
import { ApiCallState } from "../../../../../../../../../redux/Utils";

export type CheckListItemPropType = {
  dataAction: any;
  expandedAction: any;
  checkListForm: ApiCallState<CheckListForm>;
};
