import { Button, Form, Input, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { DetailQueryPropType, sendQueryItem } from "../../util/Query.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler, zeroPad } from "../../../../../../utilities/utilities";
import {
  fetchAllQuery,
  fetchOneQuery,
} from "../../../../../../redux/Query/Query.action";
import moment from "moment";
import SignatureComponent from "../../../../../common/Signature/Signature.component";

const DetailQueryComponent: FC<DetailQueryPropType> = ({
  project,
  fetchQuery,
  query,
  user,
  fetchQueries,
  id,
  record,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalVisible) fetchQuery(id);
  }, [isModalVisible, fetchQuery, id]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    // setLoading(true);
    const data = {
      response: value.response.map((e: any) => ({ message: e, query_id: id })),
    };
    sendQueryItem(data)
      .then(() => {
        fetchQueries({ project_id: project.payload?.id });
        form.resetFields();
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.QUERY_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.QUERY_FAILED,
            e.message
          )
        );
      });
  };

  const Requester = () => {
    return (
      <>
        <div className="col-md-6">
          <Form.Item label="Name">
            <Input value={query.payload.query_requested_by?.full_name} />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Signature">
            <SignatureComponent user={query.payload.query_requested_by} />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Designation">
            <Input value={query.payload.query_requested_by?.role} />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Date">
            <Input value={query.payload.date} />
          </Form.Item>
        </div>
      </>
    );
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        onClick={() => setIsModalVisible(true)}
      >
        {user.payload.id === record.response_from && !record.is_answered
          ? "Respond"
          : "View"}
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title={
          user.payload.id === record.response_from && !record.is_answered
            ? "Respond RFI"
            : "View RFI"
        }
        visible={isModalVisible}
        onCancel={handleOk}
        width={1000}
        footer={[
          <>
            {user.payload.id === record.response_from && !record.is_answered ? (
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={() => form.submit()}
              >
                Save Changes
              </Button>
            ) : null}
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{ response: ["", ""] }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Request No">
                <Input value={zeroPad(query.payload.id)} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Project">
                <Input value={project.payload?.name} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Employer">
                <Input value={project.payload?.client?.name} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Consultant">
                <Input value={project.payload?.consultant?.name} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Date">
                <Input value={moment().format("DD/MM/YYYY")} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Response From">
                <Input value={query.payload.query_response_from?.full_name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Response Needed By">
                <Input value={query.payload.needed_by_date} />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <h6>Request</h6>
            </div>

            {query.payload?.query_items?.map((e) =>
              e.user_id === query.payload.requested_by ? (
                <div className="col-md-12">
                  <Form.Item>
                    <Input.TextArea value={e.message} rows={4} />
                  </Form.Item>
                </div>
              ) : null
            )}
            <Requester />

            {query.payload.is_answered ? (
              <>
                <div className="col-md-12">
                  <h6>Response</h6>
                </div>
                {query.payload?.query_items?.map((e) =>
                  e.user_id === query.payload.response_from ? (
                    <div className="col-md-12">
                      <Form.Item>
                        <Input.TextArea value={e.message} rows={4} />
                      </Form.Item>
                    </div>
                  ) : null
                )}
              </>
            ) : null}

            {user.payload.id === record.response_from && !record.is_answered ? (
              <>
                <div className="col-md-12">
                  <h6>Response</h6>
                </div>
                <Form.List name="response">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <div className="col-md-12">
                          <Form.Item required={false} key={field.key}>
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
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                              />
                            ) : null}
                          </Form.Item>
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add
                        </Button>

                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </>
            ) : null}
          </div>
          {user.payload.id === record.response_from ? (
            <div className="row">
              <div className="col-md-6">
                <Form.Item label="Name">
                  <Input value={query.payload.query_response_from?.full_name} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item label="Signature">
                  <SignatureComponent
                    user={query.payload.query_response_from}
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item label="Designation">
                  <Input value={query.payload.query_response_from?.role} />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item label="Date">
                  <Input value={moment().format("DD/MM/YYYY")} />
                </Form.Item>
              </div>
            </div>
          ) : null}
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
  query: state.query.fetchOne,
  user: state.user.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchQuery: (action: any) => dispatch(fetchOneQuery(action)),
  fetchQueries: (action: any) => dispatch(fetchAllQuery(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailQueryComponent);
