import { Document } from "../Document/Document.type";
import { PaymentFile } from "../PaymentFile/PaymentFile.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type PriceEscalationFile = {
  id: number;
  description: string;
  project_id: number;
  payment_id: number;
  total_amount: number;
  document: Document;
  is_checked: boolean;
  is_approved: boolean;
  payment_file: PaymentFile;
  price_escalation_checked_by: User;
  price_escalation_approved_by: User;
};

export type PriceEscalationFileStateTypes = {
  fetchAll: ApiCallState<PriceEscalationFile[]>;
  fetchOne: ApiCallState<PriceEscalationFile | {}>;
};

export const PriceEscalationFileActionTypes = {
  FETCH_ALL_PRICE_ESCALATION_FILE: "FETCH_ALL_PRICE_ESCALATION_FILE",
  FETCH_ALL_PRICE_ESCALATION_FILE_RESET:
    "FETCH_ALL_PRICE_ESCALATION_FILE_RESET",
  FETCH_ALL_PRICE_ESCALATION_FILE_FAILURE:
    "FETCH_ALL_PRICE_ESCALATION_FILE_FAILURE",
  FETCH_ALL_PRICE_ESCALATION_FILE_SUCCESS:
    "FETCH_ALL_PRICE_ESCALATION_FILE_SUCCESS",

  FETCH_ONE_PRICE_ESCALATION_FILE: "FETCH_ONE_PRICE_ESCALATION_FILE",
  FETCH_ONE_PRICE_ESCALATION_FILE_RESET:
    "FETCH_ONE_PRICE_ESCALATION_FILE_RESET",
  FETCH_ONE_PRICE_ESCALATION_FILE_FAILURE:
    "FETCH_ONE_PRICE_ESCALATION_FILE_FAILURE",
  FETCH_ONE_PRICE_ESCALATION_FILE_SUCCESS:
    "FETCH_ONE_PRICE_ESCALATION_FILE_SUCCESS",
};
