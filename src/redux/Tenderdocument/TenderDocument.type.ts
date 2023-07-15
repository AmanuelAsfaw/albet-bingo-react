import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type TenderDocument= {
    id: number | null;
    date:string;
    ref_no:string;
    description: string;
    user_id:number;
    document:Document;
    tender_document_statuses:TenderDocumentStatusTypes[];
};
export type TenderDocumentStatusTypes = {
  tender_document_id: number;
  type: "View" | "Check" | "Approve";
  status: number;
  assigned_by: number;
  user_id: number;
  id: number;
};

export type TenderDocumentStateTypes = {
  fetchAll: ApiCallState<TenderDocument[]>;
  fetchOne: ApiCallState<TenderDocument | {}>;
};

export const TenderDocumentActionTypes = {
  FETCH_ALL_TENDER_DOCUMENT: "FETCH_ALL_TENDER_DOCUMENT",
  FETCH_ALL_TENDER_DOCUMENT_RESET: "FETCH_ALL_TENDER_DOCUMENT_RESET",
  FETCH_ALL_TENDER_DOCUMENT_FAILURE: "FETCH_ALL_TENDER_DOCUMENT_FAILURE",
  FETCH_ALL_TENDER_DOCUMENT_SUCCESS: "FETCH_ALL_TENDER_DOCUMENT_SUCCESS",

  FETCH_ONE_TENDER_DOCUMENT: "FETCH_ONE_TENDER_DOCUMENT",
  FETCH_ONE_TENDER_DOCUMENT_RESET: "FETCH_ONE_TENDER_DOCUMENT_RESET",
  FETCH_ONE_TENDER_DOCUMENT_FAILURE: "FETCH_ONE_TENDER_DOCUMENT_FAILURE",
  FETCH_ONE_TENDER_DOCUMENT_SUCCESS: "FETCH_ONE_TENDER_DOCUMENT_SUCCESS",
};
