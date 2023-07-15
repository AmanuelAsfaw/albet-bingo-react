import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";

import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllRiskLog } from "../../../../redux/RiskLog/RiskLog.action";
import { RiskLog } from "../../../../redux/RiskLog/RiskLog.type";
import AddRiskLogComponent from "./components/Add/AddRiskLog.component";
import { RiskLogPropType } from "./util/RiskLog.util";

const RiskLogComponents: FC<RiskLogPropType> = ({
  project,
  fetchRiskLogs,
  risk_logs,
}) => {
  const columns: ColumnsType<RiskLog> = [
    {
      title: "Risk Identification",
      key: "risk_identification",
      children: [
        {
          title: "No",
          key: "",
          dataIndex: "",
          render: (value, record, index) => index + 1,
        },
        {
          title: "Category",
          key: "category",
          dataIndex: "category",
          render: (value) => value,
        },
        {
          title: "Risk",
          key: "risk",
          dataIndex: "risk",
          render: (value) => value,
        },
        {
          title: "Cause",
          key: "risk_cause",
          dataIndex: "risk_cause",
          render: (value) => value,
        },
        {
          title: "Impact",
          key: "impact",
          dataIndex: "impact",
          render: (value) => value,
        },
        {
          title: "Raised by",
          key: "raised_by",
          dataIndex: "raised_by",
          render: (value) => value,
        },
        {
          title: "Date Raised",
          key: "date_rased",
          dataIndex: "date_rased",
          render: (value: any) => moment(value).format("DD/MM/YYYY"),
        },
      ],
    },
    {
      title: "Risk Assessment",
      key: "risk_assessment",
      children: [
        {
          title: "Cost Impact",
          key: "cost_impact",
          dataIndex: "cost_impact",
          render: (value) => (value ? "Yes" : "No"),
        },
        {
          title: "Schedule Impact",
          key: "schedule_impact",
          dataIndex: "schedule_impact",
          render: (value) => (value ? "Yes" : "No"),
        },
      ],
    },
    {
      title: "Risk Response",
      key: "risk_response",
      children: [
        {
          title: "Response Plan",
          key: "response_plan",
          dataIndex: "response_plan",
          render: (value) => value,
        },
        {
          title: "Owner",
          key: "risk_owner",
          dataIndex: "risk_owner",
          render: (value) => value,
        },
      ],
    },
    {
      title: "Monitoring & Controlling",
      key: "monitoring",
      children: [
        {
          title: "Status",
          key: "status",
          dataIndex: "status",
          render: (value) => value,
        },
        {
          title: "Note",
          key: "note",
          dataIndex: "note",
          render: (value) => value,
        },
      ],
    },
  ];

  useEffect(() => {
    fetchRiskLogs({ project_id: project.payload?.id });
  }, [fetchRiskLogs, project]);

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <AddRiskLogComponent />
      </div>
      <div className="col-md-12  ">
        <Table
          bordered
          columns={columns}
          dataSource={risk_logs.payload}
          loading={risk_logs.isPending}
        />
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
  risk_logs: state.risk_log.fetchAll,
  project: state.project.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchRiskLogs: (action: any) => dispatch(fetchAllRiskLog(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RiskLogComponents);
