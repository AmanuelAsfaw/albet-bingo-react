import {
  Button,
  Form,
  Input,
  Modal,
  Tag,
  Table,
  Select,
  Statistic,
  Divider,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";

import { EyeOutlined } from "@ant-design/icons";
import {
  ApprovalRqtType,
  DetailPropType,
  MEItemType,
  SpecBoqType,
} from "../../util/MaterialEvaluation.util";

import {
  fetchAllMaterialEvaluation,
  fetchOneMaterialEvaluation,
} from "../../../../../../redux/MaterialEvaluation/MaterialEvaluation.action";

import moment from "moment";
import { getInitials, zeroPad } from "../../../../../../utilities/utilities";
import { ColumnsType } from "antd/lib/table";
import SignatureComponent from "../../../../../common/Signature/Signature.component";
import Text from "antd/lib/typography/Text";
import LoadingIndicator from "../../../../../common/Loading";

const DetailComponent: FC<DetailPropType> = ({
  fetchMaterialEvaluation,
  project,
  material_evaluation,
  material_evaluation_id,
  index,
  users,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const eval_items_columns: ColumnsType<any> = [
    {
      title: "No",
      width: "4%",
      render: (record, data, index) => zeroPad(index + 1, 2),
    },
    {
      title: "Material",
      dataIndex: "material",
      width: "10%",
      render: (record, data, index) => data.material,
    },
    {
      title: "Item No",
      dataIndex: "item_no",
      width: "10.5%",
      key: "item_no",
      render: (record, data, index) => data.item_no,
    },
    {
      title: "Specification and Approval Requirement",
      width: "28.2%",
      dataIndex: "spec_and_rqt",
      key: "spec_and_rqt",
      render: (record, data, index) => data.spec_and_rqt,
    },
    {
      title: "Contractor submittal",
      width: "10%",
      dataIndex: "contractor_submittal",
      key: "contractor_submittal",
      render: (record, data, index) => data.contractor_submittal,
    },
    {
      title: "Comment",
      width: "18.6%",
      dataIndex: "comment",
      key: "comment",
      render: (record, data, index) => data.comment,
    },
    {
      title: "Status  A B C D",
      width: "12%",
      dataIndex: "status",
      key: "status",
      render: (record, data) => data.status,
    },
  ];
  const spec_boq_columns: ColumnsType<any> = [
    {
      width: "4%",
      render: (record, data, index) => zeroPad(index + 1, 2),
    },
    {
      width: "10%",
      render: (record, data) => "",
    },
    {
      width: "10.5%",
      render: (record, data) => "",
    },
    {
      width: "28.2%",
      dataIndex: "spec_and_rqt",
      key: "spec_and_rqt",
      render: (record, data, index) => data.spec_and_rqt,
    },
    {
      width: "10%",
      dataIndex: "contractor_submittal",
      key: "contractor_submittal",
      render: (record, data, index) => data.contractor_submittal,
    },
    {
      width: "18.6%",
      dataIndex: "comment",
      key: "comment",
      render: (record, data, index) => data.comment,
    },
    {
      width: "12%",
      key: "status",
      render: (record, data) => "",
    },
  ];
  const approval_rqt_columns: ColumnsType<any> = [
    {
      width: "4%",
      render: (record, data, index) => "",
    },
    {
      width: "10%",
      render: (record, data, index) => "",
    },
    {
      width: "10.5%",
      key: "item_no",
      render: (record, data, index) => "",
    },
    {
      width: "28.2%",
      dataIndex: "spec_and_rqt",
      key: "spec_and_rqt",
      render: (record, data, index) => data.spec_and_rqt,
    },
    {
      width: "10%",
      dataIndex: "contractor_submittal",
      key: "contractor_submittal",
      render: (record, data, index) => data.contractor_submittal,
    },
    {
      width: "18.6%",
      dataIndex: "comment",
      key: "comment",
      render: (record, data, index) => data.comment,
    },
    {
      width: "12%",
      key: "status",
    },
  ];

  useEffect(() => {
    if (isModalVisible) fetchMaterialEvaluation(material_evaluation_id);
  }, [material_evaluation_id, fetchMaterialEvaluation, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Detail
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1200}
        title="Material Evaluation Detail"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        {material_evaluation.isPending ? (
          <LoadingIndicator />
        ) : (
          <Form layout="vertical">
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
                <Form.Item label="Material Evaluation Type">
                  <Input value={material_evaluation.payload.type} />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Material Evaluation No">
                  <Input value={material_evaluation.payload.evaluation_no} />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Material Evaluation Date">
                  <Input
                    value={moment(material_evaluation.payload.date).format(
                      "DD/MM/YYYY"
                    )}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table
                  columns={eval_items_columns}
                  dataSource={
                    material_evaluation.payload.material_evaluation_items
                  }
                  pagination={false}
                  bordered={true}
                  size="small"
                />
                <Table
                  columns={spec_boq_columns}
                  dataSource={
                    material_evaluation.payload.material_evaluation_boqs
                  }
                  pagination={false}
                  bordered={true}
                  size="small"
                />
                <Table
                  columns={approval_rqt_columns}
                  dataSource={
                    material_evaluation.payload.material_evaluation_approvals
                  }
                  pagination={false}
                  bordered={true}
                  size="small"
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
                <Form.Item label="Designer Achitect">
                  <Input
                    value={material_evaluation.payload.designer_architect_1}
                  />
                </Form.Item>
              </div>
              <div className="col-md-4 pt-2">
                <Form.Item label="Designer Architect">
                  <Input
                    value={material_evaluation.payload.designer_architect_2}
                  />
                </Form.Item>
              </div>
              <div className="col-md-4 pt-2">
                <Form.Item label="Project Coordinator">
                  <Input
                    value={material_evaluation.payload.project_coordinator}
                  />
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
  material_evaluation: state.material_evaluation.fetchOne,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMaterialEvaluation: (action: any) =>
    dispatch(fetchOneMaterialEvaluation(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
