import { ExternalDocumentActionTypes } from "./ExternalDocument.type";

/**
 * Fetch All ExternalDocument
 *
 * @param payload
 */
export const fetchAllExternalDocuments = (payload?: any) => ({
  type: ExternalDocumentActionTypes.FETCH_ALL_EXTERNAL_DOCUMENT,
  payload: payload,
});

/**
 * Fetch All ExternalDocument
 *
 * @param payload
 */
export const fetchOneExternalDocument = (payload?: any) => ({
  type: ExternalDocumentActionTypes.FETCH_ONE_EXTERNAL_DOCUMENT,
  payload: payload,
});

/**
 * Reset Fetch ExternalDocument State
 *
 * @param payload
 */
export const fetchAllExternalDocumentReset = (payload?: any) => ({
  type: ExternalDocumentActionTypes.FETCH_ALL_EXTERNAL_DOCUMENT_RESET,
  payload: payload,
});
