import { Project } from "../Project/Project.type";
import { ApiCallState } from "../Utils";

export type Media = {
  id: number;
  description: string;
  date: string;
  project_id: number;
  user_id: number;
  createdAt: any;
  updatedAt: any;
  Uploads: Uploads[];
};

export type MediaStateTypes = {
  fetchAll: ApiCallState<Media[]>;
};

export const MediaActionTypes = {
  FETCH_ALL_MEDIA: "FETCH_ALL_MEDIA",
  FETCH_ALL_MEDIA_RESET: "FETCH_ALL_MEDIA_RESET",
  FETCH_ALL_MEDIA_FAILURE: "FETCH_ALL_MEDIA_FAILURE",
  FETCH_ALL_MEDIA_SUCCESS: "FETCH_ALL_MEDIA_SUCCESS",
};

export type Uploads = {
  id: number;
  filename: string;
  media_id: number;
  createdAt: any;
  updatedAt: any;
};
