import { Tag } from "antd";
import { FC } from "react";
import { connect } from "react-redux";
import { StatusPropType } from "../../util/MaterialApproval.util";

const StatusComponent: FC<StatusPropType> = ({ material_request_approval }) => {
  const render = () => {
    if (
      !(
        material_request_approval.approved ||
        material_request_approval.approved_with_comment ||
        material_request_approval.revise_and_submit ||
        material_request_approval.rejected
      )
    ) {
      return <Tag color="orange">Pending</Tag>;
    } else if (material_request_approval.approved) {
      return <Tag color="green">Approved</Tag>;
    } else if (material_request_approval.approved_with_comment) {
      return <Tag color="green">Approved With Comment</Tag>;
    } else if (material_request_approval.revise_and_submit) {
      return <Tag color="cyan">Revise and Submit</Tag>;
    } else if (material_request_approval.rejected) {
      return <Tag color="red">Rejected</Tag>;
    }
  };

  return <>{render()}</>;
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StatusComponent);
