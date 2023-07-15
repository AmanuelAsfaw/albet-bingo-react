import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { AddMeetingFilePropType, sendData } from "../../util/MeetingFile.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  MEETING_FILE_TYPE,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllMeetingFile } from "../../../../../../../redux/MeetingFile/MeetingFile.action";
import { last, toNumber } from "lodash";

const AddMeetingFileComponent: FC<AddMeetingFilePropType> = ({
  project,
  meeting_files,
  fetchAllMeetingFile,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  useEffect(() => {
    form.setFieldsValue({
      no:
        meeting_files.payload.length > 0
          ? toNumber(last(meeting_files?.payload)?.no) + 1
          : 1,
    });
  }, [meeting_files, isModalVisible, form]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("no", value.no);
    formData.append("project_id", project.payload?.id);
    formData.append("date", value.date.format(dateFormat));
    formData.append("meeting_type", value.meeting_type);
    formData.append("file", value?.file?.file);

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllMeetingFile({ project_id: project.payload?.id });
        OpenNotification(NotificationType.SUCCESS, "Meeting file saved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save meeting file",
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
        New Meeting
      </Button>
      <Modal
        width={900}
        style={{ top: 30 }}
        title="New Meeting File"
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
              Upload
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            date: moment(),
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date Required!" }]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="No"
                name="no"
                rules={[{ required: true, message: "No Required!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Meeting Type"
                name="meeting_type"
                rules={[{ required: true, message: "Meeting Type Required!" }]}
              >
                <Select>
                  {MEETING_FILE_TYPE.map((e, index) => (
                    <Select.Option key={index} value={e}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="File"
                rules={[{ required: true, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button
                    className="btn-outline-secondary"
                    style={{ width: "100%" }}
                  >
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
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
  meeting_files: state.meeting_file.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllMeetingFile: (action: any) => dispatch(fetchAllMeetingFile(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMeetingFileComponent);
