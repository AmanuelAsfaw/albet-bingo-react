import { EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import moment from "moment";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { Message, NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllDrawings } from "../../../../../../../redux/Drawing/Drawing.action";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { EditDrawingPropType, sendData } from "../../utils/Drawing.util";

const EditDrawingComponent: FC<EditDrawingPropType> = ({ drawing, fetchDrawing }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);

    let formData = new FormData();

    formData.append("date", value.date);
    formData.append("drawing_type",value.drawing_type);
    formData.append("ref_no", value.ref_no);
    formData.append("file", value.file.file);
    formData.append("description", value.description);

    sendData(formData)
      .then(() => {
        handleOk();
        fetchDrawing();
        form.resetFields();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.DRAWING_REGISTRATION_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.DRAWING_REGISTRATION_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Edit Drawing
      </Button>
      <Modal
        title="Edit Drawing"
        className="fixed-modal"
        width={850}
        centered
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            date: moment(drawing.date),
            drawing_type:drawing.drawing_type,
            description: drawing.description,
            ref_no: drawing.ref_no,
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date Required!" }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Drawing Type"
                name="drawing_type"
                rules={[
                  { required: true, message: "Drawing Type Required!" },
                ]}
              >
                <Select placeholder="Select" value="type 1" >
                  <Select.Option value="type-1">Type 1</Select.Option>
                  
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reference Number"
                name="ref_no"
                rules={[
                  { required: true, message: "Reference Number Required!" },
                ]}
              >
                <Input placeholder="reference number" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Description Required!" }]}
              >
                <TextArea autoSize rows={2} placeholder="Description" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="File"
                rules={[{ required: true, message: "Please input File" }]}
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
                  <Button className="btn-outline-secondary">
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
  fetchDrawing: (action: any) => dispatch(fetchAllDrawings(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDrawingComponent);
