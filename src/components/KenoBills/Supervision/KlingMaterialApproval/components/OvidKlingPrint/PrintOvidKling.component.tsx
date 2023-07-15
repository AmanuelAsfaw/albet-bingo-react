import { FC, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { PrintOvidKlingPropType } from "../../util/KlingMaterialApproval.util";
import ReactToPrint from "react-to-print";
import { Button, Checkbox } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import PrintHeaderComponent from "../../../../../common/PdfHeader/PrintHeader.component";
import { BASE_URI } from "../../../../../../redux/ApiCall";

const PrintOvidKlingComponent: FC<PrintOvidKlingPropType> = ({
  project,
  dataAction,
}) => {
  const [data, setData] = dataAction;
  window.onafterprint = () => setData(null);

  const amount = data?.kling_ma_submittal_information?.amount;
  const unit = data?.kling_ma_submittal_information?.unit;

  let formattedUnit = unit;

  if (unit === "m2") {
    formattedUnit = "m²";
  } else if (unit === "m3") {
    formattedUnit = "m³";
  }

  return (
    <div>
      <div className="visible-print col-lg-12">
        <PrintHeaderComponent
          docNo={"012"}
          pageNo={""}
          docName={"Material Approval Checklist"}
        />

        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Project Information</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 border-top border-right border-bottom border-dark">
            <h6>Client</h6>
            <h5>{project.payload?.client?.name ?? "-"}</h5>
          </div>
          <div className="col-md-6 border-top border-bottom border-dark">
            <h6>Consultant Firm</h6>
            <h5>{project.payload?.consultant?.name ?? "-"}</h5>
          </div>
          <div className="col-md-6 border-top border-right border-bottom border-dark">
            <h6>Project Title</h6>
            <h5>{project.payload?.name ?? "-"}</h5>
          </div>
          <div className="col-md-6 border-top border-bottom border-dark">
            <h6>Contractor</h6>
            <h5>{project.payload?.contractor?.name ?? "-"}</h5>
          </div>
          <div className="col-md-6 border-top border-right border-bottom border-dark">
            <h6>Project Location</h6>
            <h5>{project.payload?.location ?? "-"}</h5>
          </div>
          <div className="col-md-3 border-top border-bottom border-right border-dark">
            <h6>Contract No.</h6>
            <h5>{project.payload?.contract_no ?? "-"}</h5>
          </div>
          <div className="col-md-3 border-top border-bottom border-dark">
            <h6>Delivery Order No.</h6>
            <h5>{data?.deliver_order_no ?? "-"}</h5>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Submittal Information</h6>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-6 border-dark border-top border-bottom border-right">
                <h6>Submission Date</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom">
                <h6>{data?.kling_ma_submittal_information?.submission_date}</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom border-right">
                <h6>Issue No</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom">
                <h6>{data?.kling_ma_submittal_information?.issue_no}</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom border-right">
                <h6>Spec Division</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom">
                <h6>{data?.kling_ma_submittal_information?.spec_division}</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom border-right">
                <h6>Section</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom">
                <h6>{data?.kling_ma_submittal_information?.section}</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom border-right">
                <h6>No Pages in Submittal</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom">
                <h6>{data?.kling_ma_submittal_information?.no_pages}</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom border-right">
                <h6>Material Description</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom">
                <h6>{data?.kling_ma_submittal_information?.description}</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom border-right">
                <h6>Amount of Material</h6>
              </div>
              <div className="col-md-6 border-dark border-top border-bottom">
                <h6>
                  {amount} {formattedUnit}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 pl-4">
            <h6>Items Submitted</h6>

            {data?.kling_ma_submittal_information?.kling_ma_submittal_information_items.map(
              (e, i) => (
                <div className="d-block ml-2">
                  <Checkbox checked={e?.is_checked === true}>
                    {e.description}
                  </Checkbox>
                </div>
              )
            )}
          </div>
          <div className="col-md-4 border-dark border">
            <h6>Picture</h6>
            <img
              style={{ width: "100%", maxWidth: "400px" }}
              src={
                BASE_URI +
                "/" +
                data?.kling_ma_submittal_information?.document?.url
              }
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Purpose</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 border-dark border">
            <Checkbox checked={data?.is_approval === true}>Approval</Checkbox>
          </div>
          <div className="col-md-3 border-dark border">
            <Checkbox checked={data?.is_selection === true}>Selection</Checkbox>
          </div>
          <div className="col-md-3 border-dark border">
            <Checkbox checked={data?.is_shop === true}>
              Shop Drawing Approval
            </Checkbox>
          </div>
          <div className="col-md-3 border-dark border">
            <Checkbox checked={data?.is_others === true}>Others</Checkbox>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <ol>
              <li>
                Is Submitted item in Accordance with Contract Requirements
              </li>
              <li>Is Submitted Item Compatible with adjoining construction</li>
              <li>
                Is Submittal Complete with all the information requested on the
                technical specs
              </li>
              <li>
                Does Submittal meet specified standards (ASTM, ES, BS, EBCS)
              </li>
            </ol>
          </div>
          <div className="col-md-4">
            {data?.kling_ma_consultant_response?.kling_ma_consultant_response_items.map(
              (e, i) => (
                <div className="d-flex row">
                  <Checkbox checked={e?.yes === true}>Yes</Checkbox>
                  <Checkbox checked={e?.no === true}>No</Checkbox>
                </div>
              )
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Submitted By</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 border border-dark">
            <h6>Name: - {data?.submitted_by}</h6>
          </div>
          <div className="col-md-4 border border-dark">
            <h6>Signature:-</h6>
          </div>
          <div className="col-md-4 border border-dark">
            {" "}
            <h6>Date:-</h6>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Consultants Response</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 border border-dark">
            <Checkbox
              checked={
                data?.kling_ma_consultant_response?.is_approved_as === true
              }
            >
              A. Approved As is
            </Checkbox>
          </div>
          <div className="col-md-4 border border-dark">
            <Checkbox
              checked={
                data?.kling_ma_consultant_response?.is_approved_comments ===
                true
              }
            >
              B. Approved with Comments
            </Checkbox>
          </div>
          <div className="col-md-4 border border-dark">
            <Checkbox
              checked={data?.kling_ma_consultant_response?.is_resubmit === true}
            >
              C. Resubmit (After incorporating Comments)
            </Checkbox>
          </div>
          <div className="col-md-4 border border-dark">
            <Checkbox
              checked={data?.kling_ma_consultant_response?.is_rejected === true}
            >
              D. Rejected (See Comments)
            </Checkbox>
          </div>
          <div className="col-md-4 border border-dark">
            <Checkbox
              checked={data?.kling_ma_consultant_response?.is_ignored === true}
            >
              E. Ignored - Submittal not Regd
            </Checkbox>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <h6>
              APPROVAL OF THIS SUBMITTAL DOES NOT RELIEVE THE CONTRACTOR OF HIS
              OBLIGATION UNDER CONTRACT
            </h6>
            <p className="mt-2">
              {data?.kling_ma_consultant_response?.comment}
            </p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>
              Submitted Response By <b>Consultant</b>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 border border-dark">
            <h6>Name: - {data?.submitted_by}</h6>
          </div>
          <div className="col-md-4 border border-dark">
            <h6>Signature:-</h6>
          </div>
          <div className="col-md-4 border border-dark">
            {" "}
            <h6>Date:-</h6>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <h6>Response</h6>
            <h6>{data?.kling_ma_client_response?.comment}</h6>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>
              Submitted Response By <b>Client</b>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 border border-dark">
            <h6>
              Name: -{" "}
              {data?.kling_ma_client_response?.submitted_response_by_client}
            </h6>
          </div>
          <div className="col-md-4 border border-dark">
            <h6>Signature:-</h6>
          </div>
          <div className="col-md-4 border border-dark">
            {" "}
            <h6>Date:-</h6>
          </div>
        </div>

        <div className="page-break" />

        <PrintHeaderComponent
          docNo={"012"}
          pageNo={""}
          docName={"Material Approval Checklist"}
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Comment from Ovid-Kling</h6>
            <p className="mt-2">{data?.kling_ma_comment?.comment}</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Commented By</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 border border-dark">
            <h6>Name: - {data?.kling_ma_comment?.commented_by}</h6>
          </div>
          <div className="col-md-4 border border-dark">
            <h6>Signature:-</h6>
          </div>
          <div className="col-md-4 border border-dark">
            {" "}
            <h6>Date:-</h6>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Action</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Checkbox
              checked={data?.kling_ma_comment?.is_forwarded_to_expert === true}
            >
              Forwarded to Expert
            </Checkbox>
          </div>
          <div className="col-md-6">
            <Checkbox
              checked={data?.kling_ma_comment?.is_miss_document === true}
            >
              Miss Document from Supplier
            </Checkbox>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Comment from Reviewer</h6>
            <h6>
              <b>Quality Wise</b>
            </h6>
            <p className="mt-2">{data?.kling_ma_comment?.quality_wise}</p>
            <h6 className="mt-2">
              <b>Cost Wise</b>
            </h6>
            <p className="mt-2">{data?.kling_ma_comment?.cost_wise}</p>
            <h6 className="mt-2">
              <b>Installation Wise</b>
            </h6>
            <p className="mt-2">{data?.kling_ma_comment?.installation_wise}</p>
            <h6 className="mt-2">
              <b>Recommendation</b>
            </h6>
            <p className="mt-2">{data?.kling_ma_comment?.recommendation}</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Reviewed By</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 border border-dark">
            <h6>Name: - {data?.kling_ma_comment?.reviewed_by}</h6>
          </div>
          <div className="col-md-4 border border-dark">
            <h6>Signature:-</h6>
          </div>
          <div className="col-md-4 border border-dark">
            {" "}
            <h6>Date:-</h6>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h6>Decision</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Checkbox
              checked={
                data?.kling_ma_comment?.is_forwarded_to_consultant === true
              }
            >
              Forwarded to Consultant
            </Checkbox>
          </div>
          <div className="col-md-6">
            <Checkbox
              checked={data?.kling_ma_comment?.is_likely_not_to_be === true}
            >
              Likely Not To be Accepted
            </Checkbox>
          </div>
        </div>
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
)(PrintOvidKlingComponent);
