import { CartelaStateTypes, CartelaActionTypes } from "./TodayBill.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: CartelaStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: CartelaStateTypes = INITIAL_STATE,
  action: any
): CartelaStateTypes => {
  switch (action.type) {
    case CartelaActionTypes.FETCH_ALL_CARTELA:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CartelaActionTypes.FETCH_ALL_CARTELA_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case CartelaActionTypes.FETCH_ALL_CARTELA_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CartelaActionTypes.FETCH_ALL_CARTELA_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CartelaActionTypes.FETCH_ONE_CARTELA:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case CartelaActionTypes.FETCH_ONE_CARTELA_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case CartelaActionTypes.FETCH_ONE_CARTELA_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CartelaActionTypes.FETCH_ONE_CARTELA_SUCCESS:
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
