import { BoqStateTypes, BoqActionTypes, init_boq } from "./Boq.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: BoqStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchDetail: resetApiCallState([]),
};

const BoqReducer = (
  state: BoqStateTypes = INITIAL_STATE,
  action: any
): BoqStateTypes => {
  switch (action.type) {
    case BoqActionTypes.FETCH_ALL_BOQ:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case BoqActionTypes.FETCH_ALL_BOQ_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case BoqActionTypes.FETCH_ALL_BOQ_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case BoqActionTypes.FETCH_ALL_BOQ_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case BoqActionTypes.FETCH_ONE_BOQ:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: init_boq,
          isPending: true,
          isSuccessful: false,
        },
      };
    case BoqActionTypes.FETCH_ONE_BOQ_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case BoqActionTypes.FETCH_ONE_BOQ_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: init_boq,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case BoqActionTypes.FETCH_ONE_BOQ_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case BoqActionTypes.FETCH_DETAIL_BOQ:
      return {
        ...state,
        fetchDetail: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case BoqActionTypes.FETCH_DETAIL_BOQ_RESET:
      return {
        ...state,
        fetchDetail: resetApiCallState([]),
      };
    case BoqActionTypes.FETCH_DETAIL_BOQ_FAILURE:
      return {
        ...state,
        fetchDetail: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case BoqActionTypes.FETCH_DETAIL_BOQ_SUCCESS:
      return {
        ...state,
        fetchDetail: {
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

export default BoqReducer;
