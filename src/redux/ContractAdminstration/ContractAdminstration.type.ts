import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type ContractAdminstration= {
    id: number | null;
    project_id:number;
    date:string;
    reference_no:string;
    name: string;
    type: string;
    uploaded_by:number;
    document:Document;
};

export type ContractAdminstrationStateTypes = {
  fetchAll: ApiCallState<ContractAdminstration[]>;
  fetchOne: ApiCallState<ContractAdminstration | {}>;
};

export const ContractAdminstrationActionTypes = {
  FETCH_ALL_CONTRACT_ADMINSTRATION: "FETCH_ALL_CONTRACT_ADMINSTRATION",
  FETCH_ALL_CONTRACT_ADMINSTRATION_RESET: "FETCH_ALL_CONTRACT_ADMINSTRATION_RESET",
  FETCH_ALL_CONTRACT_ADMINSTRATION_FAILURE: "FETCH_ALL_CONTRACT_ADMINSTRATION_FAILURE",
  FETCH_ALL_CONTRACT_ADMINSTRATION_SUCCESS: "FETCH_ALL_CONTRACT_ADMINSTRATION_SUCCESS",

  FETCH_ONE_CONTRACT_ADMINSTRATION: "FETCH_ONE_CONTRACT_ADMINSTRATION",
  FETCH_ONE_CONTRACT_ADMINSTRATION_RESET: "FETCH_ONE_CONTRACT_ADMINSTRATION_RESET",
  FETCH_ONE_CONTRACT_ADMINSTRATION_FAILURE: "FETCH_ONE_CONTRACT_ADMINSTRATION_FAILURE",
  FETCH_ONE_CONTRACT_ADMINSTRATION_SUCCESS: "FETCH_ONE_CONTRACT_ADMINSTRATION_SUCCESS",
};
