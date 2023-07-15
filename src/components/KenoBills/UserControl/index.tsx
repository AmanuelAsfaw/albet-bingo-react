import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../constants/Constants";
import { fetchAllUser } from "../../../redux/User/User.action";
import { ErrorHandler } from "../../../utilities/utilities";
import { OpenNotification } from "../../common/Notification/Notification.component";
import { UserControlPropType, deleteData } from "./util/UserControl.util";
import Table, { ColumnsType } from "antd/lib/table";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { fetchOneProjects } from "../../../redux/Project/Project.action";
import { isEmpty } from "lodash";
import AddUserControlComponent from "./components/Add/AddUserControl.component";
import { fetchAllRole } from "../../../redux/Role/Role.action";

const UserControlComponent: FC<UserControlPropType> = ({
  project,
  users,
  fetchUser,
  fetchOneProject,
  fetchRoles,
}) => {
  const [assignData, setAssignData] = useState<any>([]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    if (!isEmpty(project.payload)) {
      setAssignData(
        project.payload?.user_controls?.map((item: any, index: number) => ({
          key: index,
          ...item,
        }))
      );
    }
  }, [project]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchOneProject(project.payload?.id);
        OpenNotification(
          NotificationType.SUCCESS,
          "User Assignment removed!",
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to remove user assignment",
            e.message
          )
        );
      });
  };

  const column: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      width: "100px",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "user_id",
      width: "200px",
      render: (value, record) =>
        users.payload.find((e) => e.id === record.user_id)?.full_name,
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      width: "200px",
      render: (value, record) => record?.role?.name,
    },

    {
      title: "Action",
      align: "center",
      width: "80px",
      render: (value, record) => (
        <div className="d-inline-flex">
          <>
            <Popconfirm
              placement="leftTop"
              title="Do you want to remove this user from this project ?"
              onConfirm={() => OnDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button className="btn-outline-danger" icon={<DeleteOutlined />}>
                Remove
              </Button>
            </Popconfirm>
          </>
        </div>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <AddUserControlComponent />
      </div>
      <div className="col-md-12 hidden-print">
        <Table
          columns={column}
          dataSource={assignData}
          loading={project.isPending}
        />
      </div>
    </div>
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
  fetchOneProject: (action: any) => dispatch(fetchOneProjects(action)),
  fetchRoles: (action: any) => dispatch(fetchAllRole(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserControlComponent);
