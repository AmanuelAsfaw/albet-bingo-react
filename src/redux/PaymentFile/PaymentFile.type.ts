import { Document } from "../Document/Document.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type PaymentFile = {
  id: number;
  project_id: number;
  name: string;
  document_id: number;
  document: Document;
  request_date: string;
  response_date?: string;
  type: string;
  amount: number;
  repayment: number;
  rebate: number;
  retention: number;
  remark: string;
  response_message?: string;
  approval: number;
  payment_file_remarks: PaymentFileRemark[];
  user_id: number;
  createdAt: string;
  updatedAt: string;
};

export type PaymentFileRemark = {
  user: User;
  remark: string;
  date: Date;
  document: Document;
};

export type PaymentFileStateTypes = {
  fetchAll: ApiCallState<PaymentFile[]>;
  fetchOne: ApiCallState<PaymentFile | {}>;
};

export const PaymentFileActionTypes = {
  FETCH_ALL_PAYMENT_FILE: "FETCH_ALL_PAYMENT_FILE",
  FETCH_ALL_PAYMENT_FILE_RESET: "FETCH_ALL_PAYMENT_FILE_RESET",
  FETCH_ALL_PAYMENT_FILE_FAILURE: "FETCH_ALL_PAYMENT_FILE_FAILURE",
  FETCH_ALL_PAYMENT_FILE_SUCCESS: "FETCH_ALL_PAYMENT_FILE_SUCCESS",

  FETCH_ONE_PAYMENT_FILE: "FETCH_ONE_PAYMENT_FILE",
  FETCH_ONE_PAYMENT_FILE_RESET: "FETCH_ONE_PAYMENT_FILE_RESET",
  FETCH_ONE_PAYMENT_FILE_FAILURE: "FETCH_ONE_PAYMENT_FILE_FAILURE",
  FETCH_ONE_PAYMENT_FILE_SUCCESS: "FETCH_ONE_PAYMENT_FILE_SUCCESS",
};
