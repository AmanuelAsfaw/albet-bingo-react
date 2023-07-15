import { PreConceptPropType } from "../../components/ProjectMenu/PreConcept/utils/PreConcept.util";
import { ApiCallState, PagedData } from "../Utils";

export type PreConceptPropsType = {
  id?: number;
  date: Date;
  type: string;
  description: string;
  file: string;
  uploaded_by: number;
};

export type PreConceptStateTypes = {
  fetchAll: ApiCallState<PreConceptPropType[]>;
  fetchOne: ApiCallState<PreConceptPropType | {}>;
  fetchPaged: ApiCallState<PagedData<PreConceptPropType[]>>;
};

export const PreConceptActionTypes = {
  FETCH_ALL_PRE_CONCEPT: "FETCH_ALL_PRE_CONCEPT",
  FETCH_ALL_PRE_CONCEPT_RESET: "FETCH_ALL_PRE_CONCEPT_RESET",
  FETCH_ALL_PRE_CONCEPT_FAILURE: "FETCH_ALL_PRE_CONCEPT_FAILURE",
  FETCH_ALL_PRE_CONCEPT_SUCCESS: "FETCH_ALL_PRE_CONCEPT_SUCCESS",

  FETCH_PAGED_PRE_CONCEPT: "FETCH_PAGED_PRE_CONCEPT",
  FETCH_PAGED_PRE_CONCEPT_RESET: "FETCH_PAGED_PRE_CONCEPT_RESET",
  FETCH_PAGED_PRE_CONCEPT_FAILURE: "FETCH_PAGED_PRE_CONCEPT_FAILURE",
  FETCH_PAGED_PRE_CONCEPT_SUCCESS: "FETCH_PAGED_PRE_CONCEPT_SUCCESS",

  FETCH_ONE_PRE_CONCEPT: "FETCH_ONE_PRE_CONCEPT",
  FETCH_ONE_PRE_CONCEPT_RESET: "FETCH_ONE_PRE_CONCEPT_RESET",
  FETCH_ONE_PRE_CONCEPT_FAILURE: "FETCH_ONE_PRE_CONCEPT_FAILURE",
  FETCH_ONE_PRE_CONCEPT_SUCCESS: "FETCH_ONE_PRE_CONCEPT_SUCCESS",
};
