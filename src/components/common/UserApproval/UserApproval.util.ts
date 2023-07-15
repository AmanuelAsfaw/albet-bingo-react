import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { Project } from "../../../redux/Project/Project.type";
import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";

export type UserApprovalPropType = {
  type:
    | "material_requisition"
    | "purchase_requisition"
    | "purchase_order"
    | "good_return"
    | "good_out"
    | "good_received"
    | "test_result"
    | "test_request"
    | "submittal"
    | "site-diary"
    | "weekly-report"
    | "meeting"
    | "replenishment-request"
    | "variation-file"
    | "price-escalation-file";
  approved_by: User | null;
  checked_by?: User | null;
  is_approved: boolean;
  is_checked?: boolean;
  on_revision?: boolean;
  item_id: number;

  fetchTestResult: Function;
  fetchTestRequest: Function;
  fetchSiteDiary: Function;
  fetchWeeklyReport: Function;
  fetchMeeting: Function;
  fetchPriceEscalationFile: Function;

  good_received_type?: string;
  approve_only?: boolean;
  has_revision?: boolean;
  fetchUser: Function;
  user: ApiCallState<User>;
  project: ApiCallState<Project>;
};

export const Approve = (type: string, id: number) =>
  axios.put(`${API_BASE_URI}/${type}/approve`, { id });

export const Revise = (type: string, id: number) =>
  axios.put(`${API_BASE_URI}/${type}/revise`, { id });

export const Check = (type: string, id: number) =>
  axios.put(`${API_BASE_URI}/${type}/check`, { id });
