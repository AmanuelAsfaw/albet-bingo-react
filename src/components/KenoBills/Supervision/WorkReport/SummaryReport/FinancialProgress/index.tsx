import { Button, DatePicker, Input } from "antd";
import moment, { Moment } from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllWeeklyPlan } from "../../../../../../redux/WeeklyPlan/WeeklyPlan.action";
import { fetchAllWeekReport } from "../../../../../../redux/WeekReport/WeekReport.action";
import {
  descriptionData,
  FinancialProgressPropType,
  parseWeeklyPlan,
  findWeekNumber,
  getWeekNumber,
} from "./util/FinancialProgress.util";
import Table, { ColumnsType } from "antd/lib/table";
import { format } from "../../../../../../utilities/utilities";
import { PrinterOutlined } from "@ant-design/icons";
import PrintFinancialProgressComponent from "./components/print.component";

const FinancialProgressComponent: FC<FinancialProgressPropType> = ({
  project,
  weeklyReport,
  weekly_plan,
  fetchAllWeekReports,
  fetchAllWeeklyPlan,
}) => {
  const [is_visible, setVisible] = useState(false);
  const [reportData, setReportData] = useState<any>([{ key: Date.now() }]);
  const [reportingWeek, setReportingWeek] = useState<Moment>(moment());
  const [weekNumber, setWeekNumber] = useState<number>(1);
  const { TextArea } = Input;
  const weekFormat = "YYYY-wo";

  useEffect(() => {
    fetchAllWeekReports({ project_id: project?.payload.id });
  }, [fetchAllWeekReports, project]);

  useEffect(() => {
    fetchAllWeeklyPlan({
      date: reportingWeek.clone().startOf("month").format("YYYY-MM-DD"),
      project_id: project.payload?.id,
    });
  }, [reportingWeek, fetchAllWeeklyPlan, project]);

  useEffect(() => {
    const { week } = getWeekNumber(reportingWeek.clone());
    setWeekNumber(week);
  }, [reportingWeek]);

  useEffect(() => {
    if (weekly_plan.payload.length) {
      let prevWeek = reportingWeek
        .clone()
        .endOf("week")
        .subtract(7, "days")
        .format("YYYY-MM-DD");
      let data = [];
      let weeklyPlanData: any = parseWeeklyPlan(weekly_plan.payload);
      let arr = descriptionData(
        weeklyReport.payload.filter(
          (e: any) =>
            e.reporting_week ===
            reportingWeek.clone().endOf("week").format("YYYY-MM-DD")
        )
      );
      let prevArr = descriptionData(
        weeklyReport.payload.filter((e: any) => e.reporting_week === prevWeek)
      );

      let totalToPrevExecuted = descriptionData(
        weeklyReport.payload.filter((e: any) =>
          moment(e.reporting_week, "YYYY-MM-DD").isBetween(
            moment(
              reportingWeek.clone().startOf("month").format("YYYY-MM-DD"),
              "YYYY-MM-DD"
            ),
            moment(
              reportingWeek.clone().startOf("week").format("YYYY-MM-DD"),
              "YYYY-MM-DD"
            ),
            "days",
            "[)"
          )
        )
      );

      let totalToDateExecuted = descriptionData(
        weeklyReport.payload.filter((e: any) =>
          moment(e.reporting_week, "YYYY-MM-DD").isBetween(
            moment(
              reportingWeek.clone().startOf("month").format("YYYY-MM-DD"),
              "YYYY-MM-DD"
            ),
            moment(
              reportingWeek.clone().endOf("week").format("YYYY-MM-DD"),
              "YYYY-MM-DD"
            ),
            "days",
            "[]"
          )
        )
      );

      for (let i = 0; i < weeklyPlanData.length; i++) {
        let found: any = arr.find(
          (e: any) => e.activity_desc === weeklyPlanData[i].description
        );
        let prevFound = prevArr.find(
          (e: any) => e.activity_desc === weeklyPlanData[i].description
        );

        let totalToPrevExecutedFilter = totalToPrevExecuted.filter(
          (e: any) => e.activity_desc === weeklyPlanData[i].description
        );

        let totalToDateExecutedFilter = totalToDateExecuted.filter(
          (e: any) => e.activity_desc === weeklyPlanData[i].description
        );

        let sumOfTotalToPrevExceuted = totalToPrevExecutedFilter.length
          ? totalToPrevExecutedFilter
              .map((item: any) =>
                item.planned_qty
                  ? (item.planned_qty * weeklyPlanData[i].contract_amount) / 100
                  : 0
              )
              .reduce((prev: any, next: any) => prev + next)
          : 0;

        let sumOfTotalToDateExceuted = totalToDateExecutedFilter.length
          ? totalToDateExecutedFilter
              .map((item: any) =>
                item.planned_qty
                  ? (item.planned_qty * weeklyPlanData[i].contract_amount) / 100
                  : 0
              )
              .reduce((prev: any, next: any) => prev + next)
          : 0;

        let totalToPrevPlanned = 0;
        for (let j = 1; j < weekNumber; j++) {
          totalToPrevPlanned += weeklyPlanData[i][`week${j}`];
        }
        let totalToDatePlanned = 0;
        for (let j = 1; j <= weekNumber; j++) {
          totalToDatePlanned += weeklyPlanData[i][`week${j}`];
        }

        data.push({
          description: weeklyPlanData[i].description,
          financial_amount: weeklyPlanData[i].contract_amount,
          financial_amount_percentage:
            (weeklyPlanData[i].contract_amount /
              project.payload?.overall.contract_amount) *
            100,
          prev_week_planned:
            (weeklyPlanData[i][`week${weekNumber - 1}`] /
              weeklyPlanData[i].contract_amount) *
            100,
          prev_week_executed: prevFound?.planned_qty,
          week_planned:
            (weeklyPlanData[i][`week${weekNumber}`] /
              weeklyPlanData[i].contract_amount) *
            100,
          week_executed: found?.planned_qty,
          week_financial_planned_amount: weeklyPlanData[i][`week${weekNumber}`],
          week_financial_executed_amount:
            (found?.planned_qty * weeklyPlanData[i].contract_amount) / 100,
          total_previous_planned:
            (totalToPrevPlanned / weeklyPlanData[i].contract_amount) * 100,
          total_previous_executed:
            (sumOfTotalToPrevExceuted / weeklyPlanData[i].contract_amount) *
            100,
          total_previous_executed_amount: sumOfTotalToPrevExceuted,
          todate_total_planned:
            (totalToDatePlanned / weeklyPlanData[i].contract_amount) * 100,
          total_financial_planned_amount: totalToDatePlanned,
          todate_total_executed:
            (sumOfTotalToDateExceuted / weeklyPlanData[i].contract_amount) *
            100,
          total_financial_executed_amount: sumOfTotalToDateExceuted,
        });
      }
      setReportData(data);
    } else {
      setReportData([]);
    }
  }, [reportingWeek, weekly_plan, weeklyReport, weekNumber, project]);

  const columns: ColumnsType<any> = [
    {
      title: "No",
      fixed: "left",
      width: "50px",
      render: (data, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Work Description",
      key: "description",
      dataIndex: "description",
      width: "200px",
      render: (data, record) => (
        <TextArea
          bordered={false}
          autoSize
          rows={2}
          value={record.description}
        />
      ),
    },
    {
      title: "Total Amount with contrat",
      children: [
        {
          title: "Financial Amount",
          dataIndex: "financial_amount",
          width: "100px",
          render: (value) => format(value),
        },
        {
          title: "%",
          dataIndex: "financial_amount_percentage",
          width: "100px",
          render: (value) => format(value),
        },
      ],
    },
    {
      title: "Current Month: Weekly Plan Vs Weekly Executed",
      children: [
        {
          title: "Previous Week",
          children: [
            {
              title: "Planned %",
              dataIndex: "prev_week_planned",
              width: "100px",
              render: (value) => format(value),
            },
            {
              title: "Executed %",
              dataIndex: "prev_week_executed",
              width: "100px",
              render: (value) => format(value),
            },
          ],
        },
        {
          title: `Week ${weekNumber}`,
          children: [
            {
              title: "Planned %",
              dataIndex: "week_planned",
              width: "100px",
              render: (value) => format(value),
            },
            {
              title: "Executed %",
              dataIndex: "week_executed",
              width: "100px",
              render: (value) => format(value),
            },
            {
              title: "Financial Planned Amount",
              dataIndex: "week_financial_planned_amount",
              width: "100px",
              render: (value) => format(value),
            },
            {
              title: "Financial Executed Amount",
              dataIndex: "week_financial_executed_amount",
              width: "100px",
              render: (value) => format(value),
            },
          ],
        },
      ],
    },
    {
      title: "Total to Previous",
      children: [
        {
          title: "Previous Planned %",
          dataIndex: "total_previous_planned",
          width: "100px",
          render: (value) => format(value),
        },
        {
          title: "Previous Executed %",
          dataIndex: "total_previous_executed",
          width: "100px",
          render: (value) => format(value),
        },
        {
          title: "Previous Executed Amount",
          dataIndex: "total_previous_executed_amount",
          width: "100px",
          render: (value) => format(value),
        },
      ],
    },
    {
      title: "Total to date",
      children: [
        {
          title: "Planned %",
          dataIndex: "todate_total_planned",
          width: "100px",
          render: (value) => format(value),
        },
        {
          title: "Total Financial Planned Amount",
          dataIndex: "total_financial_planned_amount",
          width: "100px",
          render: (value) => format(value),
        },
        {
          title: "Executed %",
          dataIndex: "todate_total_executed",
          width: "100px",
          render: (value) => format(value),
        },
        {
          title: "Total Financial Executed Amount",
          dataIndex: "total_financial_executed_amount",
          width: "100px",
          render: (value) => format(value),
        },
      ],
    },
  ];

  return (
    <>
      <div className="row align-items-center justify-content-between">
        <div style={{ padding: "10px" }} className=" hidden-print">
          <span style={{ margin: "5px" }}>Week:</span>
          <DatePicker
            style={{ width: 250 }}
            value={reportingWeek}
            picker="week"
            allowClear={false}
            format={weekFormat}
            onChange={(e) =>
              e ? setReportingWeek(e) : setReportingWeek(moment())
            }
          />
        </div>
        <div className=" hidden-print">
          <Button
            className="mr-4"
            type="primary"
            icon={<PrinterOutlined />}
            onClick={() => setVisible(true)}
          >
            Print
          </Button>
        </div>
      </div>
      <div className="hidden-print">
        <Table
          bordered
          columns={columns}
          dataSource={reportData}
          loading={weekly_plan.isPending}
          pagination={false}
          scroll={{ x: "10px" }}
          summary={(pageData) => {
            let prev_planned = 0;
            let prev_executed = 0;
            let curr_planned = 0;
            let curr_executed = 0;
            let total_todate_planned = 0;
            let total_todate_excuted = 0;
            let todate_com_planned_amount = 0;
            let todate_com_executed_amount = 0;
            let contract_amount = pageData[0]?.financial_amount;
            pageData.forEach((e) => {
              prev_planned += e.financial_amount * e.prev_week_planned;
              prev_executed += e.financial_amount * e.prev_week_executed;
              curr_planned += e.week_financial_planned_amount
                ? e.week_financial_planned_amount
                : 0;
              curr_executed += e.week_financial_executed_amount
                ? e.week_financial_executed_amount
                : 0;
              total_todate_planned += e.total_financial_planned_amount
                ? e.total_financial_planned_amount
                : 0;
              total_todate_excuted += e.total_financial_executed_amount
                ? e.total_financial_executed_amount
                : 0;
              todate_com_planned_amount += e.total_financial_planned_amount
                ? e.total_financial_planned_amount
                : 0;
              todate_com_executed_amount += e.total_financial_executed_amount
                ? e.total_financial_executed_amount
                : 0;
            });

            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={10} colSpan={4}>
                    Total Pland vs Excuted this week
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {format((prev_planned / contract_amount) * 100)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {format((prev_executed / contract_amount) * 100)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {format((curr_planned / contract_amount) * 100)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {format((curr_executed / contract_amount) * 100)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={7}
                    colSpan={5}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell index={7} colSpan={2}>
                    {format((total_todate_planned / contract_amount) * 100)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {format((total_todate_excuted / contract_amount) * 100)}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell
                    index={7}
                    colSpan={10}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell index={10} colSpan={3}>
                    Comulative
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {format(
                      (todate_com_planned_amount /
                        project.payload?.overall?.contract_amount) *
                        100
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {format(todate_com_planned_amount)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {format(
                      (todate_com_executed_amount /
                        project.payload?.overall?.contract_amount) *
                        100
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {format(todate_com_executed_amount)}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell
                    index={7}
                    colSpan={10}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell index={10} colSpan={3}>
                    Pland Vs Excuted
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}></Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {format(
                      (todate_com_executed_amount / todate_com_planned_amount) *
                        100
                    )}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        ></Table>
      </div>
      <div className="col-md-12">
        <PrintFinancialProgressComponent
          printData={reportData}
          setVisibility={setVisible}
          is_visible={is_visible}
          loading={weekly_plan.isPending}
          reporting_week={reportingWeek}
          project={project.payload}
          week_no={weekNumber}
        />
      </div>
    </>
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
  weekly_plan: state.weekly_plan.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllWeekReports: (action: any) => dispatch(fetchAllWeekReport(action)),
  fetchAllWeeklyPlan: (action: any) => dispatch(fetchAllWeeklyPlan(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinancialProgressComponent);
