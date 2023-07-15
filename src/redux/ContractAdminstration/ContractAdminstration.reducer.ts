import { ContractAdminstrationStateTypes, ContractAdminstrationActionTypes } from "./ContractAdminstration.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ContractAdminstrationStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ContractAdminstrationReducer = (
  state: ContractAdminstrationStateTypes = INITIAL_STATE,
  action: any
): ContractAdminstrationStateTypes => {
  switch (action.type) {
    case ContractAdminstrationActionTypes.FETCH_ALL_CONTRACT_ADMINSTRATION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ContractAdminstrationActionTypes.FETCH_ALL_CONTRACT_ADMINSTRATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ContractAdminstrationActionTypes.FETCH_ALL_CONTRACT_ADMINSTRATION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ContractAdminstrationActionTypes.FETCH_ALL_CONTRACT_ADMINSTRATION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ContractAdminstrationActionTypes.FETCH_ONE_CONTRACT_ADMINSTRATION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ContractAdminstrationActionTypes.FETCH_ONE_CONTRACT_ADMINSTRATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ContractAdminstrationActionTypes.FETCH_ONE_CONTRACT_ADMINSTRATION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ContractAdminstrationActionTypes.FETCH_ONE_CONTRACT_ADMINSTRATION_SUCCESS:
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

export default ContractAdminstrationReducer;
