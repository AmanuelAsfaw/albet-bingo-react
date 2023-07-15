import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { ApiCallState } from "../../../../../redux/Utils";
import { KeyPersonnel } from "../../../../../redux/KeyPersonnel/KeyPersonnel.type";
import axios from "axios";
import { authHeader } from "../../../../../utilities/utilities";
import { RcFile } from "antd/es/upload";
import { Project } from "../../../../../redux/Project/Project.type";
export type KeyPersonnelPropType = {
  key_personnel: ApiCallState<KeyPersonnel[]>;
  fetchKeyPersonnel: Function;
  project?: Project;
};

export type KeyPersonnelFormPropType = {
  fetchKeyPersonnel: Function;
  keyPersonnel?: KeyPersonnel;
  viewMode: "New" | "Edit" | "View";
  project?: Project;
};

export type KeyPersonnelFlat = {
  key: string;
  name: string;
  value: string | number | boolean | Date;
  fileUrl?: string | string[];
  file?: RcFile | RcFile[];
  fileType: "none" | "single" | "multiple"
  type: "string" | "number" | "boolean" | "date";

}

export const POST = (data: any) =>
  axios.post(
    `${API_BASE_URI}/key-personnel`,
    data,
    authHeader()
  );

export const DELETE = (id: number) =>
  axios.delete(
    `${API_BASE_URI}/key-personnel/${id}`,
    authHeader()
  );

export const PUT = (data: any) =>
  axios.put(`${API_BASE_URI}/key-personnel`, data, authHeader());

export const getFileName = (document?: any) => {
  let split = document?.url?.split("-");
  if (split && split[1]) {
    delete split[0];

    return split.join("-").slice(1, split.join("-").length);
  } else {
    return document?.filename ?? "";
  }
};

export const Download = (url: any) =>
  axios.get(API_BASE_URI + `/key-personnel/download-attachment/?url=${url}`, {
    responseType: "blob",
  });

export const DownloadFile = (_document?: any) => {
  Download(_document?.path)
    .then((response) => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // IE variant
        window.navigator.msSaveOrOpenBlob(
          new Blob([response.data], {
            type: response.headers["content-type"],
          }),
          _document?.filename
        );
      } else {
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["content-type"],
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.setAttribute("download", getFileName(_document));
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
      }
    })
    .catch((error) => {
      // OpenNotification(
      //   NotificationType.ERROR,
      //   Message.KEY_PERSONNEL_ATTACHMENT_DOWNLOAD_FAIL,
      //   ""
      // );
    });
};

export const DELETE_STATUS = (id: number) =>
  axios.delete(API_BASE_URI + `/key-personnel-status/${id}`);

export const POST_STATUS = (data: any) =>
  axios.post(API_BASE_URI + "/key-personnel-status", data);
