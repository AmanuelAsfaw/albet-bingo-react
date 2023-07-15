import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type KlingMaterialApproval = {
  id: number;
  project_id: number;
  deliver_order_no: string;
  is_approval: boolean;
  is_selection: boolean;
  is_shop: boolean;
  is_others: boolean;
  submitted_by: string;
  kling_ma_submittal_information: KlingMASubmittalInformation;
  kling_ma_consultant_response: KlingMAConsultantResponse;
  kling_ma_comment: KlingMAComment;
  kling_ma_client_response: KlingMAClientResponse;
  share_material_approvals: ShareMaterialApprovalType[];
  request_type: string;
  reference_no: string;
  createdAt: Date;
  updatedAt: Date;
  kling_material_approval_remarks: KlingMaterialApprovalRemark[],
  users: {
    id: number;
    user_kma: {
      id: number;
      user_id: number;
      kling_material_approval_id: number;
      last_seen: string;
    };
  }[];
};

export type KlingMaterialApprovalRemark = {
  id: number | null;
  kling_material_approval_id: number | null;
  date: string;
  remarked_by: number;
  remark: string;
  createdAt: string;
  document: Document;
};

export type ShareMaterialApprovalType = {
  id: number;
  kling_material_approval_id: number;
  user_id: number;
  remark: string;
  createdAt: string;
};

export type KlingMAClientResponse = {
  id: number;
  comment: string;
  date: string;
  kling_material_approval_id: number;
  submitted_response_by_client: string;
  createdAt: Date;
  updatedAt: Date;
};
export type KlingMASubmittalInformation = {
  id: number;
  kling_material_approval_id: number;
  submission_date: string;
  issue_no: string;
  spec_division: string;
  section: string;
  no_pages: number;
  description: string;
  amount: number;
  unit: string;
  document: Document;
  kling_ma_submittal_information_items: KlingMASubmittalInformationItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type KlingMASubmittalInformationItem = {
  id: number;
  kling_ma_submittal_information_id: number;
  is_checked: boolean;
  description: string;
  document: Document;
  createdAt: Date;
  updatedAt: Date;
};

export type KlingMAConsultantResponse = {
  id: number;
  kling_material_approval_id: number;
  is_approved_as: boolean;
  is_approved_comments: boolean;
  is_resubmit: boolean;
  is_rejected: boolean;
  is_ignored: boolean;
  submitted_response_by: string;
  comment: string;
  kling_ma_consultant_response_items: KlingMAConsultantResponseItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type KlingMAConsultantResponseItem = {
  id: number;
  kling_ma_consultant_response_id: number;
  description: string;
  yes: boolean;
  no: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type KlingMAComment = {
  id: number;
  kling_material_approval_id: number;
  comment: string;
  commented_by: string;
  is_forwarded_to_expert: boolean;
  is_miss_document: boolean;
  quality_wise: string;
  cost_wise: string;
  installation_wise: string;
  recommendation: string;
  reviewed_by: string;
  is_forwarded_to_consultant: boolean;
  is_likely_not_to_be: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type KlingMaterialApprovalStateTypes = {
  fetchAll: ApiCallState<KlingMaterialApproval[]>;
  fetchOne: ApiCallState<KlingMaterialApproval | {}>;
};

export const KlingMaterialApprovalActionTypes = {
  FETCH_ALL_KLING_MATERIAL_APPROVAL: "FETCH_ALL_KLING_MATERIAL_APPROVAL",
  FETCH_ALL_KLING_MATERIAL_APPROVAL_RESET:
    "FETCH_ALL_KLING_MATERIAL_APPROVAL_RESET",
  FETCH_ALL_KLING_MATERIAL_APPROVAL_FAILURE:
    "FETCH_ALL_KLING_MATERIAL_APPROVAL_FAILURE",
  FETCH_ALL_KLING_MATERIAL_APPROVAL_SUCCESS:
    "FETCH_ALL_KLING_MATERIAL_APPROVAL_SUCCESS",

  FETCH_ONE_KLING_MATERIAL_APPROVAL: "FETCH_ONE_KLING_MATERIAL_APPROVAL",
  FETCH_ONE_KLING_MATERIAL_APPROVAL_RESET:
    "FETCH_ONE_KLING_MATERIAL_APPROVAL_RESET",
  FETCH_ONE_KLING_MATERIAL_APPROVAL_FAILURE:
    "FETCH_ONE_KLING_MATERIAL_APPROVAL_FAILURE",
  FETCH_ONE_KLING_MATERIAL_APPROVAL_SUCCESS:
    "FETCH_ONE_KLING_MATERIAL_APPROVAL_SUCCESS",
};
