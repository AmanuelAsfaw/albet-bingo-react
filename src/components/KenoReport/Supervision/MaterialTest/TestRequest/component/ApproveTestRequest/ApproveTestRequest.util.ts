import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { authHeader } from "../../../../../../../utilities/utilities";
import { TestRequest } from "../../../../../../../redux/TestRequest/TestRequest.type";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type ApproveTestRequestPropType = {
  fetchAllTestRequest: Function;
  testRequest: TestRequest;
  project: ApiCallState<Project>;
};

export const approve = (id: any) =>
  axios.put(API_BASE_URI + "/test_request/approve", { id }, authHeader());
