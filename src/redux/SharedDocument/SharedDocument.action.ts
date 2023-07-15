import { SharedDocumentActionTypes } from "./SharedDocument.type";

/**
 * Fetch All SharedDocuments
 *
 * @param payload
 */
export const fetchAllSharedDocuments = (payload?: any) => ({
  type: SharedDocumentActionTypes.FETCH_ALL_SHARED_DOCUMENT,
  payload: payload,
});

/**
 * Reset Fetch SharedDocuments State
 *
 * @param payload
 */
export const fetchAllSharedDocumentsReset = (payload?: any) => ({
  type: SharedDocumentActionTypes.FETCH_ALL_SHARED_DOCUMENT_RESET,
  payload: payload,
});
