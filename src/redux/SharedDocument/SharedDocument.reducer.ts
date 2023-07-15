import {
  SharedDocumentStateTypes,
  SharedDocumentActionTypes,
} from "./SharedDocument.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: SharedDocumentStateTypes = {
  fetchAll: resetApiCallState([]),
};

const SharedDocumentReducer = (
  state: SharedDocumentStateTypes = INITIAL_STATE,
  action: any
): SharedDocumentStateTypes => {
  switch (action.type) {
    case SharedDocumentActionTypes.FETCH_ALL_SHARED_DOCUMENT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case SharedDocumentActionTypes.FETCH_ALL_SHARED_DOCUMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SharedDocumentActionTypes.FETCH_ALL_SHARED_DOCUMENT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SharedDocumentActionTypes.FETCH_ALL_SHARED_DOCUMENT_SUCCESS:
      return {
        ...state,
        fetchAll: {
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

export default SharedDocumentReducer;
