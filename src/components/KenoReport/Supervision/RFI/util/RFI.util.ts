import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Project } from "../../../../../redux/Project/Project.type";
import { User } from "../../../../../redux/User/User.type";
import { RFI } from "../../../../../redux/RFI/RFI.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type RFIPropType = {
  project?: ApiCallState<Project>;
  rfi: ApiCallState<RFI[]>;
  fetchUsers: Function;
  fetchUser: Function;
  fetchRFIs: Function;
};

export type AddRFIPropType = {
  project: ApiCallState<Project>;
  user: ApiCallState<User>;
  users: ApiCallState<User[]>;
  rfi: ApiCallState<RFI[]>;
  fetchRFI: Function;
};

export type ViewRFIPropType = {
  project: ApiCallState<Project>;
  rfi: RFI;
  fetchRFI: Function;
};

export type PrintRFIPropType = {
  selected: RFI;
};

export const AddRFI = (data: any) => axios.post(API_BASE_URI + "/rfi", data);
export const SendRFIResponse = (data: any) =>
  axios.post(API_BASE_URI + "/rfi-response", data);

export const FormatRFINumber = (project: Project, no: number) => {
  const contractorInitials = project?.contractor
    ? project?.contractor?.name.split(" ").length > 0
      ? `${project?.contractor?.name
          .split(" ")[0]
          .charAt(0)}${project?.contractor?.name
          .split(" ")[1]
          .charAt(0)}`.toUpperCase()
      : project?.consultant?.name.slice(0, 2).toUpperCase()
    : "";
  const clientInitials = project?.client
    ? project?.client?.name.split(" ").length > 0
      ? `${project?.client?.name.split(" ")[0].charAt(0)}${project?.client?.name
          .split(" ")[1]
          .charAt(0)}`.toUpperCase()
      : project?.client?.name.slice(0, 2).toUpperCase()
    : "";

  return `${contractorInitials}/${clientInitials}/RFI/00${no}`;
};
