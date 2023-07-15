import { Form, Table } from "antd";

import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { AddMonthlyReportComponentPropType } from "../../../../util/MonthlyReport.util";
import RemarkComponent from "../Remark/Remark.component";

const InstructionComponent: FC<AddMonthlyReportComponentPropType> = ({
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
    data.monthly_instruction = { ...data.monthly_instruction, ...value };

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
      initialValues={{ remark: data.monthly_instruction?.remark }}
    >
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>5. INSTRUCTION GIVEN DURING THE MONTH UNDER REVIEW</b>
            </u>
          </h6>
        </div>{" "}
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table
            bordered={true}
            pagination={false}
            size="small"
            columns={[
              {
                title: "Instruction",
                key: "instruction",
                dataIndex: "type",
                render: (value: any, record: any) => value?.toUpperCase(),
              },
              {
                title: "Date",
                key: "date",
                dataIndex: "date",
              },
              {
                title: "Reference",
                key: "index",
                dataIndex: "index",
              },
            ]}
            dataSource={data.monthly_instruction?.site_orders}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12">
          {" "}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructionComponent);
