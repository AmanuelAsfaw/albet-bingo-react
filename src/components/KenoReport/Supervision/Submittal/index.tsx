import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllSubmittal } from "../../../../redux/Submittal/Submittal.action";
import {
  SubmittalPropType,
  deleteData,
  DownloadFile,
} from "./util/Submittal.util";
import { Table, Button, Popconfirm } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import AddSubmittalComponent from "./components/AddSubmittal/AddSubmittal.component";
import { ColumnsType } from "antd/lib/table";
import { fetchAllUser } from "../../../../redux/User/User.action";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../constants/Constants";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import DocumentViewerComponent from "../../../common/DocumentViewer/DocumentViewer.component";
import ShareSubmittalComponent from "./components/Share/ShareSubmittal.component";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import AuthenticationComponent from "../../../common/Auth/Authentication.component";
const SubmittalComponent: FC<SubmittalPropType> = ({
  fetchAllSubmittal,
  submittals,
  project,
  users,
  fetchUser,
}) => {
  const [submittalData, setSubmittalData] = useState<any>([]);

  useEffect(() => {
    fetchAllSubmittal({ project_id: project.payload?.id });
    fetchUser();
  }, [fetchAllSubmittal, project, fetchUser]);

  useEffect(() => {
    if (submittals.payload.length) {
      let arr = [];
      arr = submittals.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
      }));
      setSubmittalData(arr);
    }
  }, [submittals]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllSubmittal({ project_id: project.payload?.id });
        OpenNotification(NotificationType.SUCCESS, "Submittal delete!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete submittal",
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
      title: "Uploaded By",
      key: "uploaded_by",
      dataIndex: "uploaded_by",
      render: (date, record) => (
        <span>
          {users.payload.find((e) => e.id === record.uploaded_by)?.full_name}
        </span>
      ),
    },
    {
      title: "File",
      className: "pl-0-td pr-0-td",
      render: (date, record) => (
        <>
          <Button
            type="link"
            icon={<CloudDownloadOutlined />}
            onClick={() => DownloadFile(record)}
          ></Button>
          {record.url ? <DocumentViewerComponent document={record} /> : null}
        </>
      ),
    },
    {
      title: "Action",
      className: "pl-0-td pr-0-td",
      render: (data, record) => (
        <div className="d-flex">
          {record.uploaded_by === getUserData().id ||
          getUserData().is_super_user ? (
            <div className="d-flex">
              <ShareSubmittalComponent submittal_id={record.id} />
              <Popconfirm
                placement="leftTop"
                title="Are you sure you want to remove this submittal?"
                onConfirm={() => OnDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger type="text">
                  Delete
                </Button>
              </Popconfirm>
            </div>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AuthenticationComponent type="WRITE">
            <AddSubmittalComponent />
          </AuthenticationComponent>

          <ReloadButtonComponent
            onClick={() =>
              fetchAllSubmittal({ project_id: project.payload?.id })
            }
          />
        </div>
        <div className="col-md-12 mt-2 hidden-print">
          <Table
            loading={submittals.isPending}
            columns={column}
            dataSource={submittalData}
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
  submittals: state.submittal.fetchAll,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllSubmittal: (action: any) => dispatch(fetchAllSubmittal(action)),
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmittalComponent);
