import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Document } from "../../../../../../redux/Document/Document.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type MaterialApprovalFilePropType = {
  fetchDocuments: Function;
  documents: ApiCallState<Document[]>;
  project: ApiCallState<Project>;
  fetchUsers: Function;
};

export type AddMaterialApprovalFilePropType = {
  fetchDocuments: Function;
  project: ApiCallState<Project>;
};

export type AddMaterialApprovalFileSharePropType = {
  fetchDocuments: Function;
  document: Document;
  users: ApiCallState<User[]>;
  project: ApiCallState<Project>;
  setDocuments: Function;
  documents: ApiCallState<Document[]>;
};

export const DELETE = (id: number) =>
  axios.delete(API_BASE_URI + "/document/" + id);

export const POST = (data: any) =>
  axios.post(API_BASE_URI + "/document", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const PUT = (payload: any) =>
  axios.put(API_BASE_URI + "/document", payload);
