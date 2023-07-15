import { AutoComplete, Button, DatePicker, Form, Modal, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AddExternalDocumentPropType,
  sendData,
  Types,
} from "../../util/ExternalDocument.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllUser } from "../../../../../../redux/User/User.action";
import TextArea from "antd/lib/input/TextArea";
import { fetchAllExternalDocuments } from "../../../../../../redux/ExternalDocument/ExternalDocument.action";

const AddExternalDocumentComponent: FC<
  AddExternalDocumentPropType
> = ({ project, users, fetchUser, fetchExternalDocument }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("project_id", project.payload?.id);
    formData.append("date", value.date.format(dateFormat));
    formData.append("description", value.description);
    formData.append("type", value?.type);
    formData.append("file", value?.file?.file);

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchExternalDocument({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "External Document saved!",
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save External Document!",
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
        New Document
      </Button>
      <Modal
        width={900}
        centered
        title="New Document"
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
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            date: moment(),
            request:"Variation"
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "External Document Date Required!",
                  },
                ]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>

				<div className="col-md-4">
					<Form.Item
						label="Type"
						name="type"
						rules={[{ required: true, message: "External Document Type Required!" }]}
					>
						<AutoComplete
							placeholder="type"
							options={Types.map((t, index) => ({
								value: t,
								key: index,
							}))}
							filterOption={(inputValue, option) =>
								option!.value
									.toUpperCase()
									.indexOf(inputValue.toUpperCase()) !== -1
							}
							style={{ width: "100%" }}
						/>
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
  fetchExternalDocument: (action: any) =>
    dispatch(fetchAllExternalDocuments(action)),
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExternalDocumentComponent);
