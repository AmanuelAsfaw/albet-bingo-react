import React, { FC, useEffect, useState } from "react";
import { CreateBoard, ConceptType } from "../../util/Ticketing.util";
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
import { Message, NotificationType } from "../../../../constants/Constants";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../utilities/utilities";
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
} from "../../../../redux/Concept/Concept.action";
import { ApiCallState } from "../../../../redux/Utils";

import { BASE_URI } from "../../../../redux/ApiCall";
import { useParams } from "react-router-dom";
import { Project } from "../../../../redux/Project/Project.type";
import { fetchAllStatusBoard } from "../../../../redux/StatusBoard/StatusBoard/StatusBoard.action";

interface Props {
  fetchStatusBoards: Function;
}

const AddStatusBoardComponent: FC<Props> = ({ fetchStatusBoards }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [statusBoard, setStatusBoard] = useState<any>({});

  const [loading, setLoading] = useState(false);
  const [general_form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (name: string, value: any) => {
    const newData = statusBoard;
    let item = { ...newData, [name]: value };
    setStatusBoard(item);
  };

  const Submit = async () => {
    console.log(statusBoard.title);

    setLoading(true);

    await CreateBoard({
      title: statusBoard.title,
      priority: 0,
      projects: []
    })      
      .then(() => {
        setTimeout(() => {
          fetchStatusBoards();
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
        initialValues={statusBoard}
        form={general_form}
        onFinish={Submit}
      >
        <Col style={{ width: "100%" }}>          
          <Form.Item
            label="Title"
            rules={[
              {
                required: true,
                message: "Title Required!",
              },
            ]}
          >
            <Input
              placeholder="Title"
              onChange={(e: any) =>
                handleChange("title", e.target.value)
              }
            />
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
        Add Board
      </Button>

      <>
        <Modal
          centered
          className="fixed-modal"
          width={500}
          title="Add Board"
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
  // concept: state.concept.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchStatusBoards: (action: any) => dispatch(fetchAllStatusBoard(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStatusBoardComponent);
