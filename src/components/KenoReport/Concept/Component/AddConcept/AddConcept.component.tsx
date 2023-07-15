import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Table,
  Typography,
  Upload,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import { CreateConcept, ConceptType } from "../../utils/Concept.util";
import moment from "moment";
import { useForm } from "antd/lib/form/Form";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { UserType } from "../../utils/Concept.util";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllConcepts } from "../../../../../redux/Concept/Concept.action";

type Props = {
  user: UserType;
  fetchAll: Function;
};

const AddConcept: FC<Props> = ({ user, fetchAll }) => {
  const params = useParams();
  const [concept, setConcept] = useState<ConceptType>({
    date: new Date(),
    type: "",
    concept_type: "concept",
    description: "",
    project_id: Number(params.id),
    file: {
      uid: "",
      lastModified: new Date(),
      lastModifiedDate: new Date(),
      name: "",
      size: 0,
      type: "",
      webkitRelativePath: "",
    },
    uploaded_by: user.id,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [general_form] = Form.useForm();
  const newHeader = params.header?.split("-").join("");

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (name: string, value: any) => {
    const newData = concept;
    let item = { ...newData, [name]: value };
    setConcept(item);
  };

  const handleFile = (key: string, value: any) => {
    const newData = concept;
    let item = { ...newData, file: value };
    setConcept(item);
  };

  const clearForm = () => {
    general_form.resetFields();
    setConcept({
      date: new Date(),
      type: "",
      concept_type: "preconcept",
      description: "",
      file: {
        uid: "",
        lastModified: new Date(),
        lastModifiedDate: new Date(),
        name: "",
        size: 0,
        type: "",
        webkitRelativePath: "",
      },
      project_id: Number(params.id),
      uploaded_by: user.id,
    });
  };

  const Submit = () => {
    setLoading(true);
    const formData = new FormData();
    concept.project_id = Number(params.id);

    Object.keys(concept).forEach((concepts) => {
      const value = concept[concepts];
      if (value instanceof File) {
        formData.append("file", value);
      } else if (value instanceof Date) {
        formData.append(concepts, value.toISOString());
      } else {
        formData.append(concepts, String(value));
      }
    });

    CreateConcept(formData)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll();
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.CONCEPT_REGISTERED_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CONCEPT_REGISTERED_FAIL,
            e.message
          )
        );
      });
  };

  const renderContent = () => {
    return (
      <Form
        layout="vertical"
        initialValues={concept}
        form={general_form}
        onFinish={Submit}
      >
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Date"
            rules={[{ required: true, message: "Date required" }]}
          >
            <DatePicker
              picker="date"
              value={moment(concept.date)}
              onChange={(e) => handleChange("date", e?.format("YYYY-MM-DD"))}
              allowClear={false}
            />
          </Form.Item>

          <Form.Item
            label="Type"
            rules={[
              {
                required: true,
                message: "Type Required!",
              },
            ]}
          >
            <AutoComplete
              value={concept.type}
              options={["Title deeds", "Pictures", "Survey data"]
                .filter((report) => report !== "")
                .map((report) => report)
                .map((e) => ({ value: e }))}
              filterOption={(inputValue, option) =>
                option!.value.toUpperCase().includes(inputValue.toUpperCase())
              }
              placeholder="Type"
              onSelect={(e: any) => {
                const selectedItem = [
                  "Title deeds",
                  "Pictures",
                  "Survey data",
                ].find((item) => item === e);
                handleChange("type", selectedItem);
              }}
              onSearch={(e) => handleChange("type", e)}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            rules={[
              {
                required: true,
                message: "Description Required!",
              },
            ]}
          >
            <Input
              placeholder="Description"
              value={concept.description}
              onChange={(e: any) => handleChange("description", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="File"
            name="file"
            rules={[
              {
                required: true,
                message: "File Required!",
              },
            ]}
          >
            <Upload
              name="file"
              beforeUpload={() => {
                return false;
              }}
              type="select"
              multiple={false}
              maxCount={1}
              onChange={(e: any) => {
                handleFile("file", e.file);
              }}
            >
              <Button
                className="btn-outline-secondary"
                style={{ width: "100%" }}
              >
                <UploadOutlined /> Click to Upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Uploaded By">
            <Input
              disabled
              style={{ color: "black" }}
              value={user?.full_name}
              name="Uploaded By"
            ></Input>
          </Form.Item>
        </Col>
      </Form>
    );
  };

  return (
    <div>
      <Button
        onClick={() => setIsModalVisible(true)}
        type="link"
        icon={<PlusOutlined />}
      >
        Add
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={500}
          title="New Concept"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <>
              <Button loading={loading} onClick={() => general_form.submit()}>
                Add
              </Button>
            </>,
          ]}
        >
          {renderContent()}
        </Modal>
      </>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  concept: state.concept.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
// const mapDispatchToProps = (dispatch: any) => ({
//   fetchAll: (action: any) => dispatch(fetchAllConcepts(action)),
// });

export default connect(mapStateToProps)(AddConcept);
