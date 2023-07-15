import { VariationStateTypes, VariationActionTypes } from "./Variation.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: VariationStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const VariationReducer = (
  state: VariationStateTypes = INITIAL_STATE,
  action: any
): VariationStateTypes => {
  switch (action.type) {
    case VariationActionTypes.FETCH_ALL_VARIATION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case VariationActionTypes.FETCH_ALL_VARIATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case VariationActionTypes.FETCH_ALL_VARIATION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case VariationActionTypes.FETCH_ALL_VARIATION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case VariationActionTypes.FETCH_ONE_VARIATION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case VariationActionTypes.FETCH_ONE_VARIATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case VariationActionTypes.FETCH_ONE_VARIATION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case VariationActionTypes.FETCH_ONE_VARIATION_SUCCESS:
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

export default VariationReducer;
