import moment, { Moment } from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllWeeklyPlan } from "../../../../../../redux/WeeklyPlan/WeeklyPlan.action";
import { fetchAllWeekReport } from "../../../../../../redux/WeekReport/WeekReport.action";
import {
  descriptionData,
  PhysicalProgressPropType,
  parseWeeklyPlan,
  findWeekNumber,
  getWeekNumber,
} from "./util/PhysicalProgress.util";
import Table, { ColumnsType } from "antd/lib/table";
import { Button, DatePicker, Input } from "antd";
import { format } from "../../../../../../utilities/utilities";
import { PrinterOutlined } from "@ant-design/icons";
import PrintPhysicalProgressComponent from "./components/print.component";

const PhysicalProgressComponent: FC<PhysicalProgressPropType> = ({
  project,
  weeklyReport,
  weekly_plan,
  fetchAllWeekReports,
  fetchAllWeeklyPlan,
}) => {
  const [is_visible, setVisible] = useState(false);
  const [reportData, setReportData] = useState<any>([]);
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

  console.log({ weekNumber });

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

      let toDateExecuted = descriptionData(
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

        let todateExecuted = toDateExecuted.filter(
          (e: any) => e.activity_desc === weeklyPlanData[i].description
        );

        let sumOfExcuted = todateExecuted.length
          ? todateExecuted
              .map((item: any) =>
                item.planned_qty
                  ? (item.planned_qty * weeklyPlanData[i].contract_amount) / 100
                  : 0
              )
              .reduce((prev: any, next: any) => prev + next)
          : 0;

        let prevPhysicalPlan =
          (weeklyPlanData[i][`week${weekNumber - 1}`] /
            weeklyPlanData[i].contract_amount) *
          100;
        let todatePhysicalPlan = 0;
        for (let j = 1; j <= weekNumber; j++) {
          todatePhysicalPlan += weeklyPlanData[i][`week${j}`];
        }

        data.push({
          description: weeklyPlanData[i].description,
          physical_plan_percentage: prevPhysicalPlan,
          physical_executed_percentage: prevFound?.planned_qty,
          week1_planned:
            (weeklyPlanData[i].week1 / weeklyPlanData[i].contract_amount) * 100,
          week1_executed: weekNumber === 1 ? found?.planned_qty : 0,
          week2_planned:
            (weeklyPlanData[i].week2 / weeklyPlanData[i].contract_amount) * 100,
          week2_executed: weekNumber === 2 ? found?.planned_qty : 0,
          week3_planned:
            (weeklyPlanData[i].week3 / weeklyPlanData[i].contract_amount) * 100,
          week3_executed: weekNumber === 3 ? found?.planned_qty : 0,
          week4_planned:
            (weeklyPlanData[i].week4 / weeklyPlanData[i].contract_amount) * 100,
          week4_executed: weekNumber === 4 ? found?.planned_qty : 0,
          todate_planned:
            (todatePhysicalPlan / weeklyPlanData[i].contract_amount) * 100,
          todate_executed:
            (sumOfExcuted / weeklyPlanData[i].contract_amount) * 100,
        });
      }
      setReportData(data);
    } else {
      setReportData([]);
    }
  }, [reportingWeek, weekly_plan, weeklyReport, weekNumber]);

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
      title: "Previous Weekly Progress %",
      children: [
        {
          title: "Physical Plan %",
          dataIndex: "physical_plan_percentage",
          width: "100px",
          render: (value) => format(value),
        },
        {
          title: "Physical Executed %",
          dataIndex: "physical_executed_percentage",
          width: "100px",
          render: (value) => format(value),
        },
      ],
    },
    {
      title: "Current Month: Weekly Plan Vs Weekly Executed",
      children: [
        {
          title: "Week 1",
          children: [
            {
              title: "Planned %",
              dataIndex: "week1_planned",
              width: "100px",
              render: (value) => format(value),
            },
            {
              title: "Executed %",
              dataIndex: "week1_executed",
              width: "100px",
              render: (value) => format(value),
            },
          ],
        },
        {
          title: "Week 2",
          children: [
            {
              title: "Planned %",
              dataIndex: "week2_planned",
              width: "100px",
              render: (value) => format(value),
            },
            {
              title: "Executed %",
              dataIndex: "week2_executed",
              width: "100px",
              render: (value) => format(value),
            },
          ],
        },
        {
          title: "Week 3",
          children: [
            {
              title: "Planned %",
              dataIndex: "week3_planned",
              width: "100px",
              render: (value) => format(value),
            },
            {
              title: "Executed %",
              dataIndex: "week3_executed",
              width: "100px",
              render: (value) => format(value),
            },
          ],
        },
        {
          title: "Week 4",
          children: [
            {
              title: "Planned %",
              dataIndex: "week4_planned",
              width: "100px",
              render: (value) => format(value),
            },
            {
              title: "Executed %",
              dataIndex: "week4_executed",
              width: "100px",
              render: (value) => format(value),
            },
          ],
        },
      ],
    },
    {
      title: "Total to date This week",
      children: [
        {
          title: "Plan %",
          dataIndex: "todate_planned",
          width: "100px",
          render: (value) => format(value),
        },
        {
          title: "Executed %",
          dataIndex: "todate_executed",
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
          <span className="hidden-print" style={{ margin: "5px" }}>
            Week:
          </span>
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
            type="primary"
            className="mr-4"
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
        ></Table>
      </div>
      <div className="col-md-12">
        <PrintPhysicalProgressComponent
          printData={reportData}
          setVisibility={setVisible}
          is_visible={is_visible}
          loading={weekly_plan.isPending}
          reporting_week={reportingWeek}
          project={project.payload}
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
)(PhysicalProgressComponent);
