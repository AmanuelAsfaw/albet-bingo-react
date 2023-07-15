import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Project } from "../../../../../redux/Project/Project.type";
import { ShareSiteHandover } from "../../../../../redux/ShareSiteHandover/ShareSiteHandover.type";
import { SiteHandover } from "../../../../../redux/SiteHandover/SiteHandover.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type SiteHandoverPropType = {
  project: ApiCallState<Project>;
  site_handovers: ApiCallState<SiteHandover[]>;
  fetchSiteHandovers: Function;
  fetchUser: Function;
  users: ApiCallState<User[]>;
};

export type AddSiteHandOverPropType = {
  project: ApiCallState<Project>;
  fetchSiteHandovers: Function;
};

export type EditSiteHandOverPropType = {
  project: ApiCallState<Project>;
  site_handover: SiteHandover;
  fetchSiteHandovers: Function;
};

export type ShareSiteHandoverPropType = {
  site_handover_id: number;
  project: Project;
  share_site_handover: ApiCallState<ShareSiteHandover[]>;
  fetchAllShareSiteHandovers: Function;
  users: User[];
};

export type DetailSiteHandOverPropType = {
  site_handover: SiteHandover;
};

export type PrintSiteHandOverPropType = {
  visibilityAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
  project: ApiCallState<Project>;
};
export const sendData = (data: any) =>
  axios.post(`${API_BASE_URI}/site-handover`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const editData = (data: any) =>
  axios.put(`${API_BASE_URI}/site-handover`, data);

export const deleteData = (id: number) =>
  axios.delete(`${API_BASE_URI}/site-handover/${id}`);

export const sendShareData = (data: any) =>
  axios.post(`${API_BASE_URI}/share-site-handover`, data);

export const deleteShareData = (id: number) =>
  axios.delete(`${API_BASE_URI}/share-site-handover/${id}`);
