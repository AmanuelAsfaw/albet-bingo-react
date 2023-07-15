import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RequestForTestPropType, deleteData } from "./util/RequestForTest.util";
import { Button, Popconfirm, Popover } from "antd";
import { MoreOutlined, DeleteColumnOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/lib/table";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import AddRFTComponent from "./components/Add/AddRFT.component";
import { fetchAllRequestForTest } from "../../../../../redux/RequestForTest/RequestForTest.action";
import StatusRFTComponent from "./components/Status/StatusRFT.component";
import ViewRFTComponent from "./components/View/ViewRFT.component";
import EditRFTComponent from "./components/Edit/EditRFT.component";
import PrintRFTComponent from "./components/Print/PrintRFT.component";
import RemarkComponent from "./components/Remark/Remark.component";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const RequestForTestComponent: FC<RequestForTestPropType> = ({
  project,
  request_for_test,
  fetchAllRequestForTest,
}) => {
  const [requestData, setRequestData] = useState<any>([]);

  useEffect(() => {
    fetchAllRequestForTest({
      project_id: project.payload?.id,
    });
  }, [fetchAllRequestForTest, project]);

  useEffect(() => {
    if (request_for_test.payload.length) {
      setRequestData(
        request_for_test.payload.map((item: any, index: any) => ({
          key: index,
          ...item,
        }))
      );
    }
  }, [request_for_test]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllRequestForTest({
          project_id: project.payload?.id,
        });
        OpenNotification(
          NotificationType.SUCCESS,
          "Request for test delete!",
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete request for test",
            e.message
          )
        );
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      width: "80px",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      width: "100px",
      render: (value, record) => <span>{record.date}</span>,
    },
    {
      title: "Test No",
      key: "test_no",
      dataIndex: "test_no",
      width: "100px",
      render: (value, record) => <span>{record.test_no}</span>,
    },
    {
      title: "Block",
      key: "block",
      dataIndex: "block",
      width: "100px",
      render: (value, record) => <span>{record.block}</span>,
    },
    {
      title: "Axis",
      key: "axis",
      dataIndex: "axis",
      width: "100px",
      render: (value, record) => <span>{record.axis}</span>,
    },
    {
      title: "Status",
      width: "100px",
      render: (value, record) => (
        <StatusRFTComponent
          test_id={record.id}
          is_test_received={record.is_test_received}
          test_received_by={record.test_received_by}
        />
      ),
    },
    {
      title: "Remark",
      width: "100px",
      render: (value, record) => <RemarkComponent remarkData={record} />,
    },
    {
      title: "Action",
      width: "150px",
      fixed: "right",
      render: (value, record) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <ViewRFTComponent id={record.id} />
                <AuthenticationComponent type="EDIT">
                  <EditRFTComponent id={record.id} />
                </AuthenticationComponent>
                <AuthenticationComponent type="DELETE">
                  <Popconfirm
                    placement="leftTop"
                    title="Are you sure you want to remove this request for test?"
                    onConfirm={() => OnDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger type="text">
                      Delete
                    </Button>
                  </Popconfirm>
                </AuthenticationComponent>

                <PrintRFTComponent request_for_test={record} />
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
        <AuthenticationComponent type="WRITE">
          <AddRFTComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2">
        <Table
          columns={columns}
          dataSource={requestData}
          loading={request_for_test.isPending}
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
  request_for_test: state.request_for_test.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllRequestForTest: (action: any) =>
    dispatch(fetchAllRequestForTest(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestForTestComponent);
