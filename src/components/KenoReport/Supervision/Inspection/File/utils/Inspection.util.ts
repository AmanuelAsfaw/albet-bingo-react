import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Document } from "../../../../../../redux/Document/Document.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { ShareInspection } from "../../../../../../redux/ShareInspection/ShareInspection.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type InspectionFilePropType = {
  documents: ApiCallState<Document[]>;
  fetchDocuments: Function;
  project: ApiCallState<Project>;
  fetchUsers: Function;
};

export type AddInspectionFilePropType = {
  fetchDocuments: Function;
  project: ApiCallState<Project>;
};

export type ShareInspectionPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  document_id: number;
  fetchAllShareInspection: Function;
  share_inspection: ApiCallState<ShareInspection[]>;
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

export const sendShareData = (data: any) =>
  axios.post(`${API_BASE_URI}/share-inspection`, data);

export const deleteShareData = (id: number) =>
  axios.delete(`${API_BASE_URI}/share-inspection/${id}`);
