import { Form, Table } from "antd";
import moment from "moment";

import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { AddMonthlyReportComponentPropType } from "../../../../util/MonthlyReport.util";
import RemarkComponent from "../Remark/Remark.component";

const QcComponent: FC<AddMonthlyReportComponentPropType> = ({
  dataAction,
  next,
  resetFormAction,
  submitAction,
}) => {
  const [submit, setSubmit] = submitAction;
  const [data, setData] = dataAction;
  const [reset, setReset] = resetFormAction;
  const [form] = Form.useForm();

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
    console.log(
      "🚀 ~ file: Qc.component.tsx ~ line 39 ~ Submit ~ value",
      value
    );

    data.monthly_qc = { ...data.monthly_qc, ...value };
    let temp = { ...data };
    console.log({ temp });
    setData(temp);
    next();
  };

  return (
    <Form
      layout="vertical"
      onFinish={Submit}
      form={form}
      initialValues={{ remark: data.monthly_qc?.remark }}
    >
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>3. QUALITY CONTROL TEST CONDUCTED DURING THE MONTH</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table
            bordered={true}
            size="small"
            pagination={false}
            columns={[
              {
                title: "Type of Material",
                key: "type",
                render: (value: any, record: any) =>
                  record.material.toUpperCase(),
              },
              {
                title: "Test Expected",
                key: "type",
                dataIndex: "test_expected",
              },
              {
                title: "Date of Tested",
                key: "type",
                children: [
                  {
                    title: "Ordered",
                    key: "ordered",
                    render: (value, record) => record.order,
                  },
                  {
                    title: "Submitted",
                    key: "submitted",
                    render: (value, record) => record.submitted,
                  },
                ],
              },
              {
                title: "Result",
                key: "result",
                children: [
                  {
                    title: "Accepted",
                    key: "accepted",
                    render: (value, record) =>
                      !record.material || record.is_rebar
                        ? record.accepted
                          ? "🗸"
                          : ""
                        : "",
                  },
                  {
                    title: "Rejected",
                    key: "rejected",
                    render: (value, record) =>
                      !record.material || record.is_rebar
                        ? record.accepted
                          ? ""
                          : "🗸"
                        : "",
                  },
                ],
              },
            ]}
            dataSource={data.monthly_qc?.material}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-4 mb-2">
          <h5>{`Concrete Test Results for ${moment(data.date).format(
            "MMMM"
          )}`}</h5>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <Table
            pagination={false}
            bordered={true}
            size="small"
            columns={[
              {
                title: "Cast Date",
                key: "date",
                render: (value, record) => record.cast_date,
              },
              {
                title: "Submitted Date",
                key: "date",
                render: (value, record) => record.submitted_date,
              },
              {
                title: "Test Type",
                key: "type",
                render: (value, record) => "Cube",
              },
              {
                title: "Source of Concrete",
                key: "source",
                render: (value, record) => record.source_of_concrete,
              },

              {
                title: "Location",
                key: "location",
                render: (value, record) => record.location,
              },
              {
                title: "Result Day",
                key: "type",
                render: (value, record) => record.result_date,
              },

              {
                title: "Test Result",
                key: "type",
                render: (value, record) => record.test_result,
              },
              {
                title: "Remark",
                key: "remark",
                render: (value, record) => record.remark,
              },
            ]}
            dataSource={data.monthly_qc?.concrete}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <RemarkComponent name="remark" placeholder="remark" label="Remark" />
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(QcComponent);
