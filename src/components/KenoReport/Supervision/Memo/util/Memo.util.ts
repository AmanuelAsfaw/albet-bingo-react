import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { ApiCallState } from "../../../../../redux/Utils";
import axios from "axios";
import { Memo } from "../../../../../redux/Memo/Memo.type";
import { User } from "../../../../../redux/User/User.type";
import { Project } from "../../../../../redux/Project/Project.type";

export type MemoPropType = {
  memos: ApiCallState<Memo[]>;
  fetchMemo: Function;
  fetchUser: Function;
  fetchMemoCount: Function;
};

export type DetailPropType = {
  memo: Memo;
  project: ApiCallState<Project>;
};

export type PrintPropType = {
  project: ApiCallState<Project>;
  visibilityAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
};

export type AddMemoPropType = {
  memos: ApiCallState<Memo[]>;
  fetchMemoCount: Function;
  fetchMemo: Function;
  users: ApiCallState<User[]>;
  count: ApiCallState<{ count: number }>;
};

export const sendData = (data: any) => axios.post(API_BASE_URI + "/memo", data);

export const parseData = (data: Memo[]) => {
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
};

export const getReferenceNumber = (
  access_type: "consultant" | "contractor" | "client"
) => {
  if (access_type === "consultant") {
    return "KE/HBRC/SO/";
  } else if (access_type === "client") return `HBRC/SO/`;
  else return `ABC/`;
};
