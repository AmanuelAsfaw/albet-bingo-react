import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Project } from "../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";
import { PaymentRequest } from "../../../../../../redux/PaymentRequest/PaymentRequest.type";
import moment from "moment";

export type PaymentRequestPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  payment_request: ApiCallState<PaymentRequest[]>;
  fetchAllPaymentRequest: Function;
};

export type AddPaymentRequestPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  fetchAllPaymentRequest: Function;
};

export type ViewPaymentRequestPropType = {
  payment_request: PaymentRequest;
  users: ApiCallState<User[]>;
};

export type RemarkPropType = {
  remarkData: any;
  users: User[];
  fetchAllPaymentRequest: Function;
  project: Project;
};

export type StatusPropType = {
  id: number;
  is_approved: boolean;
  is_revised: boolean;
  is_rejected: boolean;
  reviewed_by: any;
  project: Project;
  fetchAllPaymentRequest: Function;
};

export const sendPaymentRequestData = (data: any) =>
  axios.post(API_BASE_URI + "/payment-request", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const sendRemark = (data: any) =>
  axios.post(API_BASE_URI + "/payment-request-remark", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSeen = (data: any) =>
  axios.post(API_BASE_URI + "/payment-request/seen", data);

export const sendApproval = (data: any) =>
  axios.put(API_BASE_URI + "/payment-request", data);

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/payment-request/${id}`);

export const parseData = (remark: PaymentRequest, user_id: number) => {
  let counter = 0;
  let user = remark.users.find((e: any) => e.id === user_id);
  if (user) {
    let last_seen = user?.["user_payment_request"].last_seen;
    remark.payment_request_remarks.forEach((e) => {
      if (!moment(last_seen).isSameOrAfter(moment(e.createdAt), "minute"))
        counter += 1;
    });
  } else {
    remark.payment_request_remarks.forEach((e) => {
      counter += 1;
    });
  }
  return { counter };
};
