import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Upload,
} from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  PlusOutlined,
  EditOutlined,
  MinusOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import {
  EditTaskPropType,
  sendData,
  deleteTaskDetailData,
} from "../../util/Tasks.util";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import Table, { ColumnsType } from "antd/lib/table";
import { isEmpty, toNumber } from "lodash";
import moment from "moment";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import {
  fetchAllTask,
  fetchOneTask,
} from "../../../../../redux/Task/Task.action";
import { fetchAllProjects } from "../../../../../redux/Project/Project.action";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";

const EditTaskComponent: FC<EditTaskPropType> = ({
  users,
  fetchUsers,
  task_id,
  task,
  fetchAllTasks,
  fetchOneTask,
  projects,
  fetchAllProjects,
}) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [checklistData, setChecklistData] = useState<any>([
    { key: Date.now() },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY h:mm A";
  const dateFormat2 = "DD-MM-YYYY";
  const { TextArea } = Input;

  useEffect(() => {
    if (isModalVisible) fetchOneTask(task_id);
  }, [fetchOneTask, task_id, isModalVisible]);

  useEffect(() => {
    if (!isEmpty(task.payload)) {
      form.setFieldsValue({
        ...task.payload,
        due_date: moment(task.payload.due_date, dateFormat),
        date: moment(task.payload.start_date, dateFormat2),
        assigned_to: task.payload.assigned_to.toString()
          ?.split(",")
          .map((item: any) => toNumber(item)),
      });
      setChecklistData(
        // task.payload. task_details.map((item: any, index: number) => ({
        [].map((item: any, index: number) => ({
          key: index,
          ...item,
        }))
      );
    }
  }, [task, isModalVisible, form]);

  const OnDeleteTaskDetail = (id: any, key: number) => {
    deleteTaskDetailData(id)
      .then(() => {
        fetchOneTask(task_id);
        removeHandler(key);
        OpenNotification(
          NotificationType.SUCCESS,
          "Task check list delete!",
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete task check list",
            e.message
          )
        );
      });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(false);
    setChecklistData([{ key: Date.now() }]);
    form.resetFields();
    fetchAllTasks();
  };

  const onSearch = (searchText: string) => {
    const arr = projects.payload.map((item: any) => ({
      value: item.name,
    }));
    setOptions(!searchText ? [] : [{ value: searchText }, ...arr]);
  };

  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...checklistData];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = { ...item, [name]: value };
      newData.splice(index, 1, item);
      setChecklistData(newData);
    }
  };

  const removeHandler = (key: number) => {
    if (checklistData.length > 1) {
      setChecklistData(checklistData.filter((item: any) => item.key !== key));
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "Check",
      key: "check",
      dataIndex: "check",
      width: "50px",
      render: (data, record) => (
        <Checkbox value={record.check} checked={record.check} />
      ),
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "500px",
      render: (data, record) => (
        <>
          <TextArea
            bordered={false}
            autoSize={{ minRows: 1, maxRows: 5 }}
            value={record.description}
            onChange={(e) =>
              onChangeHandler(record.key, "description", e.target.value)
            }
          />
        </>
      ),
    },
    {
      title: "Remark",
      key: "remark",
      dataIndex: "remark",
      width: "400px",
      className: "px-1",
      render: (data, record) => (
        <TextArea
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.remark}
          readOnly
        />
      ),
    },
    {
      title: "Checked Date",
      key: "date",
      dataIndex: "date",
      width: "100px",
      render: (data, record) =>
        record.check ? <span>{record.checked_date}</span> : "",
    },
    {
      title: "Action",
      width: "25px",
      fixed: "right",
      className: "px-1",
      render: (x, record) =>
        record.id ? (
          <div className="d-flex">
            <Popconfirm
              placement="leftTop"
              title="Are you sure you want to remove this task check list?"
              onConfirm={() => OnDeleteTaskDetail(record.id, record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button className="btn-outline-secondary">
                <MinusOutlined />
              </Button>
            </Popconfirm>
          </div>
        ) : (
          <div className="d-flex">
            <Button
              className="btn-outline-secondary"
              onClick={() => removeHandler(record.key)}
            >
              <MinusOutlined />
            </Button>
          </div>
        ),
    },
  ];

  const Submit = (value: any) => {
    setLoading(true);

    let formData = new FormData();

    formData.append("date", value.date.format(dateFormat2));
    formData.append("due_date", value.due_date.format(dateFormat));
    formData.append("assigned_to", `${value.assigned_to}`);
    formData.append("task_no", task.payload.id.toString());
    formData.append(
      "task_details",
      JSON.stringify(
        checklistData.map((item: any) => ({
          ...item,
        }))
      )
    );

    formData.append("project_name", value.project_name);

    formData.append("task_name", value.task_name);
    formData.append("id", `${task_id}`);

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllTasks();
        OpenNotification(NotificationType.SUCCESS, "Task edited!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to edit task",
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        style={{ top: 35 }}
        width={900}
        className="fixed-modal"
        title="Task Edit"
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
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            project_name: task.payload.project.name,
            task_name: task.payload.description,
            due_date: task.payload.due_date
              ? moment(task.payload.due_date, dateFormat)
              : moment(),
            date: task.payload.start_date
              ? moment(task.payload.start_date, dateFormat2)
              : moment(),
            assigned_to: task.payload.assigned_to.toString()
              ?.split(",")
              .map((item: any) => toNumber(item)),
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Project"
                name="project_name"
                rules={[{ required: true, message: "Project Required!" }]}
              >
                <AutoComplete options={options} onSearch={onSearch} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Task Name" name="task_name">
                <TextArea autoSize={{ minRows: 1, maxRows: 4 }} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                name="date"
                label="Assigned Date"
                rules={[
                  { required: true, message: "Please input Assigned Date" },
                ]}
              >
                <DatePicker allowClear={false} format={dateFormat2} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h6>Checklist</h6>
              <Table
                bordered
                columns={columns}
                dataSource={checklistData}
                pagination={false}
                loading={task.isPending}
                footer={() => (
                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      icon={<PlusOutlined />}
                      className="w-25 btn-outline-secondary"
                      onClick={() => {
                        setChecklistData([
                          ...checklistData,
                          { key: Date.now(), check: false },
                        ]);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Assigned To"
                name="assigned_to"
                rules={[{ required: true, message: "Assigned to Required!" }]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {users.payload.map((e, i) => (
                    <Select.Option key={i + Date.now() + 70} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="due_date"
                label="Due Date"
                rules={[{ required: true, message: "Please input Due Date" }]}
              >
                <DatePicker
                  allowClear={false}
                  showTime={{ format: "h:mm A", use12Hours: true }}
                  format={dateFormat}
                />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item label="File">
                <Upload
                  fileList={[
                    {
                      uid: "-1",
                      name: `${
                        task.payload.document
                          ? task.payload.document?.name
                          : `No File`
                      }`,
                      status: "done",
                    },
                  ]}
                  showUploadList={{
                    showRemoveIcon: false,
                    showDownloadIcon: true,
                    downloadIcon: (
                      <ArrowDownOutlined
                        onClick={() =>
                          task.payload.document
                            ? DownloadFile(task.payload.document)
                            : ""
                        }
                        style={{ width: "30px" }}
                      />
                    ),
                  }}
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                ></Upload>
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
  task: state.task.fetchOne,
  projects: state.project.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchAllTasks: () => dispatch(fetchAllTask()),
  fetchOneTask: (action: any) => dispatch(fetchOneTask(action)),
  fetchAllProjects: () => dispatch(fetchAllProjects()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskComponent);
