import { Button, Popconfirm, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllPaymentRequest } from "../../../../../../../redux/PaymentRequest/PaymentRequest.action";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { StatusPropType, sendApproval } from "../../util/PaymentRequest.util";

const StatusComponent: FC<StatusPropType> = ({
  is_approved,
  is_rejected,
  is_revised,
  id,
  reviewed_by,
  fetchAllPaymentRequest,
  project,
}) => {
  const [loading, setLoading] = useState(false);
  const [render_item, setRenderItem] = useState<any>(null);

  useEffect(() => {
    Render();
  }, [fetchAllPaymentRequest, is_rejected, is_approved, is_revised]);

  const onApprove = (id: number, is_approved: boolean) => {
    setLoading(true);
    const datas = {
      id: id,
      is_approved: is_approved,
    };
    sendApproval(datas)
      .then(() => {
        setLoading(false);
        fetchAllPaymentRequest({ project_id: project.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Payment Request approved!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to approve payment",
            e.message
          )
        );
      });
  };

  const onRejected = (id: number, is_rejected: boolean) => {
    setLoading(true);
    const datas = {
      id: id,
      is_rejected: is_rejected,
    };
    sendApproval(datas)
      .then(() => {
        setLoading(false);
        fetchAllPaymentRequest({ project_id: project.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Payment Request rejected!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to reject payment request",
            e.message
          )
        );
      });
  };

  const onRevised = (id: number, is_revised: boolean) => {
    setLoading(true);
    const datas = {
      id: id,
      is_revised: is_revised,
    };
    sendApproval(datas)
      .then(() => {
        setLoading(false);
        fetchAllPaymentRequest({ project_id: project.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Payment Request Revised and Resubmit!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to revised and resubmit payment request",
            e.message
          )
        );
      });
  };

  const Render = () => {
    const item: any = [];
    if (
      !is_approved &&
      !is_rejected &&
      !is_revised &&
      reviewed_by.includes(getUserData().id)
    ) {
      item.push(
        <Popconfirm
          placement="leftTop"
          title="Are you sure you want to approve that?"
          onConfirm={() => onApprove(id, true)}
          okText="Yes"
          cancelText="No"
        >
          <Button className="ml-1 mr-1" type="text" loading={loading}>
            {`Approve`}
          </Button>
        </Popconfirm>
      );
      item.push(
        <Popconfirm
          placement="leftTop"
          title="Are you sure you want to revised and resubmit that?"
          onConfirm={() => onRevised(id, true)}
          okText="Yes"
          cancelText="No"
        >
          <Button className="ml-1 mr-1" type="text" loading={loading}>
            {`Revised and Resubmit`}
          </Button>
        </Popconfirm>
      );
      item.push(
        <Popconfirm
          placement="leftTop"
          title="Are you sure you want to reject that?"
          onConfirm={() => onRejected(id, true)}
          okText="Yes"
          cancelText="No"
        >
          <Button className="ml-1 mr-1" type="text" loading={loading}>
            {`Reject`}
          </Button>
        </Popconfirm>
      );
    } else if (is_approved) {
      item.push(<Tag color={"green"}>{"Approved"}</Tag>);
    } else if (is_revised) {
      item.push(<Tag color={"orange"}>{"Revised and Resubmited"}</Tag>);
    } else if (is_rejected) {
      item.push(<Tag color={"red"}>{"Rejected"}</Tag>);
    } else {
      item.push(<Tag>{"Pending"}</Tag>);
    }
    setRenderItem(
      item.map((e: any, index: number) => ({
        ...e,
        key: Date.now() + index,
      }))
    );
  };

  return <>{render_item}</>;
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
  fetchAllPaymentRequest: (action: any) =>
    dispatch(fetchAllPaymentRequest(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusComponent);
