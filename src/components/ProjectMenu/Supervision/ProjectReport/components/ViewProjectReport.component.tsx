import { DatePicker, Form, Input, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchOneProjects } from "../../../../../redux/Project/Project.action";
import { ViewProjectReportPropType } from "../utils/ViewProjectReport.utils";
import { fetchAllProjectVariations } from "../../../../../redux/ProjectVariation/ProjectVariation.action";
import { fetchAllProjectDuration } from "../../../../../redux/ProjectDuration/ProjectDuration.action";
import { fetchAllTimeExtension } from "../../../../../redux/TimeExtension/TimeExtension.action";
import moment from "moment";
import { isNil } from "lodash";
import { formatNumber } from "../../../../../utilities/utilities";
import { fetchAllFinancial } from "../../../../../redux/Financial/Financial.action";

const ViewProjectReportComponent: FC<ViewProjectReportPropType> = ({
  project,
  project_variation,
  fetchAllProjectVariation,
  project_duration,
  fetchAllProjectDuration,
  time_extension,
  fetchAllTimeExtension,
  fetchAllFinancial,
  financial,
}) => {
  const [data, setData] = useState<any>({});
  const [month, setMonth] = useState<any>(moment());

  useEffect(() => {
    fetchAllProjectVariation({ project_id: project.id });
    fetchAllProjectDuration({ project_id: project.id });
    fetchAllTimeExtension({ project_id: project.id });
    fetchAllFinancial({ project_id: project.id });
  }, [
    project.id,
    fetchAllProjectVariation,
    fetchAllProjectDuration,
    fetchAllTimeExtension,
    fetchAllFinancial,
  ]);

  useEffect(() => {
    if (project.id) {
      let variation_order_amount = 0;
      let mobilization_period = 0;
      let total_time_extension = 0;
      let this_month_planned_in_birr = 0;
      let this_month_work_accomplished = 0;
      let total_month_planned_in_birr = 0;
      let total_month_work_accomplished = 0;

      project_variation?.payload?.map(
        (item) => (variation_order_amount += Number(item?.amount))
      );
      project_duration?.payload?.map(
        (item) => (mobilization_period += Number(item?.mobilization_period))
      );
      time_extension.payload.map((item) => {
        total_time_extension += Number(item?.no_of_days);
      });

      financial?.payload
        ?.filter(
          (items) =>
            moment(items.date).format("YYYY-MM") ==
            moment(month).format("YYYY-MM")
        )
        ?.map((item) => {
          this_month_planned_in_birr += Number(item.this_month_planned_in_birr);
          this_month_work_accomplished += Number(
            item.this_month_executed_in_birr
          );
        });

      financial?.payload
        .filter((items) =>
          moment(items.date).isSameOrBefore(moment(month), "month")
        )
        .map((item) => {
          total_month_planned_in_birr += Number(
            item.this_month_planned_in_birr
          );
          total_month_work_accomplished += Number(
            item.this_month_executed_in_birr
          );
        });

      let original_durations = moment(project?.completion_date).diff(
        moment(project?.commencement_date),
        "day"
      );
      let time_elapsed = moment(month).diff(project?.commencement_date, "day");
      let total_duration = time_extension?.payload?.length
        ? moment(
            moment(project?.completion_date).add(total_time_extension, "day")
          ).diff(project.commencement_date, "day")
        : moment(project?.completion_date).diff(
            moment(project?.commencement_date),
            "day"
          );

      setData({
        ...project,
        vat: project.budget * 0.15,
        totalVat: (project.budget * 1.15).toFixed(1),
        cumulative_vo: variation_order_amount,
        vo_vat: (variation_order_amount * 0.15).toFixed(1),
        total_vo_vat: (variation_order_amount * 1.15).toFixed(1),
        site_hand_over:
          moment(project_duration.payload.at(-1)?.site_hand_over_date).format(
            "YYYY-MM-DD"
          ) ?? "-",
        mobilization_period: mobilization_period,
        original_duration: Number.isNaN(original_durations)
          ? "-"
          : original_durations,
        time_extension: total_time_extension,
        revised_completion_date: moment(
          time_extension.payload.at(-1)?.revised_completion_date
        ).format("YYYY-MM-DD"),
        total_revised_duration: time_extension.payload.at(-1)?.no_of_days ?? 0,
        time_elapsed: Number.isNaN(time_elapsed) ? "-" : time_elapsed,
        percent_of_work: Number.isNaN((time_elapsed / total_duration) * 100)
          ? 0
          : ((time_elapsed / total_duration) * 100).toFixed(1),
        this_month_planned_in_birr: this_month_planned_in_birr,
        this_month_work_accomplished: this_month_work_accomplished,
        percent_of_work_planned_this_month:
          (this_month_planned_in_birr /
            (project.budget + variation_order_amount)) *
          100,
        percent_of_work_accomplished_this_month:
          (this_month_work_accomplished /
            (project.budget + variation_order_amount)) *
          100,
        total_month_planned_in_birr: total_month_planned_in_birr,
        total_month_work_accomplished: total_month_work_accomplished,
        total_percent_of_work_planned:
          (total_month_planned_in_birr /
            (project.budget + variation_order_amount)) *
          100,
        total_percent_of_work_accomplished:
          (total_month_work_accomplished /
            (project.budget + variation_order_amount)) *
          100,
      });
    }
  }, [
    project.id,
    project_duration.payload,
    time_extension.payload,
    project_variation.payload,
    financial.payload,
    month,
  ]);

  // const columns = [
  //   {
  //     title: "No",
  //     width: "5%",
  //     render: (value: any, record: any, index: any) => index + 1,
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} value={value} readOnly />
  //     ),
  //   },
  //   {
  //     title: "Location",
  //     dataIndex: "location",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} value={value} readOnly />
  //     ),
  //   },
  //   {
  //     title: "Employer",
  //     dataIndex: "client",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} value={record.client} readOnly />
  //     ),
  //   },
  //   {
  //     title: "Contractor",
  //     dataIndex: "contractor",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} value={value} readOnly />
  //     ),
  //   },
  //   {
  //     title: "Consultant",
  //     dataIndex: "consultant",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} value={value} readOnly />
  //     ),
  //   },
  //   {
  //     title: "Original Contract Amount",
  //     dataIndex: "budget",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         value={formatNumber(project.budget)}
  //         readOnly
  //       />
  //     ),
  //   },
  //   {
  //     title: "15% VAT",
  //     dataIndex: "vat",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         readOnly
  //         value={formatNumber(record?.vat)}
  //       />
  //     ),
  //   },
  //   {
  //     title: "Total with VAT(Original)",
  //     dataIndex: "totalVat",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         readOnly
  //         value={formatNumber(record?.totalVat)}
  //       />
  //     ),
  //   },
  //   {
  //     title: "Cumulative VO Amount",
  //     dataIndex: "cumulative_vo",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         readOnly
  //         value={formatNumber(record?.cumulative_vo)}
  //       />
  //     ),
  //   },
  //   {
  //     title: "15% VAT(VO)",
  //     dataIndex: "vo_vat",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         readOnly
  //         value={formatNumber(record?.vo_vat)}
  //       />
  //     ),
  //   },
  //   {
  //     title: "Total with VAT(VO)",
  //     dataIndex: "total_vo_vat",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} readOnly value={value} />
  //     ),
  //   },
  //   {
  //     title: "Site Hand Over Date",
  //     dataIndex: "site_hand_over",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} readOnly value={value} />
  //     ),
  //   },
  //   {
  //     title: "Mobilization Period",
  //     dataIndex: "mobilization_period",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} readOnly value={value} />
  //     ),
  //   },
  //   {
  //     title: "Commencement Date",
  //     dataIndex: "commencement_date",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} readOnly value={value} />
  //     ),
  //   },
  //   {
  //     title: "Original completion Date",
  //     dataIndex: "completion_date",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} readOnly value={value} />
  //     ),
  //   },
  //   {
  //     title: "Original duration",
  //     dataIndex: "original_duration",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} readOnly value={value} />
  //     ),
  //   },
  //   {
  //     title: "Time extension",
  //     dataIndex: "time_extension",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} value={value} readOnly />
  //     ),
  //   },
  //   {
  //     title: "Revised Completion Date",
  //     dataIndex: "revised_completion_date",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} value={value} readOnly />
  //     ),
  //   },
  //   {
  //     title: "Total Revised Duration (Days)",
  //     dataIndex: "total_revised_duration",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} value={value} readOnly />
  //     ),
  //   },
  //   {
  //     title: "Time Elapsed (Days)",
  //     dataIndex: "time_elapsed",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} value={value} readOnly />
  //     ),
  //   },
  //   {
  //     title: "Percent of time elapsed",
  //     dataIndex: "percent_of_work",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         value={record?.percent_of_work + "%"}
  //         readOnly
  //       />
  //     ),
  //   },
  //   {
  //     title: "Work planned in this month",
  //     dataIndex: "this_month_planned_in_birr",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         value={formatNumber(record?.this_month_planned_in_birr) + " ETB"}
  //         readOnly
  //       />
  //     ),
  //   },
  //   {
  //     title: "Work accomplished in this month",
  //     dataIndex: "this_month_work_accomplished",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         value={formatNumber(record?.this_month_work_accomplished) + " ETB"}
  //         readOnly
  //       />
  //     ),
  //   },
  //   {
  //     title: "Percent of work planned in this month",
  //     dataIndex: "percent_of_work_planned_this_month",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         value={
  //           formatNumber(record?.percent_of_work_planned_this_month) + " %"
  //         }
  //         readOnly
  //       />
  //     ),
  //   },
  //   {
  //     title: "Percent of work accomplished in this month",
  //     dataIndex: "percent_of_work_accomplished_this_month",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         value={
  //           formatNumber(record?.percent_of_work_accomplished_this_month) + " %"
  //         }
  //         readOnly
  //       />
  //     ),
  //   },
  //   {
  //     title: "Work planned to date",
  //     dataIndex: "total_month_planned_in_birr",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         value={formatNumber(record?.total_month_planned_in_birr) + " ETB"}
  //         readOnly
  //       />
  //     ),
  //   },
  //   {
  //     title: "Work accomplished to date",
  //     dataIndex: "total_month_work_accomplished",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         value={formatNumber(record?.total_month_work_accomplished) + " ETB"}
  //         readOnly
  //       />
  //     ),
  //   },
  //   {
  //     title: "Percent of work planned to date",
  //     dataIndex: "total_percent_of_work_planned",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         value={formatNumber(record?.total_percent_of_work_planned) + " %"}
  //         readOnly
  //       />
  //     ),
  //   },
  //   {
  //     title: "Percent of work accomplished to date",
  //     dataIndex: "total_percent_of_work_planned",
  //     render: (value: any, record: any, index: any) => (
  //       <Input
  //         style={{ width: 150 }}
  //         value={
  //           formatNumber(record?.total_percent_of_work_accomplished) + " %"
  //         }
  //         readOnly
  //       />
  //     ),
  //   },
  //   {
  //     title: "Percent of physical progress to date",
  //     dataIndex: "percent_of_physical_progress_to_date",
  //     render: (value: any, record: any, index: any) => (
  //       <Input style={{ width: 150 }} value={"-"} readOnly />
  //     ),
  //   },
  // ];
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    labelAlign: "left" as const,
  };

  const renderContent = () => {
    return (
      <div style={{ height: "500px", overflow: "auto" }}>
        <p className="mt-2">1. CONTRACT DETAILS</p>
        <Form
          {...layout}
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
          layout="horizontal"
        >
          <p style={{ fontWeight: "bold" }}>1.1 General Information</p>
          <div className="mx-5">
            <Form.Item label="Project Name">
              <Input value={data.name} readOnly />
            </Form.Item>
            <Form.Item label="Location">
              <Input value={data.location} readOnly />
            </Form.Item>

            <Form.Item label="Employer">
              <Input value={data.client} readOnly />
            </Form.Item>
            <Form.Item label="Contractor">
              <Input value={data.contractor} readOnly />
            </Form.Item>
            <Form.Item label="Consultant">
              <Input value={data.consultant} readOnly />
            </Form.Item>
          </div>

          <p style={{ fontWeight: "bold" }}>1.2 Contract Amount</p>
          <div className="mx-5">
            <Form.Item label="Original Contract Amount">
              <Input value={formatNumber(project.budget) + " ETB"} readOnly />
            </Form.Item>
            <Form.Item label="15% VAT">
              <Input value={formatNumber(data.vat) + " ETB"} readOnly />
            </Form.Item>

            <Form.Item label="Total with VAT(Original)">
              <Input value={formatNumber(data?.totalVat) + " ETB"} readOnly />
            </Form.Item>
            <Form.Item label="Cumulative VO Amount">
              <Input
                value={formatNumber(data?.cumulative_vo) + " ETB"}
                readOnly
              />
            </Form.Item>
            <Form.Item label="15% VAT(VO)">
              <Input value={formatNumber(data?.vo_vat) + " ETB"} readOnly />
            </Form.Item>
            <Form.Item label="Total with VAT(VO)">
              <Input
                value={formatNumber(data?.total_vo_vat) + " ETB"}
                readOnly
              />
            </Form.Item>
          </div>

          <p style={{ fontWeight: "bold" }}>1.3 Contract Period</p>
          <div className="mx-5">
            <Form.Item label="Site Hand Over Date">
              <Input value={data?.site_hand_over} readOnly />
            </Form.Item>
            <Form.Item label="Mobilization Period">
              <Input value={data.mobilization_period} readOnly />
            </Form.Item>

            <Form.Item label="Commencement Date">
              <Input value={data?.commencement_date} readOnly />
            </Form.Item>
            <Form.Item label="Original completion Date">
              <Input value={data?.completion_date} readOnly />
            </Form.Item>
            <Form.Item label="Original duration">
              <Input value={data?.original_duration} readOnly />
            </Form.Item>
            <Form.Item label="Time extension">
              <Input value={data?.time_extension} readOnly />
            </Form.Item>
            <Form.Item label="Revised Completion Date">
              <Input value={data?.revised_completion_date} readOnly />
            </Form.Item>
            <Form.Item label="Total Revised Duration (Days)">
              <Input value={data?.total_revised_duration} readOnly />
            </Form.Item>
          </div>
          <p style={{ fontWeight: "bold" }}>1.4 Contract Status</p>
          <div className="mx-5">
            <Form.Item label="Time Elapsed (Days)">
              <Input value={data?.time_elapsed} readOnly />
            </Form.Item>
            <Form.Item label="Percent of time elapsed">
              <Input value={data.percent_of_work + " %"} readOnly />
            </Form.Item>

            <Form.Item label="Work planned in this month">
              <Input
                value={data?.this_month_planned_in_birr + " ETB"}
                readOnly
              />
            </Form.Item>
            <Form.Item label="Work accomplished in this month">
              <Input
                value={
                  formatNumber(data?.this_month_work_accomplished) + " ETB"
                }
                readOnly
              />
            </Form.Item>
            <Form.Item label="Percent of work planned in this month">
              <Input
                value={
                  formatNumber(data?.percent_of_work_planned_this_month) + " %"
                }
                readOnly
              />
            </Form.Item>
            <Form.Item label="Percent of work accomplished in this month">
              <Input
                value={
                  formatNumber(data?.percent_of_work_accomplished_this_month) +
                  " %"
                }
                readOnly
              />
            </Form.Item>

            <Form.Item label="Work planned to date">
              <Input
                value={formatNumber(data?.total_month_planned_in_birr) + " ETB"}
                readOnly
              />
            </Form.Item>
            <Form.Item label="Work accomplished to date">
              <Input
                value={
                  formatNumber(data?.total_month_work_accomplished) + " ETB"
                }
                readOnly
              />
            </Form.Item>
            <Form.Item label="Percent of work planned to date">
              <Input
                value={formatNumber(data?.total_percent_of_work_planned) + " %"}
                readOnly
              />
            </Form.Item>
            <Form.Item label="Percent of work accomplished to date">
              <Input
                value={
                  formatNumber(data?.total_percent_of_work_accomplished) + " %"
                }
                readOnly
              />
            </Form.Item>
            <Form.Item label="Percent of physical progress to date">
              <Input value={"-"} readOnly />
            </Form.Item>
          </div>
        </Form>

        {/* <Table
            dataSource={data}
            loading={
              project_duration.isPending ||
              project_variation.isPending ||
              time_extension.isPending
            }
            columns={columns}
          /> */}
      </div>
    );
  };

  return (
    <div>
      <div style={{ width: 150 }}>
        <DatePicker
          allowClear={false}
          picker="month"
          value={month}
          onChange={(e) => setMonth(e)}
        />
      </div>
      {!isNil(data) && renderContent()}
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  // project: state.project.fetchOne,
  project_variation: state.project_variation.fetchAll,
  time_extension: state.time_extension.fetchAll,
  project_duration: state.project_duration.fetchAll,
  financial: state.financial.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOne: (action: any) => dispatch(fetchOneProjects(action)),
  fetchAllFinancial: (action: any) => dispatch(fetchAllFinancial(action)),
  fetchAllProjectVariation: (action: any) =>
    dispatch(fetchAllProjectVariations(action)),
  fetchAllTimeExtension: (action: any) =>
    dispatch(fetchAllTimeExtension(action)),
  fetchAllProjectDuration: (action: any) =>
    dispatch(fetchAllProjectDuration(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProjectReportComponent);
