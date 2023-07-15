import {
  PriceEscalationFileStateTypes,
  PriceEscalationFileActionTypes,
} from "./PriceEscalationFile.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: PriceEscalationFileStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const PriceEscalationFileReducer = (
  state: PriceEscalationFileStateTypes = INITIAL_STATE,
  action: any
): PriceEscalationFileStateTypes => {
  switch (action.type) {
    case PriceEscalationFileActionTypes.FETCH_ALL_PRICE_ESCALATION_FILE:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case PriceEscalationFileActionTypes.FETCH_ALL_PRICE_ESCALATION_FILE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case PriceEscalationFileActionTypes.FETCH_ALL_PRICE_ESCALATION_FILE_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PriceEscalationFileActionTypes.FETCH_ALL_PRICE_ESCALATION_FILE_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case PriceEscalationFileActionTypes.FETCH_ONE_PRICE_ESCALATION_FILE:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case PriceEscalationFileActionTypes.FETCH_ONE_PRICE_ESCALATION_FILE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case PriceEscalationFileActionTypes.FETCH_ONE_PRICE_ESCALATION_FILE_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PriceEscalationFileActionTypes.FETCH_ONE_PRICE_ESCALATION_FILE_SUCCESS:
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

export default PriceEscalationFileReducer;
