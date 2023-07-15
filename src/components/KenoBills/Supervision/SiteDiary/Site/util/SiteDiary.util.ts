import { ApiCallState } from "../../../../../../redux/Utils";

import { Project } from "../../../../../../redux/Project/Project.type";
import { SiteDiary } from "../../../../../../redux/SiteDiary/SiteDiary.type";
import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { authHeader } from "../../../../../../utilities/utilities";

export type SiteDiaryPropType = {
  site_diary: ApiCallState<SiteDiary[]>;
  project: ApiCallState<Project>;
  fetchSiteDiaries: Function;
  fetchUsers: Function;
  fetchMaterial: Function;
};

export type PeType = {
  position: string;
  no: number;
  description: string;
  noo: number;
  material: string;
  quantity: number;
  unit: string;
};

export type ActivityType = {
  activity: string;
  quantity: number;
  unit: string;
  location: string;
};

export type NonWorkingType = { value: string };

export type DelayType = { value: string };

// export type MaterialOnSiteType = {
//   material: string;
//   quantity: number;
//   unit: string;
// };

export type MeetingAndSignificanceType = { value: string };

export type ConstructionChangeDirectiveType = { value: string };

export type GivenInstructionType = { value: string };

export type RequestToContractorsType = { value: string };

export const InitialPEData: PeType[] = [
  {
    position: "Project Manager",
    no: 1,
    description: "",
    noo: 0,
    material: "",
    quantity: 0,
    unit: "",
  },
  {
    position: "Office Engineer",
    no: 1,
    description: "",
    noo: 0,
    material: "",
    quantity: 0,
    unit: "",
  },
  {
    position: "Site Engineer",
    no: 1,
    description: "",
    noo: 0,
    material: "",
    quantity: 0,
    unit: "",
  },
  {
    position: "General Foreman",
    no: 1,
    description: "",
    noo: 0,
    material: "",
    quantity: 0,
    unit: "",
  },
  {
    position: "Casher",
    no: 1,
    description: "",
    noo: 0,
    material: "",
    quantity: 0,
    unit: "",
  },
  {
    position: "Project Administration",
    no: 1,
    description: "",
    noo: 0,
    material: "",
    quantity: 0,
    unit: "",
  },
  {
    position: "Time & Store Keeper",
    no: 1,
    description: "",
    noo: 0,
    material: "",
    quantity: 0,
    unit: "",
  },
];

export const formatFieldName = (field_name: string) => {
  return field_name
    .split("_")
    .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");
};

export const updateSiteDiary = (data: any) =>
  axios.put(API_BASE_URI + "/site-diary", data, authHeader());

export const deleteSiteDiary = (id: number) =>
  axios.delete(API_BASE_URI + `/site-diary/${id}`, authHeader());

export const pendingSiteDiary = (id: number) =>
  axios.put(API_BASE_URI + `/site-diary/pending`, { id }, authHeader());
