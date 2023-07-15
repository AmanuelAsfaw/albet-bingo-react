import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  AddSubmittalPropType,
  sendSubmittalData,
} from "../../util/Submittal.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../utilities/utilities";
import {
  Message,
  NotificationType,
  SUBMITTAL_TYPES,
} from "../../../../../../constants/Constants";
import { fetchAllSubmittal } from "../../../../../../redux/Submittal/Submittal.action";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { fetchAllUser } from "../../../../../../redux/User/User.action";

const AddSubmittalComponent: FC<AddSubmittalPropType> = ({
  fetchSubmittal,
  project,
  users,
  fetchUser,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("project_id", project.payload?.id);
    formData.append("date", value.date.format(dateFormat));
    formData.append("reference_no", value.reference_no);
    formData.append("name", value.name);
    formData.append("type", value.type);
    formData.append("file", value?.file?.file);
    formData.append("uploaded_by", `${getUserData().id}`);

    sendSubmittalData(formData)
      .then(() => {
        handleOk();
        fetchSubmittal({ project_id: project.payload?.id });
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.SUBMITTAL_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.SUBMITTAL_FAILED,
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
        New Submittal
      </Button>
      <Modal
        width={900}
        centered
        title="New Submittal"
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
                label="Submittal Date"
                name="date"
                rules={[
                  { required: true, message: "Submittal Date Required!" },
                ]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Submittal Reference No"
                name="reference_no"
                rules={[
                  { required: true, message: "Submittal Reference Required!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Submittal Name"
                name="name"
                rules={[
                  { required: true, message: "Submittal Name Required!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Submittal Type"
                name="type"
                rules={[
                  { required: true, message: "Submittal Type Required!" },
                ]}
              >
                <Select>
                  {SUBMITTAL_TYPES.map((e, index) => (
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
                rules={[{ required: false, message: "Please input File" }]}
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
                label="Uploaded By"
                rules={[
                  {
                    required: false,
                    message: "",
                  },
                ]}
              >
                <Input
                  value={
                    users.payload.find((e) => e.id === getUserData().id)
                      ?.full_name
                  }
                />
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
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSubmittal: (action: any) => dispatch(fetchAllSubmittal(action)),
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubmittalComponent);
