import { TenderDocumentActionTypes } from "./TenderDocument.type";

/**
 * Fetch All TenderDocument
 *
 * @param payload
 */
export const fetchAllTenderDocuments = (payload?: any) => ({
  type: TenderDocumentActionTypes.FETCH_ALL_TENDER_DOCUMENT,
  payload: payload,
});

/**
 * Fetch All TenderDocument
 *
 * @param payload
 */
export const fetchOneTenderDocument = (payload?: any) => ({
  type: TenderDocumentActionTypes.FETCH_ONE_TENDER_DOCUMENT,
  payload: payload,
});

/**
 * Reset Fetch TenderDocument State
 *
 * @param payload
 */
export const fetchAllTenderDocumentsReset = (payload?: any) => ({
  type: TenderDocumentActionTypes.FETCH_ALL_TENDER_DOCUMENT_RESET,
  payload: payload,
});
