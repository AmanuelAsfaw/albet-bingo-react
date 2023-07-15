import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Upload,
} from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  CheckSquareOutlined,
  PaperClipOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  ReportTaskPropType,
  showUploadLists,
  reportTask,
} from "../../util/Tasks.util";
import Table, { ColumnsType } from "antd/lib/table";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import {
  fetchAllTask,
  fetchOneTask,
} from "../../../../../redux/Task/Task.action";
import { isEmpty, toNumber } from "lodash";
import moment from "moment";
import { fetchAllProjects } from "../../../../../redux/Project/Project.action";
import { fetchAllUser } from "../../../../../redux/User/User.action";

const ReportTaskComponent: FC<ReportTaskPropType> = ({
  id,
  task,
  fetchOneTask,
  fetchAllTasks,
  users,
  fetchUsers,
}) => {
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
    if (isModalVisible) fetchOneTask(id);
  }, [fetchOneTask, id, isModalVisible]);

  useEffect(() => {
    if (isModalVisible) fetchUsers();
  }, [fetchUsers, isModalVisible]);

  useEffect(() => {
    if (!isEmpty(task.payload)) {
      form.setFieldsValue({
        project_name: task.payload.project.name,
        assigned_to: task.payload.assigned_to.toString()
          ?.split(",")
          .map((item: any) => toNumber(item)),
      });
      setChecklistData(
        // task.payload.task_details.map((item: any, index: number) => ({
        [].map((item: any, index: number) => ({
          key: index,
          ...item,
        }))
      );
    }
  }, [task]);

  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(false);
    setChecklistData([]);
    form.resetFields();
  };

  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...checklistData];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = { ...item, [name]: value };
      if (name === "check") {
        item = { ...item, checked_date: moment().format("DD/MM/YYYY h:mm") };
      }
      newData.splice(index, 1, item);
      setChecklistData(newData);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "Check",
      key: "check",
      dataIndex: "check",
      width: "40px",
      render: (data, record) => (
        <Checkbox
          value={record.check}
          checked={record.check}
          onChange={(e) =>
            onChangeHandler(record.key, "check", e.target.checked)
          }
        />
      ),
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "400px",
      className: "px-1",
      render: (data, record) => (
        <>
          <TextArea
            bordered={false}
            autoSize={{ minRows: 1, maxRows: 5 }}
            value={record.description}
          />
        </>
      ),
    },
    {
      title: "Remark",
      key: "remark",
      dataIndex: "remark",
      width: "250px",
      className: "px-1",
      render: (data, record) => (
        <TextArea
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.remark}
          onChange={(e) =>
            onChangeHandler(record.key, "remark", e.target.value)
          }
        />
      ),
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      width: "100px",
      render: (data, record) =>
        record.check ? <span>{record.checked_date}</span> : "",
    },
    {
      title: "Attachment",
      key: "attachment",
      dataIndex: "attachment",
      width: "150px",
      render: (data, record) => (
        <Upload
          defaultFileList={[
            {
              uid: "-1",
              name: `${record.url ? record.url?.split("-")[1] : "No File"}`,
              status: "done",
            },
          ]}
          showUploadList={showUploadLists}
          name="file"
          beforeUpload={() => {
            return false;
          }}
          type="select"
          multiple={false}
          maxCount={1}
          onChange={(e) => onChangeHandler(record.key, "attachment", e.file)}
        >
          <Button style={{ width: "100%", border: "none" }}>
            <UploadOutlined />
          </Button>
        </Upload>
      ),
    },
  ];

  const Submit = (value: any) => {
    let formData = new FormData();
    checklistData.forEach((item: any) => {
      formData.append("attachment", item.attachment);
    });

    let updatedData = checklistData.map((item: any) => ({
      ...item,
      fileName: item.attachment?.name,
    }));

    let task_details = updatedData.map((item: any) => {
      delete item.attachment;
      return item;
    });

    task_details.forEach((item: any) => {
      formData.append(`task_details`, JSON.stringify(item));
    });

    setLoading(true);
    reportTask(formData)
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
      <Button
        type="text"
        icon={<CheckSquareOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Report
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1100}
        title="Report Task"
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
            assigned_to: task.payload.assigned_to.toString()
              ?.split(",")
              .map((item: any) => toNumber(item)),
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Project"
                rules={[{ required: true, message: "Project Required!" }]}
              >
                <Input value={task.payload.project.name} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Task Name">
                <TextArea
                  value={task.payload.description}
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  readOnly
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Assigned Date"
                rules={[
                  { required: true, message: "Please input Assigned Date" },
                ]}
              >
                <DatePicker
                  value={
                    task.payload.start_date
                      ? moment(task.payload.start_date, dateFormat2)
                      : moment()
                  }
                  allowClear={false}
                  format={dateFormat2}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h6>Checklist</h6>
              <Table
                columns={columns}
                dataSource={checklistData}
                pagination={false}
                bordered
                loading={task.isPending}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <Form.Item
                label="Assigned To"
                name="assigned_to"
                rules={[{ required: false, message: "Assigned to Required!" }]}
              >
                <Select mode="multiple">
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
                label="Due Date"
                rules={[{ required: false, message: "Please input Due Date" }]}
              >
                <DatePicker
                  value={
                    task.payload.due_date
                      ? moment(task.payload.due_date, dateFormat)
                      : moment()
                  }
                  allowClear={false}
                  showTime={{ format: "h:mm A", use12Hours: true }}
                  format={dateFormat}
                />
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchOneTask: (action: any) => dispatch(fetchOneTask(action)),
  fetchAllTasks: () => dispatch(fetchAllTask()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTaskComponent);
