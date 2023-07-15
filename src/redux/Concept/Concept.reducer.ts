import { InitPagedData } from "../Utils";
import { ConceptStateTypes, ConceptActionTypes } from "./Concept.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ConceptStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const ConceptReducer = (
  state: ConceptStateTypes = INITIAL_STATE,
  action: any
): ConceptStateTypes => {
  switch (action.type) {
    case ConceptActionTypes.FETCH_ALL_CONCEPT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ConceptActionTypes.FETCH_ALL_CONCEPT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ConceptActionTypes.FETCH_ALL_CONCEPT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ConceptActionTypes.FETCH_ALL_CONCEPT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case ConceptActionTypes.FETCH_PAGED_CONCEPT:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case ConceptActionTypes.FETCH_PAGED_CONCEPT_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case ConceptActionTypes.FETCH_PAGED_CONCEPT_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ConceptActionTypes.FETCH_PAGED_CONCEPT_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ConceptActionTypes.FETCH_ONE_CONCEPT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ConceptActionTypes.FETCH_ONE_CONCEPT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ConceptActionTypes.FETCH_ONE_CONCEPT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ConceptActionTypes.FETCH_ONE_CONCEPT_SUCCESS:
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

export default ConceptReducer;
