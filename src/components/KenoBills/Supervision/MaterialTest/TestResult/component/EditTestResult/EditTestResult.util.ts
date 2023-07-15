import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { Casting } from "../../../../../../../redux/Casting/Casting.type";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { TestResult } from "../../../../../../../redux/TestResult/TestResult.type";
import { User } from "../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../redux/Utils";
import { authHeader } from "../../../../../../../utilities/utilities";

export type EditTestResultPropType = {
  data: TestResult;
  users: ApiCallState<User[]>;
  casting: ApiCallState<Casting[]>;
  project: ApiCallState<Project>;
  fetchAllTestResult: Function;
};

export const sendData = (data: any) =>
  axios.put(API_BASE_URI + "/test_result", data, authHeader());
