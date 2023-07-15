import { ApiCallState } from "../Utils";

export const MaterialActions = {
  FETCH_MATERIAL: "FETCH_MATERIAL",
  FETCH_MATERIAL_SUCCESS: "FETCH_MATERIAL_SUCCESS",
  FETCH_MATERIAL_ERROR: "FETCH_MATERIAL_ERROR",
};

export type Material = {
  id: any;
  item_category: string;
  sub_category: string;
  description: string;
  unit: string;
};

export type MaterialStateTypes = {
  fetchAll: ApiCallState<Material[]>;
};
