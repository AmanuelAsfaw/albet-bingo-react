import { Form, Table } from "antd";
import { isString } from "lodash";

import { FC, useEffect } from "react";
import { connect } from "react-redux";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "../../../../../../../../../utilities/utilities";
import { AddMonthlyReportComponentPropType } from "../../../../util/MonthlyReport.util";

const ProgressComponent: FC<AddMonthlyReportComponentPropType> = ({
  dataAction,
  next,
  resetFormAction,
  submitAction,
}) => {
  const [submit, setSubmit] = submitAction;
  const [data] = dataAction;
  const [reset, setReset] = resetFormAction;
  const [form] = Form.useForm();

  const progressStatusRender = (data: string, index: number) => {
    if (index === 0 || index === 1)
      return <span style={{ color: "#4472c4" }}>{data}</span>;
    else if (index === 2 || index === 3)
      return <span style={{ color: "#ed7d31" }}>{data}</span>;
    else if (index === 4 || index === 5)
      return <span style={{ color: "#4472c4" }}>{data}</span>;
    else if (index === 6 || index === 7)
      return <span style={{ color: "#ed7d31" }}>{data}</span>;
  };

  const progressLegendRender = (data: string, index: number) => {
    if (index === 0) return <span>{data}</span>;
    else if (index === 1) return <span>{data}</span>;
  };

  const progressTimeRender = (
    data: string,
    index: number,
    class_name: string
  ) => {
    if (index === 0)
      return (
        <span style={{ color: "#70ad47" }} className={class_name}>
          {data}
        </span>
      );
    else if (index === 1)
      return (
        <span style={{ color: "#7030a0" }} className={class_name}>
          {data}
        </span>
      );
    else if (index === 2)
      return (
        <span style={{ color: "#0070c0" }} className={class_name}>
          {data}
        </span>
      );
  };

  const parseColumn = (column: any, title: boolean) => {
    if (title)
      return [
        {
          title: "Cumulative Planned Vs Cumulative Executed Vs Time Elapsed",
          children: column?.map((e: any, index: number) => {
            if (index === 0)
              return {
                ...e,
                render: (value: any, render: any, index: any) =>
                  progressTimeRender(value, index, ""),
              };
            else
              return {
                ...e,
                render: (value: any, render: any, index: any) =>
                  progressTimeRender(value, index, ""),
              };
          }),
        },
      ];
    else {
      return column.map((e: any, index: number) => {
        if (index === 0) {
          return {
            ...e,
            render: (value: any, record: any, i: number) =>
              progressTimeRender(value, i, "monthly-description"),
          };
        } else return { ...e };
      });
    }
  };

  useEffect(() => {
    if (submit) {
      form.submit();
      setSubmit(false);
    }

    if (reset) {
      form.resetFields();
      setReset(false);
    }
  }, [data, submit, reset, form, setSubmit, setReset]);

  const Submit = (value: any) => {
    next();
  };

  return (
    <Form layout="vertical" onFinish={Submit} form={form}>
      <>
        <div className="row mb-3 mt-4 ">
          <div className="col-md-12">
            <h6>
              <u>
                <b>9.1 PROGRESS STATUS</b>
              </u>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Table
              columns={[
                {
                  title: "Progress S-Curve",
                  children: [
                    {
                      title: "Description",
                      dataIndex: "description",
                      key: "description",
                      width: "40%",
                      render: (value, record, index) =>
                        progressStatusRender(value, index),
                    },
                    {
                      title: "Week 1",
                      dataIndex: "week1",
                      key: "week1",

                      render: (value, record, index) =>
                        progressStatusRender(
                          isString(value)
                            ? value
                            : format(value, true) + " ETB",
                          index
                        ),
                    },
                    {
                      title: "Week 2",
                      dataIndex: "week2",
                      key: "week2",

                      render: (value, record, index) =>
                        progressStatusRender(
                          isString(value)
                            ? value
                            : format(value, true) + " ETB",
                          index
                        ),
                    },
                    {
                      title: "Week 3",
                      dataIndex: "week3",
                      key: "week3",

                      render: (value, record, index) =>
                        progressStatusRender(
                          isString(value)
                            ? value
                            : format(value, true) + " ETB",
                          index
                        ),
                    },
                    {
                      title: "Week 4",
                      dataIndex: "week4",
                      key: "week4",

                      render: (value, record, index) =>
                        progressStatusRender(
                          isString(value)
                            ? value
                            : format(value, true) + " ETB",
                          index
                        ),
                    },
                  ],
                },
              ]}
              size="small"
              pagination={false}
              dataSource={data.progress?.weekly_table}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 mb-2">
            <h5> Planned Vs Actual Schedule Progress S-Curve</h5>
          </div>
        </div>
        <div className="row" style={{ marginLeft: "170px" }}>
          <div className="col-md-12">
            <LineChart
              data={data.progress?.weekly_graph}
              width={900}
              height={300}
            >
              <CartesianGrid />
              <XAxis dataKey="name" interval={"preserveStartEnd"} />
              <YAxis type="number" domain={[0, 200]} />

              <Tooltip />
              <Line dataKey="planned" name="Planned" stroke="#4472c4" />
              <Line dataKey="executed" name="Executed" stroke="#ed7d31" />
            </LineChart>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Table
              columns={[
                {
                  className: "color-col d-flex",
                  title: "Description",
                  dataIndex: "description",
                  key: "description",
                  width: 230,
                  render: (value, record, index) =>
                    progressLegendRender(value, index),
                },
                {
                  title: "Week 1",
                  dataIndex: "week1",
                  key: "week1",
                  width: 265,
                  render: (value, record, index) =>
                    progressLegendRender(value, index),
                },
                {
                  title: "Week 2",
                  dataIndex: "week2",
                  key: "week2",
                  width: 275,

                  render: (value, record, index) =>
                    progressLegendRender(value, index),
                },
                {
                  title: "Week 3",
                  dataIndex: "week3",
                  key: "week3",
                  width: 250,
                  render: (value, record, index) =>
                    progressLegendRender(value, index),
                },
                {
                  title: "Week 4",
                  dataIndex: "week4",
                  key: "week4",

                  render: (value, record, index) =>
                    progressLegendRender(value, index),
                },
              ]}
              size="small"
              pagination={false}
              dataSource={data.progress?.weekly_graph_legend}
            />
          </div>
          <div className="row mx-auto">
            <h6 className="mr-2">
              <span id="blue-line"></span>Cumulative Planned in %
            </h6>
            <h6>
              <span id="orange-line"></span>Cumulative Executed in %
            </h6>
          </div>
        </div>
        <div className="row mt-4 mb-3">
          <div className="col-md-12">
            <Table
              columns={parseColumn(data.progress?.monthly_table_column, true)}
              size="small"
              pagination={false}
              dataSource={data.progress?.monthly_table}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <LineChart
              data={data.progress?.monthly_graph}
              width={1000}
              height={300}
            >
              <CartesianGrid />
              <XAxis dataKey="name" interval={"preserveStartEnd"} />
              <YAxis type="number" />

              <Tooltip />
              <Line dataKey="planned" name="Planned" stroke="#70ad47" />
              <Line dataKey="executed" name="Executed" stroke="#7030a0" />
              <Line dataKey="time" name="Time Elapsed" stroke="#0070c0" />
            </LineChart>
            <Table
              columns={parseColumn(data.progress?.monthly_table_column, false)}
              size="small"
              className="monthly-table"
              pagination={false}
              dataSource={data.progress?.monthly_table}
            />
          </div>
        </div>
      </>
    </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProgressComponent);
