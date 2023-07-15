import { Form, Input } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { AddMonthlyReportComponentPropType } from "../../../../util/MonthlyReport.util";

const IntroductionComponent: FC<AddMonthlyReportComponentPropType> = ({
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
    setData({ ...data, ...value });
    next();
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ introduction: data.introduction }}
      form={form}
      onFinish={Submit}
    >
      <div className="row">
        <div className="col-md-12">
          <Form.Item label="Introduction" name="introduction">
            <Input.TextArea placeholder="Introduction" rows={5} />
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
)(IntroductionComponent);
