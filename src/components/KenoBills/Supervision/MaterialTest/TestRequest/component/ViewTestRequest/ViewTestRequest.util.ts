import { ApiCallState } from "../../../../../../../redux/Utils";

import { Project } from "../../../../../../../redux/Project/Project.type";
import { TestRequest } from "../../../../../../../redux/TestRequest/TestRequest.type";

export type ViewTestRequestPropType = {
  project: ApiCallState<Project>;
  fetchOneTestResult: Function;
  fetchOneTestResultReset: Function;
  fetchOne: ApiCallState<TestRequest>;
  test_request: TestRequest;
};
