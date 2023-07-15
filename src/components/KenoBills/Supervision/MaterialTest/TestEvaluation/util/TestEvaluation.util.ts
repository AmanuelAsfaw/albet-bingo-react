import { mean } from "mathjs";
import { std } from "mathjs";
import axios from "axios";
import { FC_CONSTANTS } from "../../../../../../constants/Constants";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Casting } from "../../../../../../redux/Casting/Casting.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { TestEvaluation } from "../../../../../../redux/TestEvaluation/TestEvaluation.type";
import { ApiCallState } from "../../../../../../redux/Utils";
import { toNumber } from "lodash";

export type TestEvaluationPropType = {
  test_evaluation: ApiCallState<TestEvaluation[]>;
  fetchCastings: Function;
  fetchEvaluation: Function;
  project: ApiCallState<Project>;
};

export type AddTestEvaluationPropType = {
  fetchEvaluation: Function;
  project: ApiCallState<Project>;
  casting: ApiCallState<Casting[]>;
};

export type DetailPropType = {
  test_evaluation: TestEvaluation;
  project: ApiCallState<Project>;
};

export type PrintPropType = {
  is_visible: boolean;
  setVisibility: Function;
  setSelected: Function;
  selected: TestEvaluation | undefined;
  project: ApiCallState<Project>;
};

export const getFuk = (fc: number) => {
  if (fc === 25) return 20;
  else if (fc === 30) return 25;
  else if (fc === 40) return 33;
  else if (fc === 50) return 40;
  else return 0;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/test-evaluation", data);

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + `/test-evaluation/${id}`);

export const calculate = (test_evaluation: TestEvaluation) => {
  let fck = 0;
  let expected_fc = 0;
  let expected_fck = 0;
  let standard_deviation = 0;
  let mean_value = 0;
  let fck_test = 0;
  let fck_status = false;
  let conversion = 0;
  let fck_ultimate = 0;
  let fck_ultimate_status = false;
  if (test_evaluation) {
    let { test_age, compression, mu } = test_evaluation;
    let fc = toNumber(test_evaluation?.casting?.concrete_grade.split("-")[1]);
    fck = getFuk(fc);
    expected_fc = FC_CONSTANTS[test_age] * fc;
    expected_fck = FC_CONSTANTS[test_age] * fck;
    standard_deviation = std(compression);
    mean_value = mean(compression);
    fck_test = mean_value - mu * standard_deviation;
    fck_status = fck_test > expected_fck;
    conversion = FC_CONSTANTS[test_age];
    fck_ultimate = fck_test / conversion;
    fck_ultimate_status = fck_ultimate > fck;
  }
  return {
    fck,
    expected_fc,
    expected_fck,
    standard_deviation,
    mean_value,
    fck_test,
    fck_status,
    fck_ultimate,
    conversion,
    fck_ultimate_status,
  };
};
