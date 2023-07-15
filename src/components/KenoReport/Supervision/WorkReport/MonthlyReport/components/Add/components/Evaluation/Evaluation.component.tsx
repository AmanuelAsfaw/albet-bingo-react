import { Form, Table, Select, Button, Input } from "antd";
import { ColumnsType } from "antd/lib/table";

import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { removeHandler } from "../../../../../../../../../utilities/utilities";
import { AddMonthlyReportComponentPropType } from "../../../../util/MonthlyReport.util";
import RemarkComponent from "../Remark/Remark.component";

const EvaluationComponent: FC<AddMonthlyReportComponentPropType> = ({
  dataAction,
  next,
  resetFormAction,
  submitAction,
}) => {
  const [submit, setSubmit] = submitAction;
  const [data, setData] = dataAction;
  const [reset, setReset] = resetFormAction;
  const [form] = Form.useForm();
  const [table_data, setTableData] = useState(data.monthly_evaluations);

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
    let temp = { ...data };
    if (!(table_data.length === 1 && table_data[0]?.description === "")) {
      temp.monthly_evaluations = table_data;
    }
    temp.evaluation_remark = value.evaluation_remark;

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
      width: "60%",
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
      title: "Status",
      width: "20%",
      key: "status",
      render: (data, record) => (
        <Select
          style={{ width: 100 }}
          value={record.status}
          onChange={(e) => onChangeHandler(record.key, "status", e)}
        >
          <Select.Option value="Poor">Poor</Select.Option>
          <Select.Option value="Fair">Fair</Select.Option>
          <Select.Option value="Good">Good</Select.Option>
          <Select.Option value="Excellent">Excellent</Select.Option>
        </Select>
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
          <Button
            className="mr-1"
            onClick={() => setTableData([...table_data, { key: Date.now() }])}
          >
            +
          </Button>
        </>
      ),
    },
  ];
  return (
    <Form layout="vertical" onFinish={Submit} form={form} initialValues={data}>
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>6. EVALUATION</b>
            </u>
          </h6>
        </div>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={table_data}
        pagination={false}
      />
      <RemarkComponent
        name="evaluation_remark"
        placeholder="remark"
        label="Remark"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationComponent);
