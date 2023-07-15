import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type Variation= {
    id: number | null;
    date:string;
    request:string;
    type:string;
    description: string;
    user_id:number;
    document:Document;
    variation_statuses:VariationStatusTypes[];
};
export type VariationStatusTypes = {
  variation_id: number;
  type: "View" | "Check" | "Approve";
  status: number;
  assigned_by: number;
  user_id: number;
  id: number;
};

export type VariationStateTypes = {
  fetchAll: ApiCallState<Variation[]>;
  fetchOne: ApiCallState<Variation | {}>;
};

export const VariationActionTypes = {
  FETCH_ALL_VARIATION: "FETCH_ALL_VARIATION",
  FETCH_ALL_VARIATION_RESET: "FETCH_ALL_VARIATION_RESET",
  FETCH_ALL_VARIATION_FAILURE: "FETCH_ALL_VARIATION_FAILURE",
  FETCH_ALL_VARIATION_SUCCESS: "FETCH_ALL_VARIATION_SUCCESS",

  FETCH_ONE_VARIATION: "FETCH_ONE_VARIATION",
  FETCH_ONE_VARIATION_RESET: "FETCH_ONE_VARIATION_RESET",
  FETCH_ONE_VARIATION_FAILURE: "FETCH_ONE_VARIATION_FAILURE",
  FETCH_ONE_VARIATION_SUCCESS: "FETCH_ONE_VARIATION_SUCCESS",
};
