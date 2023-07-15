import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType, PAYMENT_REQUEST_TYPES } from "../../../../../constants/Constants";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import {
  ErrorHandler,
  format,
  formatNumber,
  getUserData,
} from "../../../../../utilities/utilities";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { PaymentsPropType, deleteData } from "./util/Payments.util";
import { Table, Button, Popconfirm, Popover } from "antd";
import {
  CloudDownloadOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import AddPaymentsComponent from "./components/AddPayments/AddPayments.component";
import { fetchAllPayments } from "../../../../../redux/Payments/Payments.action";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import ViewPaymentComponent from "./components/View/ViewPayment.component";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";
import { Payments } from "../../../../../redux/Payments/Payments.type";

const PaymentsComponent: FC<PaymentsPropType> = ({
  project,
  users,
  fetchUser,
  payments,
  fetchAllPayments,
}) => {
  const [paymentsData, setPaymentsData] = useState<any>([]);

  useEffect(() => {
    fetchAllPayments({ project_id: project.payload?.id });
    fetchUser();
  }, [fetchAllPayments, project, fetchUser]);

  useEffect(() => {
    if (payments.payload.length) {
      let arr = [];
      arr = payments.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
      }));
      setPaymentsData(arr);
    }
  }, [payments]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllPayments({ project_id: project.payload?.id });
        OpenNotification(NotificationType.SUCCESS, "Payments delete!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete payments",
            e.message
          )
        );
      });
  };

  const column: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (value, record) => <span>{record.date}</span>,
    },
    {
      title: "Ref No",
      key: "reference_no",
      dataIndex: "reference_no",
      render: (date, record) => <span>{record.reference_no}</span>,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (date, record) => <span>{record.name}</span>,
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
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
      title: "Advance Repaid Amount",
      key: "advance_repaid_amount",
      dataIndex: "advance_repaid_amount",
      width: "10%",
      render: (value) => <span>{format(value)}</span>,
    },
    {
      title: "Retention Amount",
      key: "retention_amoun",
      dataIndex: "retention_amount",
      width: "10%",
      render: (value) => <span>{format(value)}</span>,
    },
    {
      title: "File",
      className: "pl-0-td pr-0-td",
      render: (date, record) => (
        <>
          {record.document ? (
            <>
              <Button
                type="link"
                icon={<CloudDownloadOutlined />}
                onClick={() => DownloadFile(record.document)}
              ></Button>
              <DocumentViewerComponent document={record.document} />
            </>
          ) : null}
        </>
      ),
    },
    {
      title: "Action",
      className: "pl-0-td pr-0-td",
      render: (data, record) => (
        <Popover
          placement="rightTop"
          overlayClassName="action-popover"
          trigger="focus"
          content={
            <div className="d-flex flex-column">
              <ViewPaymentComponent payment={record} />
              {record.user_id === getUserData().id ? (
                <Popconfirm
                  placement="leftTop"
                  title="Are you sure you want to remove payment?"
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
            <AddPaymentsComponent />
          </AuthenticationComponent>
        </div>
        <div className="col-md-12 mt-2 hidden-print">
          <Table
            loading={payments.isPending}
            columns={column}
            dataSource={paymentsData}
            summary={(pageData: readonly Payments[]) => {
              const totalContractAmount = project.payload.budget;
              const advanceTaken = pageData.filter((elem) => elem.type === PAYMENT_REQUEST_TYPES[0]).reduce((sum, elem) => sum + elem.payment_amount, 0);
              const totalAmountPaid = pageData.filter((elem) => elem.type !== PAYMENT_REQUEST_TYPES[0] && elem.type !== PAYMENT_REQUEST_TYPES[4]).reduce((sum, elem) => sum + elem.payment_amount, 0);
              const totalRetentionAmount = pageData.filter((elem) => elem.type === PAYMENT_REQUEST_TYPES[4]).reduce((sum, elem) => sum + elem.payment_amount, 0);
              const totalAdvanceToDateRepaid = pageData.reduce((sum, item) => sum + (item.advance_repaid_amount ?? 0), 0);
              const remainingUnpaidAmount = totalAmountPaid + advanceTaken;

              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={2} colSpan={3}>
                      Total Amount of Contract
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={3}
                      colSpan={3}
                    >{formatNumber(totalContractAmount)}</Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={2} colSpan={3}>
                      Advance Taken
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={3}
                      colSpan={3}
                    >{formatNumber(advanceTaken)}</Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={2} colSpan={3}>
                      Total Amount Paid
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={3}
                      colSpan={3}
                    >{formatNumber(totalAmountPaid)}</Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={2} colSpan={3}>
                      Total Retention Amount
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={3}
                      colSpan={3}
                    >{formatNumber(totalRetentionAmount)}</Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={2} colSpan={3}>
                      Total Advance To Date Repaid
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={3}
                      colSpan={3}
                    >{formatNumber(totalAdvanceToDateRepaid)}</Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={2} colSpan={3}>
                      Remaining Unpaid Amount
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={3}
                      colSpan={3}
                    >{formatNumber(remainingUnpaidAmount)}</Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
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
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  payments: state.payments.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllPayments: (action: any) => dispatch(fetchAllPayments(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsComponent);
