import {
  Button,
  Form,
  List,
  Modal,
  Popconfirm,
  Popover,
  Select,
  Tag,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  DownloadFile,
  WeeklySiteReportsPropType,
  deleteData,
  getUsers,
} from "./util/WeeklyReports.util";
// import { CheckboxChecked } from "@styled-icons/fluentui-system-filled/CheckboxChecked";
// import { CheckboxUnchecked } from "@styled-icons/fluentui-system-filled/CheckboxUnchecked";

import {
  CalendarOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  MoreOutlined,
  PaperClipOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Table, { ColumnsType } from "antd/lib/table";
import { reverse, toNumber } from "lodash";
import moment from "moment";
import { NotificationType } from "../../../constants/Constants";
import { fetchAllProjects } from "../../../redux/Project/Project.action";
import { fetchAllWeeklyReport } from "../../../redux/Report/WeeklyReport/WeeklyReport.action";
import { fetchAllUser } from "../../../redux/User/User.action";
import { ErrorHandler, getUserData } from "../../../utilities/utilities";
import { OpenNotification } from "../../common/Notification/Notification.component";
import AddWeeklyReportComponent from "./components/Add/AddWeeklyReport.component";
import EditWeeklySiteReportComponent from "./components/Edit/EditWeeklySiteReport.component";
import ViewWeeklyReportComponent from "./components/View/ViewWeeklyReport.component";

const WeeklyReportComponent: FC<WeeklySiteReportsPropType> = ({
  weekly_site_reports,
  fetchAllWeeklyReports,
  users,
  fetchUsers,
  projects,
  fetchAllProjects,
  tab,
}) => {
  const [selectedProject, setSelectedProject] = useState<string>("All");
  const [projectData, setProjectData] = useState<any>([]);
  const [checklistData, setChecklistData] = useState<any>([
    { key: Date.now() },
  ]);
  const [recordData, setRecordData] = useState<any>([]);
  const [taskData, setTaskData] = useState<any>([]);
  const [isVisible, setIsVisibile] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = getUserData();
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY h:mm A";
  const dateFormat2 = "DD-MM-YYYY";

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    console.log("fetchAllWeeklyReports");

    fetchAllWeeklyReports();
  }, [fetchAllWeeklyReports]);

  useEffect(() => {
    console.log("selectedProject");
    fetchAllWeeklyReports();
  }, [selectedProject]);

  useEffect(() => {
    if (weekly_site_reports.payload) {
      let fromProject = projects.payload.map((item: any) => ({
        name: item.name,
      }));
      let fromWeeklySiteReport = weekly_site_reports.payload.map(
        (item: any) => ({
          name: item.project_name,
        })
      );
      let combinedData = [...fromProject, ...fromWeeklySiteReport];
      var result = combinedData.reduce((unique: any, o: any) => {
        if (!unique.some((obj: any) => obj.name === o.name)) {
          unique.push(o);
        }
        return unique;
      }, []);
      setProjectData([{ name: "All" }, ...result]);
    } else {
      let fromProject = projects.payload.map((item: any) => ({
        name: item.name,
      }));
      setProjectData([{ name: "All" }, ...fromProject]);
    }
  }, [weekly_site_reports, projects]);

  const onChangeHandler = (value: string) => {
    setSelectedProject(value);
  };

  useEffect(() => {
    if (weekly_site_reports.payload) {
      if (selectedProject === "All") {
        let arr = [];
        arr = weekly_site_reports.payload.map((item: any, index: any) => ({
          key: index,
          ...item,
          assigned_to: item.assigned_to
            ?.split(",")
            .map((item: any) => toNumber(item)),
        }));
        let reverseArray = reverse(arr);
        setTaskData(reverseArray);
      } else {
        let arr = [];
        arr = weekly_site_reports.payload.map((item: any, index: any) => ({
          key: index,
          ...item,
          assigned_to: item.assigned_to
            ?.split(",")
            .map((item: any) => toNumber(item)),
        }));
        let revArray = reverse(
          arr?.filter((e: any) => e.project_name === selectedProject)
        );
        setTaskData(revArray);
      }
    }
  }, [weekly_site_reports, selectedProject]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllWeeklyReports();
        OpenNotification(NotificationType.SUCCESS, "Task delete!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete task",
            e.message
          )
        );
      });
  };
  const checkColor = (e: any) => {
    if (e.check) return <Tag color="green">Complete</Tag>;
    else return <Tag color="yellow">Incomplete</Tag>;
  };

  const columns: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      width: "40px",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Week",
      key: "week",
      dataIndex: "week",
      width: "100px",
      render: (value, record) => <span>{record.week}</span>,
    },
    {
      title: "Action",
      width: "70px",
      fixed: "right",
      render: (value, record) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisibile(false);
                }}
                className="d-flex flex-column"
              >
                <ViewWeeklyReportComponent id={record.id} />
                <EditWeeklySiteReportComponent
                  weekly_site_report_id={record.id}
                />
                <Popconfirm
                  placement="leftTop"
                  title="Are you sure you want to remove this task?"
                  onConfirm={() => OnDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger type="text">
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            }
          >
            <Button
              icon={<MoreOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setIsVisibile(false);
              }}
              className="btn-outline-secondary border-0"
            ></Button>
          </Popover>
        </>
      ),
    },
  ];

  const handleOk = () => {
    setIsVisibile(false);
    setChecklistData([]);
    setRecordData([]);
    form.resetFields();
    setLoading(false);
  };

  const onRowClick = (record: any, isVis: boolean) => {
    setRecordData([]);
    setIsVisibile(isVis);
    setRecordData([record]);
    let reverseArray = record.task_details.map((item: any, index: number) => ({
      key: index,
      ...item,
    }));
    setChecklistData(reverseArray);
    form.setFieldsValue({
      project_name: record.project_name,
      task_name: record.task_name,
      due_date: moment(record.due_date, dateFormat),
      date: moment(record.date, dateFormat2),
      assigned_to: record.assigned_to,
    });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <AddWeeklyReportComponent
          tasks={weekly_site_reports.payload}
          project={selectedProject}
        />
        <div className="float-left mt-4 ml-2">
          <Select
            style={{ width: 200, height: "32px" }}
            placeholder="Projects"
            value={selectedProject}
            onChange={(e) => onChangeHandler(e)}
          >
            {projectData.map((e: any, index: any) => (
              <Select.Option key={index} value={e.name}>
                {e.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="col-md-12 mt-2">
        <Table
          className="task-table"
          columns={columns}
          dataSource={taskData}
          loading={weekly_site_reports.isPending}
          onRow={(record) => {
            return {
              onClick: () => onRowClick(record, true),
            };
          }}
        />
      </div>
      <Modal
        centered
        width={800}
        className="fixed-modal"
        visible={isVisible}
        onCancel={handleOk}
        footer={[]}
      >
        <div className="row">
          <div className="col-lg-12">
            <h5 className="pb-2">
              {recordData[0]?.task_name} ({recordData[0]?.project_name})
            </h5>

            <div className="d-flex justify-content-between">
              <div>
                <h6>
                  <span
                    style={{ verticalAlign: "bottom", paddingRight: "5px" }}
                  >
                    <UserOutlined />
                  </span>
                  Assigned To
                </h6>
                <div className="d-flex flex-row">
                  {getUsers(recordData[0]?.assigned_to, users.payload).map(
                    (item, index, array) => (
                      <pre style={{ fontSize: "14px", color: "#979797" }}>
                        {" " + item.full_name}
                        {array.length === index + 1 ? "" : ","}
                      </pre>
                    )
                  )}
                </div>
              </div>
              <div>
                <h6>
                  <span
                    style={{ verticalAlign: "bottom", paddingRight: "5px" }}
                  >
                    <CalendarOutlined />
                  </span>
                  Assigned Date
                </h6>
                <h6
                  style={{
                    fontSize: "14px",
                    color: "#979797",
                  }}
                >
                  {recordData[0]?.date
                    ? moment(recordData[0].date, dateFormat2).format(
                        "DD/MM/YYYY hh:mm"
                      )
                    : moment().format("DD/MM/YYYY hh:mm")}
                </h6>
              </div>
              <div>
                <h6>
                  <span
                    style={{ verticalAlign: "bottom", paddingRight: "5px" }}
                  >
                    <CalendarOutlined />
                  </span>
                  Due Date
                </h6>
                <h6
                  style={{
                    fontSize: "14px",
                    color: "#b91c1c",
                  }}
                >
                  {recordData[0]?.due_date
                    ? moment(recordData[0].due_date, dateFormat).format(
                        "DD/MM/YYYY hh:mm"
                      )
                    : moment().format("DD/MM/YYYY hh:mm")}
                </h6>
              </div>
            </div>
            <div className="">
              <List className="task-list">
                {checklistData.map((e: any, i: any) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        e.check ? (
                          <CheckSquareOutlined
                            style={{
                              fontSize: "16px",
                              verticalAlign: "baseline",
                            }}
                          />
                        ) : (
                          <CloseSquareOutlined
                            style={{
                              fontSize: "16px",
                              verticalAlign: "baseline",
                            }}
                          />
                        )
                      }
                      title={
                        <>
                          {e.description} {checkColor(e)}
                        </>
                      }
                      description={e.remark}
                    />
                    <div className="d-flex flex-column">
                      <h6 style={{ fontSize: "14px", color: "#979797" }}>
                        {e.checked_date}
                      </h6>

                      <span>
                        {e.url ? (
                          <Button
                            onClick={() => DownloadFile(e)}
                            type="link"
                            icon={<PaperClipOutlined />}
                          ></Button>
                        ) : null}
                      </span>
                    </div>
                  </List.Item>
                ))}
              </List>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  weekly_site_reports: state.weekly_site_report.fetchAll,
  users: state.user.fetchAll,
  projects: state.project.fetchAll,
  weekly_site_report: state.weekly_site_report.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllWeeklyReports: () => dispatch(fetchAllWeeklyReport()),
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchAllProjects: () => dispatch(fetchAllProjects()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyReportComponent);
