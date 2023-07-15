import { Document } from "../Document/Document.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type MaterialRequestApproval = {
  id: number;
  type: string;
  project_id: number;
  date: string;
  ref: number;
  description: string;
  trade_no: string;
  manufacturer: string;
  country_of_origin: string;
  contract_specific_detail: string;
  discipline: string;
  local_area_of_use: string;
  technical_detail: string;
  prepared_by: number;
  approved_by: number;
  approved: boolean;
  rejected: boolean;
  approved_with_comment: boolean;
  revise_and_submit: boolean;
  response_date: Date;
  comment: string;
  user_id: number;
  material_attachment: MaterialAttachment;
  resubmitted: MaterialRequestApproval;
  material_approval_prepared_by: User;
  material_approval_approved_by: User;
};

export type MaterialAttachment = {
  sample_submitted: boolean;
  original_brochure: number | null;
  other: number | null;
  original_brochure_file: Document | null;
  other_file: Document | null;
};

export type MaterialRequestApprovalStateTypes = {
  fetchAll: ApiCallState<MaterialRequestApproval[]>;
  fetchOne: ApiCallState<MaterialRequestApproval | {}>;
};

export const MaterialRequestApprovalActionTypes = {
  FETCH_ALL_MATERIAL_REQUEST_APPROVAL: "FETCH_ALL_MATERIAL_REQUEST_APPROVAL",
  FETCH_ALL_MATERIAL_REQUEST_APPROVAL_RESET:
    "FETCH_ALL_MATERIAL_REQUEST_APPROVAL_RESET",
  FETCH_ALL_MATERIAL_REQUEST_APPROVAL_FAILURE:
    "FETCH_ALL_MATERIAL_REQUEST_APPROVAL_FAILURE",
  FETCH_ALL_MATERIAL_REQUEST_APPROVAL_SUCCESS:
    "FETCH_ALL_MATERIAL_REQUEST_APPROVAL_SUCCESS",

  FETCH_ONE_MATERIAL_REQUEST_APPROVAL: "FETCH_ONE_MATERIAL_REQUEST_APPROVAL",
  FETCH_ONE_MATERIAL_REQUEST_APPROVAL_RESET:
    "FETCH_ONE_MATERIAL_REQUEST_APPROVAL_RESET",
  FETCH_ONE_MATERIAL_REQUEST_APPROVAL_FAILURE:
    "FETCH_ONE_MATERIAL_REQUEST_APPROVAL_FAILURE",
  FETCH_ONE_MATERIAL_REQUEST_APPROVAL_SUCCESS:
    "FETCH_ONE_MATERIAL_REQUEST_APPROVAL_SUCCESS",
};
