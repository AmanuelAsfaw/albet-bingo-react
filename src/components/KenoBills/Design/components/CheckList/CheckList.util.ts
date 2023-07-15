import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { CheckList } from "../../../../../redux/CheckList/CheckList.type";
import { Project } from "../../../../../redux/Project/Project.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type CheckListPropType = {
  module: string;
  fetchAllStructuralCheckList: Function;
  fetchAllArchitectureCheckList: Function;
  fetchAllPlumbingCheckList: Function;
  fetchAllMechanicalCheckList: Function;
  fetchAllElectricalCheckList: Function;
  fetchAllFireFightingCheckList: Function;
  fetchAllSpecialSystemCheckList: Function;
  fetchAllSanitaryCheckList: Function;
  structuralCheckLists: ApiCallState<CheckList[]>;
  architectureCheckLists: ApiCallState<CheckList[]>;
  plumbingCheckLists: ApiCallState<CheckList[]>;
  mechanicalCheckLists: ApiCallState<CheckList[]>;
  electricalCheckLists: ApiCallState<CheckList[]>;
  fireFightingCheckLists: ApiCallState<CheckList[]>;
  specialSystemCheckLists: ApiCallState<CheckList[]>;
  sanitaryCheckLists: ApiCallState<CheckList[]>;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  project: ApiCallState<Project>;
};

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/checklist/${id}`);
