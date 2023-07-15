import { Form, Table, Select } from "antd";

import { FC, useEffect } from "react";
import { connect } from "react-redux";
import {
  AddMonthlyReportComponentPropType,
  parseMonthlyDifficultiesData,
} from "../../../../util/MonthlyReport.util";
import RemarkComponent from "../Remark/Remark.component";

const DifficultyComponent: FC<AddMonthlyReportComponentPropType> = ({
  dataAction,
  next,
  resetFormAction,
  submitAction,
}) => {
  const [submit, setSubmit] = submitAction;
  const [data, setData] = dataAction;
  const [reset, setReset] = resetFormAction;
  const [form] = Form.useForm();

  const onChangeHandler = (name: string, value: string) => {
    let monthly_difficulty = data.monthly_difficulty;
    monthly_difficulty = { ...monthly_difficulty, [name]: value === "yes" };
    setData({ ...data, monthly_difficulty });
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
    data.monthly_difficulty.remark = value.remark;
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
      initialValues={data.monthly_difficulty}
    >
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>4. DIFFICULTY ENCOUNTERED DURING THE MONTH UNDER REVIEW</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Table
            bordered={true}
            columns={[
              {
                title: "Major Difficulties by Type",
                dataIndex: "description",
                key: "description",
                render: (value: any, record: any) => value.toUpperCase(),
              },
              {
                title: "Yes/No",
                render: (value, record) => (
                  <Select
                    style={{ width: 100 }}
                    value={record.value}
                    onChange={(e) => onChangeHandler(record.name, e)}
                  >
                    <Select.Option value="yes">Yes</Select.Option>
                    <Select.Option value="no">No</Select.Option>
                  </Select>
                ),
              },
            ]}
            size="small"
            pagination={false}
            dataSource={parseMonthlyDifficultiesData(data.monthly_difficulty)}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DifficultyComponent);
