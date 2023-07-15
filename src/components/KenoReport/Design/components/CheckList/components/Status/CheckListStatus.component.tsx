import { Button, Tag, Popconfirm } from "antd";
import { isNil } from "lodash";
import { FC, useState } from "react";
import { connect } from "react-redux";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { CheckListStatusPropType, sendData } from "./CheckListStatus.util";

import { NotificationType } from "../../../../../../../constants/Constants";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";

const CheckListStatusComponent: FC<CheckListStatusPropType> = ({
  data,
  fetchData,
}) => {
  const [reviewLoading, setReviewLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);

  const current_user_id = getUserData().id;

  const onUpdate = (type: string) => {
    let payload: any = { id: data.id };

    if (type === "review") {
      payload.is_reviewed = true;
      setApproveLoading(true);
    } else if (type === "approve") {
      payload.is_approved = true;
      setReviewLoading(true);
    }

    sendData(payload)
      .then(() => {
        setReviewLoading(false);
        setApproveLoading(false);
        fetchData();
        OpenNotification(NotificationType.SUCCESS, "Success", "");
      })
      .catch((error) => {
        setReviewLoading(false);
        setApproveLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(NotificationType.ERROR, "Failed", e.message)
        );
      });
  };

  return (
    <div className="d-flex justify-space-between">
      {isNil(data.is_reviewed) ? (
        current_user_id === data.reviewed_by_id ? (
          <Popconfirm
            title="Are you sure to Review this check list?"
            onConfirm={() => onUpdate("review")}
            okText="Yes"
            cancelText="No!"
          >
            <Button
              size="small"
              className="mr-1"
              type="primary"
              loading={reviewLoading}
            >
              Review
            </Button>
          </Popconfirm>
        ) : (
          <Tag color="warning">Review Pending</Tag>
        )
      ) : (
        <Tag color="green">Reviewed</Tag>
      )}

      {isNil(data.is_approved) ? (
        current_user_id === data.approved_by_id && data.is_reviewed ? (
          <Popconfirm
            title="Are you sure to Approve this check list?"
            onConfirm={() => onUpdate("approve")}
            okText="Yes"
            cancelText="No!"
          >
            <Button
              size="small"
              className="mr-1"
              type="primary"
              loading={approveLoading}
            >
              Approve
            </Button>
          </Popconfirm>
        ) : (
          <Tag color="warning">Approval Pending</Tag>
        )
      ) : (
        <Tag color="green">Approved</Tag>
      )}
    </div>
  );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckListStatusComponent);
