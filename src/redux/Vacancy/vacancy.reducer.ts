import { resetApiCallState } from "../Utils";
import { VacancyActionTypes, VacancyStateTypes } from "./Vacancy.type";

const INITIAL_STATE: VacancyStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchAllAttribute: resetApiCallState([]),
  fetchByJobId: resetApiCallState({}),
};

const VacancyReducer = (
  state: VacancyStateTypes = INITIAL_STATE,
  action: any
): VacancyStateTypes => {
  switch (action.type) {
    case VacancyActionTypes.FETCH_ALL_VACANCY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case VacancyActionTypes.FETCH_ALL_VACANCY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case VacancyActionTypes.FETCH_ALL_VACANCY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case VacancyActionTypes.FETCH_ALL_VACANCY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case VacancyActionTypes.FETCH_ALL_BY_ATTRIBUTES:
      return {
        ...state,
        fetchAllAttribute: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case VacancyActionTypes.FETCH_ALL_BY_ATTRIBUTES_RESET:
      return {
        ...state,
        fetchAllAttribute: resetApiCallState([]),
      };
    case VacancyActionTypes.FETCH_ALL_BY_ATTRIBUTES_FAILURE:
      return {
        ...state,
        fetchAllAttribute: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case VacancyActionTypes.FETCH_ALL_BY_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        fetchAllAttribute: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case VacancyActionTypes.FETCH_ALL_BY_JOB_ID:
      return {
        ...state,
        fetchByJobId: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case VacancyActionTypes.FETCH_ALL_BY_JOB_ID_RESET:
      return {
        ...state,
        fetchByJobId: resetApiCallState([]),
      };
    case VacancyActionTypes.FETCH_ALL_BY_JOB_ID_FAILURE:
      return {
        ...state,
        fetchByJobId: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case VacancyActionTypes.FETCH_ALL_BY_JOB_ID_SUCCESS:
      return {
        ...state,
        fetchByJobId: {
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

export default VacancyReducer;
