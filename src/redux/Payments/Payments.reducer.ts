import { PaymentsStateTypes, PaymentsActionTypes } from "./Payments.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: PaymentsStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const PaymentsReducer = (
  state: PaymentsStateTypes = INITIAL_STATE,
  action: any
): PaymentsStateTypes => {
  switch (action.type) {
    case PaymentsActionTypes.FETCH_ALL_PAYMENTS:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case PaymentsActionTypes.FETCH_ALL_PAYMENTS_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case PaymentsActionTypes.FETCH_ALL_PAYMENTS_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PaymentsActionTypes.FETCH_ALL_PAYMENTS_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case PaymentsActionTypes.FETCH_ONE_PAYMENTS:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case PaymentsActionTypes.FETCH_ONE_PAYMENTS_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case PaymentsActionTypes.FETCH_ONE_PAYMENTS_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PaymentsActionTypes.FETCH_ONE_PAYMENTS_SUCCESS:
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

export default PaymentsReducer;
