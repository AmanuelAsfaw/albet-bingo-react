import { Button, Form, Input, Modal, Tag, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";

import { EyeOutlined } from "@ant-design/icons";
import { DetailPropType } from "../../util/Meeting.util";

import { fetchOneMeeting } from "../../../../../../../redux/Meeting/Meeting.action";
import moment from "moment";
import { getInitials, zeroPad } from "../../../../../../../utilities/utilities";
import { ColumnsType } from "antd/lib/table";
import SignatureComponent from "../../../../../../common/Signature/Signature.component";
import Text from "antd/lib/typography/Text";
import LoadingIndicator from "../../../../../../common/Loading";

const DetailComponent: FC<DetailPropType> = ({
  fetchMeeting,
  project,
  meeting,
  meeting_id,
  index,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const attendance_columns: ColumnsType<any> = [
    {
      title: "No",
      render: (value: number, record: any, index: number) => "1." + (index + 1),
      width: "5%",
      sortOrder: "ascend",
      sortDirections: [],
      sorter: (a, b) => a.meeting_attendance.id - b.meeting_attendance.id,
    },
    {
      title: "Full Name",
      dataIndex: "user_id",
      key: "date",
      render: (data, record) => record.full_name,
      width: "35%",
    },
    {
      title: "Position",
      render: (data, record) => record.role,
      width: "25%",
    },
    {
      title: "Signature",
      render: (data, record) =>
        record.meeting_attendance?.is_approved ? (
          <SignatureComponent user={record} />
        ) : (
          <Tag color="yellow">Not Approved</Tag>
        ),
      width: "25%",
    },
  ];

  const participant_columns: ColumnsType<any> = [
    {
      title: "No",
      render: (value: number, record: any, index: number) => "1." + (index + 1),
      width: "5%",
    },
    {
      title: "Full Name",
      key: "user_id",
      render: (data, record) => record.name,
      width: "35%",
    },
    {
      title: "Position",
      render: (data, record) => record.position,
      width: "25%",
    },
    {
      title: "Initials",
      render: (data, record) => <Text italic>{getInitials(record.name)}</Text>,
      width: "25%",
    },
  ];

  const common_columns = (i: number) => [
    {
      title: "No",
      key: "no",
      width: "5%",
      render: (data: any, record: any, index: any) => i + "." + (index + 1),
    },
    {
      title: "Description",
      width: "95%",
      key: "description",
      dataIndex: "description",
    },
  ];

  const action_plan_columns: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      width: "5%",
      render: (data, record, index) => "10." + (index + 1),
    },
    {
      title: "Task",
      width: "55%",
      key: "task",
      dataIndex: "task",
    },
    {
      title: "Assigned to",
      width: "20%",
      key: "assigned_to",
      dataIndex: "assigned_to",
      render: (value, record) => record.assigned_to,
    },
    {
      title: "Schedule By",
      width: "20%",
      key: "schedule_by",
      dataIndex: "schedule_by",
      render: (value) => moment(value).format("DD/MM/YYYY"),
    },
  ];

  const general_work_columns: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      width: "5%",
      render: (data, record, index) => "7." + (index + 1),
    },
    {
      title: "Task",
      width: "75%",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Assigned to",
      width: "20%",
      key: "status",
      dataIndex: "status",
    },
  ];

  useEffect(() => {
    if (isModalVisible) fetchMeeting(meeting_id);
  }, [meeting_id, fetchMeeting, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Detail
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1200}
        title="Meeting Detail"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        {meeting.isPending ? (
          <LoadingIndicator />
        ) : (
          <Form layout="vertical">
            <div className="row">
              <div className="col-md-4">
                <Form.Item label="Project">
                  <Input value={project.payload?.name} />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Contractor">
                  <Input value={project.payload?.contractor?.name} />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Consultant">
                  <Input value={project.payload?.consultant?.name} />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Employer">
                  <Input value={project.payload?.client?.name} />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Meeting Type">
                  <Input value={meeting.payload.type} />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Meeting No">
                  <Input value={zeroPad(index)} />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Meeting Date">
                  <Input
                    value={moment(meeting.payload.date).format("DD/MM/YYYY")}
                  />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Meeting Location">
                  <Input value={meeting.payload.location} />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-2 mt-5">
                <h6>1. Meeting Attendance</h6>
              </div>
              <div className="col-md-12 mb-2">
                <h6>Signing</h6>
              </div>
              <div className="col-md-12">
                <Table
                  columns={attendance_columns}
                  dataSource={meeting.payload.meeting_attendances}
                  pagination={false}
                />
              </div>
              <div className="col-md-12 mb-2 mt-2">
                <h6>Non-Signing</h6>
              </div>
              <div className="col-md-12">
                <Table
                  columns={participant_columns}
                  dataSource={meeting.payload.meeting_participants}
                  pagination={false}
                />
              </div>
              <div className="col-md-12 mt-5 mb-2">
                <h6> 2. Meeting Agenda</h6>
              </div>

              <div className="col-md-12">
                <Table
                  columns={common_columns(2)}
                  dataSource={meeting.payload.meeting_agendas}
                  pagination={false}
                />
              </div>
              <div className="col-md-12 mt-5 mb-2">
                <h6> 3. Meeting Agenda Discussion</h6>
              </div>

              <div className="col-md-12">
                <Table
                  columns={common_columns(3)}
                  dataSource={meeting.payload.meeting_agenda_discussions}
                  pagination={false}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-4">
                <Form.Item label="Meeting Completion Time">
                  <Input
                    value={moment(
                      meeting.payload.meeting_completion_time
                    ).format("LT")}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        )}
      </Modal>
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
  meeting: state.meeting.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMeeting: (action: any) => dispatch(fetchOneMeeting(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
