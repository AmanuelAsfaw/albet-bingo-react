import { DatePicker, Form, Input } from "antd";
import moment from "moment";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { format } from "../../../../../../../../../utilities/utilities";
import { AddMonthlyReportComponentPropType } from "../../../../util/MonthlyReport.util";

const ContractSummaryComponent: FC<AddMonthlyReportComponentPropType> = ({
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
    <Form
      layout="vertical"
      onFinish={Submit}
      form={form}
      initialValues={data.monthly_contract}
    >
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>1. CONTRACT SUMMARY</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Form.Item
            label="Date Of Signing Of Contract"
            name="date_of_signing"
            rules={[
              {
                required: true,
                message: "Date Of Signing Of Contract Required",
              },
            ]}
          >
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Contract Value With Out Vat">
            <Input
              bordered={false}
              value={format(data.monthly_contract?.contract) + " ETB"}
            />
          </Form.Item>
        </div>

        <div className="col-md-12">
          <Form.Item label="Total Amount">
            <Input
              bordered={false}
              value={format(data.monthly_contract?.contract) + " ETB"}
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Contract Time">
            <Input
              bordered={false}
              value={data.monthly_contract?.contract_time + " Calender Days"}
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item
            label="Mobilization Time"
            name="mobilization_time"
            rules={[
              {
                required: true,
                message: "Mobilization Time Required",
              },
            ]}
          >
            <Input placeholder="mobilization" />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Contract Date">
            <Input
              bordered={false}
              value={moment(data.monthly_contract?.commencement_date).format(
                "MMMM DD, YYYY"
              )}
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Completion Date">
            <Input
              bordered={false}
              value={moment(data.monthly_contract?.completion_date).format(
                "MMMM DD, YYYY"
              )}
            />
          </Form.Item>
        </div>

        <div className="col-md-12">
          <Form.Item label="Plan of the Month">
            <Input
              bordered={false}
              value={format(data.monthly_contract?.planned_amount)}
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Percentage of Work Planned this Month">
            <Input
              bordered={false}
              value={format(data.monthly_contract?.planned, true) + "%"}
            />
          </Form.Item>
        </div>

        <div className="col-md-12">
          <Form.Item label="Executed in the Month">
            <Input
              bordered={false}
              value={format(data.monthly_contract?.executed_amount)}
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Percentage of Work Executed this Month">
            <Input
              bordered={false}
              value={format(data.monthly_contract?.executed, true) + "%"}
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Plan Vs Executed">
            <Input
              bordered={false}
              value={
                format(
                  (data.monthly_contract?.executed /
                    data.monthly_contract?.planned) *
                    100,
                  true
                ) + "%"
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Overall Planned to date">
            <Input
              bordered={false}
              value={format(data.monthly_contract?.cumulative_planned)}
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Percentage of Work Planned Cumulative">
            <Input
              bordered={false}
              value={
                format(data.monthly_contract?.planned_cumulative, true) + "%"
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Overall Executed to date">
            <Input
              bordered={false}
              value={format(data.monthly_contract?.cumulative_amount)}
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Percentage of Work Executed Cumulative">
            <Input
              bordered={false}
              value={
                format(data.monthly_contract?.executed_cumulative, true) + "%"
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Planned Vs Executed in %">
            <Input
              bordered={false}
              value={
                format(
                  (data.monthly_contract?.executed_cumulative /
                    data.monthly_contract?.planned_cumulative) *
                    100,
                  true
                ) + "%"
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Slippage in %">
            <Input
              bordered={false}
              value={
                format(
                  data.monthly_contract?.planned_cumulative -
                    data.monthly_contract?.executed_cumulative,
                  true
                ) + "%"
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Time Elapsed in Days">
            <Input
              bordered={false}
              value={data.monthly_contract?.time_elapsed}
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Time Elapsed in Percent">
            <Input
              bordered={false}
              value={data.monthly_contract?.time_percentage}
            />
          </Form.Item>
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
)(ContractSummaryComponent);
