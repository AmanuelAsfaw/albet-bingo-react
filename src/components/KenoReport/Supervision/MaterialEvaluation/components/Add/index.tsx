import {
  AutoComplete,
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
import { FC, useState } from "react";
import { connect } from "react-redux";

import { PlusOutlined } from "@ant-design/icons";
import {
  AddMaterialEvaluationPropType,
  saveData,
  sendData,
  getData,
  clearData,
  MEItemType,
  SpecBoqType,
  ApprovalRqtType,
  InitialMEItemData,
  InitialApprovalRqtData,
  InitialSpecBoqData,
} from "../../util/MaterialEvaluation.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  MaterialEvaluationTypes,
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler, zeroPad } from "../../../../../../utilities/utilities";
import ApprovalComponent from "./components/ApprovalRqt/ApprovalRqt.component";
import SpecificationBoqComponent from "./components/SpecificationBoq/SpecificationBoq.component";
import EvaluationItemComponent from "./components/MaterialEvaluationItem/EvaluationItem.component";
import { fetchAllMaterialEvaluation } from "../../../../../../redux/MaterialEvaluation/MaterialEvaluation.action";

const AddMaterialEvaluationComponent: FC<AddMaterialEvaluationPropType> = ({
  material,
  fetchMaterialEvaluation,
  project,
  material_evaluations,
  users,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [evalNo, setEvalNo] = useState("");
  const [material_evaluation_items, setMaterialEvalItems] =
    useState<MEItemType[]>(InitialMEItemData);
  const [specification_boq, setSpecBoq] =
    useState<SpecBoqType[]>(InitialSpecBoqData);

  const [approval_rqt, setApprovalRqt] = useState<ApprovalRqtType[]>(
    InitialApprovalRqtData
  );

  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    console.log(form.getFieldsValue());
    saveData({
      ...form.getFieldsValue(),
      material_evaluation_items,
      specification_boq,
      approval_rqt,
    });
    setIsModalVisible(false);
  };

  const clearFields = () => {
    form.resetFields();
    setMaterialEvalItems(InitialMEItemData);
    setSpecBoq(InitialSpecBoqData);
    setApprovalRqt(InitialApprovalRqtData);
  };

  const Submit = (value: any) => {
    setLoading(true);
    setEvalNo(
      value.date +
        "/" +
        zeroPad(material_evaluations.payload.length + 1) +
        "/" +
        value.type.slice(0, 2).toUpperCase() +
        "/" +
        zeroPad(material_evaluations.payload.length + 1)
    );
    const data = {
      ...value,
      project_id: project.payload?.id,
      material_evaluation_items: material_evaluation_items,
      specification_boq: specification_boq,
      approval_rqt: approval_rqt,
    };
    sendData(data)
      .then(() => {
        fetchMaterialEvaluation({ project_id: project.payload?.id });
        clearData();
        clearFields();
        handleOk();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.MATERIAL_EVALUATION_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.MATERIAL_EVALUATION_FAILURE,
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
        Register Material Evaluation
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1200}
        title="Register Material Evaluation"
        visible={isModalVisible}
        onCancel={handleCancel}
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
            ...getData(),
            project_id: project.payload?.id,
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
              <Form.Item label="Material Evaluation No">
                <Input
                  value={zeroPad(material_evaluations.payload.length + 1)}
                />
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
                rules={[{ message: "Evaluation no Required!", required: true }]}
              >
                <Input placeholder="Evaluation no" value={evalNo} />
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="row">
            <div className="col-md-12">
              <EvaluationItemComponent
                dataAction={[material_evaluation_items, setMaterialEvalItems]}
              />
              <SpecificationBoqComponent
                dataAction={[specification_boq, setSpecBoq]}
              />
              <ApprovalComponent dataAction={[approval_rqt, setApprovalRqt]} />
            </div>
          </div>

          <div className="mt-2">
            <p>Note:-</p>
            <p>*** Mandatory requirements need to be fulfilled</p>
            <p>A-Document reviewed, no comment and work can commence</p>
            <p>
              B-Document reviewed ,comment noted and work can commence taking on
              board comments
            </p>
            <p>
              C-Document reviewed comment noted , no work is allowed to commence
              and revise & resubmit document for approval
            </p>
            <p>D-Fully Rejected</p>
          </div>

          <div className="row">
            <div className="col-md-4 pt-2">
              <Form.Item label="Designer" name="designer_architect_1">
                <Select allowClear>
                  {users.payload.map((emp: any, index: any) => (
                    <Select.Option value={emp.full_name}>
                      {emp.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item label="Designer Architect" name="designer_architect_2">
                <Select allowClear>
                  {users.payload.map((emp: any, index: any) => (
                    <Select.Option value={emp.full_name}>
                      {emp.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item label="Project Coordinator" name="project_coordinator">
                <Select allowClear>
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
  material: state.material.fetchAll,
  project: state.project.fetchOne,
  material_evaluations: state.material_evaluation.fetchAll,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMaterialEvaluation: (action: any) =>
    dispatch(fetchAllMaterialEvaluation(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMaterialEvaluationComponent);
