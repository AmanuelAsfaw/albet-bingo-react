import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";
import { ShareData } from "../ShareData/ShareData.type";

export type Data= {
    id: number | null;
    project_id:number;
    date:string;
    reference_no:string;
    name: string;
    type: string;
    uploaded_by:number;
    revision_no:string;
    document:Document;
    share_data:ShareData[];
};

export type DataStateTypes = {
  fetchAll: ApiCallState<Data[]>;
  fetchOne: ApiCallState<Data | {}>;
};

export const DataActionTypes = {
  FETCH_ALL_DATA: "FETCH_ALL_DATA",
  FETCH_ALL_DATA_RESET: "FETCH_ALL_DATA_RESET",
  FETCH_ALL_DATA_FAILURE: "FETCH_ALL_DATA_FAILURE",
  FETCH_ALL_DATA_SUCCESS: "FETCH_ALL_DATA_SUCCESS",

  FETCH_ONE_DATA: "FETCH_ONE_DATA",
  FETCH_ONE_DATA_RESET: "FETCH_ONE_DATA_RESET",
  FETCH_ONE_DATA_FAILURE: "FETCH_ONE_DATA_FAILURE",
  FETCH_ONE_DATA_SUCCESS: "FETCH_ONE_DATA_SUCCESS",
};
