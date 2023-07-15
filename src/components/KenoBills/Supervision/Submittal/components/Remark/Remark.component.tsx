import { Button, Form, Input, Modal, Upload } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { CommentOutlined } from "@ant-design/icons";
import { RemarkPropType, sendRemark } from "../../util/Submittal.util";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { fetchOneSubmittal } from "../../../../../../redux/Submittal/Submittal.action";

import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { DownloadFile } from "../../../../../Document/MyDocument/index.util";
import DocumentViewerComponent from "../../../../../common/DocumentViewer/DocumentViewer.component";
const AddRemarkComponent: FC<RemarkPropType> = ({
  submittal_item,
  fetchSubmittal,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);

    let formData = new FormData();

    formData.append("submittal_item_id", `${submittal_item.id}`);
    formData.append("file", value?.file?.file);
    formData.append("remark", `${value.remark}`);
    sendRemark(formData)
      .then(() => {
        handleOk();
        fetchSubmittal(submittal_item.submittal_id);
        setLoading(false);
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
    submittal_item.submittal_item_remarks
      .sort((a, b) => (moment(a.date).isBefore(moment(b.date)) ? -1 : 1))
      .forEach((remark) => {
        item.push(
          <>
            <div className="col-md-8 ">
              <span>{`${remark.user.full_name} `}</span>
              <span>
                ({moment(remark.date).format("MMMM Do YYYY, h:mm:ss a")})
              </span>
              <p>{remark.remark}</p>
            </div>
            <div className="col-md-4">
              {remark?.document ? (
                <>
                  <Button
                    onClick={() => DownloadFile(remark?.document)}
                    icon={<DownloadOutlined />}
                  ></Button>
                  {remark.document ? (
                    <DocumentViewerComponent document={remark.document} />
                  ) : null}
                </>
              ) : null}
            </div>
          </>
        );
      });

    return item;
  };

  return (
    <>
      <Button
        type="link"
        icon={<CommentOutlined />}
        onClick={() => setIsModalVisible(true)}
      ></Button>
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
            {renderRemark()}

            <div className="col-md-9">
              <Form.Item
                label="Remark"
                name="remark"
                rules={[{ message: "Remark Required", required: true }]}
              >
                <Input.TextArea placeholder="comment" rows={6} />
              </Form.Item>
            </div>
            <div className="col-md-3">
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
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSubmittal: (action: any) => dispatch(fetchOneSubmittal(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRemarkComponent);
