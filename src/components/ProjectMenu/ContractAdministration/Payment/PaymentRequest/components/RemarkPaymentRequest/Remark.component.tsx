import { Badge, Button, Divider, Form, Input, List, Modal, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { CommentOutlined } from "@ant-design/icons";
import { UploadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import {
  RemarkPropType,
  sendRemark,
  parseData,
  updateSeen,
} from "../../util/PaymentRequest.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { toNumber } from "lodash";
import { fetchAllPaymentRequest } from "../../../../../../../redux/PaymentRequest/PaymentRequest.action";
import { DownloadFile } from "../../../../../../Document/MyDocument/index.util";
import DocumentViewerComponent from "../../../../../../common/DocumentViewer/DocumentViewer.component";

const AddRemarkComponent: FC<RemarkPropType> = ({
  remarkData,
  users,
  fetchAllPaymentRequest,
  project,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY h:mm a";
  const { id } = getUserData();

  useEffect(() => {
    fetchAllPaymentRequest({ project_id: project?.id });
  }, [fetchAllPaymentRequest, isModalVisible, project]);

  const data = parseData(remarkData, id);
  const handleOk = () => {
    let user = remarkData.users.find((e: any) => e.id === id);
    let sendData = {};
    if (user) {
      sendData = {
        id: user?.["user_payment_request"].id,
        payment_request_id: remarkData.id,
        user_id: id,
      };
    } else {
      sendData = {
        payment_request_id: remarkData.id,
        user_id: id,
      };
    }
    updateSeen(sendData)
      .then(() => {
        setIsModalVisible(false);
        form.resetFields();
        fetchAllPaymentRequest({ project_id: project.id });
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Last seen update failed",
            e.message
          )
        );
      });
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("payment_request_id", `${remarkData.id}`);
    formData.append("date", moment().format(dateFormat));
    formData.append("reviewed_by", `${getUserData().id}`);
    formData.append("file", value?.file?.file);
    formData.append("remark", `${value.remark}`);

    sendRemark(formData)
      .then(() => {
        form.resetFields();
        setLoading(false);
        fetchAllPaymentRequest({ project_id: project.id });
        OpenNotification(NotificationType.SUCCESS, Message.REMARK_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.REMARK_FAILED,
            e.message
          )
        );
      });
  };

  const renderRemark = () => {
    const item: any[] = [];
    remarkData.payment_request_remarks
      .sort((a: any, b: any) =>
        moment(a.date).isBefore(moment(b.date)) ? -1 : 1
      )
      .forEach((remark: any) => {
        item.push(
          <>
            <List.Item>
              <List.Item.Meta
                title={
                  users.find((e) => e.id === toNumber(remark.reviewed_by))
                    ?.full_name
                }
                description={remark.remark}
              />
              <div className="d-flex flex-column align-items-center">
                <h6
                  style={{
                    color: "#979797",
                    fontSize: "14px",
                    marginBottom: "0px",
                  }}
                >
                  {remark.date}
                </h6>
                {remark?.document ? (
                  <div className="d-flex row">
                    <Button
                      type="link"
                      icon={<CloudDownloadOutlined />}
                      onClick={() => DownloadFile(remark.document)}
                    ></Button>
                    <DocumentViewerComponent document={remark.document} />
                  </div>
                ) : null}
              </div>
            </List.Item>
          </>
        );
      });

    return item;
  };

  return (
    <>
      <a onClick={() => setIsModalVisible(true)}>
        <Badge
          status="error"
          count={data.counter}
          className="notification-badge"
        >
          <Button
            type="link"
            icon={<CommentOutlined />}
            onClick={() => setIsModalVisible(true)}
          ></Button>
        </Badge>
      </a>

      <Modal
        style={{ top: 10 }}
        title="Add Remark"
        visible={isModalVisible}
        onCancel={handleOk}
        width={1024}
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
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-9">
              <Form.Item
                label="Remark"
                name="remark"
                rules={[{ message: "Remark Required", required: true }]}
              >
                <Input.TextArea placeholder="comment" autoSize />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item
                label="File"
                rules={[{ required: false, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button
                    className="btn-outline-secondary"
                    style={{ width: "100%" }}
                  >
                    <UploadOutlined /> Upload
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-lg-12">
              <List className="task-list">{renderRemark()}</List>
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllPaymentRequest: (action: any) =>
    dispatch(fetchAllPaymentRequest(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRemarkComponent);
