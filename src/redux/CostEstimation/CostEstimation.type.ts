import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type CostEstimation= {
    id: number | null;
    date:string;
    ref_no:string;
    description: string;
    user_id:number;
    document:Document;
    cost_estimation_statuses:CostEstimationStatusTypes[];
};

export type CostEstimationStatusTypes = {
  contract_id: number;
  type: "View" | "Check" | "Approve";
  status: number;
  assigned_by: number;
  user_id: number;
  id: number;
};

export type CostEstimationStateTypes = {
  fetchAll: ApiCallState<CostEstimation[]>;
  fetchOne: ApiCallState<CostEstimation | {}>;
};

export const CostEstimationActionTypes = {
  FETCH_ALL_COST_ESTIMATION: "FETCH_ALL_COST_ESTIMATION",
  FETCH_ALL_COST_ESTIMATION_RESET: "FETCH_ALL_COST_ESTIMATION_RESET",
  FETCH_ALL_COST_ESTIMATION_FAILURE: "FETCH_ALL_COST_ESTIMATION_FAILURE",
  FETCH_ALL_COST_ESTIMATION_SUCCESS: "FETCH_ALL_COST_ESTIMATION_SUCCESS",

  FETCH_ONE_COST_ESTIMATION: "FETCH_ONE_COST_ESTIMATION",
  FETCH_ONE_COST_ESTIMATION_RESET: "FETCH_ONE_COST_ESTIMATION_RESET",
  FETCH_ONE_COST_ESTIMATION_FAILURE: "FETCH_ONE_COST_ESTIMATION_FAILURE",
  FETCH_ONE_COST_ESTIMATION_SUCCESS: "FETCH_ONE_COST_ESTIMATION_SUCCESS",
};
