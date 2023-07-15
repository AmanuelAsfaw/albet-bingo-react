import { Form, List } from "antd";

import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { AddMonthlyReportComponentPropType } from "../../../../util/MonthlyReport.util";

const MeetingComponent: FC<AddMonthlyReportComponentPropType> = ({
  dataAction,
  next,
  resetFormAction,
  submitAction,
}) => {
  const [submit, setSubmit] = submitAction;
  const [data] = dataAction;
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
    next();
  };

  return (
    <Form layout="vertical" onFinish={Submit} form={form}>
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>9. MEETING CONDUCTED</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <List size="small" header="">
            {data.meetings?.map((e: any, index: number) => (
              <List.Item key={index}>{e}</List.Item>
            ))}
          </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(MeetingComponent);
