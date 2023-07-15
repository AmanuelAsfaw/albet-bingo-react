import { InspectionFormStateTypes, InspectionFormActionTypes } from "./InspectionForm.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: InspectionFormStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const InspectionFormReducer = (
  state: InspectionFormStateTypes = INITIAL_STATE,
  action: any
): InspectionFormStateTypes => {
  switch (action.type) {
    /**
     * FETCH ALL
     */
    case InspectionFormActionTypes.FETCH_ALL_INSPECTION_FORM:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case InspectionFormActionTypes.FETCH_ALL_INSPECTION_FORM_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case InspectionFormActionTypes.FETCH_ALL_INSPECTION_FORM_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case InspectionFormActionTypes.FETCH_ALL_INSPECTION_FORM_SUCCESS:
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
  * FETCH ONE
  */
    case InspectionFormActionTypes.FETCH_ONE_INSPECTION_FORM:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case InspectionFormActionTypes.FETCH_ONE_INSPECTION_FORM_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case InspectionFormActionTypes.FETCH_ONE_INSPECTION_FORM_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case InspectionFormActionTypes.FETCH_ONE_INSPECTION_FORM_SUCCESS:
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

export default InspectionFormReducer;
