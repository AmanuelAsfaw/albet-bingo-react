import {
  FileStorageStateTypes,
  FileStorageActionTypes,
} from "./FileStorage.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: FileStorageStateTypes = {
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

const FileStorageReducer = (
  state: FileStorageStateTypes = INITIAL_STATE,
  action: any
): FileStorageStateTypes => {
  switch (action.type) {
    case FileStorageActionTypes.FETCH_ONE_FILE_STORAGE:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case FileStorageActionTypes.FETCH_ONE_FILE_STORAGE_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case FileStorageActionTypes.FETCH_ONE_FILE_STORAGE_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FileStorageActionTypes.FETCH_ONE_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case FileStorageActionTypes.FETCH_ALL_STRUCTURAL_FILE_STORAGE:
      return {
        ...state,
        fetchAllStructural: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_STRUCTURAL_FILE_STORAGE_RESET:
      return {
        ...state,
        fetchAllStructural: resetApiCallState([]),
      };
    case FileStorageActionTypes.FETCH_ALL_STRUCTURAL_FILE_STORAGE_FAILURE:
      return {
        ...state,
        fetchAllStructural: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_STRUCTURAL_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        fetchAllStructural: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case FileStorageActionTypes.FETCH_ALL_ARCHITECTURE_FILE_STORAGE:
      return {
        ...state,
        fetchAllArchitecture: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_ARCHITECTURE_FILE_STORAGE_RESET:
      return {
        ...state,
        fetchAllArchitecture: resetApiCallState([]),
      };
    case FileStorageActionTypes.FETCH_ALL_ARCHITECTURE_FILE_STORAGE_FAILURE:
      return {
        ...state,
        fetchAllArchitecture: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_ARCHITECTURE_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        fetchAllArchitecture: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case FileStorageActionTypes.FETCH_ALL_PLUMBING_FILE_STORAGE:
      return {
        ...state,
        fetchAllPlumbing: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_PLUMBING_FILE_STORAGE_RESET:
      return {
        ...state,
        fetchAllPlumbing: resetApiCallState([]),
      };
    case FileStorageActionTypes.FETCH_ALL_PLUMBING_FILE_STORAGE_FAILURE:
      return {
        ...state,
        fetchAllPlumbing: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_PLUMBING_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        fetchAllPlumbing: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case FileStorageActionTypes.FETCH_ALL_MECHANICAL_FILE_STORAGE:
      return {
        ...state,
        fetchAllMechanical: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_MECHANICAL_FILE_STORAGE_RESET:
      return {
        ...state,
        fetchAllMechanical: resetApiCallState([]),
      };
    case FileStorageActionTypes.FETCH_ALL_MECHANICAL_FILE_STORAGE_FAILURE:
      return {
        ...state,
        fetchAllMechanical: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_MECHANICAL_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        fetchAllMechanical: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case FileStorageActionTypes.FETCH_ALL_ELECTRICAL_FILE_STORAGE:
      return {
        ...state,
        fetchAllElectrical: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_ELECTRICAL_FILE_STORAGE_RESET:
      return {
        ...state,
        fetchAllElectrical: resetApiCallState([]),
      };
    case FileStorageActionTypes.FETCH_ALL_ELECTRICAL_FILE_STORAGE_FAILURE:
      return {
        ...state,
        fetchAllElectrical: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_ELECTRICAL_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        fetchAllElectrical: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case FileStorageActionTypes.FETCH_ALL_FIRE_FIGHTING_FILE_STORAGE:
      return {
        ...state,
        fetchAllFireFighting: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_FIRE_FIGHTING_FILE_STORAGE_RESET:
      return {
        ...state,
        fetchAllFireFighting: resetApiCallState([]),
      };
    case FileStorageActionTypes.FETCH_ALL_FIRE_FIGHTING_FILE_STORAGE_FAILURE:
      return {
        ...state,
        fetchAllFireFighting: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_FIRE_FIGHTING_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        fetchAllFireFighting: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case FileStorageActionTypes.FETCH_ALL_SPECIAL_SYSTEM_FILE_STORAGE:
      return {
        ...state,
        fetchAllSpecialSystem: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_SPECIAL_SYSTEM_FILE_STORAGE_RESET:
      return {
        ...state,
        fetchAllSpecialSystem: resetApiCallState([]),
      };
    case FileStorageActionTypes.FETCH_ALL_SPECIAL_SYSTEM_FILE_STORAGE_FAILURE:
      return {
        ...state,
        fetchAllSpecialSystem: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_SPECIAL_SYSTEM_FILE_STORAGE_SUCCESS:
      return {
        ...state,
        fetchAllSpecialSystem: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case FileStorageActionTypes.FETCH_ALL_SANITARY_FILE_STORAGE:
      return {
        ...state,
        fetchAllSanitary: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_SANITARY_FILE_STORAGE_RESET:
      return {
        ...state,
        fetchAllSanitary: resetApiCallState([]),
      };
    case FileStorageActionTypes.FETCH_ALL_SANITARY_FILE_STORAGE_FAILURE:
      return {
        ...state,
        fetchAllSanitary: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case FileStorageActionTypes.FETCH_ALL_SANITARY_FILE_STORAGE_SUCCESS:
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

export default FileStorageReducer;
