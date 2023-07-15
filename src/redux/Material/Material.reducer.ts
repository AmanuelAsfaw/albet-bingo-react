import { resetApiCallState } from "../Utils";
import { MaterialActions, MaterialStateTypes } from "./Material.type";

const INITIAL_STATE: MaterialStateTypes = {
  fetchAll: resetApiCallState([]),
};

const MaterialReducer = (
  state: MaterialStateTypes = INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case MaterialActions.FETCH_MATERIAL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case MaterialActions.FETCH_MATERIAL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: action.payload,
          isPending: false,
          isSuccessful: true,
        },
      };

    case MaterialActions.FETCH_MATERIAL_ERROR:
      return {
        ...state,
        fetchAll: {
          error: action.payload,
          payload: [],
          isPending: false,
          isSuccessful: false,
        },
      };
    default:
      return state;
  }
};

export default MaterialReducer;
