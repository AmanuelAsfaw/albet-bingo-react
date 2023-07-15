import { Casting } from "../Casting/Casting.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type TestResult = {
  id: number | null;

  project_id: number;
  supervisor_id: number;
  approved_by_id: number;
  contractor_id: number;
  employer_id: number;

  contract_number: number;
  site: string;
  testing_lab: string;
  testing_number: string;
  date_of_testing: Date;
  recommendation: string;

  test_result_items: TestResultItem[];
  test_result_documents: TestResultDocument[];

  supervisor: User;
  approved_by: User;
  contractor: User;
  employer: User;

  readonly createdAt: Date;
};

export type TestResultItem = {
  id: number;

  test_result_id: number;
  casting_id: number;

  material_tested: string;
  specified_quality: string;
  test_result: string;
  submitted_date: Date;
  is_accepted: boolean;

  casting: Casting;
};

export type TestResultDocument = {
  id: number;
  test_result_id: number;
  document_id: number;
  description: string;
};

export type TestResultStateTypes = {
  fetchAll: ApiCallState<TestResult[]>;
  fetchOne: ApiCallState<TestResult> | ApiCallState<null>;
};

export const TestResultActionTypes = {
  FETCH_ALL_TEST_RESULT: "FETCH_ALL_TEST_RESULT",
  FETCH_ALL_TEST_RESULT_RESET: "FETCH_ALL_TEST_RESULT_RESET",
  FETCH_ALL_TEST_RESULT_FAILURE: "FETCH_ALL_TEST_RESULT_FAILURE",
  FETCH_ALL_TEST_RESULT_SUCCESS: "FETCH_ALL_TEST_RESULT_SUCCESS",

  FETCH_ONE_TEST_RESULT: "FETCH_ONE_TEST_RESULT",
  FETCH_ONE_TEST_RESULT_RESET: "FETCH_ONE_TEST_RESULT_RESET",
  FETCH_ONE_TEST_RESULT_FAILURE: "FETCH_ONE_TEST_RESULT_FAILURE",
  FETCH_ONE_TEST_RESULT_SUCCESS: "FETCH_ONE_TEST_RESULT_SUCCESS",
};
