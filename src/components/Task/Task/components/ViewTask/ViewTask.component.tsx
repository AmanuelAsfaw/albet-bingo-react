import { CloudDownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Skeleton, Statistic, Tag } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { TaskPriority, TaskStage } from "../../../../../constants/Constants";
import { fetchOneTask } from "../../../../../redux/Task/Task.action";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import {
  DATE_FORMAT,
  DUE_DATE_FORMAT,
  TASK_DUE_DATE_FORMAT,
  TASK_START_DATE_FORMAT,
  ViewTaskProp,
} from "../../util/task.util";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";

const ViewTaskComponent: FC<ViewTaskProp> = ({
  data,
  task,
  fetchTask,
  users,
  fetchUsers,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      fetchTask(data.id);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (!task.isPending && task.isSuccessful) {
      form.setFieldsValue({
        stage: task.payload.stage,
      });
    }
  }, [task]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const displayPriority = (priority: any) => {
    let color = "gray";

    if (priority === TaskPriority.LOW) color = "gray";
    else if (priority === TaskPriority.MEDIUM) color = "yellow";
    else if (priority === TaskPriority.HIGH) color = "red";

    return <Tag color={color}>{priority}</Tag>;
  };

  const displayStage = (stage: any) => {
    let color = "gray";

    if (stage === TaskStage.NOT_STARTED) color = "blue";
    else if (stage === TaskStage.IN_PROGRESS) color = "yellow";
    else if (stage === TaskStage.WAITING) color = "gray";
    else if (stage === TaskStage.COMPLETED) color = "green";

    return <Tag color={color}>{stage}</Tag>;
  };

  return (
    <>
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        View
      </Button>
      <Modal
        centered
        className="fixed-modal"
        width={1000}
        title="Update Task Status"
        open={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        {task.isPending ? (
          <Skeleton />
        ) : (
          <div className="row">
            <div className="col-md-6 ">
              <Statistic
                title="Project"
                value={task.payload.project?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-6  mb-4">
              <Statistic
                title="Category"
                value={task.payload.task_category?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-12 mb-4">
              <Statistic
                title="Task Description"
                value={task.payload.description}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3 ">
              <Statistic
                title="Start Date"
                value={moment(task.payload.start_date, DATE_FORMAT).format(
                  TASK_START_DATE_FORMAT
                )}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3 ">
              <Statistic
                title="Due Date"
                value={moment(task.payload.due_date, DUE_DATE_FORMAT).format(
                  TASK_DUE_DATE_FORMAT
                )}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3 mb-4">
              <Statistic
                title="Priority"
                valueRender={() => displayPriority(task.payload.priority)}
              />
            </div>

            <div className="col-md-3 mb-4">
              <Statistic
                title="Stage"
                valueRender={() => displayStage(task.payload.stage)}
              />
            </div>

            <div className="col-md-6">
              <Statistic
                title="Assigned People"
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                valueRender={() => (
                  <ul className="pl-3">
                    {task.payload?.assigned_to?.map((user_id) => (
                      <li>
                        {users.payload.find((e) => e.id === user_id)
                          ?.full_name ?? ""}
                      </li>
                    ))}
                  </ul>
                )}
              />
            </div>

            <div className="col-md-6">
              <Statistic
                title="File"
                valueRender={() =>
                  task.payload.document ? (
                    <div className="d-inline-flex">
                      <Button
                        onClick={() => DownloadFile(task?.payload?.document)}
                        type="link"
                        icon={<CloudDownloadOutlined />}
                      />
                      <DocumentViewerComponent
                        document={task.payload.document}
                      />
                    </div>
                  ) : (
                    "N/A"
                  )
                }
              />
            </div>
          </div>
        )}
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
  task: state.task.fetchOne,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchTask: (action: any) => dispatch(fetchOneTask(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskComponent);
