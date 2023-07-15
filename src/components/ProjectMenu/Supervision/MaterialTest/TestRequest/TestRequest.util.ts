import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { authHeader } from "../../../../../utilities/utilities";

import { Project } from "../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { TestRequest } from "../../../../../redux/TestRequest/TestRequest.type";

export type TestRequestPropType = {
  project: ApiCallState<Project>;
  fetchAllTestRequestData: ApiCallState<TestRequest[]>;
  fetchAllTestRequest: Function;
  fetchAllTestRequestReset: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/test_request", data, authHeader());
