import { InspectionStateTypes, InspectionActionTypes } from "./Inspection.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: InspectionStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const InspectionReducer = (
  state: InspectionStateTypes = INITIAL_STATE,
  action: any
): InspectionStateTypes => {
  switch (action.type) {
    /**
     * FETCH ALL Inspection
     */
    case InspectionActionTypes.FETCH_ALL_INSPECTION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case InspectionActionTypes.FETCH_ALL_INSPECTION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case InspectionActionTypes.FETCH_ALL_INSPECTION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case InspectionActionTypes.FETCH_ALL_INSPECTION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    /**
  * FETCH ONE Inspection
  */
    case InspectionActionTypes.FETCH_ONE_INSPECTION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case InspectionActionTypes.FETCH_ONE_INSPECTION_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case InspectionActionTypes.FETCH_ONE_INSPECTION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case InspectionActionTypes.FETCH_ONE_INSPECTION_SUCCESS:
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

export default InspectionReducer;
