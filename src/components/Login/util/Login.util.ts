import axios from "axios";
// import { API_BASE_URI } from "../../../redux/ApiCall";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";
import { User } from "../../../redux/User/User.type";
import { RouteConstants } from "../../../router/Constants";

export const login = (data: any) =>
  axios.post(API_BASE_URI + "/bingo/api-token-auth", data);
  // axios.post(API_BASE_URI + "/casher/custome-login", data);

export const sendConfirmation = (email: string) => {
  return axios.post(API_BASE_URI + `/user/send-confirmation/${email}`);
};

export const getRoute = (user: User) => {
  console.log(user);
  
  if (user.access_type) {
    return user.access_type[0];
  } else {
    return RouteConstants.PROJECTS;
  }
};
