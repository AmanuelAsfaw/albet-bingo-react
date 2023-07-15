import { ApiCallState } from "../../../../../../../redux/Utils";

import { Project } from "../../../../../../../redux/Project/Project.type";
import { TestResult } from "../../../../../../../redux/TestResult/TestResult.type";

export type ViewAddTestResultPropType = {
  project: ApiCallState<Project>;
  fetchOneTestResult: Function;
  fetchOneTestResultReset: Function;
  fetchOne: ApiCallState<TestResult>;
  test_result: TestResult;
};
