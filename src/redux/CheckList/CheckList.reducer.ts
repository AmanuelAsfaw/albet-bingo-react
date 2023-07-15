import { CheckListStateTypes, CheckListActionTypes } from "./CheckList.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: CheckListStateTypes = {
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

const CheckListReducer = (
  state: CheckListStateTypes = INITIAL_STATE,
  action: any
): CheckListStateTypes => {
  switch (action.type) {
    case CheckListActionTypes.FETCH_ONE_CHECK_LIST:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListActionTypes.FETCH_ONE_CHECK_LIST_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case CheckListActionTypes.FETCH_ONE_CHECK_LIST_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListActionTypes.FETCH_ONE_CHECK_LIST_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST:
      return {
        ...state,
        fetchAllStructural: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_RESET:
      return {
        ...state,
        fetchAllStructural: resetApiCallState([]),
      };
    case CheckListActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_FAILURE:
      return {
        ...state,
        fetchAllStructural: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_SUCCESS:
      return {
        ...state,
        fetchAllStructural: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST:
      return {
        ...state,
        fetchAllArchitecture: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_RESET:
      return {
        ...state,
        fetchAllArchitecture: resetApiCallState([]),
      };
    case CheckListActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_FAILURE:
      return {
        ...state,
        fetchAllArchitecture: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_SUCCESS:
      return {
        ...state,
        fetchAllArchitecture: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST:
      return {
        ...state,
        fetchAllPlumbing: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_RESET:
      return {
        ...state,
        fetchAllPlumbing: resetApiCallState([]),
      };
    case CheckListActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_FAILURE:
      return {
        ...state,
        fetchAllPlumbing: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_SUCCESS:
      return {
        ...state,
        fetchAllPlumbing: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST:
      return {
        ...state,
        fetchAllMechanical: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_RESET:
      return {
        ...state,
        fetchAllMechanical: resetApiCallState([]),
      };
    case CheckListActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_FAILURE:
      return {
        ...state,
        fetchAllMechanical: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_SUCCESS:
      return {
        ...state,
        fetchAllMechanical: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST:
      return {
        ...state,
        fetchAllElectrical: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_RESET:
      return {
        ...state,
        fetchAllElectrical: resetApiCallState([]),
      };
    case CheckListActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_FAILURE:
      return {
        ...state,
        fetchAllElectrical: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_SUCCESS:
      return {
        ...state,
        fetchAllElectrical: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST:
      return {
        ...state,
        fetchAllFireFighting: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_RESET:
      return {
        ...state,
        fetchAllFireFighting: resetApiCallState([]),
      };
    case CheckListActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FAILURE:
      return {
        ...state,
        fetchAllFireFighting: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_SUCCESS:
      return {
        ...state,
        fetchAllFireFighting: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST:
      return {
        ...state,
        fetchAllSpecialSystem: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_RESET:
      return {
        ...state,
        fetchAllSpecialSystem: resetApiCallState([]),
      };
    case CheckListActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FAILURE:
      return {
        ...state,
        fetchAllSpecialSystem: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_SUCCESS:
      return {
        ...state,
        fetchAllSpecialSystem: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CheckListActionTypes.FETCH_ALL_SANITARY_CHECK_LIST:
      return {
        ...state,
        fetchAllSanitary: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CheckListActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_RESET:
      return {
        ...state,
        fetchAllSanitary: resetApiCallState([]),
      };
    case CheckListActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_FAILURE:
      return {
        ...state,
        fetchAllSanitary: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CheckListActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_SUCCESS:
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

export default CheckListReducer;
