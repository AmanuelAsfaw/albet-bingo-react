import { Form, Table } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { format } from "../../../../../../../../../utilities/utilities";
import { AddMonthlyReportComponentPropType } from "../../../../util/MonthlyReport.util";

const BoqExecutedComponent: FC<AddMonthlyReportComponentPropType> = ({
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
    data.monthly_contract = { ...data.monthly_contract, ...value };
    let temp = { ...data };
    console.log({ temp });
    setData(temp);
    next();
  };

  return (
    <Form layout="vertical" onFinish={Submit} form={form}>
      <div className="row">
        <div className="col-md-12">
          <Table
            columns={[
              {
                title: "Item No",
                key: "0",
                dataIndex: "item_no",
              },
              {
                title: "Description",
                key: "1",
                dataIndex: "description",
              },
              {
                title: "Unit",
                key: "2",
                dataIndex: "unit",
              },
              {
                title: "Rate",
                key: "3",
                dataIndex: "unit_price",
                render: (value) => (value ? format(value) : ""),
              },
              {
                title: "Contract",
                key: "4",
                children: [
                  {
                    title: "Total Quantity",
                    key: "5",
                    dataIndex: "unit",
                    render: (value, record) =>
                      value ? format(record.quantity) : "",
                  },
                  {
                    title: "Amount",
                    key: "6",
                    dataIndex: "unit",
                    render: (value, record: any) =>
                      value ? format(record.quantity * record.unit_price) : "",
                  },
                ],
              },
              {
                title: "Executed (Previous Month)",
                key: "7",
                children: [
                  {
                    title: "Qty",
                    key: "8",
                    dataIndex: "unit",
                    render: (value, record) =>
                      value ? format(record.previous_quantity) : "",
                  },
                  {
                    title: "Amount",
                    key: "9",
                    dataIndex: "unit",
                    render: (value, record: any) =>
                      value
                        ? format(record.unit_price * record.previous_quantity)
                        : "",
                  },
                ],
              },
              {
                title: "Executed (This Month)",
                key: "10",
                children: [
                  {
                    title: "Qty",
                    key: "11",
                    dataIndex: "unit",
                    render: (value, record) =>
                      value ? format(record.this_month_quantity) : "",
                  },
                  {
                    title: "Amount",
                    key: "12",
                    dataIndex: "unit",
                    render: (value, record: any) =>
                      value
                        ? format(record.unit_price * record.this_month_quantity)
                        : "",
                  },
                ],
              },
              {
                title: "Executed (To-Date)",
                key: "13",
                children: [
                  {
                    title: "Qty",
                    key: "14",
                    dataIndex: "unit",
                    render: (value, record) =>
                      value
                        ? format(
                            record.this_month_quantity +
                              record.previous_quantity
                          )
                        : "",
                  },
                  {
                    title: "Amount",
                    key: "15",
                    dataIndex: "unit",
                    render: (value, record: any) =>
                      value
                        ? format(
                            record.unit_price *
                              (record.this_month_quantity +
                                record.previous_quantity)
                          )
                        : "",
                  },
                ],
              },
            ]}
            dataSource={data.boq_executed}
            pagination={false}
          />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoqExecutedComponent);
