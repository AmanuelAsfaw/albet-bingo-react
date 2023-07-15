import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Upload,
} from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined, MinusOutlined, UploadOutlined } from "@ant-design/icons";
import { AddTaskPropType, sendData } from "../../util/Tasks.util";
import moment from "moment";
import {
  ErrorHandler,
  groupOptionGrouped,
  zeroPad,
} from "../../../../../utilities/utilities";
import Table, { ColumnsType } from "antd/lib/table";
import { isNil } from "lodash";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import { fetchAllTask } from "../../../../../redux/Task/Task.action";
import { fetchAllProjects } from "../../../../../redux/Project/Project.action";

const AddTaskComponent: FC<AddTaskPropType> = ({
  users,
  fetchUsers,
  tasks,
  fetchAllTasks,
  projects,
  fetchAllProjects,
}) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [checklistData, setChecklistData] = useState<any>([
    { key: Date.now(), check: false },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY h:mm A";
  const dateFormat2 = "DD-MM-YYYY";
  const { TextArea } = Input;

  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(false);
    setChecklistData([{ key: Date.now() }]);
    form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();

    formData.append("task_no", `${zeroPad(tasks.length + 1)}`);
    formData.append("date", value.date.format(dateFormat2));
    formData.append("due_date", value.due_date.format(dateFormat));
    formData.append("assigned_to", `${value.assigned_to}`);
    formData.append("file", value?.file?.file);
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

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllTasks();
        OpenNotification(NotificationType.SUCCESS, "Task saved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save task",
            e.message
          )
        );
      });
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
      title: "Description",
      key: "description",
      dataIndex: "description",
      className: "px-1",
      render: (data, record) => (
        <TextArea
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.description}
          onChange={(e) =>
            onChangeHandler(record.key, "description", e.target.value)
          }
        />
      ),
    },
    {
      title: "Action",
      width: "25px",
      fixed: "right",
      className: "px-1",
      render: (x, record) => (
        <div className="d-flex">
          <Button
            className="btn-outline-secondary"
            onClick={() => removeHandler(record.key)}
            disabled={!isNil(record.id)}
          >
            <MinusOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <h6 className="float-left mt-4 pt-2 pl-3 mb-0 pb-0">Projects</h6>
      <Button
        className="btn-outline-secondary mt-4 mr-3"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        New Task
      </Button>
      <Modal
        centered
        width={1100}
        className="fixed-modal"
        title="New Task"
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
            date: moment(),
            due_date: moment("18:00", "h:mm A"),
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Project"
                name="project_name"
                rules={[{ required: true, message: "Project Required!" }]}
              >
                <AutoComplete
                  options={groupOptionGrouped(
                    [
                      ...projects.payload.map((e) => ({
                        value: e.name,
                      })),
                      ...tasks.map((e) => ({
                        value: e.project.name,
                      })),
                    ],
                    "value"
                  ).map((e, index) => ({
                    key: index,
                    value: e.title,
                    title: e.title,
                  }))}
                  placeholder="Project"
                  filterOption={(inputValue, option) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Task Name" name="task_name">
                <TextArea
                  placeholder="Task"
                  autoSize={{ minRows: 1, maxRows: 4 }}
                />
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
              <h6>Check List</h6>
              <Table
                columns={columns}
                dataSource={checklistData}
                pagination={false}
                bordered
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
          <div className="row mt-2">
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
              <Form.Item
                label="File"
                rules={[{ required: false, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
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
  users: state.user.fetchAll,
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
  fetchAllProjects: () => dispatch(fetchAllProjects()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskComponent);
