import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { FileStorage } from "../../../../../../../redux/FileStorage/FileStorage.type";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type EditUploadPropType = {
  project: ApiCallState<Project>;
  module: string;
  upload: FileStorage;
  fetchData: Function;
};

export const sendData = (data: any) =>
  axios.put(API_BASE_URI + "/file-storage", data);
