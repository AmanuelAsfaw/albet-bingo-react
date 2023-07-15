import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { PaymentRequestPropType, deleteData } from "./util/PaymentRequest.util";
import { Table, Button, Popconfirm, Popover } from "antd";
import {
  CloudDownloadOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import {
  ErrorHandler,
  format,
  getUserData,
} from "../../../../../utilities/utilities";
import { toNumber } from "lodash";
import RemarkComponent from "./components/RemarkPaymentRequest/Remark.component";
import StatusComponent from "./components/PyamentRequestStatus/Status.component";
import { fetchAllPaymentRequest } from "../../../../../redux/PaymentRequest/PaymentRequest.action";
import AddPaymentRequestComponent from "./components/AddPaymentRequest/AddPaymentRequest.component";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import ViewPaymentRequestComponent from "./components/View/ViewPaymentRequest.component";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const PaymentRequestComponent: FC<PaymentRequestPropType> = ({
  project,
  users,
  fetchUser,
  payment_request,
  fetchAllPaymentRequest,
}) => {
  const [paymentRequestData, setPaymentRequestData] = useState<any>([]);

  useEffect(() => {
    fetchAllPaymentRequest({ project_id: project.payload?.id });
    fetchUser();
  }, [fetchAllPaymentRequest, project, fetchUser]);

  useEffect(() => {
    if (payment_request.payload.length) {
      let arr = [];
      arr = payment_request.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
        reviewed_by: item.reviewed_by
          ?.split(",")
          .map((item: any) => toNumber(item)),
      }));
      setPaymentRequestData(arr);
    }
  }, [payment_request]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllPaymentRequest({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Payment Request delete!",
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete payment request",
            e.message
          )
        );
      });
  };

  const column: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      width: "5%",
      fixed: "left",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      width: "10%",
      render: (value, record) => <span>{record.date}</span>,
    },
    {
      title: "Ref No",
      key: "reference_no",
      dataIndex: "reference_no",
      width: "5%",
      render: (date, record) => <span>{record.reference_no}</span>,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "10%",
      render: (date, record) => <span>{record.name}</span>,
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      width: "10%",
      render: (date, record) => <span>{record.type}</span>,
    },
    {
      title: "Payment Amount",
      key: "payment_amount",
      dataIndex: "payment_amount",
      width: "10%",
      render: (value) => <span>{format(value)}</span>,
    },

    {
      title: "File",
      className: "pl-0-td pr-0-td",
      width: "5%",
      render: (date, record) => (
        <>
          {record.document ? (
            <>
              <Button
                type="link"
                icon={<CloudDownloadOutlined />}
                onClick={() => DownloadFile(record.document)}
              ></Button>
              {record.document ? (
                <DocumentViewerComponent document={record.document} />
              ) : null}
            </>
          ) : null}
        </>
      ),
    },
    {
      title: "Remark",
      width: "5%",
      render: (data, record) => (
        <RemarkComponent
          project={project.payload}
          remarkData={record}
          users={users.payload}
        />
      ),
    },
    {
      title: "Status",
      width: "5%",
      render: (data, record) => (
        <StatusComponent
          is_approved={record.is_approved}
          is_rejected={record.is_rejected}
          is_revised={record.is_revised}
          id={record.id}
          reviewed_by={record.reviewed_by}
          project={project.payload}
        />
      ),
    },
    {
      title: "Action",
      width: "5%",
      fixed: "right",
      className: "pl-0-td pr-0-td",
      render: (data, record) => (
        <Popover
          placement="rightTop"
          overlayClassName="action-popover"
          trigger="focus"
          content={
            <div className="d-flex flex-column">
              <ViewPaymentRequestComponent payment_request={record} />
              {record.user_id === getUserData().id ? (
                <Popconfirm
                  placement="leftTop"
                  title="Are you sure you want to remove this payment request?"
                  onConfirm={() => OnDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger type="text">
                    Delete
                  </Button>
                </Popconfirm>
              ) : null}
            </div>
          }
        >
          <Button
            icon={<MoreOutlined />}
            className="btn-outline-secondary border-0"
          ></Button>
        </Popover>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AuthenticationComponent type="WRITE">
            <AddPaymentRequestComponent />
          </AuthenticationComponent>
        </div>
        <div className="col-md-12 mt-2 hidden-print">
          <Table
            size="small"
            loading={payment_request.isPending}
            columns={column}
            dataSource={paymentRequestData}
          />
        </div>
      </div>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  users: state.user.fetchAll,
  project: state.project.fetchOne,
  payment_request: state.payment_request.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllPaymentRequest: (action: any) =>
    dispatch(fetchAllPaymentRequest(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentRequestComponent);
