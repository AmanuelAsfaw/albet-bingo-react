import axios from "axios";
import { Message, NotificationType } from "../../../constants/Constants";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { Document } from "../../../redux/Document/Document.type";
import { Project } from "../../../redux/Project/Project.type";
import { ApiCallState } from "../../../redux/Utils";
import { OpenNotification } from "../../common/Notification/Notification.component";

export type DocumentPropType = {
  documents: ApiCallState<Document[]>;
  project: ApiCallState<Project[]>;
  fetchDocument: Function;
  fetchProjects: Function;
};

export const Download = (id: any) =>
  axios.get(API_BASE_URI + `/document/download/${id}`, {
    responseType: "blob",
  });

export const Delete = (id: any) =>
  axios.delete(API_BASE_URI + `/document/${id}`);

export const DownloadFile = (documents: Document|undefined) => {
  if( documents)
  Download(documents.id)
    .then((response) => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // IE variant
        window.navigator.msSaveOrOpenBlob(
          new Blob([response.data], {
            type: response.headers["content-type"],
          }),
          documents.name
        );
      } else {
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["content-type"],
          })
        );
        const link = document.createElement("a");
        link.href = url;

        link.setAttribute(
          "download",
          documents.url
            ?.split("-")
            ?.filter((e, index) => index > 0)
            ?.join("-")
        );
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
      }
    })
    .catch((error) => {});
};
