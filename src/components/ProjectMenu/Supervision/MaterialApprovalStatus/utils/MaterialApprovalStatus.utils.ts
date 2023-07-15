import axios from "axios";
import { MaterialApprovalStatusReport } from "../../../../../redux/MaterialApprovalStatus/MaterialApprovalStatus.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { API_BASE_URI } from "../../../../../redux/ApiCall";

export type MaterialApprovalStatusPropType = {
  material_approval_status: ApiCallState<MaterialApprovalStatusReport[]>;
  fetchAll: Function;
};

export const sendMaterialApprovalStatus = (data: any) =>
  axios.post(API_BASE_URI + "/material_approval_status", data);

export const deleteMaterialApprovalStatus = (id: any) =>
  axios.delete(API_BASE_URI + `/material_approval_status/${id}`);
