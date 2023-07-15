import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type PaymentRequest= {
  id: number | null;
  name: string;
  type: string;
  project_id:number;
  date:string;
  reference_no:string;
  payment_amount:number;
  uploaded_by:number;
  reviewed_by:string;
  is_approved:boolean;
  is_rejected:boolean;
  is_revised:boolean;
  document:Document;
  payment_request_remarks:PaymentRequestRemark[];
  users: {
    id: number;
    "user_payment_request": {
      id: number;
      user_id: number;
      task_id: number;
      last_seen: string;
    };
  }[];
};

export type PaymentRequestRemark ={
    id: number | null;
    payment_request_id:number;
    date:string;
    reviewed_by:number;
    remark:string;
    document:Document;
    createdAt:string;
}

export type PaymentRequestStateTypes = {
  fetchAll: ApiCallState<PaymentRequest[]>;
  fetchOne: ApiCallState<PaymentRequest | {}>;
};

export const PaymentRequestActionTypes = {
  FETCH_ALL_PAYMENT_REQUEST: "FETCH_ALL_PAYMENT_REQUEST",
  FETCH_ALL_PAYMENT_REQUEST_RESET: "FETCH_ALL_PAYMENT_REQUEST_RESET",
  FETCH_ALL_PAYMENT_REQUEST_FAILURE: "FETCH_ALL_PAYMENT_REQUEST_FAILURE",
  FETCH_ALL_PAYMENT_REQUEST_SUCCESS: "FETCH_ALL_PAYMENT_REQUEST_SUCCESS",

  FETCH_ONE_PAYMENT_REQUEST: "FETCH_ONE_PAYMENT_REQUEST",
  FETCH_ONE_PAYMENT_REQUEST_RESET: "FETCH_ONE_PAYMENT_REQUEST_RESET",
  FETCH_ONE_PAYMENT_REQUEST_FAILURE: "FETCH_ONE_PAYMENT_REQUEST_FAILURE",
  FETCH_ONE_PAYMENT_REQUEST_SUCCESS: "FETCH_ONE_PAYMENT_REQUEST_SUCCESS",
};
