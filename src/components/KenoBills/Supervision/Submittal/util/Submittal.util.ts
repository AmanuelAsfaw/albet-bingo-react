import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Project } from "../../../../../redux/Project/Project.type";
import { ShareSubmittal } from "../../../../../redux/ShareSubmittal/ShareSubmittal.type";
import {
  Submittal,
  SubmittalItem,
} from "../../../../../redux/Submittal/Submittal.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { zeroPad } from "../../../../../utilities/utilities";

export type SubmittalPropType = {
  fetchAllSubmittal: Function;
  project: ApiCallState<Project>;
  submittals: ApiCallState<Submittal[]>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
};

export type ShareSubmittalPropType = {
  project: ApiCallState<Project>;
  submittal_id: number;
  users: ApiCallState<User[]>;
  share_submittal: ApiCallState<ShareSubmittal[]>;
  fetchAllShareSubmittal: Function;
};

export type PrintPropType = {
  submittal: SubmittalItem | null;
  submittals: ApiCallState<Submittal>;
  project: ApiCallState<Project>;
  is_visible: boolean;
  setVisibility: Function;
  type: string;
  setSelected: Function;
};

export type AddSubmittalPropType = {
  fetchSubmittal: Function;
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
};

export type AddSubmittalItemPropType = {
  fetchSubmittal: Function;
  submittal_id: number;
  submittal: Submittal;
  users: User[];
};

export type ApprovalPropType = {
  submittal_item: SubmittalItem;
  fetchSubmittal: Function;
};

export type RemarkPropType = {
  submittal_item: SubmittalItem;
  fetchSubmittal: Function;
};

export const sendSubmittalData = (data: any) =>
  axios.post(API_BASE_URI + "/submittal", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/submittal/${id}`);

export const Download = (id: any) =>
  axios.get(API_BASE_URI + `/submittal/download/${id}`, {
    responseType: "blob",
  });

export const DownloadFile = (documents: any) => {
  Download(documents.id)
    .then((response) => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // IE variant
        window.navigator.msSaveOrOpenBlob(
          new Blob([response.data], {
            type: response.headers["content-type"],
          }),
          documents.url?.split("-")[1]
        );
      } else {
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["content-type"],
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", documents.url?.split("-")[1]);
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
      }
    })
    .catch((error) => {
      // OpenNotification(
      //   NotificationType.ERROR,
      //   Message.DOCUMENT_DOWNLOAD_FAILED,
      //   ""
      // );
    });
};

export const PUT = (data: any) => axios.put(API_BASE_URI + "/submittal", data);
export const sendApproval = (data: any) =>
  axios.put(API_BASE_URI + "/submittal_item/approval", data);

export const sendRemark = (data: any) =>
  axios.post(API_BASE_URI + "/submittal_item_remark", data);

export const sendSubmittalItemData = (data: any) =>
  axios.post(API_BASE_URI + "/submittal_item", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getRefNumber = (name: string, id: any) =>
  `${name?.charAt(0)}${name?.charAt(1)}-${zeroPad(id)}`.toUpperCase();

export const sendShareData = (data: any) =>
  axios.post(`${API_BASE_URI}/share-submittal`, data);

export const deleteShareData = (id: number) =>
  axios.delete(`${API_BASE_URI}/share-submittal/${id}`);
