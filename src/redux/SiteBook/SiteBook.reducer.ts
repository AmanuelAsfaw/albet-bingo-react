import { SiteBookStateTypes, SiteBookActionTypes } from "./SiteBook.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: SiteBookStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const SiteBookReducer = (
  state: SiteBookStateTypes = INITIAL_STATE,
  action: any
): SiteBookStateTypes => {
  switch (action.type) {
    case SiteBookActionTypes.FETCH_ALL_SITE_BOOK:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case SiteBookActionTypes.FETCH_ALL_SITE_BOOK_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SiteBookActionTypes.FETCH_ALL_SITE_BOOK_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SiteBookActionTypes.FETCH_ALL_SITE_BOOK_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case SiteBookActionTypes.FETCH_ONE_SITE_BOOK:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case SiteBookActionTypes.FETCH_ONE_SITE_BOOK_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SiteBookActionTypes.FETCH_ONE_SITE_BOOK_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SiteBookActionTypes.FETCH_ONE_SITE_BOOK_SUCCESS:
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

export default SiteBookReducer;
