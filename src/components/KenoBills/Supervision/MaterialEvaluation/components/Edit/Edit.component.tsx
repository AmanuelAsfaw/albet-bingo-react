import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Statistic,
  TimePicker,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";

import { EditOutlined } from "@ant-design/icons";
import {
  EditMaterialEvaluationPropType,
  editData,
} from "../../util/MaterialEvaluation.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  MaterialEvaluationTypes,
  MeetingType,
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler, zeroPad } from "../../../../../../utilities/utilities";

import {
  fetchAllMaterialEvaluation,
  fetchOneMaterialEvaluation,
} from "../../../../../../redux/MaterialEvaluation/MaterialEvaluation.action";

import moment from "moment";
import ApprovalComponent from "../Add/components/ApprovalRqt/ApprovalRqt.component";
import SpecificationBoqComponent from "../Add/components/SpecificationBoq/SpecificationBoq.component";
import EvaluationItemComponent from "../Add/components/MaterialEvaluationItem/EvaluationItem.component";
import LoadingIndicator from "../../../../../common/Loading";

const EditMeetingComponent: FC<EditMaterialEvaluationPropType> = ({
  fetchMaterialEvaluations,
  project,
  material_evaluations,
  material_evaluation,
  users,
  id,
  fetchMaterialEvaluation,
  index,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [material_evaluation_items, setMaterialEvalItems] = useState([
    { key: Date.now() },
  ]);
  const [material_evaluation_boqs, setSpecBoq] = useState([
    { key: Date.now() },
  ]);
  const [material_evaluation_approvals, setApprovalRqt] = useState([
    { key: Date.now() },
  ]);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchMaterialEvaluation(id);
  }, [fetchMaterialEvaluation, id]);

  useEffect(() => {
    if (material_evaluation.payload) {
      setMaterialEvalItems(
        material_evaluation.payload.material_evaluation_items?.map(
          (e, index) => ({
            key: index,
            ...e,
          })
        )
      );
      setSpecBoq(
        material_evaluation.payload.material_evaluation_boqs?.map(
          (e, index) => ({
            key: index,
            ...e,
          })
        )
      );
      setApprovalRqt(
        material_evaluation.payload.material_evaluation_approvals?.map(
          (e, index) => ({
            key: index,
            ...e,
          })
        )
      );

      form.setFieldsValue({
        date: moment(material_evaluation.payload?.date),
        evaluation_no: material_evaluation.payload.evaluation_no,
        type: material_evaluation.payload.type,
        designer_architect_1: material_evaluation.payload.designer_architect_1,
        designer_architect_2: material_evaluation.payload.designer_architect_2,
        project_coordinator: material_evaluation.payload.project_coordinator,
        material_evaluation_boq: material_evaluation_boqs,
        material_evaluation_items: material_evaluation_approvals,
      });
    }
  }, [material_evaluation, form]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      project_id: project.payload?.id,
      material_evaluation_items: material_evaluation_items,
      specification_boq: material_evaluation_boqs,
      approval_rqt: material_evaluation_approvals,
      id: material_evaluation.payload.id,
    };

    editData(data)
      .then(() => {
        fetchMaterialEvaluations({ project_id: project.payload?.id });
        handleOk();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.MATERIAL_EVALUATION_UPDATE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.MATERIAL_EVALUATION_UPDATE_FAILED,
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
        width={1000}
        title="Edit Material Evaluation"
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
        {material_evaluation.isPending ? (
          <LoadingIndicator />
        ) : (
          <Form
            layout="vertical"
            onFinish={Submit}
            form={form}
            initialValues={{
              ...material_evaluation.payload,
              date: moment(material_evaluation.payload?.date),
              evaluation_no: material_evaluation.payload.evaluation_no,
              type: material_evaluation.payload.type,
              designer_architect_1:
                material_evaluation.payload.designer_architect_1,
              designer_architect_2:
                material_evaluation.payload.designer_architect_2,
              project_coordinator:
                material_evaluation.payload.project_coordinator,
            }}
          >
            <div className="row">
              <div className="col-md-4">
                <Statistic
                  title="Contractor"
                  value={project.payload?.contractor?.name}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
              <div className="col-md-4">
                <Statistic
                  title="Client"
                  value={project.payload?.client?.name}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
              <div className="col-md-4">
                <Statistic
                  title="Project title"
                  value={project.payload?.name}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
            </div>

            <Divider />
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  label="Material Evaluation Type"
                  name="type"
                  rules={[
                    {
                      message: "Material Evaluation Type Required!",
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select">
                    <Select.Option
                      key="0"
                      value={MaterialEvaluationTypes.ARCHITECTURAL}
                    >
                      {MaterialEvaluationTypes.ARCHITECTURAL}
                    </Select.Option>
                    <Select.Option
                      key="1"
                      value={MaterialEvaluationTypes.PLUMBING}
                    >
                      {MaterialEvaluationTypes.PLUMBING}
                    </Select.Option>
                    <Select.Option
                      key="2"
                      value={MaterialEvaluationTypes.ELECTRICAL}
                    >
                      {MaterialEvaluationTypes.ELECTRICAL}
                    </Select.Option>
                    <Select.Option
                      key="3"
                      value={MaterialEvaluationTypes.FINISHING}
                    >
                      {MaterialEvaluationTypes.FINISHING}
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Material Evaluation Date"
                  name="date"
                  rules={[
                    {
                      message: "Material Evaluation Date Required!",
                      required: true,
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Evaluation no"
                  name="evaluation_no"
                  rules={[
                    { message: "Evaluation no Required!", required: true },
                  ]}
                >
                  <Input placeholder="Evaluation no" />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <EvaluationItemComponent
                  dataAction={[material_evaluation_items, setMaterialEvalItems]}
                />
                <SpecificationBoqComponent
                  dataAction={[material_evaluation_boqs, setSpecBoq]}
                />
                <ApprovalComponent
                  dataAction={[material_evaluation_approvals, setApprovalRqt]}
                />
              </div>
            </div>
            <div className="mt-2">
              <p>Note:-</p>
              <p>*** Mandatory requirements need to be fulfilled</p>
              <p>A-Document reviewed, no comment and work can commence</p>
              <p>
                B-Document reviewed ,comment noted and work can commence taking
                on board comments
              </p>
              <p>
                C-Document reviewed comment noted , no work is allowed to
                commence and revise & resubmit document for approval
              </p>
              <p>D-Fully Rejected</p>
            </div>
            <div className="row">
              <div className="col-md-4 pt-2">
                <Form.Item
                  label="Designer Achitect"
                  name="designer_architect_1"
                >
                  <Select>
                    {users.payload.map((emp: any, index: any) => (
                      <Select.Option value={emp.full_name}>
                        {emp.full_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4 pt-2">
                <Form.Item
                  label="Designer Architect"
                  name="designer_architect_1"
                >
                  <Select>
                    {users.payload.map((emp: any, index: any) => (
                      <Select.Option value={emp.full_name}>
                        {emp.full_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="col-md-4 pt-2">
                <Form.Item
                  label="Project Coordinator"
                  name="project_coordinator"
                >
                  <Select>
                    {users.payload.map((emp: any, index: any) => (
                      <Select.Option value={emp.full_name}>
                        {emp.full_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </Form>
        )}
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
  material_evaluations: state.material_evaluation.fetchAll,
  material_evaluation: state.material_evaluation.fetchOne,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMaterialEvaluations: (action: any) =>
    dispatch(fetchAllMaterialEvaluation(action)),
  fetchMaterialEvaluation: (action: any) =>
    dispatch(fetchOneMaterialEvaluation(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMeetingComponent);
