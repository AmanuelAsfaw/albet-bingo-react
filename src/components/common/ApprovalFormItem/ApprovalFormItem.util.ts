import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";

export type ApprovalFormItemPropType = {
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  is_disabled?: Boolean;
};
