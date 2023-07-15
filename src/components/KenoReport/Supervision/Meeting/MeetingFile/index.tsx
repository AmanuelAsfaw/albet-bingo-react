import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../constants/Constants";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import {
  ErrorHandler,
  getUserData,
  zeroPad,
} from "../../../../../utilities/utilities";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { MeetingFilePropType, deleteData } from "./util/MeetingFile.util";
import Table, { ColumnsType } from "antd/lib/table";
import { Button, Popconfirm } from "antd";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import { CloudDownloadOutlined } from "@ant-design/icons";
import AddMeetingFileComponent from "./components/Add/AddMeetingFile.component";
import { fetchAllMeetingFile } from "../../../../../redux/MeetingFile/MeetingFile.action";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import ShareMeetingFileComponent from "./components/Share/ShareMeetingFile.component";
import { toNumber } from "lodash";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const MeetingFileComponent: FC<MeetingFilePropType> = ({
  project,
  fetchUser,
  users,
  meeting_files,
  fetchAllMeetingFile,
}) => {
  useEffect(() => {
    fetchAllMeetingFile({ project_id: project.payload?.id });
    fetchUser();
  }, [fetchAllMeetingFile, project, fetchUser]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllMeetingFile({ project_id: project.payload?.id });
        OpenNotification(NotificationType.SUCCESS, "Meeting File deleted!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete meeting file",
            e.message
          )
        );
      });
  };

  const column: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      render: (value, record, index) => (
        <span>{zeroPad(toNumber(record.no))}</span>
      ),
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (value, record) => <span>{record.date}</span>,
    },
    {
      title: "Meeting Type",
      key: "meeting_type",
      dataIndex: "meeting_type",
    },
    {
      title: "Uploaded By",
      key: "user_id",
      dataIndex: "user_id",
      render: (date, record) => (
        <span>
          {users.payload.find((e) => e.id === record.user_id)?.full_name}
        </span>
      ),
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
              />
              <DocumentViewerComponent document={record.document} />
            </>
          ) : null}
        </>
      ),
    },
    {
      title: "Share",
      width: "100px",
      render: (value, record) => (
        <ShareMeetingFileComponent
          meeting_file_id={record.id}
          project={project.payload}
          users={users.payload}
        />
      ),
    },
    {
      title: "Action",
      className: "pl-0-td pr-0-td",
      render: (data, record) => (
        <>
          {record.user_id === getUserData().id ||
          getUserData().is_super_user ? (
            <Popconfirm
              placement="leftTop"
              title="Are you sure you want to remove this meeting file?"
              onConfirm={() => OnDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="text">
                Delete
              </Button>
            </Popconfirm>
          ) : null}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <ReloadButtonComponent
            onClick={() =>
              fetchAllMeetingFile({ project_id: project.payload?.id })
            }
          />
          <AuthenticationComponent type="WRITE">
            <AddMeetingFileComponent />
          </AuthenticationComponent>
        </div>
        <div className="col-md-12 mt-2 hidden-print">
          <Table
            loading={meeting_files.isPending}
            columns={column}
            dataSource={meeting_files.payload}
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
  meeting_files: state.meeting_file.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllMeetingFile: (action: any) => dispatch(fetchAllMeetingFile(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingFileComponent);
