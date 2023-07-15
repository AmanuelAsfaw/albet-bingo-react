import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type EmployerRequirement= {
    id: number | null;
    date:string;
    ref_no:string;
    description: string;
    user_id:number;
    document:Document;
    employer_requirement_statuses:EmployerRequirementStatusTypes[];
};

export type EmployerRequirementStatusTypes = {
  employer_requirement_id: number;
  type: "View" | "Check" | "Approve";
  status: number;
  assigned_by: number;
  user_id: number;
  id: number;
};

export type EmployerRequirementStateTypes = {
  fetchAll: ApiCallState<EmployerRequirement[]>;
  fetchOne: ApiCallState<EmployerRequirement | {}>;
};

export const EmployerRequirementActionTypes = {
  FETCH_ALL_EMPLOYER_REQUIREMENT: "FETCH_ALL_EMPLOYER_REQUIREMENT",
  FETCH_ALL_EMPLOYER_REQUIREMENT_RESET: "FETCH_ALL_EMPLOYER_REQUIREMENT_RESET",
  FETCH_ALL_EMPLOYER_REQUIREMENT_FAILURE: "FETCH_ALL_EMPLOYER_REQUIREMENT_FAILURE",
  FETCH_ALL_EMPLOYER_REQUIREMENT_SUCCESS: "FETCH_ALL_EMPLOYER_REQUIREMENT_SUCCESS",

  FETCH_ONE_EMPLOYER_REQUIREMENT: "FETCH_ONE_EMPLOYER_REQUIREMENT",
  FETCH_ONE_EMPLOYER_REQUIREMENT_RESET: "FETCH_ONE_EMPLOYER_REQUIREMENT_RESET",
  FETCH_ONE_EMPLOYER_REQUIREMENT_FAILURE: "FETCH_ONE_EMPLOYER_REQUIREMENT_FAILURE",
  FETCH_ONE_EMPLOYER_REQUIREMENT_SUCCESS: "FETCH_ONE_EMPLOYER_REQUIREMENT_SUCCESS",
};
