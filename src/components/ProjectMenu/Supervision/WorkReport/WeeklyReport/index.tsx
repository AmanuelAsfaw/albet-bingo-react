import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  pendingWeeklyReport,
  WeeklyReportPropType,
} from "./util/WeeklyReport.util";
import { Table, Button, Popover, Popconfirm } from "antd";
import AddWeeklyReport from "./components/AddWeeklyReport/addWeeklyReport";
import { fetchAllWeekReport } from "../../../../../redux/WeekReport/WeekReport.action";
import ViewWeeklyReport from "./components/ViewWeeklyReport/ViewWeeklyReport";
import EditWeeklyReport from "./components/EditWeeklyReport/EditWeeklyReport";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import UserApprovalComponent from "../../../../common/UserApproval/UserApproval.component";
import PrintWeeklyReport from "./components/PrintWeeklyReport/printWeekltReport.component";
import { MoreOutlined } from "@ant-design/icons";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import { deleteWeeklyReport } from "./util/WeeklyReport.util";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";

import { getUserData, zeroPad } from "../../../../../utilities/utilities";
import moment from "moment";
import ShareWeeklyReportComponent from "./components/Share/ShareWeeklyReport.component";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const WeeklyReportComponent: FC<WeeklyReportPropType> = ({
  weeklyReport,
  fetchAllWeekReports,
  project,
  users,
  fetchUsers,
}) => {
  const [selected, setSelected] = useState<any>();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    fetchUsers();
    fetchAllWeekReports({ project_id: project?.payload.id });
  }, [fetchAllWeekReports, project, fetchUsers]);

  const deleteWeeklyReportt = (id: any) => {
    setDeleteLoading(true);
    deleteWeeklyReport(id)
      .then(() => {
        setDeleteLoading(false);
        fetchAllWeekReports({ project_id: project?.payload.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.WEEKLY_REPORT_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setDeleteLoading(false);
        OpenNotification(
          NotificationType.ERROR,
          Message.wEEKLY_REPORT_DELETE_FAILURE,
          "Error occuredd"
        );
      });
  };

  const PendingWeeklyReport = (id: any) => {
    pendingWeeklyReport(id)
      .then(() => {
        fetchAllWeekReports({ project_id: project?.payload.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.WEEKLY_REPORT_PENDING_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        OpenNotification(
          NotificationType.ERROR,
          Message.WEEKLY_REPORT_PENDING_FAILURE,
          "Error occured"
        );
      });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <ReloadButtonComponent
          onClick={() =>
            fetchAllWeekReports({ project_id: project?.payload.id })
          }
        />
        <AuthenticationComponent type="WRITE">
          <AddWeeklyReport
            user={users.payload}
            fetchAllWeekReports={() =>
              fetchAllWeekReports({ project_id: project?.payload.id })
            }
          />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2 hidden-print">
        <Table
          pagination={false}
          columns={[
            {
              title: "Report NO",
              render: (record, data, index) => zeroPad(index + 1),
            },
            {
              title: "Reporting Date",
              dataIndex: "reporting_date",
              render: (record, data, index) =>
                moment(record).format("DD/MM/YYYY"),
            },
            {
              title: "Share",
              key: "share",
              render: (value, record) =>
                record.user_id === getUserData().id ? (
                  <ShareWeeklyReportComponent weekly_report={record} />
                ) : null,
            },
            {
              title: "Approval",
              render: (record, data, index) => (
                <UserApprovalComponent
                  type="weekly-report"
                  item_id={data.id}
                  approve_only={true}
                  has_revision={true}
                  approved_by={data.wr_approved_by}
                  checked_by={data.wr_checked_by}
                  is_approved={data.is_approved}
                  is_checked={data.is_checked}
                  on_revision={data.on_revision}
                />
              ),
            },
            {
              title: "Action",
              render: (record, data, index) => (
                <div className="row">
                  <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                      <div className="d-flex flex-column">
                        <ViewWeeklyReport
                          weekReport={data}
                          project={project.payload}
                        />
                        <Button
                          type="text"
                          onClick={() => {
                            setSelected(data);
                            setVisibility(true);
                          }}
                        >
                          Print
                        </Button>
                        {data?.is_approved ? (
                          <Popconfirm
                            placement="leftTop"
                            title="Are you sure you want to update weekly report to pending?"
                            onConfirm={() => PendingWeeklyReport(data.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button type="text">Reverse Approval</Button>
                          </Popconfirm>
                        ) : (
                          <></>
                        )}
                        {!data?.is_approved ? (
                          <>
                            <EditWeeklyReport
                              weekReport={data}
                              project={project.payload}
                            />
                            <Popconfirm
                              placement="leftTop"
                              title="Are you sure you want to remove the weekly report?"
                              onConfirm={() => deleteWeeklyReportt(data.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                danger
                                type="text"
                                loading={deleteLoading}
                              >
                                Delete
                              </Button>
                            </Popconfirm>
                          </>
                        ) : null}
                      </div>
                    }
                  >
                    <Button
                      icon={<MoreOutlined />}
                      className="btn-outline-secondary border-0"
                    ></Button>
                  </Popover>
                </div>
              ),
            },
          ]}
          dataSource={weeklyReport.payload.map((e, index) => ({
            ...e,
            key: Date.now() + index,
          }))}
          loading={users.isPending || weeklyReport.isPending}
        />
      </div>
      <PrintWeeklyReport
        dataAction={[selected, setSelected]}
        visibilityAction={[visibility, setVisibility]}
        project={project.payload}
      />
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  weeklyReport: state.week_report.fetchAll,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllWeekReports: (action: any) => dispatch(fetchAllWeekReport(action)),
  fetchUsers: () => dispatch(fetchAllUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyReportComponent);
