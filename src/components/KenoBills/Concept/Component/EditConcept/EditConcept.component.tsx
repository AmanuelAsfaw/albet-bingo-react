import React, { FC, useEffect, useState } from "react";
import { CreateConcept, ConceptType, UserType } from "../../utils/Concept.util";
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Upload,
} from "antd";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../../utilities/utilities";
import moment from "moment";
import {
  FolderOpenOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import {
  fetchOneConcept,
  fetchAllConcepts,
} from "../../../../../redux/Concept/Concept.action";
import { ApiCallState } from "../../../../../redux/Utils";

import { BASE_URI } from "../../../../../redux/ApiCall";
import { useParams } from "react-router-dom";

interface Props {
  id: number;
  users: any;
  concept: ApiCallState<ConceptType>;
  fetchOne: Function;
  fetchAll: Function;
}

const EditConcept: FC<Props> = ({ id, concept, fetchOne, fetchAll, users }) => {
  const { payload, isPending, isSuccessful } = concept;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id: projectId } = useParams();

  const [preConcept, setPreConcept] = useState<any>(payload);

  const [loading, setLoading] = useState(false);
  const [general_form] = Form.useForm();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (isModalVisible) fetchOne(id, projectId);
    }
    return () => {
      isMounted = false;
    };
  }, [id, fetchOne, isModalVisible]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const newData = payload;
      setPreConcept(newData);
    }
    return () => {
      isMounted = false;
    };
  }, [payload]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (name: string, value: any) => {
    const newData = preConcept;
    let item = { ...newData, [name]: value };
    setPreConcept(item);
  };

  const Submit = async () => {
    setLoading(true);
    const formData = new FormData();
    if (!preConcept.file) preConcept.file = payload.file;

    Object.keys(preConcept).forEach((pre_concepts) => {
      const value = preConcept[pre_concepts];
      if (value instanceof File) {
        formData.append("file", value);
      } else if (value instanceof Date) {
        formData.append(pre_concepts, value.toISOString());
      } else {
        formData.append(pre_concepts, String(value));
      }
    });

    await CreateConcept(formData)
      .then(() => {
        setTimeout(() => {
          fetchAll();
          handleOk();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.CONCEPT_UPDATE_SUCCESS,
            ""
          );
          setLoading(false);
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CONCEPT_UPDATE_FAIL,
            e.message
          )
        );
      });
  };

  const renderContent = () => {
    return (
      <Form
        layout="vertical"
        initialValues={preConcept}
        form={general_form}
        onFinish={Submit}
      >
        {isPending || loading ? (
          <Spin></Spin>
        ) : (
          <Col style={{ width: "100%" }}>
            <Form.Item
              label="Date"
              rules={[{ required: true, message: "Date required" }]}
            >
              <DatePicker
                picker="date"
                value={moment(preConcept.date)}
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
                value={preConcept.type}
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
                value={preConcept.description}
                placeholder="Description"
                onChange={(e: any) =>
                  handleChange("description", e.target.value)
                }
              />
            </Form.Item>

            <Form.Item label="File" name="file">
              <>
                <Upload
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                  onChange={(e: any) => {
                    handleChange("file", e.file);
                  }}
                >
                  <Button
                    className="btn-outline-secondary"
                    style={{ width: "100%" }}
                  >
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
                {
                  <a
                    href={`${BASE_URI}/${payload.file}`}
                    className="mt-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Previous file
                  </a>
                }
              </>
            </Form.Item>

            <Form.Item label="Uploaded By">
              <Input
                disabled
                style={{ color: "black" }}
                value={
                  users.payload.find((e: any) => e.id === payload.uploaded_by)
                    ?.full_name
                }
                name="Uploaded By"
              ></Input>
            </Form.Item>
          </Col>
        )}
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
        Edit
      </Button>

      <>
        <Modal
          centered
          className="fixed-modal"
          width={500}
          title="Edit Pre Concept"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <>
              <Button loading={loading} onClick={() => general_form.submit()}>
                Edit
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
  concept: state.concept.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOne: (action: any) => dispatch(fetchOneConcept(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditConcept);
