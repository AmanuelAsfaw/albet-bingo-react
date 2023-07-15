import { DatePicker, Divider, Form, Input, Select, Statistic } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllUser } from "../../../../../../../../../redux/User/User.action";
import { FormOnePropType } from "./FormOne.util";

const FormOneComponent: FC<FormOnePropType> = ({
  module,
  dataAction,
  submitAction,
  resetAction,
  next,
  project,
  users,
  fetchAllUser,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = dataAction;
  const [submit, setSubmitAction] = submitAction;
  const [reset, setReset] = resetAction;

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  useEffect(() => {
    if (submit) {
      form.submit();
      setSubmitAction(false);
    }
  }, [submit]);

  useEffect(() => {
    if (reset) {
      form.resetFields();
      setReset(false);
    }
  }, [reset]);

  const Submit = (value: any) => {
    setData({
      ...data,
      ...value,
      project_id: project.payload?.id,
      description: `The following checklists are provided as a guide to encourage thorough review and completion of the ${module} drawings. They are intended to promote the production of high-quality ${module}  contract documents with minimal errors. They are not to be interpreted as representing all items that the ${module}  engineer should consider. Not all items in this checklist will be applicable to the project and will vary depending upon the agreement(s) made with client and the area in which the project is to be built.`,
    });
    next();
  };

  return (
    <Form
      layout="vertical"
      onFinish={Submit}
      form={form}
      initialValues={{
        ...data,
      }}
    >
      <div className="row">
        <div className="col-md-3">
          <Statistic
            title="Project Name"
            value={project.payload?.name}
            className="checklist-stat"
            valueStyle={{
              fontSize: 16,
              fontFamily: "Campton-Medium",
              textAlign: "left",
            }}
          />
        </div>

        <div className="col-md-3">
          <Statistic
            title="Project Number"
            value={`P-${project.payload?.project_no}`}
            className="checklist-stat"
            valueStyle={{
              fontSize: 16,
              fontFamily: "Campton-Medium",
              textAlign: "left",
            }}
          />
        </div>

        <div className="col-md-3">
          <Form.Item name="date" label="Date" className="label-grey">
            <DatePicker />
          </Form.Item>
        </div>

        <div className="col-md-3">
          <Form.Item name="user_id" label="Filled By" className="label-grey">
            <Select loading={users.isPending} placeholder="select">
              {users.payload.map((e) => (
                <Select.Option value={e.id} key={e.id}>
                  {e.full_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Divider />

        <div className="col-md-12">
          <p className="text-left">
            <i>To be filled at the end of each project.</i>
          </p>
        </div>

        <div className="col-md-12 text-left">
          <p>
            The following checklists are provided as a guide to encourage
            thorough review and completion of the {module} drawings. They are
            intended to promote the production of high-quality {module} contract
            documents with minimal errors. They are not to be interpreted as
            representing all items that the {module} engineer should consider.
            Not all items in this checklist will be applicable to the project
            and will vary depending upon the agreement(s) made with client and
            the area in which the project is to be built.
          </p>
        </div>

        <div className="col-md-12">
          <p className="text-left">
            <i>
              <b>Remarks</b> (Things that needs further investigation, major
              problem observed in the project, lesson learned from this project
              …)
            </i>
          </p>
        </div>

        <div className="col-md-12">
          <Form.Item name="remark" label="Remark">
            <Input.TextArea placeholder="remark" autoSize />
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
  project: state.project.fetchOne,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllUser: () => dispatch(fetchAllUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormOneComponent);
