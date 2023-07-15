import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";

export type SuperUserPropType = {
  fetchAllUser: Function;
  users: ApiCallState<User[]>;
};

export type AddSuperUserPropType = {
  fetchAllUser: Function;
  users: ApiCallState<User[]>;
};

export const PUT = (data: any) => axios.put(API_BASE_URI + "/user", data);
