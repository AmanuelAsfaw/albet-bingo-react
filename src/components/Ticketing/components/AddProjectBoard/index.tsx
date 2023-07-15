import React, { FC, useEffect, useState } from "react";
import { CreateProjectBoard, ConceptType } from "../../util/Ticketing.util";
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
import { log } from "mathjs";
import { fetchAllStatusBoard } from "../../../../redux/StatusBoard/StatusBoard/StatusBoard.saga";

interface Props {
  projects: Project[];
  fetchStatusBoardAll: Function;
}

const AddProjectBoardConcept: FC<Props> = ({ fetchStatusBoardAll, projects }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id: projectId } = useParams();

  const [boardProject, setBoardProject] = useState<any>({});

  const [loading, setLoading] = useState(false);
  const [general_form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (name: string, value: any) => {
    const newData = boardProject;
    let item = { ...newData, [name]: value };
    setBoardProject(item);
  };

  const Submit = async () => {
    setLoading(true);

    CreateProjectBoard({
      project_id: boardProject.id,
      priority: 1,      
    })
      .then(() => {
        setTimeout(() => {
          handleOk();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.BOARD_PROJECT_REGISTERED_SUCCESS,
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
            Message.BOARD_PROJECT_REGISTERED_FAIL,
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
              label="Project"
              rules={[
                {
                  required: true,
                  message: "Project Required!",
                },
              ]}
            >
              
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={(eve)=> {
                  console.log(eve)
                  setBoardProject({...boardProject, id: projects.find((x) => eve == x.name)?.id})
                }}
                options={projects
                  //   .filter((report) => report !== "")
                    .map((project) => {return { lable: project.name, value:project.name}})}
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
        Add Project
      </Button>

      <>
        <Modal
          centered
          className="fixed-modal"
          width={500}
          title="Add Project to Board"
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
  // projects: state.project.fetchAll,
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
