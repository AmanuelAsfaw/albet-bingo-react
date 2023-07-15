import { Button, Form, Modal, Select } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { AddSuperUserPropType, PUT } from "../../util/SuperUser.util";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";

import { fetchAllUser } from "../../../../redux/User/User.action";

const AddSuperUserComponent: FC<AddSuperUserPropType> = ({
  users,
  fetchAllUser,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      id: value.user_id,
      is_super_user: true,
    };

    PUT(data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllUser();
        OpenNotification(NotificationType.SUCCESS, "Super User Added!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to add super user",
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
        style={{ top: 10 }}
        title="New Super User"
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
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-10">
              <Form.Item name="user_id" label="Add User">
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="Select User"
                >
                  {users.payload
                    .filter((e) => !e.is_super_user)
                    .map((user: any) => (
                      <Select.Option value={user.id}>
                        {user.full_name}
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
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllUser: () => dispatch(fetchAllUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSuperUserComponent);
