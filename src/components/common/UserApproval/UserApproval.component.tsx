import { connect } from "react-redux";
import { FC, useEffect, useState } from "react";
import { Button, Popconfirm } from "antd";
import {
  UserApprovalPropType,
  Check,
  Approve,
  Revise,
} from "./UserApproval.util";
import { ErrorHandler, getUserData } from "../../../utilities/utilities";
import { OpenNotification } from "../Notification/Notification.component";
import { Message, NotificationType } from "../../../constants/Constants";
import { Tag } from "antd";
import { fetchOneUser } from "../../../redux/User/User.action";
import { fetchAllTestResult } from "../../../redux/TestResult/TestResult.action";
import { fetchAllTestRequest } from "../../../redux/TestRequest/TestRequest.action";
import { fetchAllSiteDiary } from "../../../redux/SiteDiary/SiteDiary.action";
import { fetchAllWeekReport } from "../../../redux/WeekReport/WeekReport.action";
import { fetchAllMeeting } from "../../../redux/Meeting/Meeting.action";
import { fetchAllPriceEscalationFile } from "../../../redux/PriceEscalationFile/PriceEscalationFile.action";
const UserApprovalComponent: FC<UserApprovalPropType> = ({
  approved_by,
  checked_by,
  type,
  is_approved,
  is_checked,
  on_revision,
  item_id,
  good_received_type,
  approve_only,
  has_revision,
  fetchUser,
  user,
  fetchSiteDiary,
  fetchWeeklyReport,
  fetchTestResult,
  fetchTestRequest,
  fetchMeeting,
  project,
  fetchPriceEscalationFile,
}) => {
  const [loading, setLoading] = useState(false);
  const [render_item, setRenderItem] = useState<any>(null);

  useEffect(() => {
    if (!user.isPending && !user.payload) fetchUser(getUserData().id);
  }, [fetchUser]);

  useEffect(() => {
    setRenderItem(Render);
  }, [user]);

  const Render = () => {
    const { id } = getUserData();
    const item: any = [];
    if (approved_by && approved_by?.id === id && !is_approved) {
      // if (user.payload.signature) {
      item.push(
        <Popconfirm
          placement="leftTop"
          title="Are you sure you want to approve that?"
          onConfirm={onApprove}
          okText="Yes"
          cancelText="No"
        >
          <Button
            className="ml-1 mr-2"
            style={{ height: "32px" }}
            type="primary"
            disabled={approve_only ? false : !is_checked}
            loading={loading}
          >
            {is_approved ? `Approved` : `Approve`}
          </Button>
        </Popconfirm>
      );
      if (has_revision) {
        item.push(
          <Popconfirm
            placement="leftTop"
            title="Are you sure you want to revise?"
            onConfirm={OnRevise}
            okText="Yes"
            cancelText="No"
          >
            <Button disabled={is_checked} loading={loading} className="ml-1">
              Revise and Resubmit
            </Button>
          </Popconfirm>
        );
      }
      // } else {
      //   item.push(<SignatureComponent />);
      // }
    } else if (approved_by)
      item.push(
        <Tag color={is_approved ? "green" : "yellow"}>
          {is_approved ? "Approved" : "Approval Pending"}
        </Tag>
      );
    if (!approve_only)
      if (checked_by?.id === id && !is_checked) {
        item.push(
          <Button
            onClick={onCheck}
            disabled={is_checked}
            loading={loading}
            className="ml-1"
          >
            {is_checked ? `Checked` : `Check`}
          </Button>
        );
      } else if (checked_by)
        item.push(
          <Tag color={is_checked ? "green" : "yellow"}>
            {is_checked ? "Checked" : "Not Checked"}
          </Tag>
        );
    if (on_revision) {
      item.splice(0, item.length);
      item.push(<Tag color={"orange"}>Revise</Tag>);
    }

    return item;
  };

  const onCheck = () => {
    setLoading(true);
    Check(type, item_id)
      .then(() => {
        fetch();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.CHECKED_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);

        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.GENERAL_FAILED,
            e.message
          )
        );
      });
  };

  const onApprove = () => {
    setLoading(true);
    Approve(type, item_id)
      .then(() => {
        setLoading(false);
        fetch();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.APPROVED_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.GENERAL_FAILED,
            e.message
          )
        );
      });
  };

  const OnRevise = () => {
    setLoading(true);
    Revise(type, item_id)
      .then(() => {
        setLoading(false);
        fetch();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.REVISION_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.REVISION_FAILED,
            e.message
          )
        );
      });
  };

  const fetch = () => {
    switch (type) {
      case "test_result":
        fetchTestResult(project.payload?.id);
        break;
      case "test_request":
        fetchTestRequest(project.payload?.id);
        break;
      case "site-diary":
        fetchSiteDiary(project.payload?.id);
        break;
      case "weekly-report":
        fetchWeeklyReport({ project_id: project?.payload.id });
        break;
      case "meeting":
        fetchMeeting(project.payload?.id);
        break;

      case "price-escalation-file":
        fetchPriceEscalationFile({ project_id: project.payload?.id });
        break;
    }
  };

  return <>{render_item}</>;
};
/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  user: state.user.fetchOne,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchOneUser(action)),
  fetchTestResult: (project_id: any) =>
    dispatch(fetchAllTestResult(project_id)),
  fetchTestRequest: (project_id: any) =>
    dispatch(fetchAllTestRequest(project_id)),
  fetchWeeklyReport: (action: any) => dispatch(fetchAllWeekReport(action)),
  fetchSiteDiary: (action: any) => dispatch(fetchAllSiteDiary(action)),
  fetchMeeting: (action: any) => dispatch(fetchAllMeeting(action)),

  fetchPriceEscalationFile: (action: any) =>
    dispatch(fetchAllPriceEscalationFile(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserApprovalComponent);
