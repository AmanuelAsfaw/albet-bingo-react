import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type Payments = {
  id: number | null;
  project_id: number;
  date: string;
  reference_no: string;
  name: string;
  type: string;
  uploaded_by: number;
  payment_amount: number;
  advance_repaid_amount: number;
  retention_amount: number;
  document: Document;
};

export type PaymentsStateTypes = {
  fetchAll: ApiCallState<Payments[]>;
  fetchOne: ApiCallState<Payments | {}>;
};

export const PaymentsActionTypes = {
  FETCH_ALL_PAYMENTS: "FETCH_ALL_PAYMENTS",
  FETCH_ALL_PAYMENTS_RESET: "FETCH_ALL_PAYMENTS_RESET",
  FETCH_ALL_PAYMENTS_FAILURE: "FETCH_ALL_PAYMENTS_FAILURE",
  FETCH_ALL_PAYMENTS_SUCCESS: "FETCH_ALL_PAYMENTS_SUCCESS",

  FETCH_ONE_PAYMENTS: "FETCH_ONE_PAYMENTS",
  FETCH_ONE_PAYMENTS_RESET: "FETCH_ONE_PAYMENTS_RESET",
  FETCH_ONE_PAYMENTS_FAILURE: "FETCH_ONE_PAYMENTS_FAILURE",
  FETCH_ONE_PAYMENTS_SUCCESS: "FETCH_ONE_PAYMENTS_SUCCESS",
};
