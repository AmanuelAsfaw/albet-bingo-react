import { DatePicker, Form, Input } from "antd";
import moment from "moment";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { getUserData } from "../../../../../../../../../utilities/utilities";
import { AddReportComponentPropType } from "../../../../util/MonthlyReport.util";

const ReportComponent: FC<AddReportComponentPropType> = ({
  dataAction,
  next,
  submitAction,
  resetFormAction,
  dateAction,
}) => {
  const [submit, setSubmit] = submitAction;
  const [reset, setReset] = resetFormAction;
  const [form] = Form.useForm();
  const [date, setDate] = dateAction;
  const [data, setData] = dataAction;
  useEffect(() => {
    if (submit) {
      form.submit();
      setSubmit(false);
    }

    if (reset) {
      form.resetFields();
      setReset(false);
    }
  }, [submit, reset, form, setSubmit, setReset]);

  const Submit = (value: any) => {
    setDate(value.date);
    setData({
      ...data,
      checked_by: value.checked_by,
      prepared_by: getUserData().id,
    });
    next();
  };

  return (
    <Form layout="vertical" onFinish={Submit} form={form} initialValues={data}>
      <div className="row">
        <div className="col-md-12">
          <Form.Item label="Report No">
            <Input value={data.name} />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item
            label="Month"
            name="date"
            rules={[
              {
                message: "Month is Required",
                required: true,
              },
            ]}
          >
            <DatePicker
              format={"MMMM-YYYY"}
              onChange={(e) => setDate(e?.endOf("month"))}
              picker="month"
              allowClear={false}
            />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Date of Report">
            <Input value={moment().format("DD/MM/YYYY")} />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Form.Item label="Project">
            <Input value={data.project?.name} />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Employer">
            <Input value={data.project?.client?.name} />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item label="Consultant">
            <Input value={data.project?.consultant?.name} />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Form.Item label="Contractor">
            <Input value={data.project?.contractor?.name} />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Form.Item label="Location">
            <Input value={data.project?.location} />
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
const mapStateToProps = (state: any) => ({
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReportComponent);
