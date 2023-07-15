import { TenderDocumentStateTypes, TenderDocumentActionTypes } from "./TenderDocument.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: TenderDocumentStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const TenderDocumentReducer = (
  state: TenderDocumentStateTypes = INITIAL_STATE,
  action: any
): TenderDocumentStateTypes => {
  switch (action.type) {
    case TenderDocumentActionTypes.FETCH_ALL_TENDER_DOCUMENT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TenderDocumentActionTypes.FETCH_ALL_TENDER_DOCUMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TenderDocumentActionTypes.FETCH_ALL_TENDER_DOCUMENT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TenderDocumentActionTypes.FETCH_ALL_TENDER_DOCUMENT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case TenderDocumentActionTypes.FETCH_ONE_TENDER_DOCUMENT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case TenderDocumentActionTypes.FETCH_ONE_TENDER_DOCUMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TenderDocumentActionTypes.FETCH_ONE_TENDER_DOCUMENT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TenderDocumentActionTypes.FETCH_ONE_TENDER_DOCUMENT_SUCCESS:
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

export default TenderDocumentReducer;
