import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { authHeader } from "../../../../../utilities/utilities";

import { Project } from "../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { TestResult } from "../../../../../redux/TestResult/TestResult.type";
import { User } from "../../../../../redux/User/User.type";

export type TestResultPropType = {
  project: ApiCallState<Project>;
  fetchAllTestResultData: ApiCallState<TestResult[]>;
  fetchAllTestResult: Function;
  fetchAllTestResultReset: Function;
  fetchOneUserData: ApiCallState<User>;
};

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/test_result/${id}`, authHeader());
