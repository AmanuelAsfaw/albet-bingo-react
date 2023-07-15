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
  AddPaymentsPropType,
  sendPaymentsData,
} from "../../util/Payments.util";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  NotificationType,
  PAYMENT_REQUEST_TYPES,
} from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllPayments } from "../../../../../../../redux/Payments/Payments.action";
const AddPaymentsComponent: FC<AddPaymentsPropType> = ({
  project,
  users,
  fetchUser,
  fetchAllPayments,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(PAYMENT_REQUEST_TYPES[0]);
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
    formData.append("file", value?.file?.file);
    const data: any = {};
    data["project_id"] = project.payload?.id;
    data["date"] = value.date.format(dateFormat);
    data["reference_no"] = value.reference_no;
    if (value.retention_amount) {
      data["retention_amount"] = value.retention_amount;
    }
    data["name"] = value.name;
    data["type"] = value.type;
    data["uploaded_by"] = value.uploaded_by;
    data["payment_amount"] = value.payment_amount;
    data["advance_repaid_amount"] = value.advance_repaid_amount;
    formData.append("data", JSON.stringify(data));

    sendPaymentsData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllPayments({ project_id: project.payload?.id });
        OpenNotification(NotificationType.SUCCESS, "Payments saved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save payments",
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
        style={{ top: 30 }}
        title="New Payments"
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
            type,
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Payments Date Required!" }]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reference No"
                name="reference_no"
                rules={[
                  { required: true, message: "Payments Reference Required!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Payments Name Required!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Payments Type Required!" }]}
              >
                <Select onChange={(e) => setType(e)}>
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
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              {type !== PAYMENT_REQUEST_TYPES[0] &&
              type !== PAYMENT_REQUEST_TYPES[3] &&
              type !== PAYMENT_REQUEST_TYPES[4] ? (
                <Form.Item
                  label="Advance Repaid Amount"
                  name="advance_repaid_amount"
                  rules={[
                    {
                      required: true,
                      message: "Advance Repaid Amount Required!",
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              ) : null}
            </div>

            {type !== PAYMENT_REQUEST_TYPES[4] && (
              <div className="col-md-6">
                <Form.Item label="Retention Amount" name="retention_amount">
                  <InputNumber
                    style={{ width: "100%" }}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </Form.Item>
              </div>
            )}

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
                rules={[
                  {
                    required: true,
                    message: "Submittal Uploaded By Required!",
                  },
                ]}
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
  fetchAllPayments: (action: any) => dispatch(fetchAllPayments(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPaymentsComponent);
