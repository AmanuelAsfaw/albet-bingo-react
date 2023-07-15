import { MoreOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Popover, Table, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../constants/Constants";
import { fetchAllUser } from "../../redux/User/User.action";
import { User } from "../../redux/User/User.type";
import { ErrorHandler } from "../../utilities/utilities";
import { OpenNotification } from "../common/Notification/Notification.component";
import ReloadButtonComponent from "../common/ReloadButton/ReloadButton.component";
import AddUserComponent from "./components/Add/AddUser.component";
import EditUserComponent from "./components/Edit/EditUser.component";
import { PUT, UserManagementPropType } from "./utils/UserManagement.util";

const UserManagementComponent: FC<UserManagementPropType> = ({
  fetchUsers,
  users,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchUsers({ filter: "all" });
  }, [fetchUsers]);

  const onUpgrade = (user: User) => {
    setLoading(true);
    PUT({ is_super_user: !user.is_super_user, id: user.id })
      .then(() => {
        fetchUsers({ filter: "all" });
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "User Upgraded", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Upgrade",
            e.message
          )
        );
      });
  };

  const onActivate = (user: User) => {
    setLoading(true);
    PUT({
      status: user.status === "Activated" ? "Terminated" : "Activated",
      id: user.id,
    })
      .then(() => {
        fetchUsers({ filter: "all" });
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "User Upgraded", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Upgrade",
            e.message
          )
        );
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AddUserComponent />
          <ReloadButtonComponent
            onClick={() => fetchUsers({ filter: "all" })}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            loading={users.isPending}
            dataSource={users.payload.map((e, index) => ({
              ...e,
              key: index + 1,
            }))}
            columns={[
              {
                title: "No",
                key: "no",
                dataIndex: "key",
              },
              {
                title: "Name",
                key: "name",
                dataIndex: "full_name",
              },
              {
                title: "Email",
                key: "email",
                dataIndex: "email",
              },

              {
                title: "Role",
                key: "role",
                dataIndex: "role",
              },
              {
                title: "Type",
                key: "type",
                render: (value, record) =>
                  record.is_super_user ? "Super-User" : "Normal",
              },
              {
                title: "Status",
                key: "status",
                render: (value, record) => (
                  <Tag color={record.status === "Activated" ? "green" : "red"}>
                    {record.status}
                  </Tag>
                ),
              },
              {
                title: "Action",
                render: (value, record) => (
                  <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                      <div className="d-flex flex-column">
                        <Popconfirm
                          title={`Are you sure to ${
                            record.status === "Activated"
                              ? "Terminate"
                              : "Activated"
                          } this User?`}
                          onConfirm={() => onActivate(record)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            danger={record.status === "Activated"}
                            loading={loading}
                            type="text"
                          >
                            {record.status === "Activated"
                              ? "Terminate"
                              : "Activated"}
                          </Button>
                        </Popconfirm>
                        <Popconfirm
                          title={`Are you sure to set user to ${
                            record.is_super_user ? "Normal" : "Super-User"
                          } ?`}
                          onConfirm={() => onUpgrade(record)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button loading={loading} type="text">
                            {record.is_super_user
                              ? "Set Normal"
                              : "Set Super-User"}
                          </Button>
                        </Popconfirm>
                        <EditUserComponent user={record} />
                      </div>
                    }
                  >
                    <Button
                      icon={<MoreOutlined />}
                      className="btn-outline-secondary border-0"
                    ></Button>
                  </Popover>
                ),
              },
            ]}
          />
        </div>
      </div>
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
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementComponent);
