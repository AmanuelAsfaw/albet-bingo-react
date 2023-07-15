import { MaterialApprovalStatusReport } from "../../../../../../redux/MaterialApprovalStatus/MaterialApprovalStatus.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type EditMaterialApprovalStatusType = {
  material_approval_status: ApiCallState<MaterialApprovalStatusReport>;
  fetchAll: Function;
  fetchOne: Function;
  id?: number;
};
