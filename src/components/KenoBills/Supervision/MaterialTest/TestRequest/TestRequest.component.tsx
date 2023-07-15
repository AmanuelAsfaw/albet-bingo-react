import Table from "antd/lib/table";
import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { TestRequestPropType } from "./TestRequest.util";
import AddTestRequestComponent from "./component/AddTestRequest/AddTestRequest.component";
import {
  fetchAllTestRequest,
  fetchAllTestRequestReset,
} from "../../../../../redux/TestRequest/TestRequest.action";
import { Button, Popover } from "antd";
import ViewTestRequestComponent from "./component/ViewTestRequest/ViewTestRequest.component";
import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined";
import PrintTestRequestComponent from "./component/PrintTestRequest/PrintTestRequest.component";
import ApproveTestRequestComponent from "./component/ApproveTestRequest/ApproveTestRequest";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const TestRequestComponent: FC<TestRequestPropType> = ({
  project,
  fetchAllTestRequest,
  fetchAllTestRequestData,
}) => {
  useEffect(() => {
    fetchAllTestRequest(project.payload?.id);
  }, [fetchAllTestRequest, project]);

  const columns: any[] = [
    {
      title: "No",
      render: (value: any, record: any, index: number) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value: any, record: any) =>
        new Date(record.createdAt).toDateString(),
    },
    {
      title: "Test Requested By",
      dataIndex: "test_requested_by",
      render: (value: any, record: any) =>
        record.er_test_requested_by.full_name,
    },
    {
      title: "Status",
      render: (value: any, record: any) => (
        <ApproveTestRequestComponent testRequest={record} />
      ),
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
                <ViewTestRequestComponent
                  test_request={record}
                  key={Date.now()}
                />

                <PrintTestRequestComponent
                  project={project}
                  test_request={record}
                />
              </div>
            }
          >
            <Button
              icon={<MoreOutlined />}
              className="btn-outline-secondary border-0"
            ></Button>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <ReloadButtonComponent
          onClick={() => fetchAllTestRequest(project.payload?.id)}
        />
        <AuthenticationComponent type="WRITE">
          <AddTestRequestComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2 hidden-print">
        <Table
          columns={columns}
          loading={fetchAllTestRequestData.isPending}
          dataSource={fetchAllTestRequestData.payload.map((e, index) => ({
            ...e,
            key: Date.now() + index,
          }))}
        />
      </div>
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
)(TestRequestComponent);
