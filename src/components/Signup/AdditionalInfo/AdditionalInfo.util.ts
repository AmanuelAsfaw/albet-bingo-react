import { BUILD, BuildType } from './../../../constants/Constants';
import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";

export const register = (value: any,ref:any) =>
  BUILD===BuildType.ENTERPRISE?
  axios.post(API_BASE_URI + `/user`, value):axios.post(API_BASE_URI + `/user?referenced=${ref}`, value);


  
