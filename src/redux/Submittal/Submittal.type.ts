import { Document } from "../Document/Document.type";
import { ShareSubmittal } from "../ShareSubmittal/ShareSubmittal.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type Submittal = {
  id: number | null;
  project_id: number;
  date: string;
  reference_no: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploaded_by: number;
  share_submittals:ShareSubmittal[];
  submittal_items: SubmittalItem[];
  shared_users: number[];
};

export type SubmittalItem = {
  id: number;
  submittal_id: number;
  ref: number | null;
  date: string;
  submittal_item_remarks: SubmittalItemRemark[];
  action: string;
  action_by: number;
  submittal_action_by: User;
  document: Document;
  approval: number;
  cc: User[];
};

export type SubmittalItemRemark = {
  user: User;
  remark: string;
  date: Date;
  document: Document;
};

export type SubmittalStateTypes = {
  fetchAll: ApiCallState<Submittal[]>;
  fetchOne: ApiCallState<Submittal | {}>;
};

export const SubmittalActionTypes = {
  FETCH_ALL_SUBMITTAL: "FETCH_ALL_SUBMITTAL",
  FETCH_ALL_SUBMITTAL_RESET: "FETCH_ALL_SUBMITTAL_RESET",
  FETCH_ALL_SUBMITTAL_FAILURE: "FETCH_ALL_SUBMITTAL_FAILURE",
  FETCH_ALL_SUBMITTAL_SUCCESS: "FETCH_ALL_SUBMITTAL_SUCCESS",

  FETCH_ONE_SUBMITTAL: "FETCH_ONE_SUBMITTAL",
  FETCH_ONE_SUBMITTAL_RESET: "FETCH_ONE_SUBMITTAL_RESET",
  FETCH_ONE_SUBMITTAL_FAILURE: "FETCH_ONE_SUBMITTAL_FAILURE",
  FETCH_ONE_SUBMITTAL_SUCCESS: "FETCH_ONE_SUBMITTAL_SUCCESS",
};
