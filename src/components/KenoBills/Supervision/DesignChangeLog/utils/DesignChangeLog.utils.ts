import axios from "axios";
import { ApiCallState } from "../../../../../redux/Utils";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { DesignChangeLog } from "../../../../../redux/DesignChangeLog/DesignChangeLog.type";

export type DesignChangeLogPropType = {
  design_change_log: ApiCallState<DesignChangeLog[]>;
  fetchAll: Function;
};

export const sendDesignChangeLog = (data: any) =>
  axios.post(API_BASE_URI + "/design_change_log", data);

export const deleteDesignChangeLog = (id: any) =>
  axios.delete(API_BASE_URI + `/design_change_log/${id}`);
