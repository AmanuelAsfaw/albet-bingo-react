import { Variation } from "../Project/Project.type";
import { ApiCallState } from "../Utils";

export type Boq = {
  key: number | null;
  project_id: any;
  id: any;
  description: string;
  remark: string | null;
  reference_id: any;
  item_no: string;
  unit: string;
  quantity: number;
  unit_price: number;
  current_quantity: number;
  previous_quantity: number;
  total: number;
  sheet_name: string;
  variation: Variation | null;
  is_variation: boolean;
};

export const init_boq = {
  project_id: null,
  id: null,
  description: "",
  item_no: "",
  unit_price: 0,
  reference_id: null,
  remark: "",
  quantity: 0,
  total: 0,
  unit: "",
  current_quantity: 0,
  previous_quantity: 0,
  sheet_name: "sheet 1",
  key: Date.now(),
  variation: null,
  rebars: [],
  take_offs: [],
  aggregate_takeoff: null,
  road_take_offs: [],
  is_variation: false,
  price_escalations: [],
};

export type RoadTakeoff = {
  key: number;
  id: any;
  boq_id: any;
  description: string;
  design_quantity: number;

  road_take_off_items: RoadTakeoffItem[];
};

export type RoadTakeoffItem = {
  id: any;
  quantity: number;
  date: Date;
  project_id: number;
  pid: any;
  type: "sub-contract" | "progress" | "variation";
};

export type AggregateTakeoff = {
  key: number;
  id: number | null;
  boq_id: number | null;
  aggregate_take_off_items: AggregateTakeoffItem[];
  boq: Boq;
};
export type AggregateTakeoffItem = {
  id: any;
  quantity: number;
  approval: number;
  type: "sub-contract" | "progress" | "variation" | "pre-contract";
  pid: number;
  date: Date;
  aggregate_takeoff: AggregateTakeoff;
};

export type BoqStateTypes = {
  fetchAll: ApiCallState<Boq[]>;
  fetchOne: ApiCallState<Boq>;
  fetchDetail: ApiCallState<Boq[]>;
};

export const BoqActionTypes = {
  FETCH_ALL_BOQ: "FETCH_ALL_BOQ",
  FETCH_ALL_BOQ_RESET: "FETCH_ALL_BOQ_RESET",
  FETCH_ALL_BOQ_FAILURE: "FETCH_ALL_BOQ_FAILURE",
  FETCH_ALL_BOQ_SUCCESS: "FETCH_ALL_BOQ_SUCCESS",

  FETCH_ONE_BOQ: "FETCH_ONE_BOQ",
  FETCH_ONE_BOQ_RESET: "FETCH_ONE_BOQ_RESET",
  FETCH_ONE_BOQ_FAILURE: "FETCH_ONE_BOQ_FAILURE",
  FETCH_ONE_BOQ_SUCCESS: "FETCH_ONE_BOQ_SUCCESS",

  FETCH_DETAIL_BOQ: "FETCH_DETAIL_BOQ",
  FETCH_DETAIL_BOQ_RESET: "FETCH_DETAIL_BOQ_RESET",
  FETCH_DETAIL_BOQ_FAILURE: "FETCH_DETAIL_BOQ_FAILURE",
  FETCH_DETAIL_BOQ_SUCCESS: "FETCH_DETAIL_BOQ_SUCCESS",
};
