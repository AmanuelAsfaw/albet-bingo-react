import { ConceptPropType } from "../../components/ProjectMenu/Concept/utils/Concept.util";
import { ApiCallState, PagedData } from "../Utils";

export type ConceptPropsType = {
  id?: number;
  date: Date;
  type: string;
  description: string;
  file: string;
  uploaded_by: number;
};

export type ConceptStateTypes = {
  fetchAll: ApiCallState<ConceptPropType[]>;
  fetchOne: ApiCallState<ConceptPropType | {}>;
  fetchPaged: ApiCallState<PagedData<ConceptPropType[]>>;
};

export const ConceptActionTypes = {
  FETCH_ALL_CONCEPT: "FETCH_ALL_CONCEPT",
  FETCH_ALL_CONCEPT_RESET: "FETCH_ALL_CONCEPT_RESET",
  FETCH_ALL_CONCEPT_FAILURE: "FETCH_ALL_CONCEPT_FAILURE",
  FETCH_ALL_CONCEPT_SUCCESS: "FETCH_ALL_CONCEPT_SUCCESS",

  FETCH_PAGED_CONCEPT: "FETCH_PAGED_CONCEPT",
  FETCH_PAGED_CONCEPT_RESET: "FETCH_PAGED_CONCEPT_RESET",
  FETCH_PAGED_CONCEPT_FAILURE: "FETCH_PAGED_CONCEPT_FAILURE",
  FETCH_PAGED_CONCEPT_SUCCESS: "FETCH_PAGED_CONCEPT_SUCCESS",

  FETCH_ONE_CONCEPT: "FETCH_ONE_CONCEPT",
  FETCH_ONE_CONCEPT_RESET: "FETCH_ONE_CONCEPT_RESET",
  FETCH_ONE_CONCEPT_FAILURE: "FETCH_ONE_CONCEPT_FAILURE",
  FETCH_ONE_CONCEPT_SUCCESS: "FETCH_ONE_CONCEPT_SUCCESS",
};
