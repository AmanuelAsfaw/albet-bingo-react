import { Form } from "antd";

import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { AddMonthlyReportComponentPropType } from "../../../../util/MonthlyReport.util";
import RemarkComponent from "../Remark/Remark.component";

const ConstructionStatusComponent: FC<AddMonthlyReportComponentPropType> = ({
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
    data.monthly_construction_status = {
      ...data.monthly_construction_status,
      ...value,
    };
    let temp = { ...data };

    setData(temp);
    next();
  };

  return (
    <Form
      layout="vertical"
      onFinish={Submit}
      form={form}
      initialValues={data.monthly_construction_status}
    >
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>2. CURRENT STATE OF CONSTRUCTION</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <RemarkComponent
            name="completed"
            label="A. Works Planned & Completed"
            placeholder="Completed"
          />
          {/* <List header="A. Works Planned & Completed">
            {data.monthly_construction_statuses.completed.map(
              (e: any, index: number) => (
                <List.Item key={index}>{e}</List.Item>
              )
            )}
          </List> */}
        </div>
      </div>
      <div className="row  mt-2">
        <div className="col-md-12 ">
          <RemarkComponent
            name="under_progress"
            label="B. Works Under Progress"
            placeholder="Under Progress"
          />
          {/* <List header="B. Works Under Progress">
            {data.monthly_construction_statuses.under_progress.map(
              (e: any, index: number) => (
                <List.Item key={index}>{e}</List.Item>
              )
            )}
          </List> */}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <RemarkComponent
            name="not_started"
            label="C. Works Planned But Not Started"
            placeholder="Not Started"
          />
          {/* <List header="C. Works Planned But Not Started">
            {data.monthly_construction_statuses.not_started.map(
              (e: any, index: number) => (
                <List.Item key={index}>{e}</List.Item>
              )
            )}
          </List> */}
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
)(ConstructionStatusComponent);
