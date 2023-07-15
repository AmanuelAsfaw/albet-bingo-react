import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { ApproveTestRequestPropType, approve } from "./ApproveTestRequest.util";
import {
  fetchAllTestRequest,
  fetchAllTestRequestReset,
} from "../../../../../../../redux/TestRequest/TestRequest.action";
import { Button, Tag } from "antd";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";

const ApproveTestRequestComponent: FC<ApproveTestRequestPropType> = ({
  testRequest,
  fetchAllTestRequest,
  project,
}) => {
  console.log("-------------------------->", project);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);

    approve(testRequest.id)
      .then(() => {
        setLoading(false);
        fetchAllTestRequest(project.payload?.id);
        OpenNotification(NotificationType.SUCCESS, "Test Request Approved", "");
      })
      .catch((error: any) => {
        setLoading(false);

        ErrorHandler(error).map((e: any) =>
          OpenNotification(NotificationType.ERROR, "Action Failed", e.message)
        );
      });
  };

  return (
    <div className="row">
      {testRequest.is_approved ? (
        <Tag color="green">Approved</Tag>
      ) : getUserData().id === testRequest.approved_by ? (
        <Button size="small" type="primary" onClick={submit} loading={loading}>
          Approve
        </Button>
      ) : (
        <Tag color="orange">Approval Pending</Tag>
      )}
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  fetchAllTestRequestData: state.test_request.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllTestRequest: (project_id: any) =>
    dispatch(fetchAllTestRequest(project_id)),
  fetchAllTestRequestReset: () => dispatch(fetchAllTestRequestReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApproveTestRequestComponent);
