import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchAllMeeting,
  fetchOneMeeting,
} from "../../../../../redux/Meeting/Meeting.action";
import { Meeting } from "../../../../../redux/Meeting/Meeting.type";
import { MeetingPropType, deleteData } from "./util/Meeting.util";
import {
  PrinterOutlined,
  MoreOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Popconfirm, Table } from "antd";
import { zeroPad } from "../../../../../utilities/utilities";
import moment from "moment";
import { Button, Popover } from "antd";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import AddMeetingComponent from "./components/Add";
import DetailComponent from "./components/Detail/Detail.component";
import StatusComponent from "./components/Status/Status.component";
import PrintComponent from "./components/Print/Print.component";
import EditComponent from "./components/Edit";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";
import SharedMeetingComponent from "./components/Add/ShareMeeting/ShareMeeting.components"
import SharedStatusComponent from "./components/ShareMeeting/Status.components"

const MinutesOfMeetingComponent: FC<MeetingPropType> = ({
  fetchMeetings,
  meetings,
  project,
  fetchUsers,
  fetchMeeting,
}) => {
  const [is_visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected_index, setSelected] = useState(1);
  useEffect(() => {
    fetchMeetings({
      project_id: project.payload ? project.payload?.id : undefined,
    });
    fetchUsers();
  }, [fetchMeetings, project, fetchUsers]);

  const onDelete = (id: any) => {
    setLoading(true);
    deleteData(id)
      .then(() => {
        setLoading(false);
        fetchMeetings({
          project_id: project.payload ? project.payload?.id : undefined,
        });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.MEETING_REMOVED_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.MEETING_REMOVED_FAILED,
            e.message
          )
        );
      });
  };

  const columns: ColumnsType<Meeting> = [
    {
      title: "No",
      dataIndex: "id",
      key: "no",
      render: (value, record, index) => zeroPad(index + 1),
    },
    {
      title: "Meeting Number",
      dataIndex: "meeting_no",
      key: "meeting_no"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => (moment(a.date).isBefore(b.date) ? 1 : -1),
      sortOrder: "descend",
      render: (data) => moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "Place",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Meeting Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      render: (value, record) => <>
        <SharedStatusComponent meeting={record} />
      </>,
    },
    {
      title: "Share",
      key: "share",
      render: (value, record) => <SharedMeetingComponent meeting={record}/>,
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "20%",
      render: (value, record, index) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <>
                  <AuthenticationComponent type="DELETE">
                    <Popconfirm
                      placement="leftTop"
                      title="Are you sure you want to Remove"
                      onConfirm={() => onDelete(record.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger type="text" loading={loading}>
                        Remove
                      </Button>
                    </Popconfirm>
                  </AuthenticationComponent>
                  <AuthenticationComponent type="EDIT">
                    <EditComponent id={record.id} index={index + 1} />
                  </AuthenticationComponent>
                </>

                <DetailComponent meeting_id={value} index={index + 1} />
                <Button
                  loading={loading}
                  type="text"
                  onClick={() => {
                    setSelected(index + 1);
                    fetchMeeting(record.id);
                    setVisible(true);
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
            ></Button>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <div className="row mt-1">
      <div className="col-md-12">
        <ReloadButtonComponent
          onClick={() => fetchMeetings({ project_id: project.payload?.id })}
        />
        <AuthenticationComponent type="WRITE">
          <AddMeetingComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2  hidden-print">
        <Table
          columns={columns}
          dataSource={meetings.payload.map((e, index) => ({
            ...e,
            key: Date.now() + index,
          }))}
          loading={meetings.isPending}
        />
      </div>
      <div className="col-md-12 mt-2">
        <PrintComponent
          is_visible={is_visible}
          setVisibility={setVisible}
          index={selected_index}
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
  meetings: state.meeting.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMeetings: (action: any) => dispatch(fetchAllMeeting(action)),
  fetchMeeting: (action: any) => dispatch(fetchOneMeeting(action)),
  fetchUsers: (action: any) => dispatch(fetchAllUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinutesOfMeetingComponent);
