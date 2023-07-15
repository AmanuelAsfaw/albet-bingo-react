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
  ReportWeeklySiteReportPropType,
  showUploadLists,
  reportWeeklyReport,
} from "../../util/WeeklyReports.util";
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

const ReportTaskComponent: FC<ReportWeeklySiteReportPropType> = ({
  id,
  weekly_report,
  fetchOneWeeklyReport,
  fetchAllWeeklyReports,
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
    if (!isEmpty(weekly_report.payload)) {
      form.setFieldsValue({
        project_name: weekly_report.payload.project_name,
        project_id: weekly_report.payload.project_id,
        week: weekly_report.payload.week
      });
      setChecklistData(
        weekly_report.payload.details.map((item: any, index: number) => ({
          key: index,
          ...item,
        }))
      );
    }
  }, [weekly_report]);

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
    reportWeeklyReport(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllWeeklyReports();
        OpenNotification(NotificationType.SUCCESS, "Weekly-Site-Report edited!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to edit Weekly-Site-Report",
            e.message
          )
        );
      });
  };

  const getWeeklyTime = (week_: string) => {
    console.log(week_);
    
    const year = week_.split('-')[0]
    const weekly = week_.split('-')[1].replace('th','').replace('st','').replace('nd','')
    return moment().year(Number.parseInt(year))
                    .week(Number.parseInt(weekly))
  } 

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
        title="Report Weekly-Site-Report"
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
            week: weekly_report.payload.week,
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Project"
                rules={[{ required: true, message: "Project Required!" }]}
              >
                <Input value={weekly_report.payload.project_name} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Week"
                rules={[
                  { required: true, message: "Please input Week" },
                ]}
              >
                <DatePicker
                  value={
                    weekly_report.payload.week
                      ? getWeeklyTime(weekly_report.payload.week)
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
                loading={weekly_report.isPending}
              />
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
