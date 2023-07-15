import {
  BankAccountStateTypes,
  BankAccountActionTypes,
} from "./BankAccount.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: BankAccountStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const BankAccountReducer = (
  state: BankAccountStateTypes = INITIAL_STATE,
  action: any
): BankAccountStateTypes => {
  switch (action.type) {
    case BankAccountActionTypes.FETCH_ALL_BANK_ACCOUNT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case BankAccountActionTypes.FETCH_ALL_BANK_ACCOUNT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case BankAccountActionTypes.FETCH_ALL_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case BankAccountActionTypes.FETCH_ALL_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case BankAccountActionTypes.FETCH_ONE_BANK_ACCOUNT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case BankAccountActionTypes.FETCH_ONE_BANK_ACCOUNT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case BankAccountActionTypes.FETCH_ONE_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case BankAccountActionTypes.FETCH_ONE_BANK_ACCOUNT_SUCCESS:
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

export default BankAccountReducer;
