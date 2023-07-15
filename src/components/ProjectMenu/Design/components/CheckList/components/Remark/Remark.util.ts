import axios from "axios";
import moment from "moment";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { CheckList } from "../../../../../../../redux/CheckList/CheckList.type";
import { ChecklistRemark } from "../../../../../../../redux/ChecklistRemark/ChecklistRemark.type";
import { User } from "../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type RemarkPropType = {
    remarkData: any;
    users: User[];
    fetchData:Function;
    fetchAllChecklistRemark:Function;
    checklist_remark:ApiCallState<ChecklistRemark[]>
  };

export const updateSeen = (data: any) => 
  axios.post(API_BASE_URI + "/checklist/seen", data);

export const sendRemark = (data: any) =>
  axios.post(API_BASE_URI + "/check-list-remark", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const parseData = (remark: CheckList,user_id:number) => {
    let counter = 0;
    let user = remark.users.find((e:any)=> e.id === user_id);
    if(user){
      let last_seen = user?.["user_checklist"].last_seen;
      remark.checklist_remarks.forEach((e) => {
        if (!moment(last_seen).isSameOrAfter(moment(e.createdAt), "minute"))
          counter += 1;
      });
    }else{
      remark.checklist_remarks.forEach((e) => {
        counter += 1;
      });
    }
    return { counter };
};