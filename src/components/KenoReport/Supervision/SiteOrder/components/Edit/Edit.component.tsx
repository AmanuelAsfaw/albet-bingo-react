import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Upload,
} from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { EditSiteBookPropType, editData } from "../../util/SiteBook.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
  SiteBookType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import { fetchAllSiteBook } from "../../../../../../redux/SiteBook/SiteBook.action";
import { DownloadFile } from "../../../../../Document/MyDocument/index.util";
import DocumentViewerComponent from "../../../../../common/DocumentViewer/DocumentViewer.component";
const EditSiteBookComponent: FC<EditSiteBookPropType> = ({
  fetchSiteBook,
  project,
  site_book,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(site_book);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);

    let formData = new FormData();

    formData.append("type", data.type);
    if (value.file) formData.append("file", value.file?.file);
    formData.append("project_id", project.payload?.id);
    formData.append("date", data.date?.format("YYYY-MM-DD"));
    formData.append("id", data.id.toString());
    formData.append("no", data.no.toString());

    editData(formData)
      .then(() => {
        fetchSiteBook({ project_id: project.payload?.id });
        form.resetFields();
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.GENERAL_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.GENERAL_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Edit Site Book"
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
          initialValues={site_book}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Site Book No"
                name="no"
                rules={[{ required: true, message: "Site Book No Required!" }]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date Required!" }]}
              >
                <DatePicker onChange={(e) => setData({ ...data, date: e })} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Type is Required" }]}
              >
                <AutoComplete
                  onChange={(e) => setData({ ...data, type: e })}
                  placeholder="Type"
                  options={SiteBookType.map((e, index) => ({
                    value: e,
                    key: index,
                  }))}
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            {data.document ? (
              <div className="col-md-12">
                <Form.Item label="File">
                  <>
                    <Button
                      type="link"
                      onClick={() => DownloadFile(data.document)}
                    >
                      {data.document?.name}
                    </Button>
                    {data.document ? (
                      <DocumentViewerComponent document={data.document} />
                    ) : null}
                  </>
                  <Button
                    className="ml-3"
                    type="text"
                    onClick={() => setData({ ...data, document: null })}
                  >
                    Remove
                  </Button>
                </Form.Item>
              </div>
            ) : (
              <div className="col-md-12">
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
            )}
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
  site_books: state.site_book.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSiteBook: (action: any) => dispatch(fetchAllSiteBook(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSiteBookComponent);
