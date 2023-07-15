import { Button, Form, Modal, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { AddUserControlPropType, sendData } from "../../util/UserControl.util";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import {
  AccessType,
  NotificationType,
} from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { fetchOneProjects } from "../../../../../redux/Project/Project.action";
import { isEmpty } from "lodash";

const AddUserControlComponent: FC<AddUserControlPropType> = ({
  project,
  users,
  roles,
  fetchOneProject,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isEmpty(project.payload)) {
      let result = users.payload.filter(
        (o1) =>
          !project.payload?.user_controls?.some((o2) => o1.id === o2.user_id) &&
          !o1.is_super_user
      );
      setUserData(result);
    } else {
      setUserData(users.payload);
    }
  }, [users, project, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      project_id: project.payload?.id,
      user_id: value.user_id,
      role_id: value.role_id,
      access_type: value.access_type,
    };

    sendData(data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchOneProject(project.payload?.id);
        OpenNotification(
          NotificationType.SUCCESS,
          "User Assignment saved!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save user assignment",
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
        Add User
      </Button>
      <Modal
        className="fixed-modal"
        width={600}
        title="New User Control"
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
              Add
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{ access_type: AccessType.READ }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="User"
                name="user_id"
                rules={[{ required: true, message: "User Required!" }]}
              >
                <Select
                  placeholder="User"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {userData.map((e: any, i: number) => (
                    <Select.Option key={i + Date.now() + 70} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Role"
                name="role_id"
                rules={[{ required: true, message: "Role Required!" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Role"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option!.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {roles.payload.map((e, i) => (
                    <Select.Option key={i} value={e.id}>
                      {e.name}
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
  roles: state.role.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneProject: (action: any) => dispatch(fetchOneProjects(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserControlComponent);
