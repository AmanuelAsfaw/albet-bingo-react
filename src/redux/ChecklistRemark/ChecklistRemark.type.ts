import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type ChecklistRemark= {
    id:number | null;
    check_list_id:number | null;
    date:string;
    remarked_by:number;
    document: Document;
    remark:string;
    createdAt:string;
};

export type ChecklistRemarkStateTypes = {
  fetchAll: ApiCallState<ChecklistRemark[]>;
  fetchOne: ApiCallState<ChecklistRemark | {}>;
};

export const ChecklistRemarkActionTypes = {
  FETCH_ALL_CHECKLIST_REMARK: "FETCH_ALL_CHECKLIST_REMARK",
  FETCH_ALL_CHECKLIST_REMARK_RESET: "FETCH_ALL_CHECKLIST_REMARK_RESET",
  FETCH_ALL_CHECKLIST_REMARK_FAILURE: "FETCH_ALL_CHECKLIST_REMARK_FAILURE",
  FETCH_ALL_CHECKLIST_REMARK_SUCCESS: "FETCH_ALL_CHECKLIST_REMARK_SUCCESS",

  FETCH_ONE_CHECKLIST_REMARK: "FETCH_ONE_CHECKLIST_REMARK",
  FETCH_ONE_CHECKLIST_REMARK_RESET: "FETCH_ONE_CHECKLIST_REMARK_RESET",
  FETCH_ONE_CHECKLIST_REMARK_FAILURE: "FETCH_ONE_CHECKLIST_REMARK_FAILURE",
  FETCH_ONE_CHECKLIST_REMARK_SUCCESS: "FETCH_ONE_CHECKLIST_REMARK_SUCCESS",
};
