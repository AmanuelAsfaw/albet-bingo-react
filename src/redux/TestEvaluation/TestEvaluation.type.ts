import { Casting } from "../Casting/Casting.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type TestEvaluation = {
  id: number;

  mu: number;
  casting: Casting;
  test_age: number;
  compression: any;
  date: string;
  user: User;
  comment: string;
  status: boolean;
};

export type TestEvaluationStateTypes = {
  fetchAll: ApiCallState<TestEvaluation[]>;
  fetchOne: ApiCallState<TestEvaluation | {}>;
};

export const TestEvaluationActionTypes = {
  FETCH_ALL_TEST_EVALUATION: "FETCH_ALL_TEST_EVALUATION",
  FETCH_ALL_TEST_EVALUATION_RESET: "FETCH_ALL_TEST_EVALUATION_RESET",
  FETCH_ALL_TEST_EVALUATION_FAILURE: "FETCH_ALL_TEST_EVALUATION_FAILURE",
  FETCH_ALL_TEST_EVALUATION_SUCCESS: "FETCH_ALL_TEST_EVALUATION_SUCCESS",

  FETCH_ONE_TEST_EVALUATION: "FETCH_ONE_TEST_EVALUATION",
  FETCH_ONE_TEST_EVALUATION_RESET: "FETCH_ONE_TEST_EVALUATION_RESET",
  FETCH_ONE_TEST_EVALUATION_FAILURE: "FETCH_ONE_TEST_EVALUATION_FAILURE",
  FETCH_ONE_TEST_EVALUATION_SUCCESS: "FETCH_ONE_TEST_EVALUATION_SUCCESS",
};
