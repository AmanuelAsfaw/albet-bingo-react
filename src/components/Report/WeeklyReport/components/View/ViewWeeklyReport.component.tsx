import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  Image
} from "antd";
import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EyeOutlined, ArrowDownOutlined, DownloadOutlined } from "@ant-design/icons";
import { ViewWeeklySiteReportPropType, DownloadFile } from "../../util/WeeklyReports.util";
import Table, { ColumnsType } from "antd/lib/table";
import { fetchOneWeeklyReport } from "../../../../../redux/Report/WeeklyReport/WeeklyReport.action";
import { isEmpty, toNumber } from "lodash";
import moment from "moment";
import { DownloadFile as Downloader } from "../../../../Document/MyDocument/index.util";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { BASE_URI } from "../../../../../redux/ApiCall";
import { getFileType } from "../../../../common/DocumentViewer/DocumentViewer.util";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import Paragraph from "antd/lib/typography/Paragraph";

const ViewWeeklySiteReportComponent: FC<ViewWeeklySiteReportPropType> = ({
  id,
  weekly_report,
  fetchOneWeeklySiteReport,
  // users,
  // fetchUsers,
}) => {
  const [checklistData, setChecklistData] = useState<any>([
    { key: Date.now() },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY h:mm A";
  const dateFormat2 = "DD-MM-YYYY";
  const { TextArea } = Input;

  const [imageViewerVisibility, setImageViewerVisibility] = useState(false);
  const [viewerImage, setViewerImage] = useState('');

  // useEffect(() => {
  //   if (isModalVisible) fetchUsers();
  // }, [fetchUsers]);

  useEffect(() => {
    if (isModalVisible) fetchOneWeeklySiteReport(id);
  }, [fetchOneWeeklySiteReport, id, isModalVisible]);

  useEffect(() => {
    if (!isEmpty(weekly_report.payload)) {
      // console.log(getFileType(weekly_report.payload.document?.url));
      form.setFieldsValue({
        project_name: weekly_report.payload.project_name,
      });
      console.log(weekly_report.payload);
      
      setChecklistData(
        weekly_report.payload.details.map((item: any, index: number) => ({
          key: index,
          ...item,
        }))
      );
    }
  }, [weekly_report, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Block",
      key: "block",
      dataIndex: "block",
      className: "px-1",
    },
    {
      title: "Planned",
      key: "planned",
      dataIndex: "planned",
      className: "px-1",
    },
    {
      title: "Progress",
      key: "progress",
      dataIndex: "progress",
      className: "px-1",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      className: "px-1",
    },
    {
      title: "Issue",
      key: "issue",
      dataIndex: "issue",
      className: "px-1",
    },
    {
      title: "Solution",
      key: "solution",
      dataIndex: "solution",
      className: "px-1",
    },
    {
      title: "Remark",
      key: "remark",
      dataIndex: "remark",
      className: "px-1",
    },
    {
      title: "Photos",
      key: "photos",
      dataIndex: "photos",
      className: "px-1",
      render: (_data, record, index) => {
        if(record.photo){
          return <div>
            <Button
              type="link"
              icon={<DownloadOutlined />}
              className="mr-2"
              onClick={() => DownloadFile(record)}
            ></Button>
            {record.photo ? (
              <DocumentViewerComponent document={ {url: record.photo}} />
            ) : null}
          </div>
        }
      },
    },
  ];

  const getWeeklyTime = (week: string) => {
    console.log(week);
    
    const year = week.split('-')[0]
    const weekly = week.split('-')[1].replace('th','')
    return moment().year(Number.parseInt(year))
                    .week(Number.parseInt(weekly))
  } 
  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Detail
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1100}
        title="Weekly Report Detail"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            week: weekly_report.payload.week
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
                <Input value={weekly_report.payload.project_name} />
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
                    getWeeklyTime(weekly_report.payload.week?weekly_report.payload.week:'2023-13th')
                  }
                  allowClear={false}
                  picker="week"
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h6>Weekly Report List</h6>
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
  weekly_report: state.weekly_site_report.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchOneWeeklySiteReport: (action: any) => dispatch(fetchOneWeeklyReport(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewWeeklySiteReportComponent);

