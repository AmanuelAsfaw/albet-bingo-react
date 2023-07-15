import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { MaterialRequestApproval } from "../../../../../../redux/MaterialRequestApproval/MaterialRequestApproval.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type MaterialApprovalPropType = {
  material_request_approval: ApiCallState<MaterialRequestApproval[]>;
  fetchMaterialApprovalRequest: Function;
  project: ApiCallState<Project>;
  fetchUsers: Function;
  fetchUser: Function;
};

export type PrintRequestPropType = {
  is_visible: boolean;
  setVisibility: Function;
  material_request_approval: MaterialRequestApproval;
  project: ApiCallState<Project>;
  material_request_approvals: ApiCallState<MaterialRequestApproval[]>;
  setSelected: Function;
};

export type AddRequestPropType = {
  material_request_approval: ApiCallState<MaterialRequestApproval[]>;
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  user: ApiCallState<User>;
  fetchMaterialApprovalRequest: Function;
};

export type DetailRequestPropType = {
  material_request_approval: ApiCallState<MaterialRequestApproval>;
  id: number;
  fetchMaterialApprovalRequest: Function;
  fetchMaterialApprovalRequests: Function;
  user: ApiCallState<User>;
  project: ApiCallState<Project>;
  material_request_approvals: ApiCallState<MaterialRequestApproval[]>;
};

export type AttachmentPropType = {
  id: number;
  description: string;
  checked: boolean;
  file: any;
};

export const getApprovalValue = (
  material_request_approval: MaterialRequestApproval
) => {
  if (isDone(material_request_approval)) {
    if (material_request_approval.approved) return 1;
    if (material_request_approval.approved_with_comment) return 2;
    if (material_request_approval.revise_and_submit) return 3;
    else if (material_request_approval.rejected) return 4;
  } else {
    return null;
  }
};

export const parseApprovalValue = (approval_value: number) => {
  switch (approval_value) {
    case 1:
      return { approved: true };
    case 2:
      return { approved_with_comment: true };
    case 3:
      return { revise_and_submit: true };
    case 4:
      return { rejected: true };
    default:
      return null;
  }
};

export const isDone = (material_request_approval: MaterialRequestApproval) => {
  return (
    material_request_approval.approved ||
    material_request_approval.approved_with_comment ||
    material_request_approval.revise_and_submit ||
    material_request_approval.rejected
  );
};

export type StatusPropType = {
  material_request_approval: MaterialRequestApproval;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/material_request_approval", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateData = (data: any) =>
  axios.put(API_BASE_URI + "/material_request_approval", data);

export const validateAttachment = (attachments: AttachmentPropType[]) => {
  let result: { message: string[]; is_valid: boolean } = {
    message: [],
    is_valid: true,
  };

  attachments.forEach((e) => {
    if (e.id !== 1) {
      if (e.checked && !e.file) result.message.push("file missing");
    }
  });
  return result;
};

export const DELETE = (id: number) =>
  axios.delete(API_BASE_URI + "/material_request_approval/" + id);
