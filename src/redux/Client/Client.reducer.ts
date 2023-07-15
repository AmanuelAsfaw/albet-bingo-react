import { ClientStateTypes, ClientActionTypes } from "./Client.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ClientStateTypes = {
  fetchAll: resetApiCallState([]),
};

const ClientReducer = (
  state: ClientStateTypes = INITIAL_STATE,
  action: any
): ClientStateTypes => {
  switch (action.type) {
    case ClientActionTypes.FETCH_ALL_CLIENT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ClientActionTypes.FETCH_ALL_CLIENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ClientActionTypes.FETCH_ALL_CLIENT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ClientActionTypes.FETCH_ALL_CLIENT_SUCCESS:
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

export default ClientReducer;
