import { connect } from "react-redux";
import { fetchAllProjects } from "../../../redux/Project/Project.action";
import {
  DeleteWeeklyPlanReport,
  WeeklyPlanReportPropType,
} from "./utils/WeeklyPlanReport.util";
import { FC, useEffect, useState } from "react";
import { Button, Col, Popconfirm, Popover, Row, Select, Table } from "antd";
import { fetchAllWeeklyPlanReport } from "../../../redux/WeeklyPlanReport/WeeklyPlanReport.action";
import moment from "moment";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import ReloadButtonComponent from "../../common/ReloadButton/ReloadButton.component";
import AddWeeklyPlanReportComponent from "./components/Add/AddWeeklyPlanReport.component";
import ViewWeeklyPlanReportComponent from "./components/View/ViewWeeklyPlanReport.component";
import EditWeeklyPlanReportComponent from "./components/Edit/EditWeeklyPlanReport.component";
import { OpenNotification } from "../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../constants/Constants";
import { ErrorHandler } from "../../../utilities/utilities";

const WeeklyPlanReportComponent: FC<WeeklyPlanReportPropType> = ({
  fetchAll,
  fetchAllProject,
  weekly_plan_report,
  project,
}) => {
  const [selectedProject, setSelectedProject] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllProject();
    fetchAll({ project_id: selectedProject });
  }, [fetchAll, selectedProject]);

  const RemoveConcept = (record: any) => {
    setLoading(true);
    DeleteWeeklyPlanReport(record.id)
      .then(() => {
        setLoading(false);
        fetchAll({ project_id: selectedProject });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.WEEKLY_PLAN_REPORT_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.WEEKLY_PLAN_REPORT_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const renderPopOverContent = (record: any, index: number) => {
    return (
      <div className="d-flex flex-column">
        <ViewWeeklyPlanReportComponent
          weekly_plan_report={weekly_plan_report.payload[index]}
          project={project.payload}
        />
        <EditWeeklyPlanReportComponent
          id={record.id}
          project={project.payload}
        />
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={() => RemoveConcept(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            loading={loading}
            type="text"
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
    );
  };

  return (
    <div className="col">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Col span={12}>
          <Select
            placeholder="Select Project"
            style={{ width: 200 }}
            allowClear={false}
            showSearch
            onChange={(e) => setSelectedProject(e)}
            filterOption={(input, option) =>
              (option?.label?.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            options={project.payload.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          ></Select>
        </Col>
        <Col span={4}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AddWeeklyPlanReportComponent
              selectedProject={selectedProject}
              project={project.payload}
            />
            <ReloadButtonComponent
              onClick={() => fetchAll({ project_id: selectedProject })}
            />
          </div>
        </Col>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            columns={[
              {
                title: "No.",
                dataIndex: "no",
                key: 1,
                width: "50px",
                render: (record: any, value: any, index: any) => index + 1,
              },
              {
                title: "Week",
                dataIndex: "date",
                key: 2,
                width: "250px",
                render: (value: any) => moment(value).format("YYYY [Week] WW"),
              },

              {
                title: "Action",
                key: "action",
                fixed: "right",
                render: (value: any, record: any, index: number) => (
                  <Popover
                    placement="top"
                    overlayClassName="action-popover"
                    trigger="focus"
                    zIndex={2000}
                    content={() => renderPopOverContent(record, index)}
                  >
                    <Button
                      icon={<MoreOutlined />}
                      className="btn-outline-secondary border-0"
                    ></Button>
                  </Popover>
                ),
              },
            ]}
            dataSource={weekly_plan_report.payload}
            loading={weekly_plan_report.isPending}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchAll,
  weekly_plan_report: state.weekly_plan_report.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllProject: (action: any) => dispatch(fetchAllProjects(action)),
  fetchAll: (action: any) => dispatch(fetchAllWeeklyPlanReport(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyPlanReportComponent);
