import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Media } from "../../../../../../redux/Media/Media.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type MediaPropType = {
  project: ApiCallState<Project>;
  media: ApiCallState<Media[]>;
  fetchMedia: Function;
};

export type AddMediaPropType = {
  project: ApiCallState<Project>;
  fetchMedia: Function;
};

export const AddMedia = (data: any) =>
  axios.post(API_BASE_URI + "/media", data, {
    onUploadProgress: function (progress) {
      console.log(Math.round((progress.loaded * 100) / progress.total));
    },
  });
