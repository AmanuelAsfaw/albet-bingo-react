import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Payments } from "../../../../../../redux/Payments/Payments.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type PaymentsPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  payments: ApiCallState<Payments[]>;
  fetchAllPayments: Function;
};

export type AddPaymentsPropType = {
  fetchAllPayments: Function;
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
};

export type ViewPaymentsPropType = {
  users: ApiCallState<User[]>;
  payment: Payments;
};

export const sendPaymentsData = (data: any) =>
  axios.post(API_BASE_URI + "/payments", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/payments/${id}`);
