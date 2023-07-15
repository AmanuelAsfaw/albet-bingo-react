import { Button, Popconfirm, Tag } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { fetchAllMeeting } from "../../../../../../../redux/Meeting/Meeting.action";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  isSharedUser,
  shareApprove,
  shareApproveRevise,
  StatusPropType,
} from "../../util/Meeting.util";

const SharedStatusComponent: FC<StatusPropType> = ({
  meeting,
  fetchMeetings,
  project,
}) => {
  const [loading, setLoading] = useState(false);

  const Approve = (id: any) => {
    setLoading(true);
    shareApprove(id)
      .then(() => {
        fetchMeetings({ project_id: project.payload?.id });

        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.APPROVED_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.APPROVED_FAILED,
            e.message
          )
        );
      });
  };
  const ApproveRevise = (id: any) => {
    setLoading(true);
    shareApproveRevise(id)
      .then(() => {
        fetchMeetings({ project_id: project.payload?.id });

        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.APPROVED_REVISE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.APPROVED_REVISE_FAILED,
            e.message
          )
        );
      });
  };
  const Render = () => {
    const { is_approved, is_shared_user, is_done, id, approved_by } =
    isSharedUser(meeting);
    console.log(is_shared_user);
    
    if (is_done && approved_by) {
      return (
        <Popconfirm
          placement="leftTop"
          title="Are you sure you want to Revise Approve"
          onConfirm={() => ApproveRevise(id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            loading={loading}
            className="mr-1"
            size="small"
            type="default"
          >
            Revise
          </Button>
        </Popconfirm>
      )
    }
    else if (is_done) 
      return <Tag color="green">Approved</Tag>;
  
    else if (is_shared_user && is_approved) {
      return <Tag color="orange">Pending Other Approvals</Tag>;
    } else if (is_shared_user && !is_approved)
      return (
        <Popconfirm
          placement="leftTop"
          title="Are you sure you want to Approve"
          onConfirm={() => Approve(id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            loading={loading}
            className="mr-1"
            size="small"
            type="primary"
          >
            Approve
          </Button>
        </Popconfirm>
      );
    else return <Tag color="orange">Pending</Tag>;
  };

  return (
    <>
      <Render />
    </>
  );
};
/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMeetings: (action: any) => dispatch(fetchAllMeeting(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SharedStatusComponent);
