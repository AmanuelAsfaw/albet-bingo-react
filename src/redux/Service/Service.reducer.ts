import { ServiceStateTypes, ServiceActionTypes } from "./Service.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ServiceStateTypes = {
  fetchAll: resetApiCallState([]),
};

const ServiceReducer = (
  state: ServiceStateTypes = INITIAL_STATE,
  action: any
): ServiceStateTypes => {
  switch (action.type) {
    case ServiceActionTypes.FETCH_ALL_SERVICE:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ServiceActionTypes.FETCH_ALL_SERVICE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ServiceActionTypes.FETCH_ALL_SERVICE_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ServiceActionTypes.FETCH_ALL_SERVICE_SUCCESS:
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

export default ServiceReducer;
