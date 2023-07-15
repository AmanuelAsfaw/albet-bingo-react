import axios from "axios";
import { KlingMaterialApproval } from "../../../../../redux/KlingMaterialApproval/KlingMaterialApproval.type";
import { Project } from "../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { User } from "../../../../../redux/User/User.type";
import moment from "moment";

export type KlingMaterialApprovalPropType = {
  project: ApiCallState<Project>;
  kling_material_approval: ApiCallState<KlingMaterialApproval[]>;
  fetchAllKlingMaterialApproval: Function;
  fetchUsers: Function;
};

export const RequestType = {
  SUBMISSION: "New Submission",
  RESUBMISSION: "Resubmission",
};

export const updateSeen = (data: any) =>
  axios.post(API_BASE_URI + "/kling-material-approval/seen", data);

  export const sendRemark = (data: any) =>
  axios.post(API_BASE_URI + "/kling-material-approval-remark", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const sendShareMaterialApproval = (data: any) =>
  axios.post(
    API_BASE_URI + "/kling-material-approval/share-material-approval",
    data
  );

export const deleteShareMaterialApprovalData = (id: any) =>
  axios.delete(
    API_BASE_URI + `/kling-material-approval/share-material-approval/${id}`
  );

export type KlingMaterialApprovalRemarkPropType = {
  remarkData: KlingMaterialApproval;
  users: ApiCallState<User[]>;
  fetchAllUser: Function;
  fetchKlingMaterialApproval: Function;
};

export type ShareKlingMaterialApprovalPropType = {
  fetchKlingMaterialApproval: Function;
  fetchAllUser: Function;
  users: ApiCallState<User[]>;
  klingMaterialApproval: KlingMaterialApproval;
  project: ApiCallState<Project>;
};

export type AddKMAPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  fetchAllKlingMaterialApproval: Function;
  klingMaterialApprovals: ApiCallState<KlingMaterialApproval[]>;
};

export type SubmittalInformationPropType = {
  submittal_info: any;
  setSubmittalInfo: Function;
  is_new: boolean;
  klingMaterialApprovals: ApiCallState<KlingMaterialApproval[]>;
};

export type SubmittalInformationItemPropType = {
  submittal_info_item: any;
  setSubmittalInfoItem: Function;
  is_new: boolean;
};

export type ConsultantResponsePropType = {
  response: any;
  setResponse: Function;
  users: ApiCallState<User[]>;
  is_new: boolean;
};

export type ConsultantResponseItemPropType = {
  response_item: any;
  setResponseItem: Function;
  is_new: boolean;
};

export type CommentsPropType = {
  comments: any;
  setComments: Function;
  is_new: boolean;
  is_comment: boolean;
  is_review: boolean;
  users: ApiCallState<User[]>;
  kling_material_approval: KlingMaterialApproval;
};

export type EditKMAPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  kling_material_approval: KlingMaterialApproval;
  fetchAllKlingMaterialApproval: Function;
  klingMaterialApprovals: ApiCallState<KlingMaterialApproval[]>;
};

export type ViewKMAPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  kling_material_approval: KlingMaterialApproval;
};

export type ViewKlingMaterialApprovalPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  fetchKlingMaterialApproval: Function;
  kling_material_approval: ApiCallState<KlingMaterialApproval | null>;
};

export type ResponsePropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  kling_material_approval: KlingMaterialApproval;
  fetchAllKlingMaterialApproval: Function;
};

export type ClientResponsePropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  kling_material_approval: KlingMaterialApproval;
  fetchAllKlingMaterialApproval: Function;
};

export type CommentPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  kling_material_approval: KlingMaterialApproval;
  fetchAllKlingMaterialApproval: Function;
};

export type PrintMAPropType = {
  project: ApiCallState<Project>;

  dataAction: [
    KlingMaterialApproval | null,
    React.Dispatch<React.SetStateAction<KlingMaterialApproval | null>>
  ];
};

export type PrintOvidKlingPropType = {
  project: ApiCallState<Project>;

  dataAction: [
    KlingMaterialApproval | null,
    React.Dispatch<React.SetStateAction<KlingMaterialApproval | null>>
  ];
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/kling-material-approval", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateResponseData = (data: any) =>
  axios.post(
    API_BASE_URI + "/kling-material-approval/consultant-response",
    data
  );

export const updateCommentData = (data: any) =>
  axios.post(API_BASE_URI + "/kling-material-approval/comment", data);

export const updateClientData = (data: any) =>
  axios.post(API_BASE_URI + "/kling-material-approval/client-response", data);

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + "/kling-material-approval/" + id);

  export const parseData = (remark: KlingMaterialApproval, user_id: number) => {
    let counter = 0;
    let user = remark.users.find((e: any) => e.id === user_id);
    if (user) {
      let last_seen = user?.["user_kma"].last_seen;
      remark.kling_material_approval_remarks.forEach((e) => {
        if (!moment(last_seen).isSameOrAfter(moment(e.createdAt), "minute"))
          counter += 1;
      });
    } else {
      remark.kling_material_approval_remarks.forEach((e) => {
        counter += 1;
      });
    }
    return { counter };
  };