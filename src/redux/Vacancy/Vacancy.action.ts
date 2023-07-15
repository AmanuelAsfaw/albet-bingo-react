import { VacancyActionTypes } from "./Vacancy.type";

/**
 *  fetch all vacancies
 *
 * @param payload
 */
export const fetchAllVacancies = (payload?: any) => ({
  type: VacancyActionTypes.FETCH_ALL_VACANCY,
  payload: payload,
});

/**
 * reset fetch vacancy state
 *
 * @param payload
 */
export const fetchOneVacancy = (payload: any) => ({
  type: VacancyActionTypes.FETCH_ONE_VACANCY,
  payload: payload,
});

/**
 * fetch single vacancy
 *
 * @param payload
 */
export const fetchAllVacanciesReset = (payload: any) => ({
  type: VacancyActionTypes.FETCH_ONE_VACANCY_RESET,
  payload: payload,
});

/**
 *fetch all vacancies by attributes
 * @param payload
 */
export const fetchAllVacanciesByAttributes = (payload?: any) => ({
  type: VacancyActionTypes.FETCH_ALL_BY_ATTRIBUTES,
  payload: payload,
});

/**
 *fetch all vacancies by attributes
 * @param payload
 */
export const fetchAllVacanciesByJobId = (payload?: any) => ({
  type: VacancyActionTypes.FETCH_ALL_BY_JOB_ID,
  payload: payload,
});
