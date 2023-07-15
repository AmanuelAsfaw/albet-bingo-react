import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AddPaymentRequestPropType,
  sendPaymentRequestData,
} from "../../util/PaymentRequest.util";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";
import moment from "moment";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import {
  NotificationType,
  PAYMENT_REQUEST_TYPES,
} from "../../../../../../../constants/Constants";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { fetchAllPaymentRequest } from "../../../../../../../redux/PaymentRequest/PaymentRequest.action";

const AddPaymentRequestComponent: FC<AddPaymentRequestPropType> = ({
  project,
  users,
  fetchUser,
  fetchAllPaymentRequest,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  useEffect(() => {
    if (isModalVisible) fetchUser();
  }, [fetchUser, isModalVisible]);

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
    formData.append("uploaded_by", value.uploaded_by);
    formData.append("reviewed_by", `${value.reviewed_by}`);
    formData.append("payment_amount", value.payment_amount);

    sendPaymentRequestData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllPaymentRequest({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Payment Request saved!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save payment request",
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
        New Payment
      </Button>
      <Modal
        width={900}
        centered
        title="New Payment Request"
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
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[
                  { required: true, message: "Payment Request Date Required!" },
                ]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reference No"
                name="reference_no"
                rules={[
                  {
                    required: true,
                    message: "Payment Request Reference Required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Payment Request Name Required!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Type"
                name="type"
                rules={[
                  { required: true, message: "Payment Request Type Required!" },
                ]}
              >
                <Select>
                  {PAYMENT_REQUEST_TYPES.map((e, index) => (
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
                name="uploaded_by"
                rules={[{ required: true, message: "Uploaded By Required!" }]}
              >
                <Select>
                  {users.payload.map((e, index) => (
                    <Select.Option key={index} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Payment Amount"
                name="payment_amount"
                rules={[
                  { required: true, message: "Payment Amount Required!" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reviewed By"
                name="reviewed_by"
                rules={[{ required: true, message: "Reviewed By Required!" }]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {users.payload.map((e, i) => (
                    <Select.Option key={i + Date.now() + 70} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
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
  fetchAllPaymentRequest: (action: any) =>
    dispatch(fetchAllPaymentRequest(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPaymentRequestComponent);
