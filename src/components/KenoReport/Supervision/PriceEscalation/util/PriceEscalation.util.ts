import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Project } from "../../../../../redux/Project/Project.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { PriceEscalationFile } from "../../../../../redux/PriceEscalationFile/PriceEscalationFile.type";
import { PaymentFile } from "../../../../../redux/PaymentFile/PaymentFile.type";

export type PriceEscalationPropType = {
  price_escalations: ApiCallState<PriceEscalationFile[]>;
  project: ApiCallState<Project>;
  fetchPayment: Function;
  fetchPriceEscalationFile: Function;
  fetchUser: Function;
};

export type AddPriceEscalationPropType = {
  price_escalations: ApiCallState<PriceEscalationFile[]>;
  project: ApiCallState<Project>;
  payments: ApiCallState<PaymentFile[]>;
  fetchPriceEscalationFile: Function;
  users: ApiCallState<User[]>;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/price-escalation-file", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
