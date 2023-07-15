import { ConsultantStateTypes, ConsultantActionTypes } from "./Consultant.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ConsultantStateTypes = {
  fetchAll: resetApiCallState([]),
};

const ConsultantReducer = (
  state: ConsultantStateTypes = INITIAL_STATE,
  action: any
): ConsultantStateTypes => {
  switch (action.type) {
    case ConsultantActionTypes.FETCH_ALL_CONSULTANT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ConsultantActionTypes.FETCH_ALL_CONSULTANT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ConsultantActionTypes.FETCH_ALL_CONSULTANT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ConsultantActionTypes.FETCH_ALL_CONSULTANT_SUCCESS:
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

export default ConsultantReducer;
