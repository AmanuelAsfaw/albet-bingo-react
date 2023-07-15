import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PrintPropType } from "../util/PhysicalProgress.util";
import Table, { ColumnsType } from "antd/lib/table";
import { Input, Statistic } from "antd";
import { format } from "../../../../../../../utilities/utilities";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";
import moment from "moment";

const PrintPhysicalProgressComponent: FC<PrintPropType> = ({
  loading,
  printData,
  project,
  is_visible,
  setVisibility,
  reporting_week,
}) => {
  useEffect(() => {
    if (!loading && is_visible && printData && project) {
      window.print();
    }
  }, [printData, is_visible, loading, project]);

  window.onafterprint = () => {
    setVisibility(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: "No",
      width: "1%",
      render: (data, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Work Description",
      key: "description",
      dataIndex: "description",
      width: "3%",
      render: (data, record) => (
        <Input.TextArea
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
          width: "2%",
          render: (value) => format(value),
        },
        {
          title: "Physical Executed %",
          dataIndex: "physical_executed_percentage",
          width: "2%",
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
              width: "2%",
              render: (value) => format(value),
            },
            {
              title: "Executed %",
              dataIndex: "week1_executed",
              width: "2%",
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
              width: "2%",
              render: (value) => format(value),
            },
            {
              title: "Executed %",
              dataIndex: "week2_executed",
              width: "2%",
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
              width: "2%",
              render: (value) => format(value),
            },
            {
              title: "Executed %",
              dataIndex: "week3_executed",
              width: "2%",
              render: (value) => format(value),
            },
          ],
        },
      ],
    },
  ];

  const columns2: ColumnsType<any> = [
    {
      title: "Current Month: Weekly Plan Vs Weekly Executed",
      children: [
        {
          title: "Week 4",
          children: [
            {
              title: "Planned %",
              dataIndex: "week4_planned",
              width: "2%",
              render: (value) => format(value),
            },
            {
              title: "Executed %",
              dataIndex: "week4_executed",
              width: "2%",
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
          width: "2%",
          render: (value) => format(value),
        },
        {
          title: "Executed %",
          dataIndex: "todate_executed",
          width: "2%",
          render: (value) => format(value),
        },
      ],
    },
  ];

  return (
    <div className=" visible-print">
      {!loading ? (
        <>
          <PdfHeaderComponent type="consultant" />

          <div className="row mt-4 px-3">
            <div className="col-sm-6">
              <div>
                <b>Project - </b>
                {project?.name ?? "-"}
              </div>
              <div>
                <b>Location- </b>
                {project?.location ?? "-"}
              </div>
              <div>
                <b>Employer - </b>
                {project?.client?.name ?? "-"}
              </div>
              <div>
                <b>Contractor - </b>
                {project?.contractor?.name ?? "-"}
              </div>
            </div>
            <div className="col-sm-6 text-right">
              <div>
                <b>Consultant - </b>
                {project?.consultant?.name ?? "-"}
              </div>
              <div>
                <b>Time Elapsed (Days) - </b>
                {moment().diff(moment(project.commencement_date), "days") ??
                  "-"}
              </div>
              <div>
                <b>Reporting Period - </b>
                {`${reporting_week
                  .startOf("week")
                  .format("DD/MM/YYYY")}-${reporting_week
                  .endOf("week")
                  .format("DD/MM/YYYY")}` ?? "-"}
              </div>
              <div>
                <b>Commencement Date - </b>
                {project?.commencement_date ?? "-"}
              </div>
              <div>
                <b>Contract Amount - </b>
                {project?.overall?.contract_amount.toLocaleString("en-US") ??
                  "-"}
              </div>
            </div>
          </div>
          <div className="mt-4 col-md-12 d-flex justify-content-center">
            <h5 className="font-weight-bold">{"Physical Progress"}</h5>
          </div>
          <div className="col-md-12 d-flex justify-content-center">
            <h6 className="font-weight-bold">{"Weekly Report"}</h6>
          </div>
          <div className="col-md-12 my-2">
            <Table
              bordered
              columns={columns}
              dataSource={printData}
              loading={loading}
              pagination={false}
            ></Table>
          </div>
          <div className="col-md-12 mb-2">
            <Table
              bordered
              columns={columns2}
              dataSource={printData}
              loading={loading}
              pagination={false}
            ></Table>
          </div>
        </>
      ) : null}
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintPhysicalProgressComponent);
