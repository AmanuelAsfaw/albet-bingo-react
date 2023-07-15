import { Button, Popconfirm, Popover, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import {
  MoreOutlined,
  PrinterOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllMonthlyReport } from "../../../../../redux/MonthlyReport/MonthlyReport.action";
import { MonthlyReport } from "../../../../../redux/MonthlyReport/MonthlyReport.type";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { MonthlyReportPropType, deleteData } from "./util/MonthlyReport.util";
import AddMonthlyReportComponent from "./components/Add";
import EditComponent from "./components/Edit";
import DetailComponent from "./components/Detail";
import { fetchAllSiteBook } from "../../../../../redux/SiteBook/SiteBook.action";
import { fetchAllTestResult } from "../../../../../redux/TestResult/TestResult.action";
import { fetchAllWeekReport } from "../../../../../redux/WeekReport/WeekReport.action";
import { fetchAllMeeting } from "../../../../../redux/Meeting/Meeting.action";
import { fetchAllStaffWork } from "../../../../../redux/StaffWork/StaffWork.action";
import { fetchAllMedias } from "../../../../../redux/Media/Media.action";
import PrintComponent from "./components/Print/Print.component";
import { ErrorHandler, getUserData } from "../../../../../utilities/utilities";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { fetchAllPayments } from "../../../../../redux/Payments/Payments.action";
import ShareMonthlyReportComponent from "./components/Share/ShareMonthlyReport.component";
import { fetchAllWeeklyPlan } from "../../../../../redux/WeeklyPlan/WeeklyPlan.action";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";
const MonthlyReportComponent: FC<MonthlyReportPropType> = ({
  fetchMonthlyReports,
  fetchUsers,
  monthly_reports,
  project,
  fetchTestResult,
  fetchSiteOrder,
  fetchWeeklyReport,
  fetchMeeting,
  fetchStaffWork,
  fetchMedia,
  fetchPayments,
  fetchWeekPlan,
}) => {
  const [index, setIndex] = useState(0);
  const [is_visible, setVisibility] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [type, setType] = useState<any>("detail");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMonthlyReports({ project_id: project.payload?.id });
  }, [fetchMonthlyReports, project]);

  useEffect(() => {
    fetchWeekPlan({ project_id: project.payload?.id });
  }, [fetchWeekPlan, project]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchPayments({ project_id: project.payload?.id });
  }, [fetchPayments, project]);

  useEffect(() => {
    fetchTestResult(project.payload?.id);
  }, [fetchTestResult, project]);

  useEffect(() => {
    fetchSiteOrder({ project_id: project.payload?.id });
  }, [fetchSiteOrder, project]);

  useEffect(() => {
    fetchWeeklyReport({ project_id: project.payload?.id });
  }, [fetchWeeklyReport, project]);

  useEffect(() => {
    fetchMeeting({ project_id: project.payload?.id });
  }, [fetchMeeting, project]);

  useEffect(() => {
    fetchStaffWork({ project_id: project.payload?.id });
  }, [fetchStaffWork, project]);

  useEffect(() => {
    fetchMedia({ project_id: project.payload?.id });
  }, [fetchMedia, project]);

  const OnDelete = (id: number) => {
    setLoading(true);
    deleteData(id)
      .then(() => {
        fetchMonthlyReports({ project_id: project.payload?.id });

        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.REMOVE_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.REMOVE_FAILED,
            e.message
          )
        );
      });
  };

  const columns: ColumnsType<MonthlyReport> = [
    {
      title: "No",
      key: "no",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Name",
      key: "name",
      render: (value, record) => record.name,
    },
    {
      title: "Month",
      key: "month",
      render: (value, record) => moment(record.date).format("MMMM-YYYY"),
    },
    {
      title: "Share",
      key: "share",
      render: (value, record, index) =>
        record.user_id === getUserData().id ? (
          <ShareMonthlyReportComponent monthly_report={record} />
        ) : null,
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "20%",
      render: (value, record, index) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <DetailComponent
                  monthly_reports={record}
                  index={index + 1}
                  type="summary"
                />
                <DetailComponent
                  monthly_reports={record}
                  index={index + 1}
                  type="detail"
                />
                <AuthenticationComponent type="EDIT">
                  <EditComponent index={index + 1} monthly_report={record} />
                </AuthenticationComponent>

                <Button
                  type="text"
                  onClick={() => {
                    setIndex(index + 1);
                    setType("detail");
                    setSelected(record);
                    setVisibility(true);
                  }}
                >
                  Print
                </Button>
                <Button
                  type="text"
                  onClick={() => {
                    setIndex(index + 1);
                    setType("summary");
                    setSelected(record);
                    setVisibility(true);
                  }}
                >
                  Print Summary
                </Button>
                <AuthenticationComponent type="DELETE">
                  <Popconfirm
                    placement="leftTop"
                    title="Are you sure you want to remove"
                    onConfirm={() => OnDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="text"
                      loading={loading}
                      className="mr-1"
                      danger
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </AuthenticationComponent>
              </div>
            }
          >
            <Button
              icon={<MoreOutlined />}
              className="btn-outline-secondary border-0"
            ></Button>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="row mb-2 hidden-print">
        <div className="col-md-12">
          <AuthenticationComponent type="WRITE">
            <AddMonthlyReportComponent />
          </AuthenticationComponent>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 hidden-print">
          <Table
            columns={columns}
            dataSource={monthly_reports.payload}
            loading={monthly_reports.isPending}
          />
        </div>
      </div>
      <PrintComponent
        type={type}
        dataAction={[selected, setSelected]}
        index={index}
        visibilityAction={[is_visible, setVisibility]}
      />
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  monthly_reports: state.monthly_report.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchMonthlyReports: (action: any) => dispatch(fetchAllMonthlyReport(action)),

  fetchTestResult: (action: any) => dispatch(fetchAllTestResult(action)),
  fetchSiteOrder: (action: any) => dispatch(fetchAllSiteBook(action)),
  fetchWeeklyReport: (action: any) => dispatch(fetchAllWeekReport(action)),
  fetchMeeting: (action: any) => dispatch(fetchAllMeeting(action)),
  fetchStaffWork: (action: any) => dispatch(fetchAllStaffWork(action)),
  fetchMedia: (action: any) => dispatch(fetchAllMedias(action)),
  fetchPayments: (action: any) => dispatch(fetchAllPayments(action)),
  fetchWeekPlan: (action: any) => dispatch(fetchAllWeeklyPlan(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyReportComponent);
