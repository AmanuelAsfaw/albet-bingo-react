import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  DELETE_TASK,
  DELETE_TASK_CATEGORY,
  TASK_DUE_DATE_FORMAT,
  TaskProp,
  parseTableData,
} from "./util/task.util";
import { fetchAllListProjects } from "../../../redux/Project/Project.action";
import { fetchAllTaskCategory } from "../../../redux/TaskCategory/TaskCategory.action";
import {
  Button,
  Form,
  Popconfirm,
  Popover,
  Result,
  Select,
  Table,
  Tag,
} from "antd";
import { fetchAllTask } from "../../../redux/Task/Task.action";

import AddTaskCategoryComponent from "./components/AddCategory/AddCategory.component";
import EditTaskCategoryComponent from "./components/EditCategory/EditCategory.component";

import AddTaskComponent from "./components/AddTask/AddTask.component";
import EditTaskComponent from "./components/EditTask/EditTask.component";

import {
  CloudDownloadOutlined,
  DeleteOutlined,
  DownloadOutlined,
  MoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { OpenNotification } from "../../common/Notification/Notification.component";
import {
  ErrorHandler,
  format,
  getUserData,
} from "../../../utilities/utilities";
import {
  Message,
  NotificationType,
  TaskPriority,
  TaskStage,
} from "../../../constants/Constants";
import { fetchAllUser } from "../../../redux/User/User.action";
import moment from "moment";
import ReloadButtonComponent from "../../common/ReloadButton/ReloadButton.component";
import ReportTaskComponent from "./components/ReportTask/ReportTask.component";
import { Task } from "../../../redux/Task/Task.type";
import ViewTaskComponent from "./components/ViewTask/ViewTask.component";
import { DownloadFile } from "../../Document/MyDocument/index.util";
import DocumentViewerComponent from "../../common/DocumentViewer/DocumentViewer.component";

const TaskComponent: FC<TaskProp> = ({
  fetchProjects,
  fetchTaskCategories,
  projects,
  task_categories,
  fetchTasks,
  tasks,
  fetchUsers,
  users,
}) => {
  const [project_id, setProjectId] = useState<null | number>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [project_id]);

  const fetchTableData = () => {
    if (project_id) {
      fetchTaskCategories({ project_id });
      fetchTasks({ project_id });
    }
  };

  const onCategoryDelete = (id: any) => {
    setDeleteLoading(true);
    DELETE_TASK_CATEGORY(id)
      .then(() => {
        setDeleteLoading(false);
        fetchTableData();
        OpenNotification(NotificationType.SUCCESS, Message.DELETE_SUCCESS, "");
      })
      .catch((error) => {
        setDeleteLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.DELETE_FAILED,
            e.message
          )
        );
      });
  };

  const onTaskDelete = (id: any) => {
    setDeleteLoading(true);
    DELETE_TASK(id)
      .then(() => {
        setDeleteLoading(false);
        fetchTableData();
        OpenNotification(NotificationType.SUCCESS, Message.DELETE_SUCCESS, "");
      })
      .catch((error) => {
        setDeleteLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.DELETE_FAILED,
            e.message
          )
        );
      });
  };

  const displayPriority = (record: Task) => {
    let color = "gray";

    if (record.priority === TaskPriority.LOW) color = "gray";
    else if (record.priority === TaskPriority.MEDIUM) color = "yellow";
    else if (record.priority === TaskPriority.HIGH) color = "red";

    return <Tag color={color}>{record.priority}</Tag>;
  };

  const displayStage = (record: Task) => {
    let color = "gray";

    if (record.stage === TaskStage.NOT_STARTED) color = "blue";
    else if (record.stage === TaskStage.IN_PROGRESS) color = "yellow";
    else if (record.stage === TaskStage.WAITING) color = "gray";
    else if (record.stage === TaskStage.COMPLETED) color = "green";

    return <Tag color={color}>{record.stage}</Tag>;
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <Form layout="vertical">
          <Form.Item>
            <Select
              placeholder="select project"
              value={project_id}
              onSelect={(value) => setProjectId(value)}
              style={{
                width: "100%",
              }}
              showSearch
              filterOption={(inputValue, option) => {
                return (
                  (option?.label?.toString() ?? "")
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) !== -1
                );
              }}
              loading={
                projects.isPending ||
                task_categories.isPending ||
                tasks.isPending
              }
              options={projects.payload.map((e) => ({
                label: e.name,
                value: e.id,
              }))}
            />
          </Form.Item>
        </Form>
      </div>

      <div className="col-md-3">
        <AddTaskCategoryComponent
          fetchTableData={fetchTableData}
          selected_project_id={project_id}
        />
      </div>

      <div className="col">
        <ReloadButtonComponent onClick={() => fetchTableData()} />
        <AddTaskComponent
          selected_project_id={project_id}
          fetchTableData={fetchTableData}
        />
      </div>

      {project_id ? (
        <div className="col-12 mt-2">
          <Table
            size="small"
            dataSource={parseTableData(tasks.payload, task_categories.payload)}
            loading={tasks.isPending}
            pagination={false}
            rowClassName={(record) =>
              record.type === "category"
                ? "table-row-highlighted"
                : "table-row-light"
            }
            columns={[
              {
                title: "No",
                width: 70,
                dataIndex: "index",
                render: (value, record) =>
                  record.type === "task" ? (
                    <span className="ml-4">{value}</span>
                  ) : (
                    <UnorderedListOutlined
                      style={{ fontSize: 17, marginLeft: 10 }}
                    />
                  ),
              },
              {
                title: "Task Description",
                dataIndex: "description",
                render: (value, record) =>
                  record.type === "task" ? value : record.name,
              },
              {
                title: "Assigned People",
                dataIndex: "assigned_to",
                render: (value: number[], record) =>
                  record.type === "task" && (
                    <ul className="pl-1">
                      {value.map((user_id) => (
                        <li>
                          {
                            users.payload.find((e) => e.id === user_id)
                              ?.full_name
                          }
                        </li>
                      ))}
                    </ul>
                  ),
              },
              {
                title: "Due Date",
                dataIndex: "due_date",
                render: (value, record) =>
                  record.type === "task" &&
                  moment(value).format(TASK_DUE_DATE_FORMAT),
              },
              {
                title: "Priority",
                dataIndex: "priority",
                align: "center",
                render: (value, record) =>
                  record.type === "task" && displayPriority(record),
              },
              {
                title: "Stage",
                dataIndex: "stage",
                align: "center",
                render: (value, record) =>
                  record.type === "task" && displayStage(record),
              },
              {
                title: "Percentage",
                dataIndex: "percentage",
                align: "center",
                render: (value, record) =>
                  record.type === "task" && `${format(value)}%`,
              },
              {
                title: "File",
                align: "center",
                render: (value, data) =>
                  data.type === "task" &&
                  data.document && (
                    <div className="d-inline-flex">
                      <Button
                        onClick={() => DownloadFile(data.document)}
                        type="link"
                        icon={<CloudDownloadOutlined />}
                      />
                      <DocumentViewerComponent document={data.document} />
                    </div>
                  ),
              },
              {
                title: "Action",
                width: 70,
                render: (value, record) =>
                  record.type === "task" ? (
                    <Popover
                      placement="rightTop"
                      overlayClassName="action-popover"
                      trigger="focus"
                      content={
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="d-flex flex-column"
                        >
                          <ViewTaskComponent data={record} />

                          {record.assigned_to.includes(getUserData().id) && (
                            <ReportTaskComponent
                              data={record}
                              fetchTableData={fetchTableData}
                            />
                          )}

                          <EditTaskComponent
                            data={record}
                            fetchTableData={fetchTableData}
                          />
                          <Popconfirm
                            placement="leftTop"
                            title="Are you sure you want to delete this task?"
                            onConfirm={() => onTaskDelete(record.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              danger
                              type="text"
                              icon={<DeleteOutlined />}
                              loading={deleteLoading}
                            >
                              Delete
                            </Button>
                          </Popconfirm>
                        </div>
                      }
                    >
                      <Button
                        icon={<MoreOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="btn-outline-secondary border-0"
                      />
                    </Popover>
                  ) : (
                    <Popover
                      placement="rightTop"
                      overlayClassName="action-popover"
                      trigger="focus"
                      content={
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="d-flex flex-column"
                        >
                          <EditTaskCategoryComponent
                            data={record}
                            fetchTableData={fetchTableData}
                          />
                          <Popconfirm
                            placement="leftTop"
                            title="Are you sure you want to delete this category?"
                            onConfirm={() => onCategoryDelete(record.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              danger
                              type="text"
                              icon={<DeleteOutlined />}
                              loading={deleteLoading}
                            >
                              Delete
                            </Button>
                          </Popconfirm>
                        </div>
                      }
                    >
                      <Button
                        icon={<MoreOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="btn-outline-secondary border-0"
                      />
                    </Popover>
                  ),
              },
            ]}
          />
        </div>
      ) : (
        <div className="col-12">
          <Result status={"info"} title="Select Project" />
        </div>
      )}
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  projects: state.project.fetchList,
  task_categories: state.task_category.fetchAll,
  tasks: state.task.fetchAll,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchProjects: (action: any) => dispatch(fetchAllListProjects(action)),
  fetchTaskCategories: (action: any) => dispatch(fetchAllTaskCategory(action)),
  fetchTasks: (action: any) => dispatch(fetchAllTask(action)),
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskComponent);
