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
import { AddWeeklySiteReportPropType, sendData } from "../../util/WeeklyReports.util";
import moment, { Moment } from "moment";
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
import { fetchAllWeeklyReport } from "../../../../../redux/Report/WeeklyReport/WeeklyReport.action";
import { fetchAllProjects } from "../../../../../redux/Project/Project.action";
import { index } from "mathjs";

const AddWeeklyReoprtComponent: FC<AddWeeklySiteReportPropType> = ({
  users,
  fetchUsers,
  tasks,
  fetchAllWeeklyReports,
  projects,
  fetchAllProjects,
  project,
}) => {
  console.log(project);
  
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [reportListData, setReportListData] = useState<any>([
    { key: Date.now(), check: false },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY h:mm A";
  const dateFormat2 = "DD-MM-YYYY";
  const { TextArea } = Input;

  const momentToWeeklyString = (moment_: Moment) =>{
    const year = moment_.year()
    const week = moment_.week()
    console.log(year)
    console.log(week)
    const th = [1,11,21,31].includes(week)?'st':
          [2,12,22,32].includes(week)?'nd':'th'
    console.log(th)
    return year.toString()+'-'+week.toString()+ th
  }

  const [week, setWeek] = useState<string>(momentToWeeklyString(moment()));

  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(false);
    setReportListData([{ key: Date.now() }]);
    form.resetFields();
  };

  const Submit = (value: any) => {
    console.log(value);
    
    setLoading(true);
    let formData = new FormData();

    // formData.append("task_no", `${zeroPad(tasks.length + 1)}`);
    // formData.append("week", value.date.format(dateFormat2));
    // formData.append("file", value?.file?.file);
    formData.append("week", week?week:"");
    formData.append(
      "report_details",
      JSON.stringify(
        reportListData.map((item: any, _index: any) => ({
          ...item,
          'file_name': 'file_input'+_index
        }))
      )
    );

    console.log(JSON.stringify(
      reportListData.map((item: any) => ({
        ...item,
      }))
    ));
    
    formData.append("project_name", value.project_name);
    formData.append("project_id", projects.payload.filter((e)=> e.name == value.project_name)[0].id);

    formData.append("dir_name", 'Weekly-site-report/'+week+value.project_name+formData.get('project_id'));
    console.log(formData.get('project_name'));
    console.log(formData.get('report_details'));
    reportListData.forEach((element: any, index: any) => {
      formData.append("file_input"+index, element.photo);
    });
    
    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllWeeklyReports();
        OpenNotification(NotificationType.SUCCESS, "WeeklyReport saved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save Weekly Report",
            e.message
          )
        );
      });
  };

  const onChangeHandler = (key: number, name: string, value: any) => {
    
    const newData = [...reportListData];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = { ...item, [name]: value };
      newData.splice(index, 1, item);
      setReportListData(newData);
    }
  };

  const removeHandler = (key: number) => {
    if (reportListData.length > 1) {
      setReportListData(reportListData.filter((item: any) => item.key !== key));
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "Block",
      key: "block",
      dataIndex: "block",
      className: "px-1",
      render: (_data, record) => (
        <TextArea
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.description}
          onChange={(e) =>
            onChangeHandler(record.key, "block", e.target.value)
          }
        />
      ),
    },
    {
      title: "Planned",
      key: "planned",
      dataIndex: "planned",
      className: "px-1",
      render: (_data, record) => (
        <TextArea
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.description}
          onChange={(e) =>
            onChangeHandler(record.key, "planned", e.target.value)
          }
        />
      ),
    },
    {
      title: "Progress",
      key: "progress",
      dataIndex: "progress",
      className: "px-1",
      render: (_data, record) => (
        <TextArea
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.description}
          onChange={(e) =>
            onChangeHandler(record.key, "progress", e.target.value)
          }
        />
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      className: "px-1",
      render: (_data, record) => (
        <TextArea
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.description}
          onChange={(e) =>
            onChangeHandler(record.key, "status", e.target.value)
          }
        />
      ),
    },
    {
      title: "Issue",
      key: "issue",
      dataIndex: "issue",
      className: "px-1",
      render: (_data, record) => (
        <TextArea
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.description}
          onChange={(e) =>
            onChangeHandler(record.key, "issue", e.target.value)
          }
        />
      ),
    },
    {
      title: "Solution",
      key: "solution",
      dataIndex: "solution",
      className: "px-1",
      render: (_data, record) => (
        <TextArea
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.description}
          onChange={(e) =>
            onChangeHandler(record.key, "solution", e.target.value)
          }
        />
      ),
    },
    {
      title: "Remark",
      key: "remark",
      dataIndex: "remark",
      className: "px-1",
      render: (_data, record) => (
        <TextArea
          bordered={false}
          autoSize={{ minRows: 1, maxRows: 5 }}
          value={record.description}
          onChange={(e) =>
            onChangeHandler(record.key, "remark", e.target.value)
          }
        />
      ),
    },
    {
      title: "Photos",
      key: "photos",
      dataIndex: "photos",
      className: "px-1",
      render: (_data, record, index) => (
        <Upload
          name={"file_input_"+index+1}
          beforeUpload={() => {
            return false;
          }}
          type="select"
          multiple={false}
          maxCount={1}
          onChange={(e) =>
            onChangeHandler(record.key, "photo", e.file)
          }
        >
          <Button
            className="btn-outline-secondary"
            style={{ width: "100%" }}
          >
            <UploadOutlined /> Photo
          </Button>
        </Upload>

        // <TextArea
        //   bordered={false}
        //   autoSize={{ minRows: 1, maxRows: 5 }}
        //   value={record.description}
        //   onChange={(e) =>
        //     onChangeHandler(record.key, "photos", e.target.value)
        //   }
        // />
      ),
    },
    {
      title: "Action",
      width: "25px",
      fixed: "right",
      className: "px-1",
      render: (_x, record) => (
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
        New Report
      </Button>
      <Modal
        centered
        width={1100}
        className="fixed-modal"
        title="New WeeklyReport"
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
                      ...projects.payload.filter((e)=>e.name == project).map((e) => ({
                        value: e.name,
                      })),
                      ...tasks.map((e) => ({
                        value: e.project_name,
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
              <Form.Item
                name="date"
                label="Week"
                rules={[
                  { required: true, message: "Please input Week" },
                ]}
                initialValue={'03-05-2023'}
              >
                <DatePicker allowClear={false} picker="week" onChange={(date_value, dateString)=>{
                  console.log(date_value);
                  console.log(dateString);
                  setWeek(dateString);
                }}/>
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <h6>Weekly Report List</h6>
              <Table
                columns={columns}
                dataSource={reportListData}
                pagination={false}
                bordered
                footer={() => (
                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      icon={<PlusOutlined />}
                      className="w-25 btn-outline-secondary"
                      onClick={() => {
                        setReportListData([
                          ...reportListData,
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
          {/* <div className="row mt-2">
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
          </div> */}
          {/* <div className="row">
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
          </div> */}
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
  fetchAllWeeklyReports: () => dispatch(fetchAllWeeklyReport()),
  fetchAllProjects: () => dispatch(fetchAllProjects()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWeeklyReoprtComponent);
