import { Form, Input, Select } from "antd";
import moment from "moment";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { AddReportComponentPropType } from "../../../../util/MonthlyReport.util";

const ReportComponent: FC<AddReportComponentPropType> = ({
  dataAction,
  next,
  submitAction,
  resetFormAction,
  users,
}) => {
  const [submit, setSubmit] = submitAction;
  const [reset, setReset] = resetFormAction;
  const [form] = Form.useForm();
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
    setData({
      ...data,
      checked_by: value.checked_by,
    });
    next();
  };

  return (
    <Form layout="vertical" onFinish={Submit} form={form} initialValues={data}>
      <div className="row">
        <div className="col-md-4">
          <Form.Item label="Report No">
            <Input value={data.name} />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item label="Month">
            <Input value={moment(data.date).format("MMMM-YYYY")} />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item label="Date of Report">
            <Input value={moment(data.createdAt).format("DD/MM/YYYY")} />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Form.Item label="Project">
            <Input value={data.project?.name} />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item label="Employer">
            <Input value={data.project?.client?.name} />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item label="Consultant">
            <Input value={data.project?.consultant?.name} />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Form.Item label="Contractor">
            <Input value={data.project?.contractor?.name} />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item label="Prepared By">
            <Input value={data.prepared_by_name} />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            name="checked_by"
            label="Checked By"
            rules={[{ required: true, message: "Checked By Required!" }]}
          >
            <Select placeholder="Select">
              {users?.payload.map((e, i) => (
                <Select.Option key={i} value={e.id}>
                  {e.full_name}
                </Select.Option>
              ))}
            </Select>
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
