import { ApiCallState } from "../Utils";

export const VacancyActionTypes = {
  FETCH_ALL_VACANCY: "FETCH_ALL_VACANCY",
  FETCH_ALL_VACANCY_FAILURE: "FETCH_ALL_VACANCY_FAILURE",
  FETCH_ALL_VACANCY_RESET: "FETCH_ALL_VACANCY_RESET",
  FETCH_ALL_VACANCY_SUCCESS: "FETCH_ALL_VACANCY_SUCCESS",

  FETCH_ONE_VACANCY: "FETCH_ONE_VACANCY",
  FETCH_ONE_VACANCY_RESET: "FETCH_ONE_VACANCY_RESET",
  FETCH_ONE_VACANCY_FAILURE: "FETCH_ONE_VACANCY_FAILURE",
  FETCH_ONE_VACANCY_SUCCESS: "FETCH_ONE_VACANCY_SUCCESS",

  FETCH_ALL_BY_ATTRIBUTES: "FETCH_ALL_BY_ATTRIBUTES",
  FETCH_ALL_BY_ATTRIBUTES_FAILURE: "FETCH_ALL_BY_ATTRIBUTES_FAILURE",
  FETCH_ALL_BY_ATTRIBUTES_RESET: "FETCH_ALL_BY_ATTRIBUTES_RESET",
  FETCH_ALL_BY_ATTRIBUTES_SUCCESS: "FETCH_ALL_BY_ATTRIBUTES_SUCCESS",

  FETCH_ALL_BY_JOB_ID: "FETCH_ALL_BY_JOB_ID",
  FETCH_ALL_BY_JOB_ID_FAILURE: "FETCH_ALL_BY_JOB_ID_FAILURE",
  FETCH_ALL_BY_JOB_ID_RESET: "FETCH_ALL_BY_JOB_ID_RESET",
  FETCH_ALL_BY_JOB_ID_SUCCESS: "FETCH_ALL_BY_JOB_ID_SUCCESS",
};

export type Vacancy = {
  id: number;
  vacancy_reference: string;
  title: string;
  description: string;
  quantity: number;
  job_type: string;
  salary: number;
  salary_type: string;
  formData: string;
  status: string;
};

export type VacancyStateTypes = {
  fetchAll: ApiCallState<Vacancy[]>;
  fetchOne: ApiCallState<Vacancy | {}>;
  fetchAllAttribute: ApiCallState<Vacancy[]>;
  fetchByJobId: ApiCallState<Vacancy | {}>;
};
