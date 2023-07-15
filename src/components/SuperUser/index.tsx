import { Button, Form, Modal } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { UserAddOutlined, CloseOutlined } from "@ant-design/icons";
import { PUT, SuperUserPropType } from "./util/SuperUser.util";
import { fetchAllUser } from "../../redux/User/User.action";
import Table, { ColumnsType } from "antd/lib/table";
import { OpenNotification } from "../common/Notification/Notification.component";
import { NotificationType } from "../../constants/Constants";
import { ErrorHandler } from "../../utilities/utilities";
import AddSuperUserComponent from "./components/Add/AddSuperUser.component";
import { User } from "../../redux/User/User.type";

const SuperUserComponent: FC<SuperUserPropType> = ({ fetchAllUser, users }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalVisible) {
      fetchAllUser();
    }
  }, [fetchAllUser, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const column: ColumnsType<User> = [
    {
      title: "No",
      dataIndex: "key",
      width: "5%",
    },
    {
      title: "User",
      dataIndex: "full_name",
      width: "20%",
    },
    {
      title: "Action",
      width: "15%",
      align: "center",
      render: (value, record) => (
        <Button
          type="text"
          icon={<CloseOutlined />}
          style={{ color: "red" }}
          loading={loading}
          onClick={() => onDelete(record.id)}
        >
          Remove
        </Button>
      ),
    },
  ];

  const onDelete = (id: any) => {
    setLoading(true);
    PUT({ id, is_super_user: false })
      .then(() => {
        setLoading(false);
        fetchAllUser();
        OpenNotification(NotificationType.SUCCESS, "Super User Removed!", "");
      })
      .catch((error) => {
        setLoading(true);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Remove Super User",
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        type="link"
        icon={<UserAddOutlined />}
        onClick={() => setIsModalVisible(true)}
      ></Button>
      <Modal
        style={{ top: 10 }}
        width={1000}
        title="Super Users"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        <Form layout="vertical" form={form}>
          <div className="row">
            <div className="col-md-12">
              <AddSuperUserComponent />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <Table
                columns={column}
                loading={users.isPending}
                dataSource={users.payload
                  .filter((e) => e.is_super_user)
                  .map((e, index) => ({ ...e, key: index + 1 }))}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(SuperUserComponent);
