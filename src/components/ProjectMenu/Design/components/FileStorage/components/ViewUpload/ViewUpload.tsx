import { Button, Form, Input, Modal } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { ViewUploadPropType } from "./ViewUpload.util";
import moment from "moment";
import { UploadType } from "../AddUpload/AddUpload.util";
import { BASE_URI } from "../../../../../../../redux/ApiCall";
import { getUserData } from "../../../../../../../utilities/utilities";
const ViewUploadComponent: FC<ViewUploadPropType> = ({ upload, module }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {};

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        View
      </Button>
      <Modal
        style={{ top: 10 }}
        title="Register ViewUpload"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            ...upload,
            file: null,
            date: moment(upload.date).format("YYYY-MM-DD"),
            module,
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Date" name="date">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item label="Design type" name="module">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Reference no"
                name="reference_no"
                rules={[
                  { required: false, message: "Reference no is required" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item label="Upload type" name="type">
                <Input />
              </Form.Item>
            </div>
            {upload.upload_type === UploadType.FILE ? (
              <div className="col-md-12">
                <Form.Item label="Upload" name="file">
                  {
                    <a
                      href={`${BASE_URI}/${upload.file_name}`}
                      className="mt-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      File
                    </a>
                  }
                </Form.Item>
              </div>
            ) : (
              <div className="col-md-12">
                <Form.Item label="Link" name="link">
                  <Input />
                </Form.Item>
              </div>
            )}
            <div className="col-md-12">
              <Form.Item label="Uploaded by">
                <Input value={getUserData().full_name} />
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
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUploadComponent);
