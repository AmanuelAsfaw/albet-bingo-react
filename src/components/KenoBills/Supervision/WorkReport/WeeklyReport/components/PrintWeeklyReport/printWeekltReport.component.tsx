import { Table, Typography } from "antd";
import { toNumber } from "lodash";
import moment from "moment";
import { FC, useEffect } from "react";
import {
  format,
  formatNumber,
  parseUnit,
} from "../../../../../../../utilities/utilities";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";
import {
  parseData,
  PrintWeeklyReportPrintPropType,
} from "./printWeeklyReport.util";

const { Text } = Typography;

const PrintWeeklyReport: FC<PrintWeeklyReportPrintPropType> = ({
  dataAction,
  visibilityAction,
  project,
}) => {
  const [weekly_report, setWeeklyReport] = dataAction;
  const [visibility, setVisibility] = visibilityAction;
  const { is_done, manPower, equipment, material, problem, description } =
    parseData(weekly_report);

  window.onafterprint = () => {
    setVisibility(false);
    setWeeklyReport(null);
  };

  useEffect(() => {
    if (weekly_report && visibility && is_done) window.print();
  }, [weekly_report, visibility, is_done]);

  return (
    <>
      <div className="col-lg-12 visible-print">
        <PdfHeaderComponent type="consultant" />

        <div className="text-left">
          <h6
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            Weekly Report
          </h6>
        </div>
        <div className="row mt-4 px-3">
          <div className="col-sm-6">
            <div>
              <b>Reporting Date - </b>
              {moment(weekly_report?.reporting_date).format("DD/MM/YYYY") ??
                "-"}
            </div>
            <div>
              <b>Scheduling Date - </b>
              {moment(weekly_report?.scheduling_date).format("DD/MM/YYYY") ??
                "-"}
            </div>
            <div>
              <b>Reporting Week - </b>
              {weekly_report?.reporting_week ?? "-"}
            </div>
            <div>
              <b>Project - </b>
              {project?.name ?? "-"}
            </div>
          </div>
          <div className="col-sm-6 text-right">
            <div>
              <b>Location - </b>
              {project?.address ?? "-"}
            </div>
            <div>
              <b>Contractor - </b>
              {project?.contractor?.name ?? "-"}
            </div>
            <div>
              <b>Owner - </b>
              {project?.client?.name ?? "-"}
            </div>
            <div>
              <b>Resident Engineer - </b>
              {weekly_report?.resident_engineer ?? "-"}
            </div>
            <div>
              <b>Site Inspector - </b>
              {weekly_report?.site_inspector ?? "-"}
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <Table
            className="weeklyreport-table"
            bordered
            title={() => (
              <h6 style={{ fontSize: "13px" }}>
                Major Tasks for the reporting week
              </h6>
            )}
            pagination={false}
            dataSource={description}
            columns={[
              {
                title: "Item No.",
                width: "10%",
                render: (record: any, data: any, index: any) => data.item_no,
              },
              {
                title: "Activity description with location",
                width: "40%",
                render: (record: any, data: any, index: any) =>
                  data.activity_desc,
              },
              {
                title: "Block No",
                width: "10%",
                render: (record: any, data: any, index: any) => data.block_no,
              },
              {
                title: "Planned Qty in %",
                width: "10%",
                render: (record: any, data: any, index: any) =>
                  format(toNumber(data.planned_qty)),
              },
              {
                title: "Executed Qty in %",
                width: "10%",
                render: (record: any, data: any, index: any) =>
                  data.executed_qty,
              },
            ]}
          />
        </div>
        <div className="col-md-12 pt-4">
          <Table
            className="weeklyreport-table"
            bordered
            title={() => <h6>Tasks Planned For Next Week</h6>}
            pagination={false}
            dataSource={manPower}
            columns={[
              {
                title: "Trade name",
                width: "30%",
                dataIndex: "trade_name",
              },
              {
                title: "Unit",
                width: "20%",
                dataIndex: "unit",
              },
              {
                title: "Planned",
                width: "20%",
                dataIndex: "planned",
                render: (record) => formatNumber(record),
              },
              {
                title: "Available",
                width: "20%",
                dataIndex: "available",
                render: (record) => formatNumber(record),
              },
            ]}
          />
        </div>
        <div className="col-md-12 pt-4">
          <Table
            className="weeklyreport-table"
            bordered
            title={() => <h6>Tasks Planned For Next Week</h6>}
            pagination={false}
            dataSource={equipment}
            columns={[
              {
                title: "Trade name",
                width: "30%",
                dataIndex: "trade_name",
              },
              {
                title: "Planned",
                width: "30%",
                dataIndex: "planned",
                render: (record) => parseUnit(record),
              },
              {
                title: "Available",
                width: "30%",
                dataIndex: "available",
                render: (record) => formatNumber(record),
              },
            ]}
          />
        </div>
        <div className="col-md-12 pt-4">
          <Table
            className="weeklyreport-table"
            bordered
            title={() => <h6>Tasks Planned For Next Week</h6>}
            pagination={false}
            dataSource={material}
            columns={[
              {
                title: "Trade name",
                width: "30%",
                dataIndex: "trade_name",
              },
              {
                title: "Planned",
                width: "30%",
                dataIndex: "planned",
                render: (record) => parseUnit(record),
              },
              {
                title: "Available",
                width: "30%",
                dataIndex: "available",
                render: (record) => formatNumber(record),
              },
            ]}
          />
        </div>
        <div className="col-md-12 pt-4">
          <Table
            bordered
            className="weeklyreport-table"
            title={() => (
              <>
                <h6>Major Challenges For The Reporting Week</h6>{" "}
                <p className="text-center">Technical</p>{" "}
              </>
            )}
            pagination={false}
            dataSource={problem}
            columns={[
              {
                title: "Challenges",
                width: "20%",
                dataIndex: "problem_encountered",
              },
              {
                title: "Solution Provided",
                width: "20%",
                dataIndex: "soln_by_contractor",
              },
              {
                title: "Solution Provided",
                width: "20%",
                dataIndex: "soln_by_client",
              },
              {
                title: "Solution Provided",
                width: "20%",
                dataIndex: "affected_days_no",
              },
            ]}
          />
        </div>
      </div>
      <div className="col-md-12 visible-print mt-3">
        <div className="row px-3">
          <div className="col-md-4">
            <div style={{ fontSize: "13px" }}>
              <b>Prepared By - </b>
              {weekly_report?.wr_prepared_by?.full_name}
            </div>
            <div style={{ fontSize: "13px" }}>
              <b>Approved By - </b>
              {weekly_report?.wr_approved_by?.full_name}
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ fontSize: "13px" }}>
              <b>Checked By - </b>
              {weekly_report?.wr_checked_by?.full_name}
            </div>
            <div style={{ fontSize: "13px" }}>
              <b>Reported By - </b>
              {weekly_report?.wr_reported_by?.full_name}
            </div>
          </div>
          <div className="col-md-4">
            <div style={{ fontSize: "13px" }}>
              <b>Accepted By - </b>
              {weekly_report?.wr_accepted_by?.full_name}
            </div>
            <div style={{ fontSize: "13px" }}>
              <b>Inspected By - </b>
              {weekly_report?.wr_inspected_by?.full_name}
            </div>
            <div style={{ fontSize: "13px" }}>
              <b>Confirmed By - </b>
              {weekly_report?.wr_confirmed_by?.full_name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PrintWeeklyReport;
