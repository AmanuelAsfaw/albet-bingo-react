import { Button, DatePicker, Form, Modal, Select, Input, Upload } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { AddLetterPropType, sendData } from "../../../util/Letter.util";

import { UploadOutlined } from "@ant-design/icons";
import {
  LetterType,
  Message,
  NotificationType,
  NEW_LETTER_TYPE,
} from "../../../../../constants/Constants";
import { ErrorHandler, getUserData } from "../../../../../utilities/utilities";
import { fetchAllLetter } from "../../../../../redux/Letter/Letter.action";
import moment from "moment";
import { OpenNotification } from "../../../../common/Notification/Notification.component";

const AddLetterComponent: FC<AddLetterPropType> = ({
  fetchLetter,
  projects,
}) => {
  console.log({ projects });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();

    formData.append("date", value.date);
    formData.append("type", NEW_LETTER_TYPE.OUT_GOING);
    formData.append("reference_number", value.reference_number);
    formData.append("file", value.file.file);
    formData.append("subject", value.subject);
    formData.append("from", value.from);
    formData.append("to", value.to);
    if (value.project_id) formData.append("project_id", value.project_id);

    sendData(formData)
      .then(() => {
        handleOk();
        fetchLetter();
        form.resetFields();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.LETTER_REGISTRATION_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.LETTER_REGISTRATION_FAILED,
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
        New Letter
      </Button>
      <Modal
        title="Register Letter"
        className="fixed-modal"
        width={850}
        centered
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
              Register
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
            from: "OVID-Kling Consult",
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date Required!" }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reference Number"
                name="reference_number"
                rules={[
                  { required: true, message: "Reference Number Required!" },
                ]}
              >
                <Input placeholder="reference number" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Project"
                name="project_id"
              >
                <Select
                  style={{ width: "100%" }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {projects.payload.map((project) => (
                    <Select.Option value={project.id}>
                      {project.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Subject Required!" }]}
              >
                <TextArea autoSize rows={2} placeholder="subject" />
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
            <div className="col-md-6">
              <Form.Item
                label="From"
                name="from"
                rules={[{ message: "From Required!", required: true }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="To"
                name="to"
                rules={[{ message: "To Required!", required: true }]}
              >
                <Input />
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
  projects: state.project.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchLetter: (action: any) => dispatch(fetchAllLetter(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLetterComponent);
