import { Form, Modal, Input, Upload, Button, Divider } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { SendRFIResponse, ViewRFIPropType } from "../../util/RFI.util";
import {
  PlusOutlined,
  MinusCircleOutlined,
  EyeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { BASE_URI } from "../../../../../../redux/ApiCall";
import moment from "moment";
import {
  NotificationType,
  Message,
} from "../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import SignatureComponent from "../../../../../common/Signature/Signature.component";

const ViewRFIComponent: FC<ViewRFIPropType> = ({ rfi, project, fetchRFI }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [description, setDescription] = useState([{ value: "" }]);
  const [attachements, setAttachements] = useState([{ value: "" }]);
  const [responses, setResponses] = useState([{ value: "" }]);

  useEffect(() => {
    if (rfi.under_review_description !== "") {
      const parsedData = rfi?.under_review_description
        .split("---")
        .map((form: any) => {
          return { value: form };
        });
      setDescription(parsedData);
    }
    if (rfi.attachements !== "") {
      const parsedData = rfi?.attachements.split("---").map((form: any) => {
        return { value: form };
      });
      setAttachements(parsedData);
    }
    if (rfi?.rfiResponse) {
      if (rfi?.rfiResponse?.description !== "") {
        const parsedData = rfi?.rfiResponse?.description
          .split("---")
          .map((form: any) => {
            return { value: form };
          });
        setResponses(parsedData);
      }
    }
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
    setResponses([{ value: "" }]);
  };

  const Submit = (value: any) => {
    const RFIResponse = responses
      .map((response: any) => response.value)
      .join("---");
    const data = new FormData();
    data.append("description", RFIResponse);
    data.append("rfi_id", rfi?.id.toString());
    value.response_files?.fileList.forEach((file: any) => {
      data.append("response_files", file?.originFileObj);
    });
    console.log(value);
    SendRFIResponse(data)
      .then(() => {
        fetchRFI();
        form.resetFields();
        handleOk();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.RFI_RESPONSE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.RFI_RESPONSE_FAILED,
            e.message
          )
        );
      });
  };

  const responde = rfi?.rfiResponse
    ? false
    : getUserData().id === rfi.rfi_responder_by.id;

  return (
    <>
      {responde ? (
        <Button
          className="btn-outline-secondary"
          icon={<CheckCircleOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Responde
        </Button>
      ) : (
        <Button
          className="btn-outline-secondary"
          icon={<EyeOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          View
        </Button>
      )}

      <Modal
        style={{ top: 10 }}
        title={
          <div style={{ textAlign: "center" }}>
            <h4>Request for information</h4>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleOk}
        width={1024}
        footer={[
          <>
            {!responde ? null : (
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={() => form.submit()}
              >
                Responde
              </Button>
            )}
          </>,
        ]}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          className="no-gutter"
          onFinish={Submit}
          form={form}
          initialValues={{
            rfi_date: moment(),
            under_review: "Material under review and the relevant request",
          }}
        >
          <div className="row" style={{ margin: 0, padding: 0 }}>
            <div className="col-md-6">
              <Form.Item label="Project">
                <Input value={project.payload?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="RFI number">
                <Input value={rfi.rfi_number} />
              </Form.Item>
            </div>
          </div>
          <div className="row" style={{ margin: 0, padding: 0 }}>
            <div className="col-md-6">
              <Form.Item label="To">
                <Input value={rfi.rfi_responder_by?.full_name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="From">
                <Input value={rfi.rfi_prepared_by?.full_name} />
              </Form.Item>
            </div>
          </div>
          <div className="row" style={{ margin: 0, padding: 0 }}>
            <div className="col-md-6">
              <Form.Item label="date">
                <Input value={rfi?.rfi_date} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Project no">
                <Input value={`00${rfi.id}`} />
              </Form.Item>
            </div>
          </div>

          <Divider style={{ marginTop: 0, borderColor: "#d9d9d9" }} />

          <div className="row" style={{ padding: 0, margin: 0 }}>
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Form.Item label="Title">
                <Input value={rfi?.title} />
              </Form.Item>
            </div>
          </div>

          <Divider style={{ marginTop: 0, borderColor: "#d9d9d9" }} />

          <Form.Item label="Specification Section:" className="p-0 m-0">
            <Input value={rfi?.specification_section} />
          </Form.Item>
          <Form.Item label="Paragraph:" className="p-0 m-0">
            <Input value={rfi?.paragraph} />
          </Form.Item>
          <Form.Item label="Drawing reference:" className="p-0 m-0">
            <Input value={rfi?.drawing_reference} />
          </Form.Item>
          {rfi.drawing_reference_image === "" ? null : (
            <Form.Item label=":" className="p-0 m-0">
              <ul>
                {rfi.drawing_reference_image.split(",,").map((item: string) => (
                  <li>
                    <a href={`${BASE_URI}/${item}`} target="_blank">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </Form.Item>
          )}

          <Form.Item label="Detail" className="">
            <Input className="align-right" value={rfi?.detail} />
          </Form.Item>

          <Divider style={{ marginTop: 0, borderColor: "#d9d9d9" }} />

          <div className="row">
            <div className="col-md-9">
              <Form.Item label="" className="">
                <Input className="align-right" value={rfi?.under_review} />
              </Form.Item>
            </div>
          </div>

          <div style={{ paddingLeft: 50 }}>
            {description.map((data, index) => (
              <div className="row">
                <div className="col-md-9">
                  <Form.Item style={{ width: "100%" }} label="">
                    <Input
                      className="align-right"
                      value={data.value}
                      onChange={(e: any) => {
                        let st = data;
                        st.value = e.target.value;
                        description[index] = st;
                        setDescription([...description]);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            ))}
          </div>

          <Divider style={{ marginTop: 0, borderColor: "#d9d9d9" }} />

          <div>
            <div className="row">
              <div className="col-md-9">
                <p>Attachements/Approvals/Test Results, if any:</p>
              </div>
            </div>
            {attachements.map((attachement, index) => (
              <div className="row">
                <div className="col-md-9">
                  <Form.Item label="">
                    <Input.TextArea
                      rows={4}
                      value={attachement.value}
                      onChange={(e: any) => {
                        let st = attachement;
                        st.value = e.target.value;
                        attachements[index] = st;
                        setAttachements([...attachements]);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            ))}
            {rfi.attachements_files === "" ? null : (
              <Form.Item label="" className="p-0 m-0">
                <ul>
                  {rfi.attachements_files.split(",,").map((item: string) => (
                    <a href={`${BASE_URI}/${item}`} target="_blank">
                      {item}
                    </a>
                  ))}
                </ul>
              </Form.Item>
            )}
          </div>

          <Divider style={{ marginTop: 10, borderColor: "#d9d9d9" }} />

          <div className="pt-20">
            <div className="row">
              <div className="col-md-2">Requested By:</div>
              <div className="col-md-2">{rfi?.rfi_prepared_by?.full_name}</div>
            </div>
            <div className="row">
              <div className="col-md-2">Responsibility:</div>
              <div className="col-md-2">{rfi?.rfi_prepared_by?.role}</div>
            </div>
            <div className="row">
              <div className="col-md-2">Date:</div>
              <div className="col-md-2">{rfi?.rfi_date}</div>
            </div>
            <div className="row">
              <div className="col-md-2">Signature:</div>
              <div className="col-md-2">
                <SignatureComponent user={rfi?.rfi_prepared_by} />
              </div>
            </div>
          </div>

          <Divider style={{ marginTop: 10, borderColor: "#d9d9d9" }} />

          <div>
            <div className="row">
              <div className="col-md-9">
                <p>Response:</p>
              </div>
              {responde ? (
                <div className="col-md-3">
                  <Button
                    type="primary"
                    shape="circle"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      let fr = responses;
                      fr.push({ value: "" });
                      setResponses([...fr]);
                    }}
                  />
                </div>
              ) : null}
            </div>
            {responses.map((response, index) => (
              <div className="row">
                <div className="col-md-9">
                  <Form.Item label="">
                    <Input.TextArea
                      rows={4}
                      value={response.value}
                      onChange={(e: any) => {
                        let st = response;
                        st.value = e.target.value;
                        responses[index] = st;
                        setResponses([...responses]);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  {index === 0 ? null : (
                    <MinusCircleOutlined
                      className="ml-3 dynamic-delete-button"
                      onClick={() => {
                        let fr = responses;
                        fr.splice(index, 1);
                        setResponses([...fr]);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
            {rfi?.rfiResponse ? (
              rfi?.rfiResponse.response_file === "" ? null : (
                <Form.Item label="" className="p-0 m-0">
                  <ul>
                    {rfi?.rfiResponse.response_file
                      .split(",,")
                      .map((item: string) => (
                        <li>
                          {" "}
                          <a href={`${BASE_URI}/${item}`} target="_blank">
                            {item}
                          </a>
                        </li>
                      ))}
                  </ul>
                </Form.Item>
              )
            ) : (
              <Form.Item name="response_files">
                <Upload
                  type="select"
                  multiple={true}
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Add Attachments</Button>
                </Upload>
              </Form.Item>
            )}
          </div>

          <Divider style={{ marginTop: 10, borderColor: "#d9d9d9" }} />

          <div className="pt-20">
            <div className="row">
              <div className="col-md-2">Response By:</div>
              <div className="col-md-2">{rfi?.rfi_responder_by?.full_name}</div>
            </div>
            <div className="row">
              <div className="col-md-2">Responsibility:</div>
              <div className="col-md-2">{rfi?.rfi_responder_by?.role}</div>
            </div>
            <div className="row">
              <div className="col-md-2">Date:</div>
              <div className="col-md-2">{rfi?.rfi_date}</div>
            </div>
            <div className="row">
              <div className="col-md-2">Signature:</div>
              <div className="col-md-2">
                <SignatureComponent user={rfi?.rfi_responder_by} />
              </div>
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewRFIComponent);
