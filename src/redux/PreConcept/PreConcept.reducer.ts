import { InitPagedData } from "./../Utils";
import { PreConceptStateTypes, PreConceptActionTypes } from "./PreConcept.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: PreConceptStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const PreConceptReducer = (
  state: PreConceptStateTypes = INITIAL_STATE,
  action: any
): PreConceptStateTypes => {
  switch (action.type) {
    case PreConceptActionTypes.FETCH_ALL_PRE_CONCEPT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case PreConceptActionTypes.FETCH_ALL_PRE_CONCEPT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case PreConceptActionTypes.FETCH_ALL_PRE_CONCEPT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PreConceptActionTypes.FETCH_ALL_PRE_CONCEPT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case PreConceptActionTypes.FETCH_PAGED_PRE_CONCEPT:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case PreConceptActionTypes.FETCH_PAGED_PRE_CONCEPT_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case PreConceptActionTypes.FETCH_PAGED_PRE_CONCEPT_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PreConceptActionTypes.FETCH_PAGED_PRE_CONCEPT_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case PreConceptActionTypes.FETCH_ONE_PRE_CONCEPT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case PreConceptActionTypes.FETCH_ONE_PRE_CONCEPT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case PreConceptActionTypes.FETCH_ONE_PRE_CONCEPT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case PreConceptActionTypes.FETCH_ONE_PRE_CONCEPT_SUCCESS:
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

export default PreConceptReducer;
