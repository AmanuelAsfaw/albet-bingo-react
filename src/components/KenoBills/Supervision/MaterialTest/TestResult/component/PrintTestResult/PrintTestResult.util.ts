import { Project } from "../../../../../../../redux/Project/Project.type";
import { TestResult } from "../../../../../../../redux/TestResult/TestResult.type";
import { User } from "../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type PrintTestResultPropType = {
  project: ApiCallState<Project>;
  test_result: TestResult | null;
  // fetchOneUserData: ApiCallState<User>
};
