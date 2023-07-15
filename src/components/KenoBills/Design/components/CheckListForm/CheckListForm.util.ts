import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { CheckListForm } from "../../../../../redux/CheckListForm/CheckListForm.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type CheckListFormPropType = {
  module: string;
  structuralCheckListForms: ApiCallState<CheckListForm[]>;
  architecturalCheckListForms: ApiCallState<CheckListForm[]>;
  plumbingCheckListForms: ApiCallState<CheckListForm[]>;
  mechanicalCheckListForms: ApiCallState<CheckListForm[]>;
  electricalCheckListForms: ApiCallState<CheckListForm[]>;
  fireFightingCheckListForms: ApiCallState<CheckListForm[]>;
  specialSystemCheckListForms: ApiCallState<CheckListForm[]>;
  sanitaryCheckListForms: ApiCallState<CheckListForm[]>;
  fetchAllStructuralCheckListForm: Function;
  fetchAllArchitectureCheckListForm: Function;
  fetchAllPlumbingCheckListForm: Function;
  fetchAllMechanicalCheckListForm: Function;
  fetchAllElectricalCheckListForm: Function;
  fetchAllFireFightingCheckListForm: Function;
  fetchAllSpecialSystemCheckListForm: Function;
  fetchAllSanitaryCheckListForm: Function;
};

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/checklist-form/${id}`);
