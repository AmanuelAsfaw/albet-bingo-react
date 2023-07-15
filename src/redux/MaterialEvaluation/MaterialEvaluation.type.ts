import { ApiCallState } from "../Utils";

export type MaterialEvaluation = {
  id: number;
  date: string;
  type: string;
  evaluation_no: string;
  material_evaluation_items: MaterialEvaluationItem[];
  material_evaluation_boqs: SpecificationBoq[];
  material_evaluation_approvals: ApprovalRqt[];
  designer_architect_1: string;
  designer_architect_2: string;
  project_coordinator: string;
};

export type MaterialEvaluationItem = {
  id: number;
  material_evaluation_id: number;
  item_no: string;
  material: string;
  spec_and_rqt: string;
  contractor_submittal: string;
  comment: string;
  status: string;
};
export type SpecificationBoq = {
  id: number;
  material_evaluation_id: number;
  spec_and_rqt: string;
  contractor_submittal: string;
  comment: string;
};
export type ApprovalRqt = {
  id: number;
  material_evaluation_id: number;
  spec_and_rqt: string;
  contractor_submittal: string;
  comment: string;
};

export type MaterialEvaluationStateTypes = {
  fetchAll: ApiCallState<MaterialEvaluation[]>;
  fetchOne: ApiCallState<MaterialEvaluation | {}>;
};

export const MaterialEvaluationActionTypes = {
  FETCH_ALL_MATERIAL_EVALUATION: "FETCH_ALL_MATERIAL_EVALUATION",
  FETCH_ALL_MATERIAL_EVALUATION_RESET: "FETCH_ALL_MATERIAL_EVALUATION_RESET",
  FETCH_ALL_MATERIAL_EVALUATION_FAILURE:
    "FETCH_ALL_MATERIAL_EVALUATION_FAILURE",
  FETCH_ALL_MATERIAL_EVALUATION_SUCCESS:
    "FETCH_ALL_MATERIAL_EVALUATION_SUCCESS",

  FETCH_ONE_MATERIAL_EVALUATION: "FETCH_ONE_MATERIAL_EVALUATION",
  FETCH_ONE_MATERIAL_EVALUATION_RESET: "FETCH_ONE_MATERIAL_EVALUATION_RESET",
  FETCH_ONE_MATERIAL_EVALUATION_FAILURE:
    "FETCH_ONE_MATERIAL_EVALUATION_FAILURE",
  FETCH_ONE_MATERIAL_EVALUATION_SUCCESS:
    "FETCH_ONE_MATERIAL_EVALUATION_SUCCESS",
};
