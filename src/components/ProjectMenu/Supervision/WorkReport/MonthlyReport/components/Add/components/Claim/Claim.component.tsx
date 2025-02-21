import { Button, Form, Input, InputNumber, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { toNumber } from "lodash";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { removeHandler } from "../../../../../../../../../utilities/utilities";
import { AddMonthlyReportComponentPropType } from "../../../../util/MonthlyReport.util";

const ClaimComponent: FC<AddMonthlyReportComponentPropType> = ({
  dataAction,
  next,
  resetFormAction,
  submitAction,
}) => {
  const [submit, setSubmit] = submitAction;
  const [data, setData] = dataAction;
  const [reset, setReset] = resetFormAction;
  const [form] = Form.useForm();

  const [table_data, setTableData] = useState(data.monthly_claims);

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
    data.monthly_claims = table_data;
    let temp = { ...data };
    console.log({ temp });
    setData(temp);
    next();
  };

  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...table_data];

    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = {
        ...item,
        [name]: value,
      };
      newData.splice(index, 1, item);
      setTableData(newData);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "No",
      width: "2%",
      render: (value: number, record: any, index: number) => `${index + 1}`,
    },
    {
      title: "Description",
      width: "30%",
      key: "description",
      render: (data, record) => (
        <Input
          value={record.description}
          onChange={(e) =>
            onChangeHandler(record.key, "description", e.target.value)
          }
        />
      ),
    },
    {
      title: "Reason",
      width: "30%",
      key: "reason",
      render: (data, record) => (
        <Input
          value={record.reason}
          onChange={(e) =>
            onChangeHandler(record.key, "reason", e.target.value)
          }
        />
      ),
    },
    {
      title: "Duration",
      width: "20%",
      key: "duration",
      render: (data, record) => (
        <InputNumber
          value={record.duration}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) =>
            toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "")
          }
          onChange={(e) => onChangeHandler(record.key, "duration", e)}
        />
      ),
    },

    {
      title: "Action",
      render: (x, record) => (
        <>
          <Button
            className="mr-1"
            onClick={() => removeHandler(record.key, table_data, setTableData)}
          >
            -
          </Button>
        </>
      ),
    },
  ];
  return (
    <Form layout="vertical" onFinish={Submit} form={form}>
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>8. CLAIM SUBMITTED</h6>
        </div>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={table_data}
        pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={5} index={1} align="center">
              {" "}
              <Button
                style={{ width: "60%" }}
                onClick={() =>
                  setTableData([...table_data, { key: Date.now() }])
                }
              >
                +
              </Button>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(ClaimComponent);
