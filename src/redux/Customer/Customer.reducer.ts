import { CustomerStateTypes, CustomerActionTypes } from "./Customer.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: CustomerStateTypes = {
  fetchAll: resetApiCallState([]),
};

const CustomerReducer = (
  state: CustomerStateTypes = INITIAL_STATE,
  action: any
): CustomerStateTypes => {
  switch (action.type) {
    case CustomerActionTypes.FETCH_ALL_CUSTOMER:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CustomerActionTypes.FETCH_ALL_CUSTOMER_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case CustomerActionTypes.FETCH_ALL_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CustomerActionTypes.FETCH_ALL_CUSTOMER_SUCCESS:
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

export default CustomerReducer;
