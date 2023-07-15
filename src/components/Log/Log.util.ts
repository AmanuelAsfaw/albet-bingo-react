import moment from "moment";
import axios from "axios";
import { API_BASE_URI } from "../../redux/ApiCall";
import { Log } from "../../redux/Log/Log.type";
import { User } from "../../redux/User/User.type";
import { ApiCallState } from "../../redux/Utils";

export type LogPropType = {
  log: ApiCallState<Log[]>;
  fetchLog: Function;
  fetchUser: Function;
  user: ApiCallState<User>;
};

export const updateSeen = (data: any) =>
  axios.put(API_BASE_URI + "/log/seen", data);

export const parseData = (log: Log[], last_seen: any) => {
  const parsed: any[] = [];
  let counter = 0;
  log.forEach((e) => {
    if (!moment(last_seen).isSameOrAfter(moment(e.date), "minute"))
      counter += 1;
    parsed.push({
      description: e.description,
      date: e.date,
      full_name: e.user?.full_name,
      status: moment(last_seen).isSameOrAfter(e.date, "minute"),
    });
  });

  return { parsed, counter };
};
