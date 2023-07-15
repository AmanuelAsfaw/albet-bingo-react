import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type Contract= {
    id: number | null;
    date:string;
    end_date:string;
    contract_type:string;
    ref_no:string;
    description: string;
    user_id:number;
    document:Document;
    contract_statuses:ContractStatusTypes[];
};

export type ContractStatusTypes = {
  contract_id: number;
  type: "View" | "Check" | "Approve";
  status: number;
  assigned_by: number;
  user_id: number;
  id: number;
};

export type ContractStateTypes = {
  fetchAll: ApiCallState<Contract[]>;
  fetchOne: ApiCallState<Contract | {}>;
};

export const ContractActionTypes = {
  FETCH_ALL_CONTRACT: "FETCH_ALL_CONTRACT",
  FETCH_ALL_CONTRACT_RESET: "FETCH_ALL_CONTRACT_RESET",
  FETCH_ALL_CONTRACT_FAILURE: "FETCH_ALL_CONTRACT_FAILURE",
  FETCH_ALL_CONTRACT_SUCCESS: "FETCH_ALL_CONTRACT_SUCCESS",

  FETCH_ONE_CONTRACT: "FETCH_ONE_CONTRACT",
  FETCH_ONE_CONTRACT_RESET: "FETCH_ONE_CONTRACT_RESET",
  FETCH_ONE_CONTRACT_FAILURE: "FETCH_ONE_CONTRACT_FAILURE",
  FETCH_ONE_CONTRACT_SUCCESS: "FETCH_ONE_CONTRACT_SUCCESS",
};
