import { ApiCallState } from "../Utils";

export const KeyPersonnelActions = {
  FETCH_KEY_PERSONNEL: "FETCH_KEY_PERSONNEL",
  FETCH_ONE_KEY_PERSONNEL: "FETCH_ONE_KEY_PERSONNEL",
  FETCH_KEY_PERSONNEL_SUCCESS: "FETCH_KEY_PERSONNEL_SUCCESS",
  FETCH_KEY_PERSONNEL_ERROR: "FETCH_KEY_PERSONNEL_ERROR",
  FETCH_ONE_KEY_PERSONNEL_SUCCESS: "FETCH_ONE_KEY_PERSONNEL_SUCCESS",
  FETCH_ONE_KEY_PERSONNEL_FAILURE: "FETCH_ONE_KEY_PERSONNEL_FAILURE",
  FETCH_ONE_KEY_PERSONNEL_ERROR: "FETCH_ONE_KEY_PERSONNEL_ERROR",
};

export type KeyPersonnel = {
  id: any;
  date: Date;
  name: string;
  project_id: number;
  key_personnel_statuses:KeyPersonnelStatusTypes[];
  qualification: string;
  qualification_document: any;
  construction_experience: number;
  construction_experience_document: any;
  years_of_experience: number;
  years_of_experience_document: any;
  pro_body_member: boolean;
  pro_body_member_document: any;
  certificate_award: string;
  certificate_award_documents: any[];
  request_date: Date;
  remark: string;
  createdAt: Date;
  updatedAt: Date;
};

export type KeyPersonnelStatusTypes = {
  id: number;
  key_personnel_id: number;
  assigned_by: number;
  user_id: number;
};

export type KeyPersonnelStateTypes = {
  fetchAll: ApiCallState<KeyPersonnel[]>;
  fetchOne: ApiCallState<KeyPersonnel>;
};
