import { Checkbox, Table, Statistic, Descriptions } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { PrintRequestPropType } from "../../util/MaterialApproval.util";
import { getRevisionNumber } from "../../../../../../../utilities/utilities";
import moment from "moment";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";
import SignatureComponent from "../../../../../../common/Signature/Signature.component";

const PrintRequestComponent: FC<PrintRequestPropType> = ({
  material_request_approval,
  project,
  material_request_approvals,
  is_visible,
  setVisibility,
  setSelected,
}) => {
  window.onafterprint = () => {
    setVisibility(false);
    setSelected(null);
  };

  useEffect(() => {
    if (material_request_approval && is_visible) window.print();
  }, [material_request_approval, is_visible]);

  return (
    <div className="col-lg-12 visible-print">
      <PdfHeaderComponent type="consultant" />
      <div className="row mt-4">
        <div className="col-sm-6">
          <div>
            <b>Project - </b>
            {project?.payload.name ?? "Not Specified"}
          </div>
          <div>
            <b>Client- </b>
            {project?.payload.client?.name ?? "Not Specified"}
          </div>
          <div>
            <b>Consultant - </b>
            {project?.payload?.consultant?.name ?? "Not Specified"}
          </div>
          <div>
            <b>Contractor - </b>
            {project?.payload?.contractor?.name ?? "Not Specified"}
          </div>
        </div>
        <div className="col-sm-6 text-right">
          <div>
            <b>Project Manager - </b>
            {"-"}
          </div>
          <div>
            <b>Project No - </b>
            {project?.payload.id ?? "-"}
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <h6 style={{ fontWeight: "bold", textAlign: "center" }}>
            {material_request_approval?.type}
          </h6>
          <h6 style={{ fontWeight: "bold", color: "red", textAlign: "center" }}>
            Evaluation No: {material_request_approval?.id}{" "}
          </h6>
          <h6 style={{ fontWeight: "bold", color: "red", textAlign: "center" }}>
            Revision No :{" "}
            {getRevisionNumber(
              material_request_approvals.payload,
              material_request_approval?.id,
              material_request_approval?.ref
            )}
          </h6>
        </div>
      </div>

      <Descriptions title={material_request_approval?.description} bordered>
        <Descriptions.Item label="Date">
          {material_request_approval?.date}
        </Descriptions.Item>
        <Descriptions.Item label="Sec. S/C Ref." span={2}>
          {"-"}
        </Descriptions.Item>
        <Descriptions.Item label="Material Trade Name">
          {material_request_approval?.trade_no}
        </Descriptions.Item>
        <Descriptions.Item label="Manufacturer / Supplier">
          {material_request_approval?.manufacturer}
        </Descriptions.Item>
        <Descriptions.Item label="Country of Origin">
          {material_request_approval?.country_of_origin}
        </Descriptions.Item>
        <Descriptions.Item label="Discipline">
          {material_request_approval?.discipline}
        </Descriptions.Item>
        <Descriptions.Item label="Location / Area of Use">
          {material_request_approval?.local_area_of_use}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Technical Details of Proposed Material">
          {material_request_approval?.technical_detail}
        </Descriptions.Item>
      </Descriptions>

      <div className="row mt-2">
        <div className="col-lg-12">
          <Table
            size="small"
            pagination={false}
            columns={[
              {
                title: "",
                render: (value, record, index) => index + 1,
              },
              {
                title: "",
                dataIndex: "description",
              },
              {
                title: "Yes",
                render: (value, record) => (
                  <Checkbox checked={record.checked ? true : false} />
                ),
              },
              {
                title: "N/A",
                render: (value, record) => (
                  <Checkbox checked={!record.checked} />
                ),
              },
            ]}
            dataSource={[
              {
                description: "Samples Submitted",
                checked:
                  material_request_approval?.material_attachment
                    ?.sample_submitted,
              },
              {
                description: "Original Brochure",
                checked:
                  material_request_approval?.material_attachment
                    ?.original_brochure,
              },
              {
                description: "Other supporting documents attached",
                checked: material_request_approval?.material_attachment?.other,
              },
            ]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 mt-4 mb-2">
          <h6>For Contractor</h6>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-lg-3">
          <Statistic
            title="Approval"
            value={
              material_request_approval?.approved
                ? "Approved"
                : material_request_approval?.approved_with_comment
                ? "Approved With Comment"
                : material_request_approval?.revise_and_submit
                ? "Revise and Resubmit"
                : material_request_approval?.rejected
                ? "Rejected"
                : "Pending"
            }
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
        <div className="col-lg-6">
          <Statistic
            title="Consultant Comments"
            value={material_request_approval?.comment}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div style={{ fontSize: "13px" }}>
            {/* <b>Name - </b> */}
            {
              material_request_approval?.material_approval_prepared_by
                ?.full_name
            }
          </div>
          <SignatureComponent
            user={material_request_approval?.material_approval_prepared_by}
          />
          <div style={{ fontSize: "13px" }}>
            {/* <b>Designation - </b> */}
            {material_request_approval?.material_approval_prepared_by?.role}
          </div>
          <div style={{ fontSize: "13px" }}>
            {/* <b>Date - </b> */}
            {moment(material_request_approval?.date).format("DD/MM/YYYY")}
          </div>
        </div>
        {material_request_approval?.approved ||
        material_request_approval?.approved_with_comment ? (
          <div className="col-lg-6">
            <div style={{ fontSize: "13px" }}>
              <b>Approved By - </b>
              {
                material_request_approval?.material_approval_approved_by
                  ?.full_name
              }
            </div>
            <SignatureComponent
              user={material_request_approval.material_approval_approved_by}
            />
          </div>
        ) : null}
      </div>
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
  material_request_approvals: state.material_request_approval?.fetchAll,
  user: state.user.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintRequestComponent);
