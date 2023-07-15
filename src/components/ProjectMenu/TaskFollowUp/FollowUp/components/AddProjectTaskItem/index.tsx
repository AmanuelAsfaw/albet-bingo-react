import React, { FC, useEffect, useState } from "react";
import { ConceptType, CreateProjectBoardTask } from "../../utils/FollowUp.util";
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Upload,
} from "antd";
import { Message, NotificationType } from "../../../../../../constants/Constants";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../../../utilities/utilities";
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
} from "../../../../../../redux/Concept/Concept.action";
import { ApiCallState } from "../../../../../../redux/Utils";

import { BASE_URI } from "../../../../../../redux/ApiCall";
import { useParams } from "react-router-dom";
import { Project } from "../../../../../../redux/Project/Project.type";
import { log } from "mathjs";
import { fetchAllStatusBoard } from "../../../../../../redux/StatusBoard/StatusBoard/StatusBoard.saga";
import { ProjectTaskCategory } from "../../../../../../redux/TaskFollowUp/ProjectTaskCategory/ProjectTaskCategory.type";
import { toNumber } from "lodash";

interface Props {
  category_id: number|undefined;
  fetchStatusBoardAll: Function;
}

const AddProjectBoardConcept: FC<Props> = ({ fetchStatusBoardAll, category_id }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id: projectId } = useParams();

  const [task, setTask] = useState<string|undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [general_form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const Submit = async () => {
    setLoading(true);

    CreateProjectBoardTask({
      category_id: category_id,
      title: task,
      priority: 1,      
    })
      .then(() => {
        setTimeout(() => {
          handleOk();
          OpenNotification(
            NotificationType.SUCCESS,
            "Board-Task registered successfully!",
            ""
          );
          setLoading(false);
          fetchStatusBoardAll();

        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to register Board-Task",
            e.message
          )
        );
      });
  };

  const renderContent = () => {
    return (
      <Form
        layout="vertical"
        form={general_form}
        onFinish={Submit}
      >
        <Col style={{ width: "100%" }}>
            
            <Form.Item
              label="Task"
              rules={[
                {
                  required: true,
                  message: "Task Required!",
                },
              ]}
            >
              
              <Input
                allowClear
                size="large"
                style={{ width: '100%' }}
                onChange={(eve)=> {
                  console.log(eve)
                  setTask(eve.target.value)
                }}
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
        Add Task to Baord
      </Button>

      <>
        <Modal
          centered
          className="fixed-modal"
          width={500}
          title="Add Task to Baord"
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
  // category: state.project_task_category.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  // fetchStatusBoardAll : (action: any) => dispatch(fetchAllStatusBoard(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectBoardConcept);
