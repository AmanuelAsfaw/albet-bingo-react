import { ExternalDocumentStateTypes, ExternalDocumentActionTypes } from "./ExternalDocument.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ExternalDocumentStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ExternalDocumentReducer = (
  state: ExternalDocumentStateTypes = INITIAL_STATE,
  action: any
): ExternalDocumentStateTypes => {
  switch (action.type) {
    case ExternalDocumentActionTypes.FETCH_ALL_EXTERNAL_DOCUMENT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ExternalDocumentActionTypes.FETCH_ALL_EXTERNAL_DOCUMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ExternalDocumentActionTypes.FETCH_ALL_EXTERNAL_DOCUMENT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ExternalDocumentActionTypes.FETCH_ALL_EXTERNAL_DOCUMENT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ExternalDocumentActionTypes.FETCH_ONE_EXTERNAL_DOCUMENT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ExternalDocumentActionTypes.FETCH_ONE_EXTERNAL_DOCUMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ExternalDocumentActionTypes.FETCH_ONE_EXTERNAL_DOCUMENT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ExternalDocumentActionTypes.FETCH_ONE_EXTERNAL_DOCUMENT_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    default:
      return state;
  }
};

export default ExternalDocumentReducer;
