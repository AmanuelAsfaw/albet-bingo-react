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
  Image,
  Divider,
} from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  PlusOutlined,
  EditOutlined,
  MinusOutlined,
  ArrowDownOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  EditWeeklySiteReportPropType,
  sendUpdateData,
  deleteWeeklyReportDetailData,
} from "../../util/WeeklyReports.util";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import Table, { ColumnsType } from "antd/lib/table";
import { isEmpty, toNumber } from "lodash";
import moment, { Moment } from "moment";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import {
  fetchAllWeeklyReport,
  fetchOneWeeklyReport,
} from "../../../../../redux/Report/WeeklyReport/WeeklyReport.action";
import { fetchAllProjects } from "../../../../../redux/Project/Project.action";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";

const EditWeeklySiteReportComponent: FC<EditWeeklySiteReportPropType> = ({
  users,
  fetchUsers,
  weekly_site_report_id,
  weekly_site_report,
  fetchAllWeeklyReports,
  fetchOneWeeklyReport,
  projects,
  fetchAllProjects,
}) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [reportDetaillistData, setReportDetailListData] = useState<any>([
    { key: Date.now() },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY h:mm A";
  const dateFormat2 = "DD-MM-YYYY";
  const { TextArea } = Input;

  const getWeeklyTime = (week_: string) => { 
    console.log(week_);
    
    const year = week_.split('-')[0]
    const weekly = week_.split('-')[1].replace('th','').replace('st','').replace('nd','')
    return moment().year(Number.parseInt(year))
                    .week(Number.parseInt(weekly))
  } 
  const momentToWeeklyString = (moment_: Moment) =>{
    const year = moment_.year()
    const week = moment_.week()
    return year.toString()+'-'+week.toString()+ [1,11,21,31].includes(week)?'st':[2,12,22,32].includes(week)?'nd':'th'
  }

  const [week, setWeek] = useState<string>(momentToWeeklyString(moment()));

  useEffect(() => {
    if (isModalVisible) fetchOneWeeklyReport(weekly_site_report_id);
  }, [fetchOneWeeklyReport, weekly_site_report_id, isModalVisible]);

  useEffect(() => {
    if (!isEmpty(weekly_site_report.payload)) {
      setWeek(weekly_site_report.payload.week)
      form.setFieldsValue({
        ...weekly_site_report.payload,
        week: getWeeklyTime(weekly_site_report.payload.week?weekly_site_report.payload.week:week),
        project_id: weekly_site_report.payload.project_id,
        project_name: weekly_site_report.payload.project_name,
      });
      setReportDetailListData(
        weekly_site_report.payload.details.map((item: any, index: number) => ({
          key: index,
          ...item,
        }))
      );
    }
  }, [weekly_site_report, isModalVisible, form]);

  const OnDeleteWeeklyReportDetail = (id: any, key: number) => {
    deleteWeeklyReportDetailData(id)
      .then(() => {
        fetchOneWeeklyReport(weekly_site_report_id);
        removeHandler(key);
        OpenNotification(
          NotificationType.SUCCESS,
          "Weekly Report-Detail list delete!",
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete Weekly Report-Detail list",
            e.message
          )
        );
      });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(false);
    setReportDetailListData([{ key: Date.now() }]);
    form.resetFields();
    fetchAllWeeklyReports();
  };

  const onSearch = (searchText: string) => {
    const arr = projects.payload.map((item: any) => ({
      value: item.name,
    }));
    setOptions(!searchText ? [] : [{ value: searchText }, ...arr]);
  };

  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...reportDetaillistData];
    const index = newData.findIndex((e) => e.key === key);

    if (index !== -1) {
      let item = newData[index];
      if(name == 'photo' && item.id)
        item = { ...item, [name]: value, ['isPhotoUpdate']: true };
      else
        item = { ...item, [name]: value };
      newData.splice(index, 1, item);
      setReportDetailListData(newData);
    }
  };

  const removeHandler = (key: number) => {
    if (reportDetaillistData.length > 1) {
      setReportDetailListData(reportDetaillistData.filter((item: any) => item.key !== key));
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
          value={record.block}
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
          value={record.planned}
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
          value={record.progress}
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
          value={record.status}
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
          value={record.issue}
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
          value={record.solution}
          onChange={(e) =>
            onChangeHandler(record.key, "solution", e.target.value)
          }
        >{record.solution}</TextArea>
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
          value={record.remark}
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
        <>
          <Upload
            name={"file_input_"+index+1}
            beforeUpload={() => {
              return false;
            }}
            type="select"
            multiple={false}
            maxCount={1}
            onChange={(e) =>{
              onChangeHandler(record.key, "photo", e.file)
            }
            }
          >
            <Button
              className="btn-outline-secondary"
              style={{ width: "100%" }}
            >
              <UploadOutlined /> Photo
            </Button>
          </Upload>
        </>
      ),
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
              title="Are you sure you want to remove this Weekly Report?"
              onConfirm={() => OnDeleteWeeklyReportDetail(record.id, record.key)}
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

    formData.append("week", week);
    formData.append("project_name", value.project_name);
    formData.append("project_id", projects.payload.filter((e)=> e.name == value.project_name)[0].id);
    formData.append("dir_name", 'Weekly-site-report/'+week+value.project_name+formData.get('project_id'));
    
    reportDetaillistData.forEach((element: any, index: any) => {
      formData.append("file_input"+index, element.photo);
    });
    
    formData.append(
      "report_details",
      JSON.stringify(
        reportDetaillistData.map((item: any, _index: any) => ({
          ...item,
          'file_name': 'file_input'+_index
        }))
      )
    );

    formData.append("id", `${weekly_site_report_id}`);
    
    console.log(formData.get('project_name'));
    console.log(formData.get('report_details'));
    
    sendUpdateData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllWeeklyReports();
        OpenNotification(NotificationType.SUCCESS, "WeeklyReport edited!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to edit weekly_site_report",
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
        title="WeeklyReport Edit"
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
            project_name: weekly_site_report.payload.project_name,
            week:weekly_site_report.payload.week
            ? getWeeklyTime(weekly_site_report.payload.week)
            : moment()
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
              <Form.Item
                name="week"
                label="Week"
                rules={[
                  { required: true, message: "Please input Week" },
                ]}
              >
                <DatePicker 
                allowClear={false} picker="week" onChange={(date_value, dateString)=>setWeek(dateString)}/>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h6>Weekly Site Report List</h6>
              <Table
                bordered
                columns={columns}
                dataSource={reportDetaillistData}
                pagination={false}
                loading={weekly_site_report.isPending}
                footer={() => (
                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      icon={<PlusOutlined />}
                      className="w-25 btn-outline-secondary"
                      onClick={() => {
                        setReportDetailListData([
                          ...reportDetaillistData,
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
  weekly_site_report: state.weekly_site_report.fetchOne,
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
  fetchOneWeeklyReport: (action: any) => dispatch(fetchOneWeeklyReport(action)),
  fetchAllProjects: () => dispatch(fetchAllProjects()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWeeklySiteReportComponent);
