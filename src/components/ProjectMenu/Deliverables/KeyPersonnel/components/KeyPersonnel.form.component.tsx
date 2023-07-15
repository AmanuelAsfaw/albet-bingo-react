import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Table,
  Upload,
} from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  DownloadFile,
  KeyPersonnelFormPropType,
  POST,
  PUT,
} from "../util/utils";
import { fetchKeyPersonnel } from "../../../../../redux/KeyPersonnel/KeyPersonnel.action";
import Modal from "antd/lib/modal/Modal";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { RcFile } from "antd/es/upload";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import { ColumnsType } from "antd/lib/table";

type docs = {
  certificate_award_documents: number[];
  pro_body_member_document: number;
  years_of_experience_document: number;
  construction_experience_document: number;
  qualification_document: number;
};

const KeyPersonnelFormComponent: FC<KeyPersonnelFormPropType> = ({
  viewMode,
  keyPersonnel,
  fetchKeyPersonnel,
  project
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  //handle multiple files selection (certificate and awards)
  const [doc, setDoc] = useState<RcFile[]>([]);
  const [updateDoc, setUpdateDoc] = useState<docs>({
    certificate_award_documents: [],
    pro_body_member_document: keyPersonnel?.pro_body_member_document?.path
      ? 1
      : -1,
    years_of_experience_document: keyPersonnel?.years_of_experience_document
      ?.path
      ? 1
      : -1,
    construction_experience_document: keyPersonnel
      ?.construction_experience_document?.path
      ? 1
      : -1,
    qualification_document: keyPersonnel?.qualification_document?.path ? 1 : -1,
  });

  const [form] = Form.useForm();

  const handleOk = () => {
    form.resetFields();
    setDoc([]);
    setIsModalOpen(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const formData = new FormData();
    const data: any = {
      date: value.date,
      name: value.name,
      project_id: project?.id ?? undefined,
      qualification: value.qualification,
      construction_experience: value.construction_experience,
      years_of_experience: value.years_of_experience,
      pro_body_member: value.pro_body_member,
      certificate_award: value.certificate_award,
      request_date: value.request_date,
      remark: value.remark,
    };
    let index = 0;

    if (
      value.qualification_document &&
      value.qualification_document.fileList &&
      value.qualification_document.fileList.length > 0
    ) {
      formData.append("documents", value.qualification_document.file);
      data.qualification_document = `${index}`;
      index++;
    }
    if (
      value.construction_experience_document &&
      value.construction_experience_document.fileList &&
      value.construction_experience_document.fileList.length > 0
    ) {
      formData.append("documents", value.construction_experience_document.file);
      data.construction_experience_document = `${index}`;
      index++;
    }
    if (
      value.years_of_experience_document &&
      value.years_of_experience_document.fileList &&
      value.years_of_experience_document.fileList.length > 0
    ) {
      formData.append("documents", value.years_of_experience_document.file);
      data.years_of_experience_document = `${index}`;
      index++;
    }
    if (
      value.pro_body_member_document &&
      value.pro_body_member_document.fileList &&
      value.pro_body_member_document.fileList.length > 0
    ) {
      formData.append("documents", value.pro_body_member_document.file);
      data.pro_body_member_document = `${index}`;
      index++;
    }
    if (value.certificate_award_documents) {
      const arr = [];
      for (let x = 0; x < doc.length; x++) {
        formData.append("documents", doc[x]);
        arr.push(`${index}`);
        index++;
      }
      data.certificate_award_documents = arr;
    }

    if (viewMode === "Edit") {
      data["id"] = keyPersonnel?.id;
      data["updateDoc"] = updateDoc;
    }

    formData.append("data", JSON.stringify(data));
    console.log(formData);

    if (viewMode === "New") {
      POST(formData)
        .then(() => {
          handleOk();
          setLoading(false);
          form.resetFields();
          fetchKeyPersonnel({project_id: project?.id ?? -1});
          OpenNotification(
            NotificationType.SUCCESS,
            Message.KEY_PERSONNEL_REGISTERED_SUCCESS,
            ""
          );
        })
        .catch((error) => {
          setLoading(false);
          ErrorHandler(error).map((e: any) =>
            OpenNotification(
              NotificationType.ERROR,
              Message.KEY_PERSONNEL_REGISTERED_FAIL,
              e.message
            )
          );
        });
    }
    if (viewMode === "Edit") {
      PUT(formData)
        .then(() => {
          fetchKeyPersonnel({project_id: project?.id ?? -1});
          handleOk();
          setLoading(false);
          OpenNotification(
            NotificationType.SUCCESS,
            Message.KEY_PERSONNEL_UPDATE_SUCCESS,
            ""
          );
        })
        .catch((error) => {
          setLoading(false);
          ErrorHandler(error).map((e: any) =>
            OpenNotification(
              NotificationType.ERROR,
              Message.KEY_PERSONNEL_UPDATE_FAIL,
              e.message
            )
          );
        });
    }
  };

  const Headers = {
    New: { title: "New Key Personnel", icon: <PlusOutlined /> },
    View: { title: "View", icon: <EyeOutlined /> },
    Edit: { title: "Update", icon: <EditOutlined /> },
  };

  const modalHeaders = {
    New: "New Key Personnel",
    View: "View Key Personnel",
    Edit: "Update Key Personnel",
  };

  const initValues: any = {
    ...keyPersonnel,
    date: moment(keyPersonnel?.date ?? new Date()),
    request_date: moment(keyPersonnel?.request_date ?? new Date()),
  };

  useEffect(() => {
    setFormDisabled(viewMode === "View");
  }, [setFormDisabled]);

  function RemoveFile(label: string, key: number) {
    switch (label) {
      case "qualification_document": {
        updateDoc.qualification_document = -1;
        break;
      }
      case "construction_experience_document": {
        updateDoc.construction_experience_document = -1;
        break;
      }
      case "years_of_experience_document": {
        updateDoc.years_of_experience_document = -1;
        break;
      }
      case "pro_body_member_document": {
        updateDoc.pro_body_member_document = -1;
        break;
      }
      case "certificate_award_documents": {
        updateDoc.certificate_award_documents.push(key);
        break;
      }
    }
    setUpdateDoc({ ...updateDoc });
  }

  function attachmentComponent(doc: any, key: number, label: string) {
    if (!doc || Object.keys(doc).length === 0) return undefined;
    if (viewMode === "Edit") {
      switch (label) {
        case "qualification_document": {
          if (updateDoc.qualification_document === -1) return undefined;
          break;
        }
        case "construction_experience_document": {
          if (updateDoc.construction_experience_document === -1)
            return undefined;
          break;
        }
        case "years_of_experience_document": {
          if (updateDoc.years_of_experience_document === -1) return undefined;
          break;
        }
        case "pro_body_member_document": {
          if (updateDoc.pro_body_member_document === -1) return undefined;
          break;
        }
        case "certificate_award_documents": {
          if (updateDoc.certificate_award_documents.indexOf(key) !== -1)
            return undefined;
          break;
        }
      }
    }
    return [
      <div key={key} className={"d-flex flex-row"}>
        <div style={{ width: "65%" }}>
          <div>{doc["filename"]}</div>
          <div>{doc["size"] / 1000 + " KB"}</div>
        </div>
        <Divider type={"vertical"} style={{height: 35}} orientationMargin={0}/>
        <div style={{ width: "30%" }}>
          {doc["mimetype"].toString().startsWith("image") && (
            <DocumentViewerComponent document={{ url: doc["path"] }} />
          )}
          <Button
            disabled={false}
            className="ml-2 btn-outline-primary"
            icon={<DownloadOutlined />}
            onClick={() => DownloadFile(doc)}
          ></Button>
          {viewMode === "Edit" && (
            <Button
              disabled={false}
              className="ml-2 btn-outline-danger"
              icon={<DeleteOutlined />}
              onClick={() => RemoveFile(label, key)}
            ></Button>
          )}
        </div>
      </div>,
      <Divider />,
    ];
  }

  function Attachment(
    label: string,
    name: string,
    object: any,
    type: "single" | "multiple"
  ) {
    if ((!object || Object.keys(object).length === 0) && viewMode === "View") {
      //If it is in "View" and it doesn't have any attachment
      return <></>;
    } else {
      return (
        <div key={name}>
          {type === "single"
            ? attachmentComponent(object, -1, name)
            : object?.map((doc: any, index: number) => {
                return attachmentComponent(doc, index, name);
              })}
          <Form.Item name={`${name}`}>
            {!(viewMode === "View") && (
              <Upload
                maxCount={type === "multiple" ? undefined : 1}
                multiple={type === "multiple"}
                beforeUpload={(file, files) => {
                  if (type === "multiple") {
                    setDoc([...doc, ...files]);
                  }
                  /* Bug: Form doesn't auto assign the value to FormItem(by name) (on dynamic Upload form item) no clue why! but the line below assigns it manually and it works */
                  form.setFieldValue(name, { file: file, fileList: files });
                  //Stop automatic upload
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>
                  {type === "single" ? "Select File" : "Select Files"}
                </Button>
              </Upload>
            )}
          </Form.Item>
        </div>
      );
    }
  }

  type Item = {
    key: number;
    description: string;
    data: any;
    file: any;
  };
  const data: Item[] = [
    {
      key: 1,
      description: "Date",
      data: (
        <Form.Item
          rules={[{ required: true, message: "Date Required" }]}
          name="date"
        >
          <DatePicker
            defaultValue={moment(new Date())}
            className={"disabledInputStyle"}
          />
        </Form.Item>
      ),
      file: undefined,
    },
    {
      key: 2,
      description: "Name",
      data: (
        <Form.Item
          rules={[{ required: true, message: "Name Required" }]}
          name="name"
        >
          <Input className={"disabledInputStyle"} placeholder="Name" />
        </Form.Item>
      ),
      file: undefined,
    },
    {
      key: 3,
      description: "Qualification",
      data: (
        <Form.Item
          rules={[{ required: true, message: "Qualification Required" }]}
          name="qualification"
        >
          <TextArea
            disabled={formDisabled}
            placeholder={"Qualification"}
            className={"disabledInputStyle"}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      ),
      file: Attachment(
        "Attachment",
        "qualification_document",
        keyPersonnel?.qualification_document,
        "single"
      ),
    },
    {
      key: 4,
      description: "Construction Experience",
      data: (
        <Form.Item
          rules={[
            {
              required: true,
              message: "Construction Experience Required",
            },
          ]}
          name="construction_experience"
        >
          <TextArea
            disabled={formDisabled}
            className={"disabledInputStyle"}
            placeholder={"Construction Experience"}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      ),
      file: Attachment(
        "Attachment",
        "construction_experience_document",
        keyPersonnel?.construction_experience_document,
        "single"
      ),
    },
    {
      key: 5,
      description: "Years of Experience",
      data: (
        <Form.Item
          rules={[{ required: true, message: "Years of Experience Required" }]}
          name="years_of_experience"
        >
          <InputNumber
            defaultValue={0}
            className={"disabledInputStyle"}
            min={0}
          />
        </Form.Item>
      ),
      file: Attachment(
        "Attachment",
        "years_of_experience_document",
        keyPersonnel?.years_of_experience_document,
        "single"
      ),
    },
    {
      key: 6,
      description: "Membership of Professional Body",
      data: (
        <Form.Item
          rules={[
            {
              required: true,
              message: "Membership of Professional Body Required",
            },
          ]}
          name="pro_body_member"
        >
          <Radio.Group className={"disabledInputStyle"}>
            <Radio value={true}>Valid</Radio>
            <Radio value={false}>Non Valid</Radio>
          </Radio.Group>
        </Form.Item>
      ),
      file: Attachment(
        "Attachment",
        "pro_body_member_document",
        keyPersonnel?.pro_body_member_document,
        "single"
      ),
    },
    {
      key: 7,
      description: "Certificate Award",
      data: (
        <Form.Item
          rules={[{ required: true, message: "Certificate Award Required" }]}
          name="certificate_award"
        >
          <TextArea
            disabled={formDisabled}
            className={"disabledInputStyle"}
            placeholder={"Certificate Award"}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      ),
      file: Attachment(
        "Attachments",
        "certificate_award_documents",
        keyPersonnel?.certificate_award_documents,
        "multiple"
      ),
    },
    {
      key: 8,
      description: "Requested Date of commencement",
      data: (
        <Form.Item
          rules={[{ required: true, message: "Requested Date Required" }]}
          name="request_date"
        >
          <DatePicker
            defaultValue={moment(new Date())}
            className={"disabledInputStyle"}
          />
        </Form.Item>
      ),
      file: undefined,
    },
    {
      key: 9,
      description: "Certificate Award",
      data: (
        <Form.Item name="remark">
          <TextArea
            disabled={formDisabled}
            className={"disabledInputStyle"}
            placeholder={"Remark"}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      ),
      file: undefined,
    },
  ];

  const columns: ColumnsType<Item> = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 200,
    },
    {
      title: "Data",
      dataIndex: "",
      width: 400,
      render: (val) => val.data,
    },
    {
      title: "File",
      dataIndex: "",
      width: 500,
      render: (val) => val.file,
    },
  ];

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={Headers[viewMode]["icon"]}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {Headers[viewMode]["title"]}
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1000}
        title={modalHeaders[viewMode]}
        open={isModalOpen}
        onCancel={handleOk}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
            {viewMode !== "View" && (
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={() => form.submit()}
              >
                Save Changes
              </Button>
            )}
          </>,
        ]}
      >
        <Form
          onFinish={Submit}
          form={form}
          layout={"vertical"}
          initialValues={initValues}
          disabled={formDisabled}
        >
          <Table scroll={{ x: 1100 }} columns={columns} dataSource={data} />
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
  fetchKeyPersonnel: (action: any) => dispatch(fetchKeyPersonnel(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyPersonnelFormComponent);
