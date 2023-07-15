import { Button, Popconfirm, Popover, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { MoreOutlined } from "@ant-design/icons";
import { DELETE, UserMatrixPropType } from "./utils/UserMatrix.util";
import { fetchAllRole } from "../../redux/Role/Role.action";
import AddUserMatrixComponent from "./components/Add/AddUserMatrix.component";
import { ErrorHandler } from "../../utilities/utilities";
import { OpenNotification } from "../common/Notification/Notification.component";
import { NotificationType } from "../../constants/Constants";
import ViewUserMatrixComponent from "./components/View/ViewUserMatrix.component";
import EditUserMatrixComponent from "./components/Edit/EditUserMatrix.component";

const UserMatrixComponent: FC<UserMatrixPropType> = ({ fetchRoles, roles }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchRoles({});
  }, [fetchRoles]);

  const onDelete = (id: number) => {
    setLoading(true);
    DELETE(id)
      .then(() => {
        setLoading(false);
        fetchRoles({});
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Remove Role",
            e.message
          )
        );
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AddUserMatrixComponent />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            columns={[
              {
                title: "No",
                key: "no",
                dataIndex: "key",
              },
              {
                title: "Name",
                key: "name",
                dataIndex: "name",
              },
              {
                title: "Action",
                key: "action",
                render: (value, record) => (
                  <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                      <div className="d-flex flex-column">
                        <ViewUserMatrixComponent role={record} />
                        <EditUserMatrixComponent role={record} />
                        <Popconfirm
                          placement="leftTop"
                          title="Are you sure you want to this?"
                          onConfirm={() => onDelete(record.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button danger type="text" loading={loading}>
                            Delete
                          </Button>
                        </Popconfirm>
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
            dataSource={roles.payload.map((e, index) => ({
              ...e,
              key: index + 1,
            }))}
            loading={roles.isPending}
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
  roles: state.role.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchRoles: (action: any) => dispatch(fetchAllRole(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMatrixComponent);
