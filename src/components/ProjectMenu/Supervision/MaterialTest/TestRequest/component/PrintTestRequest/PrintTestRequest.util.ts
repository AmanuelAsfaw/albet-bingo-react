import { Project } from "../../../../../../../redux/Project/Project.type";
import { TestRequest } from "../../../../../../../redux/TestRequest/TestRequest.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type PrintTestRequestPropType = {
  project: ApiCallState<Project>;
  test_request: TestRequest | null;
};
