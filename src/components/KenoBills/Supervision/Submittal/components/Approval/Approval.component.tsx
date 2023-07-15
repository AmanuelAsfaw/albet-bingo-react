import { Button, Popconfirm, Tag } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import {
  ApprovalValue,
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { fetchOneSubmittal } from "../../../../../../redux/Submittal/Submittal.action";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { ApprovalPropType, sendApproval } from "../../util/Submittal.util";

const ApprovalComponent: FC<ApprovalPropType> = ({
  fetchSubmittal,
  submittal_item,
}) => {
  const [loading, setLoading] = useState(false);
  const render = () => {
    if (getUserData().id === submittal_item.action_by) {
      if (submittal_item.approval === ApprovalValue.PENDING)
        return (
          <>
            <Popconfirm
              placement="leftTop"
              title="Are you sure you want to Approve"
              onConfirm={() => onClickHandler(ApprovalValue.APPROVED)}
              okText="Yes"
              cancelText="No"
            >
              {/* <Tag color="blue">Approve</Tag> */}
              <Button
                size="small"
                type="primary"
                loading={loading}
                className="mr-1"
              >
                Approve
              </Button>
            </Popconfirm>
            <Popconfirm
              placement="leftTop"
              title="Are you sure you want to Reject"
              onConfirm={() => onClickHandler(ApprovalValue.REJECTED)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                loading={loading}
                size="small"
                className="ml-1 btn-outline-secondary"
              >
                Revise & Resubmit
              </Button>
              {/* <Tag color="cyan">Revise & Resubmit</Tag> */}
            </Popconfirm>
          </>
        );
      else if (submittal_item.approval === ApprovalValue.REJECTED)
        return <Tag color="red">Resubmit</Tag>;
      else if (submittal_item.approval === ApprovalValue.APPROVED)
        return <Tag color="green">Approved</Tag>;
      else return <Tag></Tag>;
    } else {
      if (submittal_item.approval === ApprovalValue.PENDING)
        return <Tag color="orange">Pending</Tag>;
      else if (submittal_item.approval === ApprovalValue.REJECTED)
        return <Tag color="red">Resubmit</Tag>;
      else if (submittal_item.approval === ApprovalValue.APPROVED)
        return <Tag color="green">Approved</Tag>;
      else return <Tag></Tag>;
    }
  };

  const onClickHandler = (approval_value: number) => {
    setLoading(true);
    sendApproval({ approval: approval_value, id: submittal_item.id })
      .then(() => {
        fetchSubmittal(submittal_item.submittal_id);
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.ACTION_REGISTERER_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.ACTION_REGISTERER_FAILED,
            e.message
          )
        );
      });
  };

  return render();
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
const mapDispatchToProps = (dispatch: any) => ({
  fetchSubmittal: (action: any) => dispatch(fetchOneSubmittal(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalComponent);
