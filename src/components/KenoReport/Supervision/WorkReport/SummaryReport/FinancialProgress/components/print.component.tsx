import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PrintPropType } from "../util/FinancialProgress.util";
import Table, { ColumnsType } from "antd/lib/table";
import { Input, Statistic } from "antd";
import { format } from "../../../../../../../utilities/utilities";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";

const PrintFinancialProgressComponent: FC<PrintPropType> = ({
  loading,
  printData,
  project,
  is_visible,
  setVisibility,
  reporting_week,
  week_no,
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
        <Input.TextArea
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
          title: `Week ${week_no}`,
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
  ];

  const columns2: ColumnsType<any> = [
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
            <h5 className="font-weight-bold"> {"Financial Progress"}</h5>
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
              summary={(pageData) => {
                let prev_planned = 0;
                let prev_executed = 0;
                let curr_planned = 0;
                let curr_executed = 0;
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
                    </Table.Summary.Row>
                  </>
                );
              }}
            ></Table>
          </div>

          <div className="col-md-12 mb-2">
            <Table
              bordered
              columns={columns2}
              dataSource={printData}
              loading={loading}
              pagination={false}
              summary={(pageData) => {
                let total_todate_planned = 0;
                let total_todate_excuted = 0;
                let todate_com_planned_amount = 0;
                let todate_com_executed_amount = 0;
                let contract_amount = pageData[0]?.financial_amount;
                pageData.forEach((e) => {
                  total_todate_planned += e.total_financial_planned_amount
                    ? e.total_financial_planned_amount
                    : 0;
                  total_todate_excuted += e.total_financial_executed_amount
                    ? e.total_financial_executed_amount
                    : 0;
                  todate_com_planned_amount += e.total_financial_planned_amount
                    ? e.total_financial_planned_amount
                    : 0;
                  todate_com_executed_amount +=
                    e.total_financial_executed_amount
                      ? e.total_financial_executed_amount
                      : 0;
                });

                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={10} colSpan={4}>
                        Total Pland vs Excuted this week
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7} colSpan={2}>
                        {format((total_todate_planned / contract_amount) * 100)}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        {format((total_todate_excuted / contract_amount) * 100)}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={10} colSpan={3}>
                        Comulative
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        {format(
                          (todate_com_planned_amount /
                            project.overall?.contract_amount) *
                            100
                        )}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        {format(todate_com_planned_amount)}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        {format(
                          (todate_com_executed_amount /
                            project.overall?.contract_amount) *
                            100
                        )}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        {format(todate_com_executed_amount)}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={10} colSpan={3}>
                        Pland Vs Excuted
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}></Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        {format(
                          (todate_com_executed_amount /
                            todate_com_planned_amount) *
                            100
                        )}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
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
)(PrintFinancialProgressComponent);
