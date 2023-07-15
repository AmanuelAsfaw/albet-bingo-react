import { InitPagedData } from "./../Utils";
import { FinancialStateTypes, FinancialActionTypes } from "./Financial.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: FinancialStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const FinancialReducer = (
  state: FinancialStateTypes = INITIAL_STATE,
  action: any
): FinancialStateTypes => {
  switch (action.type) {
    case FinancialActionTypes.FETCH_ALL_FINANCIAL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case FinancialActionTypes.FETCH_ALL_FINANCIAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case FinancialActionTypes.FETCH_ALL_FINANCIAL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FinancialActionTypes.FETCH_ALL_FINANCIAL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case FinancialActionTypes.FETCH_PAGED_FINANCIAL:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case FinancialActionTypes.FETCH_PAGED_FINANCIAL_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case FinancialActionTypes.FETCH_PAGED_FINANCIAL_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FinancialActionTypes.FETCH_PAGED_FINANCIAL_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case FinancialActionTypes.FETCH_ONE_FINANCIAL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case FinancialActionTypes.FETCH_ONE_FINANCIAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case FinancialActionTypes.FETCH_ONE_FINANCIAL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FinancialActionTypes.FETCH_ONE_FINANCIAL_SUCCESS:
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

export default FinancialReducer;
