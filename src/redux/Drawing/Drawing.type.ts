import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type Drawing= {
    id: number | null;
    date:string;
    drawing_type:string;
    ref_no:string;
    description: string;
    user_id:number;
    document:Document;
    drawing_statuses:DrawingStatusTypes[];
};

export type DrawingStatusTypes = {
  drawing_id: number;
  type: "View" | "Check" | "Approve";
  status: number;
  assigned_by: number;
  user_id: number;
  id: number;
};
export type DrawingStateTypes = {
  fetchAll: ApiCallState<Drawing[]>;
  fetchOne: ApiCallState<Drawing | {}>;
};

export const DrawingActionTypes = {
  FETCH_ALL_DRAWING: "FETCH_ALL_DRAWING",
  FETCH_ALL_DRAWING_RESET: "FETCH_ALL_DRAWING_RESET",
  FETCH_ALL_DRAWING_FAILURE: "FETCH_ALL_DRAWING_FAILURE",
  FETCH_ALL_DRAWING_SUCCESS: "FETCH_ALL_DRAWING_SUCCESS",

  FETCH_ONE_DRAWING: "FETCH_ONE_DRAWING",
  FETCH_ONE_DRAWING_RESET: "FETCH_ONE_DRAWING_RESET",
  FETCH_ONE_DRAWING_FAILURE: "FETCH_ONE_DRAWING_FAILURE",
  FETCH_ONE_DRAWING_SUCCESS: "FETCH_ONE_DRAWING_SUCCESS",
};
