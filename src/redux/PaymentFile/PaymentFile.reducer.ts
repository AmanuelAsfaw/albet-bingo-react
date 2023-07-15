import {
  PaymentFileStateTypes,
  PaymentFileActionTypes,
} from "./PaymentFile.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: PaymentFileStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const PaymentFileReducer = (
  state: PaymentFileStateTypes = INITIAL_STATE,
  action: any
): PaymentFileStateTypes => {
  switch (action.type) {
    case PaymentFileActionTypes.FETCH_ALL_PAYMENT_FILE:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case PaymentFileActionTypes.FETCH_ALL_PAYMENT_FILE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case PaymentFileActionTypes.FETCH_ALL_PAYMENT_FILE_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PaymentFileActionTypes.FETCH_ALL_PAYMENT_FILE_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case PaymentFileActionTypes.FETCH_ONE_PAYMENT_FILE:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case PaymentFileActionTypes.FETCH_ONE_PAYMENT_FILE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case PaymentFileActionTypes.FETCH_ONE_PAYMENT_FILE_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PaymentFileActionTypes.FETCH_ONE_PAYMENT_FILE_SUCCESS:
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

export default PaymentFileReducer;
