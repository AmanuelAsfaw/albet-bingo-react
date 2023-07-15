import axios from "axios";
import moment from "moment";
import { NEW_LETTER_TYPE } from "../../../constants/Constants";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { Letter } from "../../../redux/Letter/Letter.type";
import { Project } from "../../../redux/Project/Project.type";
import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";

export type LetterPropType = {
  letters: ApiCallState<Letter[]>;
  fetchLetter: Function;
  tab: any;
};

export type AddLetterPropType = {
  fetchLetter: Function;
  projects: ApiCallState<Project[]>
};

export type ShareLetterPropType = {
  fetchLetter: Function;
  fetchAllUser: Function;
  users: ApiCallState<User[]>;
  letter: Letter;
};

export type RemarkPropType = {
  remarkData: Letter;
  users: ApiCallState<User[]>;
  fetchAllUser: Function;
  fetchLetter: Function;
};

export const sendRemark = (data: any) =>
  axios.post(API_BASE_URI + "/letter-remark", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSeen = (data: any) =>
  axios.post(API_BASE_URI + "/letter/seen", data);

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/letter", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const sendShareLetterData = (data: any) =>
  axios.post(API_BASE_URI + "/letter/share-letter", data);

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/letter/${id}`);

export const deleteShareLetterData = (id: any) =>
  axios.delete(API_BASE_URI + `/letter/share-letter/${id}`);

export const parseData = (remark: Letter, user_id: number) => {
  let counter = 0;
  let user = remark.users.find((e: any) => e.id === user_id);
  if (user) {
    let last_seen = user?.["user_letter"].last_seen;
    remark.letter_remarks.forEach((e) => {
      if (!moment(last_seen).isSameOrAfter(moment(e.createdAt), "minute"))
        counter += 1;
    });
  } else {
    remark.letter_remarks.forEach((e) => {
      counter += 1;
    });
  }
  return { counter };
};

export const parsePayloadData = (arr: Letter[]) => {
  let parse = arr.filter((e) => e.type === NEW_LETTER_TYPE.INCOMING);
  return parse;
};

export const parsePayloadOutgoingData = (arr: Letter[], id: number) => {
  let parse = arr.filter((e) => e.type === NEW_LETTER_TYPE.OUT_GOING);
  return parse;
};

/*export const parseData = (data: Letter[]) => {
  let indexed_nodes: any = {},
    tree_roots: any = [];
  for (let i = 0; i < data.length; i += 1) {
    indexed_nodes[data[i].id] = data[i];
  }
  for (let i = 0; i < data.length; i += 1) {
    let parent_id = data[i].reference_id;
    if (parent_id === null) {
      tree_roots.push(data[i]);
    } else if (parent_id !== null) {
      if (!indexed_nodes[parent_id].children)
        indexed_nodes[parent_id].children = [];
      indexed_nodes[parent_id].children.push(data[i]);
    }
  }

  return tree_roots;
};*/
