import {
  CheckListFormStateTypes,
  CheckListFormActionTypes,
} from "./CheckListForm.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: CheckListFormStateTypes = {
  fetchOne: resetApiCallState({}),

  fetchAllStructural: resetApiCallState([]),
  fetchAllArchitecture: resetApiCallState([]),
  fetchAllPlumbing: resetApiCallState([]),
  fetchAllMechanical: resetApiCallState([]),
  fetchAllElectrical: resetApiCallState([]),
  fetchAllFireFighting: resetApiCallState([]),
  fetchAllSpecialSystem: resetApiCallState([]),
  fetchAllSanitary: resetApiCallState([]),
};

const CheckListFormReducer = (
  state: CheckListFormStateTypes = INITIAL_STATE,
  action: any
): CheckListFormStateTypes => {
  switch (action.type) {
    case CheckListFormActionTypes.FETCH_ONE_CHECK_LIST_FORM:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListFormActionTypes.FETCH_ONE_CHECK_LIST_FORM_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case CheckListFormActionTypes.FETCH_ONE_CHECK_LIST_FORM_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListFormActionTypes.FETCH_ONE_CHECK_LIST_FORM_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListFormActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_FORM:
      return {
        ...state,
        fetchAllStructural: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_FORM_RESET:
      return {
        ...state,
        fetchAllStructural: resetApiCallState([]),
      };
    case CheckListFormActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_FORM_FAILURE:
      return {
        ...state,
        fetchAllStructural: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_FORM_SUCCESS:
      return {
        ...state,
        fetchAllStructural: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListFormActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_FORM:
      return {
        ...state,
        fetchAllArchitecture: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_FORM_RESET:
      return {
        ...state,
        fetchAllArchitecture: resetApiCallState([]),
      };
    case CheckListFormActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_FORM_FAILURE:
      return {
        ...state,
        fetchAllArchitecture: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_FORM_SUCCESS:
      return {
        ...state,
        fetchAllArchitecture: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListFormActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_FORM:
      return {
        ...state,
        fetchAllPlumbing: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_FORM_RESET:
      return {
        ...state,
        fetchAllPlumbing: resetApiCallState([]),
      };
    case CheckListFormActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_FORM_FAILURE:
      return {
        ...state,
        fetchAllPlumbing: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_FORM_SUCCESS:
      return {
        ...state,
        fetchAllPlumbing: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListFormActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_FORM:
      return {
        ...state,
        fetchAllMechanical: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_FORM_RESET:
      return {
        ...state,
        fetchAllMechanical: resetApiCallState([]),
      };
    case CheckListFormActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_FORM_FAILURE:
      return {
        ...state,
        fetchAllMechanical: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_FORM_SUCCESS:
      return {
        ...state,
        fetchAllMechanical: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListFormActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_FORM:
      return {
        ...state,
        fetchAllElectrical: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_FORM_RESET:
      return {
        ...state,
        fetchAllElectrical: resetApiCallState([]),
      };
    case CheckListFormActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_FORM_FAILURE:
      return {
        ...state,
        fetchAllElectrical: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_FORM_SUCCESS:
      return {
        ...state,
        fetchAllElectrical: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListFormActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FORM:
      return {
        ...state,
        fetchAllFireFighting: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FORM_RESET:
      return {
        ...state,
        fetchAllFireFighting: resetApiCallState([]),
      };
    case CheckListFormActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FORM_FAILURE:
      return {
        ...state,
        fetchAllFireFighting: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FORM_SUCCESS:
      return {
        ...state,
        fetchAllFireFighting: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListFormActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FORM:
      return {
        ...state,
        fetchAllSpecialSystem: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FORM_RESET:
      return {
        ...state,
        fetchAllSpecialSystem: resetApiCallState([]),
      };
    case CheckListFormActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FORM_FAILURE:
      return {
        ...state,
        fetchAllSpecialSystem: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FORM_SUCCESS:
      return {
        ...state,
        fetchAllSpecialSystem: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListFormActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_FORM:
      return {
        ...state,
        fetchAllSanitary: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_FORM_RESET:
      return {
        ...state,
        fetchAllSanitary: resetApiCallState([]),
      };
    case CheckListFormActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_FORM_FAILURE:
      return {
        ...state,
        fetchAllSanitary: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListFormActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_FORM_SUCCESS:
      return {
        ...state,
        fetchAllSanitary: {
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

export default CheckListFormReducer;
