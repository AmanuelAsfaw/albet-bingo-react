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
import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EyeOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { ViewTaskPropType, DownloadFile } from "../../util/Tasks.util";
import Table, { ColumnsType } from "antd/lib/table";
import { fetchOneTask } from "../../../../../redux/Task/Task.action";
import { isEmpty, toNumber } from "lodash";
import moment from "moment";
import { DownloadFile as Downloader } from "../../../../Document/MyDocument/index.util";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { BASE_URI } from "../../../../../redux/ApiCall";
import { getFileType } from "../../../../common/DocumentViewer/DocumentViewer.util";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";

const ViewTaskComponent: FC<ViewTaskPropType> = ({
  id,
  task,
  fetchOneTask,
  users,
  fetchUsers,
}) => {
  const [checklistData, setChecklistData] = useState<any>([
    { key: Date.now() },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY h:mm A";
  const dateFormat2 = "DD-MM-YYYY";
  const { TextArea } = Input;

  useEffect(() => {
    if (isModalVisible) fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (isModalVisible) fetchOneTask(id);
  }, [fetchOneTask, id, isModalVisible]);

  useEffect(() => {
    if (!isEmpty(task.payload)) {
      console.log(getFileType(task?.payload?.document?.url ? task?.payload?.document?.url: ""));
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
  }, [task, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
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
      width: "400px",
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
      width: "300px",
      className: "px-1",
      render: (data, record) => (
        <TextArea
          bordered={false}
          readOnly
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.remark}
        />
      ),
    },
    {
      title: "Attachment",
      key: "attachment",
      dataIndex: "attachment",
      width: "180px",
      render: (data, record) => (
        <Upload
          fileList={[
            {
              uid: "-1",
              name: `${record.url ? record.url?.split("-")[1] : `No File`}`,
              status: "done",
            },
          ]}
          showUploadList={{
            showRemoveIcon: false,
            showDownloadIcon: true,
            downloadIcon: (
              <>
                <ArrowDownOutlined
                  onClick={() => (record.url ? DownloadFile(record) : "")}
                  style={{ width: "30px", display: "inline" }}
                />
                {task.payload.document ? (
                  <DocumentViewerComponent document={task.payload.document} />
                ) : null}
              </>
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
  ];

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Detail
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1100}
        title="Task Detail"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        <Form
          layout="vertical"
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
          <div className="row">
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
                rules={[{ required: true, message: "Please input Due Date" }]}
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
                      <>
                        <ArrowDownOutlined
                          onClick={() =>
                            task.payload.document
                              ? Downloader(task.payload.document)
                              : ""
                          }
                          style={{ width: "30px", display: "inline" }}
                        />
                        {task.payload.document ? (
                          <DocumentViewerComponent
                            document={task.payload.document}
                          />
                        ) : null}
                      </>
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchOneTask: (action: any) => dispatch(fetchOneTask(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskComponent);
