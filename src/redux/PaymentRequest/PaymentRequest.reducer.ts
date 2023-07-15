import { PaymentRequestStateTypes, PaymentRequestActionTypes } from "./PaymentRequest.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: PaymentRequestStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const PaymentRequestReducer = (
  state: PaymentRequestStateTypes = INITIAL_STATE,
  action: any
): PaymentRequestStateTypes => {
  switch (action.type) {
    case PaymentRequestActionTypes.FETCH_ALL_PAYMENT_REQUEST:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case PaymentRequestActionTypes.FETCH_ALL_PAYMENT_REQUEST_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case PaymentRequestActionTypes.FETCH_ALL_PAYMENT_REQUEST_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PaymentRequestActionTypes.FETCH_ALL_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case PaymentRequestActionTypes.FETCH_ONE_PAYMENT_REQUEST:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case PaymentRequestActionTypes.FETCH_ONE_PAYMENT_REQUEST_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case PaymentRequestActionTypes.FETCH_ONE_PAYMENT_REQUEST_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PaymentRequestActionTypes.FETCH_ONE_PAYMENT_REQUEST_SUCCESS:
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

export default PaymentRequestReducer;
