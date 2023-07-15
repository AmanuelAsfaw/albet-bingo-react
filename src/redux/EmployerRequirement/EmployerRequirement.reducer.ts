import { EmployerRequirementStateTypes, EmployerRequirementActionTypes } from "./EmployerRequirement.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: EmployerRequirementStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const EmployerRequirementReducer = (
  state: EmployerRequirementStateTypes = INITIAL_STATE,
  action: any
): EmployerRequirementStateTypes => {
  switch (action.type) {
    case EmployerRequirementActionTypes.FETCH_ALL_EMPLOYER_REQUIREMENT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case EmployerRequirementActionTypes.FETCH_ALL_EMPLOYER_REQUIREMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case EmployerRequirementActionTypes.FETCH_ALL_EMPLOYER_REQUIREMENT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case EmployerRequirementActionTypes.FETCH_ALL_EMPLOYER_REQUIREMENT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case EmployerRequirementActionTypes.FETCH_ONE_EMPLOYER_REQUIREMENT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case EmployerRequirementActionTypes.FETCH_ONE_EMPLOYER_REQUIREMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case EmployerRequirementActionTypes.FETCH_ONE_EMPLOYER_REQUIREMENT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case EmployerRequirementActionTypes.FETCH_ONE_EMPLOYER_REQUIREMENT_SUCCESS:
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

export default EmployerRequirementReducer;
