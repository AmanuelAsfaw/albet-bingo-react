import { Tag, Table, Statistic, Divider } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import PdfHeaderComponent from "../../../../../common/PdfHeader/PdfHeader.component";
import { PrintPropType } from "../../util/MaterialEvaluation.util";

import moment from "moment";
import { getInitials, zeroPad } from "../../../../../../utilities/utilities";
import { ColumnsType } from "antd/lib/table";
import SignatureComponent from "../../../../../common/Signature/Signature.component";
import Text from "antd/lib/typography/Text";

const PrintComponent: FC<PrintPropType> = ({
  material_evaluation,
  is_visible,
  setVisibility,
  project,
  index,
}) => {
  useEffect(() => {
    if (
      !material_evaluation.isPending &&
      is_visible &&
      material_evaluation.payload
    )
      window.print();
  }, [material_evaluation, is_visible]);

  window.onafterprint = () => {
    setVisibility(false);
  };

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

  return (
    <div className=" visible-print">
      {!material_evaluation.isPending ? (
        <>
          <PdfHeaderComponent type="consultant" />
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
          <div className="row mb-2">
            <div className="col-md-4">
              <Statistic
                title="Material Evaluation Type"
                value={material_evaluation.payload.type}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-4">
              <Statistic
                title="Material Evaluation No"
                value={material_evaluation.payload.evaluation_no}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-4">
              <Statistic
                title="Material Evaluation Date"
                value={moment(material_evaluation.payload.date).format(
                  "DD/MM/YYYY"
                )}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
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
              />
              <Table
                columns={spec_boq_columns}
                dataSource={
                  material_evaluation.payload.material_evaluation_boqs
                }
                pagination={false}
              />
              <Table
                columns={approval_rqt_columns}
                dataSource={
                  material_evaluation.payload.material_evaluation_approvals
                }
                pagination={false}
              />
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
          <div className="row mt-4 mb-4">
            <div className="col-sm-4">
              <div className="mt-2">
                <b>DESIGNER - ARCHITECT</b>
              </div>
              <div>
                Name - &nbsp;
                {material_evaluation?.payload.designer_architect_1 ?? "-"}
              </div>
              <div>Sign - </div>
              <div>Date -</div>
            </div>
            <div className="col-sm-4">
              <div className="mt-2">
                <b>DESIGNER - ARCHITECT</b>
              </div>
              <div>
                Name - &nbsp;
                {material_evaluation?.payload.designer_architect_2 ?? "-"}
              </div>
              <div>Sign - </div>
              <div>Date -</div>
            </div>
            <div className="col-sm-4">
              <div className="mt-2">
                <b>PROJECT COORDINATOR</b>
              </div>
              <div>
                Name - &nbsp;
                {material_evaluation?.payload.project_coordinator ?? "-"}
              </div>
              <div>Sign - </div>
              <div>Date -</div>
            </div>
          </div>
        </>
      ) : null}
    </div>
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrintComponent);
