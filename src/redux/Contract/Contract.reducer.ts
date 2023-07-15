import { ContractStateTypes, ContractActionTypes } from "./Contract.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ContractStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ContractReducer = (
  state: ContractStateTypes = INITIAL_STATE,
  action: any
): ContractStateTypes => {
  switch (action.type) {
    case ContractActionTypes.FETCH_ALL_CONTRACT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ContractActionTypes.FETCH_ALL_CONTRACT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ContractActionTypes.FETCH_ALL_CONTRACT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ContractActionTypes.FETCH_ALL_CONTRACT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ContractActionTypes.FETCH_ONE_CONTRACT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ContractActionTypes.FETCH_ONE_CONTRACT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ContractActionTypes.FETCH_ONE_CONTRACT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ContractActionTypes.FETCH_ONE_CONTRACT_SUCCESS:
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

export default ContractReducer;
