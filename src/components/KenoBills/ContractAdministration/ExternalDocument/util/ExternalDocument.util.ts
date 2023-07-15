import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { ExternalDocument } from "../../../../../redux/ExternalDocument/ExternalDocument.type";
import { Project } from "../../../../../redux/Project/Project.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type ExternalDocumentPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  external_document: ApiCallState<ExternalDocument[]>;
  fetchExternalDocument: Function;
};

export type AddExternalDocumentPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  fetchExternalDocument: Function;
};

export type StatusPropType = {
  expiry_date: string;
};

export type ShareExternalDocumentPropType = {
  fetchExternalDocument: Function;
  fetchAllUser: Function;
  users: ApiCallState<User[]>;
  external_document: ExternalDocument;
};


export const Types=[
  "type 1",
  "type 2",
]
export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/external-document", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/external-document/${id}`);


  export const PUT_STATUS = (data: any) =>
    axios.put(API_BASE_URI + "/external-document-status", data);

export const DELETE_STATUS = (id: number) =>
    axios.delete(API_BASE_URI + `/external-document-status/${id}`);

export const POST_STATUS = (data: any) =>
    axios.post(API_BASE_URI + "/external-document-status", data);
