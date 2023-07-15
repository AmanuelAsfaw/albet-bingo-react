import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  Upload,
  UploadFile,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";

import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AddMeetingPropType,
  saveData,
  sendData,
  getData,
  clearData,
} from "../../util/Meeting.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  MeetingType,
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  zeroPad,
} from "../../../../../../../utilities/utilities";
import { fetchAllMeeting } from "../../../../../../../redux/Meeting/Meeting.action";
import AttendanceComponent from "./components/Attendance/Attendance.component";
import AgendaDiscussionComponent from "./components/AgendaDiscussion/AgendaDiscussion.components";
import AgendaComponent from "./components/Agenda/Agenda.components";
import ParticipantsComponent from "./components/Participants/Participants.component";

const AddMeetingComponent: FC<AddMeetingPropType> = ({
  fetchMeeting,
  project,
  meetings,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attendances, setAttendances] = useState<any[]>(getData().attendances);
  const [agendas, setAgendas] = useState(getData().agendas);
  const [file, setFile] = useState<any>(null);

  const [agenda_discussions, setAgendaDiscussions] = useState(
    getData().agenda_discussions
  );

  const [participant, setParticipant] = useState<any[]>(getData().participant);

  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    console.log(form.getFieldsValue());
    saveData({
      ...form.getFieldsValue(),
      attendances,
      agendas,
      agenda_discussions,
      participant,
    });
    setIsModalVisible(false);
  };

  const clearFields = () => {
    form.resetFields();
    setAttendances([{ key: Date.now() }]);
    setAgendas([{ key: Date.now() }]);
    setAgendaDiscussions([{ key: Date.now() }]);
    setParticipant([{ key: Date.now() }]);
  };

  const Submit = (value: any) => {
    console.log(value);
    console.log(value.file.fileList[0]);
    
    setLoading(true);
    let formData = new FormData();
    formData.append("file", file?file:'');
    formData.append("project_id", project.payload?.id);
    console.log(value);
    
    formData.append("date", value.date);
    formData.append("meeting_no", value.meeting_no);
    formData.append("type", value.type);
    formData.append("location", value.location);
    formData.append("meeting_completion_time", value.meeting_completion_time);
    formData.append("dir_name", "minutes_of_meeting");
    formData.append(
      "meeting_attendances",
      JSON.stringify(
        attendances.map((item: any, _index: any) => ({
          ...item
        }))
      )
    );
    formData.append(
      "meeting_agendas",
      JSON.stringify(
        agendas.map((item: any, _index: any) => ({
          ...item
        }))
      )
    );
    formData.append(
      "meeting_agenda_discussions",
      JSON.stringify(
        agenda_discussions.map((item: any, _index: any) => ({
          ...item
        }))
      )
    );
    formData.append(
      "meeting_participants",
      JSON.stringify(
        participant.filter((e) => e.name && e.name !== "").map((item: any, _index: any) => ({
          ...item
        }))
      )
    );
    const data = {
      ...value,
      project_id: project.payload?.id,
      meeting_attendances: attendances,
      meeting_agendas: agendas,
      meeting_agenda_discussions: agenda_discussions,
      meeting_participants: participant.filter((e) => e.name && e.name !== ""),
      dir_name: 'minutes_of_meeting'
    };
    console.log(formData);
    sendData(formData)
      .then(() => {
        fetchMeeting({ project_id: project.payload?.id });
        clearData();
        clearFields();
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.MEETING_SUCCESS, "");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.MEETING_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Register Meeting
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1000}
        title="Register Meeting"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            ...getData(),
            project_id: project.payload?.id,
          }}
          encType="multipart/form-data"
        >
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
              <Form.Item
                label="Meeting Type"
                name="type"
                rules={[{ message: "Meeting Type Required!", required: true }]}
              >
                <Select placeholder="Select">
                  <Select.Option key="0" value={MeetingType.REGULAR_ANNUAL}>
                    {MeetingType.REGULAR_ANNUAL}
                  </Select.Option>
                  <Select.Option key="1" value={MeetingType.REGULAR_BIWEEKLY}>
                    {MeetingType.REGULAR_BIWEEKLY}
                  </Select.Option>
                  <Select.Option key="2" value={MeetingType.REGULAR_MONTHLY}>
                    {MeetingType.REGULAR_MONTHLY}
                  </Select.Option>
                  <Select.Option key="3" value={MeetingType.REGULAR_QUARTERLY}>
                    {MeetingType.REGULAR_QUARTERLY}
                  </Select.Option>
                  <Select.Option key="4" value={MeetingType.REGULAR_WEEKLY}>
                    {MeetingType.REGULAR_WEEKLY}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Meeting No" name="meeting_no">
                <Input value={zeroPad(meetings.payload.length + 1)} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Meeting Date"
                name="date"
                rules={[{ message: "Meeting Date Required!", required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Meeting Location"
                name="location"
                rules={[
                  { message: "Meeting Location Required!", required: true },
                ]}
              >
                <Input placeholder="Location" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="File"
                name="file"
              >
                <Upload
              name={"file"}
              beforeUpload={() => {
                return false;
              }}
              type="select"
              multiple={false}
              maxCount={1}
              // onChange={(e) =>
              //   onChangeHandler(record.key, "photo", e.file)
              // }
              onChange={(e) => setFile(e.file)}
            >
              <Button
                className="btn-outline-secondary"
                style={{ width: "100%" }}
              >
                <UploadOutlined /> Upload File
              </Button>
            </Upload>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-2 mt-5">
              <h6>1. Meeting Attendance</h6>
            </div>
            <div className="col-md-12 mb-2">
              <span>Signing</span>
            </div>
            <div className="col-md-12">
              <AttendanceComponent
                data={attendances}
                setData={setAttendances}
              />
            </div>
            <div className="col-md-12 mb-2 mt-3">
              <span>Non Signing</span>
            </div>
            <div className="col-md-12">
              <ParticipantsComponent
                dataAction={[participant, setParticipant]}
              />
            </div>
            <div className="col-md-12 mt-5 mb-2">
              <h6> 2. Meeting Agenda</h6>
            </div>

            <div className="col-md-12">
              <AgendaComponent data={agendas} setData={setAgendas} />
            </div>

            <div className="col-md-12 mt-5 mb-2">
              <h6> 3. Meeting Agenda Discussion</h6>
            </div>

            <div className="col-md-12">
              <AgendaDiscussionComponent
                data={agenda_discussions}
                setData={setAgendaDiscussions}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <Form.Item
                label="Meeting Completion Time"
                name="meeting_completion_time"
                rules={[
                  {
                    message: "Meeting Completion Time Required!",
                    required: true,
                  },
                ]}
              >
                <TimePicker use12Hours format={"HH:mm a"} />
              </Form.Item>
            </div>
          </div>
        </Form>
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
  meetings: state.meeting.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMeeting: (action: any) => dispatch(fetchAllMeeting(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMeetingComponent);
