import { Button, Form, Modal, Select, Skeleton, Statistic, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { FileTextOutlined } from "@ant-design/icons";
import {
  DATE_FORMAT,
  DUE_DATE_FORMAT,
  PUT_TASK_STAGE,
  ReportTaskProp,
  TASK_DUE_DATE_FORMAT,
  TASK_START_DATE_FORMAT,
} from "../../util/task.util";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
  TaskPriority,
  TaskStage,
} from "../../../../../constants/Constants";
import { ErrorHandler, format } from "../../../../../utilities/utilities";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { fetchOneTask } from "../../../../../redux/Task/Task.action";
import moment from "moment";

const ReportTaskComponent: FC<ReportTaskProp> = ({
  data,
  fetchTableData,
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

  const Submit = (value: any) => {
    setLoading(true);
    const _data = {
      id: data.id,
      stage: value.stage,
    };

    PUT_TASK_STAGE(_data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchTableData();
        OpenNotification(NotificationType.SUCCESS, Message.UPDATE_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.UPDATE_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        type="text"
        icon={<FileTextOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Report
      </Button>
      <Modal
        centered
        className="fixed-modal"
        width={1000}
        title="Update Task Status"
        open={isModalVisible}
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
        {task.isPending ? (
          <Skeleton />
        ) : (
          <Form layout="vertical" onFinish={Submit} form={form}>
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

              <div className="col-md-4 ">
                <Statistic
                  title="Start Date"
                  value={moment(task.payload.start_date, DATE_FORMAT).format(
                    TASK_START_DATE_FORMAT
                  )}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>

              <div className="col-md-4 ">
                <Statistic
                  title="Due Date"
                  value={moment(task.payload.due_date, DUE_DATE_FORMAT).format(
                    TASK_DUE_DATE_FORMAT
                  )}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>

              <div className="col-md-4 mb-4">
                <Statistic
                  title="Priority"
                  valueRender={() => displayPriority(task.payload.priority)}
                />
              </div>

              <div className="col-md-4 mb-4">
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

              <div className="col-md-4">
                <Form.Item
                  name="stage"
                  label="Stage"
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                >
                  <Select
                    placeholder="stage"
                    options={[
                      {
                        label: TaskStage.NOT_STARTED,
                        value: TaskStage.NOT_STARTED,
                      },
                      {
                        label: TaskStage.IN_PROGRESS,
                        value: TaskStage.IN_PROGRESS,
                      },
                      {
                        label: TaskStage.WAITING,
                        value: TaskStage.WAITING,
                      },
                      {
                        label: TaskStage.COMPLETED,
                        value: TaskStage.COMPLETED,
                      },
                    ]}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTaskComponent);
