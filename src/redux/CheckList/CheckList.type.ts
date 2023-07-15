import { User } from "../User/User.type";
import { Project } from "../Project/Project.type";
import { ApiCallState } from "../Utils";
import { ChecklistRemark } from "../ChecklistRemark/ChecklistRemark.type";

export type CheckList = {
  id: number;
  user_id: number;
  project_id: number;

  designed_by_id: number;
  reviewed_by_id: number;
  approved_by_id: number;

  name: string;
  description: string;
  module: string;

  project_number: string;
  date: string;
  remark: string;
  reviewer_remark: string;
  approver_remark: string;

  is_reviewed: boolean;
  is_approved: boolean;

  user: User;
  project: Project;
  designed_by: User;
  reviewed_by: User;
  approved_by: User;
  check_list_items: CheckListItem[];
  checklist_remarks: ChecklistRemark[];
  users: {
    id: number;
    "user_checklist": {
      id: number;
      user_id: number;
      task_id: number;
      last_seen: string;
    };
  }[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type CheckListItem = {
  id: number;
  check_list_id: number;
  parent_id: number;

  description: string;
  is_subtitle: boolean;
  is_numbered: boolean;
  value: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type CheckListStateTypes = {
  fetchOne: ApiCallState<CheckList | {}>;

  fetchAllStructural: ApiCallState<CheckList[]>;
  fetchAllArchitecture: ApiCallState<CheckList[]>;
  fetchAllPlumbing: ApiCallState<CheckList[]>;
  fetchAllMechanical: ApiCallState<CheckList[]>;
  fetchAllElectrical: ApiCallState<CheckList[]>;
  fetchAllFireFighting: ApiCallState<CheckList[]>;
  fetchAllSpecialSystem: ApiCallState<CheckList[]>;
  fetchAllSanitary: ApiCallState<CheckList[]>;
};

export const CheckListActionTypes = {
  FETCH_ALL_STRUCTURAL_CHECK_LIST: "FETCH_ALL_STRUCTURAL_CHECK_LIST",
  FETCH_ALL_STRUCTURAL_CHECK_LIST_RESET:
    "FETCH_ALL_STRUCTURAL_CHECK_LIST_RESET",
  FETCH_ALL_STRUCTURAL_CHECK_LIST_FAILURE:
    "FETCH_ALL_STRUCTURAL_CHECK_LIST_FAILURE",
  FETCH_ALL_STRUCTURAL_CHECK_LIST_SUCCESS:
    "FETCH_ALL_STRUCTURAL_CHECK_LIST_SUCCESS",

  FETCH_ALL_ARCHITECTURE_CHECK_LIST: "FETCH_ALL_ARCHITECTURE_CHECK_LIST",
  FETCH_ALL_ARCHITECTURE_CHECK_LIST_RESET:
    "FETCH_ALL_ARCHITECTURE_CHECK_LIST_RESET",
  FETCH_ALL_ARCHITECTURE_CHECK_LIST_FAILURE:
    "FETCH_ALL_ARCHITECTURE_CHECK_LIST_FAILURE",
  FETCH_ALL_ARCHITECTURE_CHECK_LIST_SUCCESS:
    "FETCH_ALL_ARCHITECTURE_CHECK_LIST_SUCCESS",

  FETCH_ALL_PLUMBING_CHECK_LIST: "FETCH_ALL_PLUMBING_CHECK_LIST",
  FETCH_ALL_PLUMBING_CHECK_LIST_RESET: "FETCH_ALL_PLUMBING_CHECK_LIST_RESET",
  FETCH_ALL_PLUMBING_CHECK_LIST_FAILURE:
    "FETCH_ALL_PLUMBING_CHECK_LIST_FAILURE",
  FETCH_ALL_PLUMBING_CHECK_LIST_SUCCESS:
    "FETCH_ALL_PLUMBING_CHECK_LIST_SUCCESS",

  FETCH_ALL_MECHANICAL_CHECK_LIST: "FETCH_ALL_MECHANICAL_CHECK_LIST",
  FETCH_ALL_MECHANICAL_CHECK_LIST_RESET:
    "FETCH_ALL_MECHANICAL_CHECK_LIST_RESET",
  FETCH_ALL_MECHANICAL_CHECK_LIST_FAILURE:
    "FETCH_ALL_MECHANICAL_CHECK_LIST_FAILURE",
  FETCH_ALL_MECHANICAL_CHECK_LIST_SUCCESS:
    "FETCH_ALL_MECHANICAL_CHECK_LIST_SUCCESS",

  FETCH_ALL_ELECTRICAL_CHECK_LIST: "FETCH_ALL_ELECTRICAL_CHECK_LIST",
  FETCH_ALL_ELECTRICAL_CHECK_LIST_RESET:
    "FETCH_ALL_ELECTRICAL_CHECK_LIST_RESET",
  FETCH_ALL_ELECTRICAL_CHECK_LIST_FAILURE:
    "FETCH_ALL_ELECTRICAL_CHECK_LIST_FAILURE",
  FETCH_ALL_ELECTRICAL_CHECK_LIST_SUCCESS:
    "FETCH_ALL_ELECTRICAL_CHECK_LIST_SUCCESS",

  FETCH_ALL_FIRE_FIGHTING_CHECK_LIST: "FETCH_ALL_FIRE_FIGHTING_CHECK_LIST",
  FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_RESET:
    "FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_RESET",
  FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FAILURE:
    "FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FAILURE",
  FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_SUCCESS:
    "FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_SUCCESS",

  FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST: "FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST",
  FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_RESET:
    "FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_RESET",
  FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FAILURE:
    "FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FAILURE",
  FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_SUCCESS:
    "FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_SUCCESS",

  FETCH_ALL_SANITARY_CHECK_LIST: "FETCH_ALL_SANITARY_CHECK_LIST",
  FETCH_ALL_SANITARY_CHECK_LIST_RESET: "FETCH_ALL_SANITARY_CHECK_LIST_RESET",
  FETCH_ALL_SANITARY_CHECK_LIST_FAILURE:
    "FETCH_ALL_SANITARY_CHECK_LIST_FAILURE",
  FETCH_ALL_SANITARY_CHECK_LIST_SUCCESS:
    "FETCH_ALL_SANITARY_CHECK_LIST_SUCCESS",

  FETCH_ONE_CHECK_LIST: "FETCH_ONE_CHECK_LIST",
  FETCH_ONE_CHECK_LIST_RESET: "FETCH_ONE_CHECK_LIST_RESET",
  FETCH_ONE_CHECK_LIST_FAILURE: "FETCH_ONE_CHECK_LIST_FAILURE",
  FETCH_ONE_CHECK_LIST_SUCCESS: "FETCH_ONE_CHECK_LIST_SUCCESS",
};
