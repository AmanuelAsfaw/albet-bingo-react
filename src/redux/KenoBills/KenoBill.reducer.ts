import { KenoBillStateTypes, KenoBillActionTypes } from "./KenoBill.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: KenoBillStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoBillStateTypes = INITIAL_STATE,
  action: any
): KenoBillStateTypes => {
  switch (action.type) {
    case KenoBillActionTypes.FETCH_ALL_KENO_BILL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoBillActionTypes.FETCH_ALL_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoBillActionTypes.FETCH_ALL_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoBillActionTypes.FETCH_ALL_KENO_BILL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoBillActionTypes.FETCH_ONE_KENO_BILL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoBillActionTypes.FETCH_ONE_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoBillActionTypes.FETCH_ONE_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoBillActionTypes.FETCH_ONE_KENO_BILL_SUCCESS:
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

export default DataReducer;
