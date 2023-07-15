import Table from "antd/lib/table";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { TestResultPropType, deleteData } from "./TestResult.util";
import AddTestResultComponent from "./component/AddTestResult/AddTestResult.component";
import {
  fetchAllTestResult,
  fetchAllTestResultReset,
} from "../../../../../redux/TestResult/TestResult.action";
import { Button, Popconfirm, Popover } from "antd";
import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined";
import { PrinterOutlined, DeleteOutlined } from "@ant-design/icons";
import ViewTestResultComponent from "./component/ViewTestResult/ViewAddTestResult.component";
import { TestResult } from "../../../../../redux/TestResult/TestResult.type";
import PrintTestResultComponent from "./component/PrintTestResult/PrintTestResult.component";
import moment from "moment";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import EditTestResultComponent from "./component/EditTestResult/EditTestResultComponent";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const TestComponent: FC<TestResultPropType> = ({
  project,
  fetchAllTestResult,
  fetchAllTestResultReset,
  fetchAllTestResultData,
  fetchOneUserData,
}) => {
  const [selected, setSelected] = useState<TestResult | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (selected) window.print();
  }, [selected]);

  useEffect(() => {
    fetchAllTestResult(project.payload?.id);
  }, [fetchAllTestResult]);

  const onDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        setDeleteLoading(false);
        fetchAllTestResult(project.payload?.id);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.TEST_RESULT_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setDeleteLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.TEST_RESULT_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const columns: any[] = [
    {
      title: "No",
      render: (value: any, record: any, index: number) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value: any, record: any) =>
        moment(record.createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Test Lab",
      dataIndex: "testing_lab",
    },
    {
      title: "Test No.",
      dataIndex: "testing_number",
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "20%",
      render: (value: any, record: any) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <ViewTestResultComponent
                  test_result={record}
                  key={Date.now()}
                />
                <AuthenticationComponent type="DELETE">
                  <Popconfirm
                    title="Are you sure to delete this test result?"
                    onConfirm={() => onDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="text" danger loading={deleteLoading}>
                      Delete
                    </Button>
                  </Popconfirm>
                </AuthenticationComponent>
                <AuthenticationComponent type="EDIT">
                  <EditTestResultComponent data={record} />
                </AuthenticationComponent>

                <Button
                  type="text"
                  onClick={() => {
                    setSelected(record);
                  }}
                >
                  Print
                </Button>
              </div>
            }
          >
            <Button
              icon={<MoreOutlined />}
              className="btn-outline-secondary border-0"
            />
          </Popover>
        </>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <ReloadButtonComponent
          onClick={() => fetchAllTestResult(project.payload?.id)}
        />
        <AuthenticationComponent type="WRITE">
          <AddTestResultComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2 hidden-print">
        <Table
          columns={columns}
          loading={fetchAllTestResultData.isPending}
          dataSource={fetchAllTestResultData.payload.map((e, index) => ({
            ...e,
            key: Date.now() + index,
          }))}
        />
      </div>
      <PrintTestResultComponent project={project} test_result={selected} />
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
  fetchAllTestResultData: state.test_result.fetchAll,
  fetchOneUserData: state.user.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllTestResult: (project_id: any) =>
    dispatch(fetchAllTestResult(project_id)),
  fetchAllTestResultReset: () => dispatch(fetchAllTestResultReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
