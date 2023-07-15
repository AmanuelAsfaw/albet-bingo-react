import { DesignChangeLog } from "../../../../../../redux/DesignChangeLog/DesignChangeLog.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type EditDesignChangeLogType = {
  design_change_log: ApiCallState<DesignChangeLog>;
  fetchAll: Function;
  fetchOne: Function;
  id?: number;
};
