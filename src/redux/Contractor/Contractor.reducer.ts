import { ContractorStateTypes, ContractorActionTypes } from "./Contractor.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ContractorStateTypes = {
  fetchAll: resetApiCallState([]),
};

const ContractorReducer = (
  state: ContractorStateTypes = INITIAL_STATE,
  action: any
): ContractorStateTypes => {
  switch (action.type) {
    case ContractorActionTypes.FETCH_ALL_CONTRACTOR:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ContractorActionTypes.FETCH_ALL_CONTRACTOR_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ContractorActionTypes.FETCH_ALL_CONTRACTOR_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ContractorActionTypes.FETCH_ALL_CONTRACTOR_SUCCESS:
      return {
        ...state,
        fetchAll: {
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

export default ContractorReducer;
