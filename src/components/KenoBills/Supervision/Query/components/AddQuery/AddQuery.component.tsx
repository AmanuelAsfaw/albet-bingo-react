import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Statistic,
} from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AddQueryPropType, sendQuery } from "../../util/Query.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import {
  ErrorHandler,
  getLastId,
  zeroPad,
} from "../../../../../../utilities/utilities";
import { fetchAllQuery } from "../../../../../../redux/Query/Query.action";
import moment from "moment";
import SignatureComponent from "../../../../../common/Signature/Signature.component";

const AddQueryComponent: FC<AddQueryPropType> = ({
  project,
  fetchQuery,
  query,
  user,
  users,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      queries: value.query.map((e: any) => ({ message: e })),
      requested_by: user.payload.id,
      project_id: project.payload?.id,
      date: moment(),
      needed_by_date: moment(value.needed_by_date).format("YYYY-MM-DD"),
    };

    sendQuery(data)
      .then(() => {
        fetchQuery({ project_id: project.payload?.id });
        form.resetFields();
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.RFI_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.RFI_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Register RFI
      </Button>
      <Modal
        style={{ top: 10 }}
        title="Register RFI"
        visible={isModalVisible}
        onCancel={handleOk}
        width={1000}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{ query: ["", ""] }}
        >
          <div className="row">
            <div className="col-md-3">
              <Form.Item label="Request No">
                <Input value={zeroPad(getLastId(query.payload))} disabled />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Statistic
                title="Project"
                value={project.payload?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Statistic
                title="Employer"
                value={project.payload?.client?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-4">
              <Statistic
                title="Consultant"
                value={project.payload?.consultant?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-4">
              <Statistic
                title="Client"
                value={moment().format("DD/MM/YYYY")}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <Form.Item
                label="Response From"
                name="response_from"
                rules={[{ message: "Response From Required", required: true }]}
              >
                <Select placeholder="select">
                  {users.payload.map((e, index) => (
                    <Select.Option key={index} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Response Needed By"
                name="needed_by_date"
                rules={[
                  { message: "Response Needed By Required", required: true },
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <Form.List name="query">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <div className="col-md-10">
                      <Form.Item
                        label={index === 0 ? "Query" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              message: "Query Required.",
                            },
                          ]}
                          noStyle
                        >
                          <Input.TextArea placeholder="query" rows={4} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <>
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              icon={<PlusOutlined />}
                            >
                              Add
                            </Button>
                          </>
                        ) : null}
                      </Form.Item>
                    </div>
                  ))}
                  <div className="col-md-2">
                    <Form.Item style={{ paddingTop: "50px" }}>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </div>
                </>
              )}
            </Form.List>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Name">
                <Input value={user.payload.full_name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Signature">
                <SignatureComponent user={user.payload} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Designation">
                <Input value={user.payload.role} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Date">
                <Input value={moment().format("DD/MM/YYYY")} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  query: state.query.fetchAll,
  users: state.user.fetchAll,
  user: state.user.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchQuery: (action: any) => dispatch(fetchAllQuery(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQueryComponent);
