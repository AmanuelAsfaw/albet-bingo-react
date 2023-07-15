import { ChecklistRemarkStateTypes, ChecklistRemarkActionTypes } from "./ChecklistRemark.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ChecklistRemarkStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ChecklistRemarkReducer = (
  state: ChecklistRemarkStateTypes = INITIAL_STATE,
  action: any
): ChecklistRemarkStateTypes => {
  switch (action.type) {
    case ChecklistRemarkActionTypes.FETCH_ALL_CHECKLIST_REMARK:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ChecklistRemarkActionTypes.FETCH_ALL_CHECKLIST_REMARK_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ChecklistRemarkActionTypes.FETCH_ALL_CHECKLIST_REMARK_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ChecklistRemarkActionTypes.FETCH_ALL_CHECKLIST_REMARK_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ChecklistRemarkActionTypes.FETCH_ONE_CHECKLIST_REMARK:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ChecklistRemarkActionTypes.FETCH_ONE_CHECKLIST_REMARK_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ChecklistRemarkActionTypes.FETCH_ONE_CHECKLIST_REMARK_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ChecklistRemarkActionTypes.FETCH_ONE_CHECKLIST_REMARK_SUCCESS:
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

export default ChecklistRemarkReducer;
