import { KenoCasherStateTypes, KenoCasherActionTypes } from "./KenoCasher.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: KenoCasherStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoCasherStateTypes = INITIAL_STATE,
  action: any
): KenoCasherStateTypes => {
  switch (action.type) {
    case KenoCasherActionTypes.FETCH_ALL_KENO_CASHER:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoCasherActionTypes.FETCH_ALL_KENO_CASHER_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoCasherActionTypes.FETCH_ALL_KENO_CASHER_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoCasherActionTypes.FETCH_ALL_KENO_CASHER_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoCasherActionTypes.FETCH_ONE_KENO_CASHER:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoCasherActionTypes.FETCH_ONE_KENO_CASHER_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoCasherActionTypes.FETCH_ONE_KENO_CASHER_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoCasherActionTypes.FETCH_ONE_KENO_CASHER_SUCCESS:
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

export default DataReducer;
