import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { AddDataPropType, sendData } from "../../util/Data.util";
import { fetchAllUser } from "../../../../../../redux/User/User.action";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  DATA_TYPES,
  NotificationType,
} from "../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllData } from "../../../../../../redux/Data/Data.action";

const AddDataComponent: FC<AddDataPropType> = ({
  project,
  users,
  fetchUser,
  fetchAllData,
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
    formData.append("revision_no", value.revision_no);

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllData({ project_id: project.payload?.id });
        OpenNotification(NotificationType.SUCCESS, "Data saved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save data",
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
        New Data
      </Button>
      <Modal
        width={800}
        centered
        title="New Data"
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
            uploaded_by: getUserData().id,
            revision_no: "0",
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Data Date Required!" }]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Reference No"
                name="reference_no"
                rules={[
                  { required: true, message: "Data Reference Required!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Revision No"
                name="revision_no"
                rules={[
                  { required: true, message: "Data Revision No Required!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Data Name Required!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Data Type Required!" }]}
              >
                <Select>
                  {DATA_TYPES.map((e, index) => (
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
            <div className="col-md-6">
              <Form.Item
                label="Uploaded By"
                rules={[
                  {
                    required: false,
                    message: "Contract Adminstration Uploaded By Required!",
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
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllData: (action: any) => dispatch(fetchAllData(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDataComponent);
