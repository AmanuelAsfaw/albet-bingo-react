import { Button, Form, Input, Modal, Select } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { fetchAllUser } from "../../../../redux/User/User.action";
import {
  AddUserManagementPropType,
  getAccessType,
  POST,
} from "../../utils/UserManagement.util";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../utilities/utilities";
import {
  NotificationType,
  ValidationStatus,
} from "../../../../constants/Constants";
import { validateEmail } from "../../../Signup/BasicInfo/BasicInfo.util";
const AddUserComponent: FC<AddUserManagementPropType> = ({ fetchUsers }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [email_status, setEmailValidation] = useState<any>("");

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const EmailValidator = (rule: any, value: any) => {
    return new Promise((resolve, reject) => {
      setEmailValidation(ValidationStatus.VALIDATING);
      if (value) {
        if (
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          )
        ) {
          validateEmail(value)
            .then(() => {
              setEmailValidation("");
              resolve(true);
            })
            .catch((error) => {
              setEmailValidation(ValidationStatus.ERROR);
              reject("Email Already Exist");
            });
        } else {
          setEmailValidation(ValidationStatus.ERROR);
          reject("Input Correct Email");
        }
      } else {
        setEmailValidation(ValidationStatus.ERROR);
        reject("Email Required!");
      }
    });
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      access_type: getAccessType(value.access_type),
    };

    POST(data)
      .then(() => {
        fetchUsers({ filter: "all" });
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "User Registered", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Register User",
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
        Register
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="User"
        width={500}
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
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
            access_type: ["Communication"],
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Full Name"
                name="full_name"
                rules={[{ required: true, message: "Full Name Required!" }]}
              >
                <Input placeholder="name" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Email"
                name="email"
                hasFeedback
                validateStatus={email_status}
                rules={[
                  {
                    required: true,
                    validator: EmailValidator,
                  },
                ]}
              >
                <Input type="email" placeholder="example@email.com" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password Required!" }]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Confirm password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="confirm password" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Role (Position)"
                name="role"
                rules={[{ required: true, message: "Role Required!" }]}
              >
                <Input placeholder="CEO" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Access Type"
                name="access_type"
                rules={[{ required: true, message: "Access Type Required!" }]}
              >
                <Select mode="multiple" placeholder="access-type">
                  <Select.Option key={0} value={"Project"}>
                    Project
                  </Select.Option>
                  <Select.Option key={1} value={"Task"}>
                    Task
                  </Select.Option>
                  <Select.Option key={3} value={"Letter"}>
                    Letter
                  </Select.Option>
                  <Select.Option key={4} value={"Communication"}>
                    Communication
                  </Select.Option>
                  <Select.Option key={5} value={"Planning"}>
                    Planning
                  </Select.Option>
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserComponent);
