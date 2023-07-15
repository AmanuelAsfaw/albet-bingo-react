import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type AddUploadPropType = {
  project: ApiCallState<Project>;
  module: string;
  fetchData: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/file-storage", data);

export const UploadType = {
  FILE: "File",
  LINK: "Link",
};
