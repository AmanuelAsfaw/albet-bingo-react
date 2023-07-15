import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  Upload,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";

import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { EditMeetingPropType, editData, getData } from "../../util/Meeting.util";
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
import {
  fetchAllMeeting,
  fetchOneMeeting,
} from "../../../../../../../redux/Meeting/Meeting.action";
import moment from "moment";
import AttendanceComponent from "../Add/components/Attendance/Attendance.component";
import ParticipantsComponent from "../Add/components/Participants/Participants.component";
import AgendaComponent from "../Add/components/Agenda/Agenda.components";
import AgendaDiscussionComponent from "../Add/components/AgendaDiscussion/AgendaDiscussion.components";

import LoadingIndicator from "../../../../../../common/Loading";

const EditMeetingComponent: FC<EditMeetingPropType> = ({
  fetchMeeting,
  project,
  meetings,
  meeting,
  id,
  fetchMeetings,
  index,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attendances, setAttendances] = useState([{ key: Date.now() }]);
  const [agendas, setAgendas] = useState([{ key: Date.now() }]);

  const [agenda_discussions, setAgendaDiscussions] = useState([
    { key: Date.now() },
  ]);

  // const [participant, setParticipant] = useState([{ key: Date.now() }]);
  const [participant, setParticipant] = useState<any[]>(getData().participant);
  const [file, setFile] = useState<any>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchMeeting(id);
  }, [fetchMeeting, id]);

  useEffect(() => {
    if (meeting.payload) {
      setAttendances(
        meeting.payload.meeting_attendances?.map((e, index) => ({
          key: index,
          ...e,
          user_id: e.meeting_attendance.user_id,
          id: e.meeting_attendance.id,
        }))
      );
      setAgendas(
        meeting.payload.meeting_agendas?.map((e, index) => ({
          key: index,
          ...e,
        }))
      );

      setAgendaDiscussions(
        meeting.payload.meeting_agenda_discussions?.map((e, index) => ({
          key: index,
          ...e,
        }))
      );

      setParticipant(
        meeting.payload.meeting_participants?.map((e, index) => ({
          key: index,
          ...e,
        }))
      );

      form.setFieldsValue({
        date: moment(meeting.payload?.date),
        // next_date: moment(meeting.payload.next_date),
        meeting_completion_time: moment(
          meeting.payload.meeting_completion_time
        ),
        location: meeting.payload.location,
        type: meeting.payload.type,
        // next_location: meeting.payload.next_location,
      });
    }
  }, [meeting, form]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("id", meeting.payload.id);
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
      meeting_participants: participant,
      id: meeting.payload.id,
    };

    editData(formData)
      .then(() => {
        fetchMeetings({ project_id: project.payload?.id });
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
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit Meeting
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1000}
        title="Edit Meeting"
        visible={isModalVisible}
        onCancel={handleOk}
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
        {meeting.isPending ? (
          <LoadingIndicator />
        ) : (
          <Form
            layout="vertical"
            onFinish={Submit}
            form={form}
            initialValues={{
              ...meeting.payload,
              date: moment(meeting.payload?.date),
              meeting_completion_time: moment(
                meeting.payload.meeting_completion_time
              ),
              next_time: moment(meeting.payload.meeting_completion_time),
              location: meeting.payload.location,
            }}
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
                  rules={[
                    { message: "Meeting Type Required!", required: true },
                  ]}
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
                    <Select.Option
                      key="3"
                      value={MeetingType.REGULAR_QUARTERLY}
                    >
                      {MeetingType.REGULAR_QUARTERLY}
                    </Select.Option>
                    <Select.Option key="4" value={MeetingType.REGULAR_WEEKLY}>
                      {MeetingType.REGULAR_WEEKLY}
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Meeting No">
                  <Input value={zeroPad(index)} />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Meeting Date"
                  name="date"
                  rules={[
                    { message: "Meeting Date Required!", required: true },
                  ]}
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
                      message: "Next Meeting Completion Time Required!",
                      required: true,
                    },
                  ]}
                >
                  <TimePicker use12Hours />
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
  meetings: state.meeting.fetchAll,
  meeting: state.meeting.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMeetings: (action: any) => dispatch(fetchAllMeeting(action)),
  fetchMeeting: (action: any) => dispatch(fetchOneMeeting(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMeetingComponent);
