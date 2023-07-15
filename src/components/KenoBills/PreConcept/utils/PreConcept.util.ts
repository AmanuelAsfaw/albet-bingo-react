import axios from "axios";
import { PreConceptPropsType } from "../../../../redux/PreConcept/PreConcept.type";
import { ApiCallState } from "../../../../redux/Utils";
import { API_BASE_URI } from "../../../../redux/ApiCall";

export type FileType = {
  uid: string;
  lastModified: Date;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type UserType = {
  id: number;
  email: string;
  is_super_user: boolean;
  company: any;
  full_name: string;
  role: string;
};

export type PreConceptType = {
  date: Date;
  type: string;
  concept_type: string;
  description: string;
  file: FileType | string;
  uploaded_by: number;
  project_id: number;
  [key: string]: string | number | Date | FileType;
};

export type PreConceptPropType = {
  pre_concept: ApiCallState<PreConceptPropsType[]>;
  fetchAll: Function;
  fetchOne?: Function;
  fetchUser: Function;
  users: any;
};

export const CreatePreConcept = (data: any) =>
  axios.post(API_BASE_URI + `/concept`, data);

export const DeletePreConcept = (id: number) =>
  axios.delete(API_BASE_URI + `/concept/${id}`);
