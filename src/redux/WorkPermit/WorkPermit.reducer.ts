import { WorkPermitStateTypes, WorkPermitActionTypes } from "./WorkPermit.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: WorkPermitStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const WorkPermitReducer = (
  state: WorkPermitStateTypes = INITIAL_STATE,
  action: any
): WorkPermitStateTypes => {
  switch (action.type) {
    case WorkPermitActionTypes.FETCH_ALL_WORK_PERMIT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case WorkPermitActionTypes.FETCH_ALL_WORK_PERMIT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case WorkPermitActionTypes.FETCH_ALL_WORK_PERMIT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case WorkPermitActionTypes.FETCH_ALL_WORK_PERMIT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case WorkPermitActionTypes.FETCH_ONE_WORK_PERMIT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case WorkPermitActionTypes.FETCH_ONE_WORK_PERMIT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case WorkPermitActionTypes.FETCH_ONE_WORK_PERMIT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case WorkPermitActionTypes.FETCH_ONE_WORK_PERMIT_SUCCESS:
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

export default WorkPermitReducer;
