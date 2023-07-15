import { ApiCallState } from "../../../redux/Utils";
import { getUserData } from "../../../utilities/utilities";

export type SharePropType = {
  onShare: Function;
  onRemove: Function;
  feature?: string;
  project_id?: number;
  payload: {
    id: number;
    type?: "View" | "Check" | "Approve";
    status?: number;
    assigned_by: number;
    user_id: number;
  }[];
  loading: boolean;
  users_by_feature: ApiCallState<{ id: number; full_name: string; approve: boolean }[]>;
  users: ApiCallState<{ id: number; full_name: string; approve: boolean }[]>;
  fetchUsersByFeature: Function;
  fetchUsers: Function;
  type?: "ViewOnly" | "VCA"
};

export const getUsers = (
  users: { id: number; full_name: string; approve: boolean }[],
  selected: number[]
) => {
  return users.filter(
    (user) =>
      !selected.find((user_id) => user_id === user.id) &&
      getUserData().id !== user.id
  );
};




