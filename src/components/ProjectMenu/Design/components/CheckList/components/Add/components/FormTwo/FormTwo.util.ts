import { CheckListForm } from "../../../../../../../../../redux/CheckListForm/CheckListForm.type";
import { User } from "../../../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../../../redux/Utils";

export type FormTwoPropType = {
  module: string;
  dataAction: any;
  submitAction: any;
  resetAction: any;
  sendData: Function;
  fetchOneCheckListForm: Function;
  users: ApiCallState<User[]>;
  checkListForm: ApiCallState<CheckListForm>;
  structuralCheckListForms: ApiCallState<CheckListForm[]>;
  architecturalCheckListForms: ApiCallState<CheckListForm[]>;
  plumbingCheckListForms: ApiCallState<CheckListForm[]>;
  mechanicalCheckListForms: ApiCallState<CheckListForm[]>;
  electricalCheckListForms: ApiCallState<CheckListForm[]>;
  fireFightingCheckListForms: ApiCallState<CheckListForm[]>;
  specialSystemCheckListForms: ApiCallState<CheckListForm[]>;
  sanitaryCheckListForms: ApiCallState<CheckListForm[]>;
};
