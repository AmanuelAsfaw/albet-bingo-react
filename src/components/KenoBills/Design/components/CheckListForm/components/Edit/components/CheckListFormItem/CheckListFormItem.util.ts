import { CheckListForm } from "../../../../../../../../../redux/CheckListForm/CheckListForm.type";
import { ApiCallState } from "../../../../../../../../../redux/Utils";

export type CheckListFormItemPropType = {
  dataAction: any;
  expandedKeyAction: any;
  fetchOne: ApiCallState<CheckListForm>;
  loading: boolean;
};
