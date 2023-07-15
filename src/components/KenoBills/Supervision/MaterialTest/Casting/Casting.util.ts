import { Project } from "../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { Casting } from "../../../../../redux/Casting/Casting.type";
import axios from "axios";
import { authHeader } from "../../../../../utilities/utilities";
import { API_BASE_URI } from "../../../../../redux/ApiCall";

export type CastingPropType = {
  project: ApiCallState<Project>;
  fetchAllCastingData: ApiCallState<Casting[]>;
  fetchAllCasting: Function;
  fetchAllCastingReset: Function;
};

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/casting/${id}`, authHeader());

export const CastingDateStatus = {
  PENDING: "PENDING",
  TESTED: "TESTED",
  NO_CUBE: "NO CUBE",
};
