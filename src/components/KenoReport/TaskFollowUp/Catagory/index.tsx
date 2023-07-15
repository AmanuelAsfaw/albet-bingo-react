import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../constants/Constants";
import { fetchAllUser } from "../../../../redux/User/User.action";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import {
  ProjectTaskCatagoryPropType,
  deleteData,
} from "./util/Catagory.util";
import { Table, Button, Popconfirm } from "antd";
import { ColumnsType } from "antd/lib/table";
import { fetchAllProjectTaskCategory } from "../../../../redux/TaskFollowUp/ProjectTaskCategory/ProjectTaskCategory.action";
import AddCatagoryComponent from "./components/AddCatagory/AddCatagory.component";
import EditCatagoryComponent from "./components/EditCategory/EditCategory.component";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import AuthenticationComponent from "../../../common/Auth/Authentication.component";

const ProjectTaskCatagoryComponent: FC<ProjectTaskCatagoryPropType> = ({
  project,
  category_list,
  fetchAllCatagory,
}) => {
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    fetchAllCatagory({ project_id: project.payload?.id });
  }, [fetchAllCatagory, project]);

  useEffect(() => {
    if (category_list.payload.length) {
      let arr = [];
      arr = category_list.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
      }));
      setDatas(arr);
    } else if(category_list.payload.length === 0){
      setDatas([])
    }
  }, [category_list]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllCatagory({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Category delete!",
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete Category",
            e.message
          )
        );
      });
  };

  const column: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (date, record) => <span>{record.description}</span>,
    },
    {
      title: "Action",
      className: "pl-0-td pr-0-td",
      render: (data, record) => (
        <div className="d-flex flex-row">
          <EditCatagoryComponent category={record}/>
          <AuthenticationComponent type="DELETE">
            <Popconfirm
              placement="leftTop"
              title="Are you sure you want to remove this category?"
              onConfirm={() => OnDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="text">
                Delete
              </Button>
            </Popconfirm>
          </AuthenticationComponent>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AuthenticationComponent type="WRITE">
            <AddCatagoryComponent />
          </AuthenticationComponent>

          <ReloadButtonComponent
            onClick={() =>
              fetchAllCatagory({ project_id: project.payload?.id })
            }
          />
        </div>
        <div className="col-md-12 mt-2 hidden-print">
          <Table
            loading={category_list.isPending}
            columns={column}
            dataSource={datas}
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
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  category_list: state.project_task_category.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllCatagory: (action: any) => dispatch(fetchAllProjectTaskCategory(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTaskCatagoryComponent);
