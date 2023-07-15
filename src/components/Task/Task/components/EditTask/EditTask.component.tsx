import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
  DATE_FORMAT,
  DUE_DATE_FORMAT,
  EditTaskProp,
  PUT_TASK,
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
import { ErrorHandler } from "../../../../../utilities/utilities";
import { fetchAllListProjects } from "../../../../../redux/Project/Project.action";
import { fetchAllFormTaskCategory } from "../../../../../redux/TaskCategory/TaskCategory.action";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import moment from "moment";

const EditTaskComponent: FC<EditTaskProp> = ({
  data,
  fetchTableData,
  fetchProjects,
  fetchTaskCategories,
  projects,
  task_categories,
  users,
  fetchUsers,
}) => {
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [project_id, setProjectId] = useState<null | number>(null);

  useEffect(() => {
    if (isModalVisible) {
      fetchUsers();
      setProjectId(data.project_id);

      form.setFieldsValue({
        ...data,
        start_date: moment(data.start_date, DATE_FORMAT),
        due_date: moment(data.due_date, DUE_DATE_FORMAT),
      });
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (project_id) {
      fetchTaskCategories({ project_id });
    }
  }, [project_id]);

  const restForm = () => {
    form.resetFields();
    setProjectId(null);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    restForm();
  };

  const Submit = (value: any) => {
    let formData = new FormData();

    Object.keys(value).map((key) => formData.set(key, value[key]));

    formData.set("id", data?.id.toString());
    formData.set("start_date", moment(value.start_date).format(DATE_FORMAT));
    formData.set(
      "due_date",
      moment(value.due_date, TASK_DUE_DATE_FORMAT).format(DUE_DATE_FORMAT)
    );

    formData.set("file", value.file?.file);

    setLoading(true);
    PUT_TASK(formData)
      .then(() => {
        setLoading(false);
        handleOk();
        restForm();
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
        icon={<EditOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Edit
      </Button>
      <Modal
        width={1000}
        centered
        className="fixed-modal"
        title="Edit Task"
        open={isModalVisible}
        onCancel={handleOk}
        footer={[
          <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="project_id"
                label="Project"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Select
                  placeholder="project"
                  onSelect={(value) => setProjectId(value)}
                  loading={projects.isPending}
                  options={projects.payload.map((e) => ({
                    label: e.name,
                    value: e.id,
                  }))}
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
                />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item
                name="task_category_id"
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Select
                  placeholder="project"
                  loading={task_categories.isPending}
                  options={task_categories.payload.map((e) => ({
                    label: e.name,
                    value: e.id,
                  }))}
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
                />
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item
                name="description"
                label="Task Description"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Input.TextArea placeholder="category" />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                name="assigned_to"
                label="Assigned People"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Select
                  placeholder="assigned to"
                  mode="multiple"
                  loading={users.isPending}
                  options={users.payload.map((e) => ({
                    label: e.full_name,
                    value: e.id,
                  }))}
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
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                name="start_date"
                label="Start Date"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <DatePicker format={TASK_START_DATE_FORMAT} />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                name="due_date"
                label="Due Date"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <DatePicker showTime format={TASK_DUE_DATE_FORMAT} />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                name="priority"
                label="Priority"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Select
                  placeholder="priority"
                  options={[
                    {
                      label: TaskPriority.LOW,
                      value: TaskPriority.LOW,
                    },
                    {
                      label: TaskPriority.MEDIUM,
                      value: TaskPriority.MEDIUM,
                    },
                    {
                      label: TaskPriority.HIGH,
                      value: TaskPriority.HIGH,
                    },
                  ]}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
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

            <div className="col-md-4">
              <Form.Item label="File" name="file">
                <Upload
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                  defaultFileList={[
                    {
                      name: data.document?.name ?? "Upload",
                      url: data?.document?.url,
                      uid: "-1",
                    },
                  ]}
                >
                  <Button
                    className="btn-outline-secondary"
                    style={{ width: "100%" }}
                  >
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
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
  projects: state.project.fetchList,
  task_categories: state.task_category.fetchAllForm,
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
  fetchTaskCategories: (action: any) =>
    dispatch(fetchAllFormTaskCategory(action)),
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskComponent);
