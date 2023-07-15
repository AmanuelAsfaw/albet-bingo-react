import { ApiCallState } from "../../../../../redux/Utils";

import { Project } from "../../../../../redux/Project/Project.type";
import { MaterialRequest } from "../../../../../redux/MaterialRequest/MaterialRequest.type";
import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { authHeader } from "../../../../../utilities/utilities";

export type MaterialRequestPropType = {
  material_request: ApiCallState<MaterialRequest[]>;
  project: ApiCallState<Project>;
  fetchMaterialRequests: Function;
  fetchUsers: Function;
  fetchMaterial: Function;
};

export type PeType = {
  key: number;
  description: string;
  unit_measurement: string;
  new_request: number;
  approved: number;
  total_quantity_received: number;
  total_quantity_remaining_on_site: number;
  total_quantity_remaining: number;
  remark: string;
};

export type ActivityType = {
  activity: string;
  quantity: number;
  unit: string;
  location: string;
};

export type NonWorkingType = { value: string };

export type DelayType = { value: string };

export type MaterialOnSiteType = {
  material: string;
  quantity: number;
  unit: string;
};

export type MeetingAndSignificanceType = { value: string };

export type ConstructionChangeDirectiveType = { value: string };

export type GivenInstructionType = { value: string };

export const InitialPEData: PeType[] = [
  {
    key: Date.now(),
    description: "",
    unit_measurement: "",
    new_request: 0,
    approved: 0,
    total_quantity_received: 0,
    total_quantity_remaining_on_site: 0,
    total_quantity_remaining: 0,
    remark: "",
  },
];

export const formatFieldName = (field_name: string) => {
  return field_name
    .split("_")
    .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");
};

export const updateMaterialRequest = (data: any) =>
  axios.put(API_BASE_URI + "/material-request", data, authHeader());

export const deleteMaterialRequest = (id: number) =>
  axios.delete(API_BASE_URI + `/material-request/${id}`, authHeader());

export const pendingMaterialRequest = (id: number) =>
  axios.put(API_BASE_URI + `/material-request/pending`, { id }, authHeader());
