import { Statistic } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import PdfHeaderComponent from "../../../../../common/PdfHeader/PdfHeader.component";
import { getRevisionNumber } from "../../../../../../utilities/utilities";
import SignatureComponent from "../../../../../common/Signature/Signature.component";
import { getRefNumber, PrintPropType } from "../../util/Submittal.util";
import { ApprovalValue } from "../../../../../../constants/Constants";

const PrintComponent: FC<PrintPropType> = ({
  submittal,
  submittals,
  is_visible,
  setSelected,
  setVisibility,
  project,
  type,
}) => {
  useEffect(() => {
    if (submittal && is_visible) window.print();
  }, [submittal, is_visible]);

  window.onafterprint = () => {
    setVisibility(false);
    setSelected(null);
  };

  const getStatus = (submittal: any) => {
    if (submittal.approval === ApprovalValue.PENDING) return "Pending";
    else if (submittal.approval === ApprovalValue.REJECTED)
      return "Revise and Resubmit";
    else return "Approved";
  };

  return (
    <div className="visible-print">
      {submittal ? (
        <>
          <div className="row">
            <PdfHeaderComponent type="consultant" />
          </div>
          <div className="row">
            <div className="col-md-6 mt-1">
              <Statistic
                title="Project"
                value={project.payload?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-6 mt-1">
              <Statistic
                title="Contractor"
                value={project.payload?.contractor?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-1">
              <Statistic
                title="Consultant"
                value={project.payload?.consultant?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-6 mt-1">
              <Statistic
                title="Employer"
                value={project.payload?.client?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-1">
              <Statistic
                title="Submittal Type"
                value={type}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-6 mt-1">
              <Statistic
                title="Submittal Reference"
                value={getRefNumber(
                  type,
                  submittal.ref === null ? submittal.id : submittal.ref
                )}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-1">
              <Statistic
                title="Revision No"
                value={getRevisionNumber(
                  submittals.payload.submittal_items,
                  submittal.id,
                  submittal.ref
                )}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-6 mt-1">
              <Statistic
                title="Action"
                value={submittal.action}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-6 mt-1">
              <Statistic
                title="Status"
                value={getStatus(submittal)}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>
          <div className="row print-footer">
            <div className="col-md-6">
              <Statistic
                title="Action by"
                value={submittal.submittal_action_by.full_name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            {submittal.approval ? (
              <div className="col-md-6">
                <SignatureComponent user={submittal.submittal_action_by} />
              </div>
            ) : null}{" "}
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
  submittals: state.submittal.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrintComponent);
