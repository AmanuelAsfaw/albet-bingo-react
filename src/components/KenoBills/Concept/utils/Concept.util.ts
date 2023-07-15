import axios from "axios";
import { ConceptPropsType } from "../../../../redux/Concept/Concept.type";
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

export type ConceptType = {
  date: Date;
  type: string;
  concept_type: string;
  description: string;
  file: FileType | string;
  project_id: number;
  uploaded_by: number;
  [key: string]: string | number | Date | FileType;
};

export type ConceptPropType = {
  concept: ApiCallState<ConceptPropsType[]>;
  fetchAll: Function;
  fetchOne?: Function;
  fetchUser: Function;
  users: any;
};

export const CreateConcept = (data: any) =>
  axios.post(API_BASE_URI + `/concept`, data);

export const DeleteConcept = (id: number) =>
  axios.delete(API_BASE_URI + `/concept/${id}`);
