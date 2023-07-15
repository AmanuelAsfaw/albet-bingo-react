import { StaffWorkStateTypes, StaffWorkActionTypes } from "./StaffWork.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: StaffWorkStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const StaffWorkReducer = (
  state: StaffWorkStateTypes = INITIAL_STATE,
  action: any
): StaffWorkStateTypes => {
  switch (action.type) {
    case StaffWorkActionTypes.FETCH_ALL_STAFF_WORK:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case StaffWorkActionTypes.FETCH_ALL_STAFF_WORK_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case StaffWorkActionTypes.FETCH_ALL_STAFF_WORK_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case StaffWorkActionTypes.FETCH_ALL_STAFF_WORK_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case StaffWorkActionTypes.FETCH_ONE_STAFF_WORK:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case StaffWorkActionTypes.FETCH_ONE_STAFF_WORK_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case StaffWorkActionTypes.FETCH_ONE_STAFF_WORK_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case StaffWorkActionTypes.FETCH_ONE_STAFF_WORK_SUCCESS:
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

export default StaffWorkReducer;
