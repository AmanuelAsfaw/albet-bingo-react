import { RequestForTestStateTypes, RequestForTestActionTypes } from "./RequestForTest.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: RequestForTestStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const RequestForTestReducer = (
  state: RequestForTestStateTypes = INITIAL_STATE,
  action: any
): RequestForTestStateTypes => {
  switch (action.type) {
    case RequestForTestActionTypes.FETCH_ALL_REQUEST_FOR_TEST:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case RequestForTestActionTypes.FETCH_ALL_REQUEST_FOR_TEST_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RequestForTestActionTypes.FETCH_ALL_REQUEST_FOR_TEST_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RequestForTestActionTypes.FETCH_ALL_REQUEST_FOR_TEST_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case RequestForTestActionTypes.FETCH_ONE_REQUEST_FOR_TEST:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case RequestForTestActionTypes.FETCH_ONE_REQUEST_FOR_TEST_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RequestForTestActionTypes.FETCH_ONE_REQUEST_FOR_TEST_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RequestForTestActionTypes.FETCH_ONE_REQUEST_FOR_TEST_SUCCESS:
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

export default RequestForTestReducer;
