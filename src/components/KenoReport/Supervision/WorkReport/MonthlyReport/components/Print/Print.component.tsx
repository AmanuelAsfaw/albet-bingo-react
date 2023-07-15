import { Layout } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";
import {
  MonthlyPrintPropType,
  getDetailData,
} from "../../util/MonthlyReport.util";
import ClaimComponent from "../Detail/components/Claimes/Claim.component";
import ConstructionStatusComponent from "../Detail/components/ConstructionStatus/ConstructionStatus.component";
import ContractComponent from "../Detail/components/Contract/Contract.component";
import DifficultiesComponent from "../Detail/components/Difficulties/Difficulties.component";
import EvaluationComponent from "../Detail/components/Evaluation/Evaluation.component";
import GeneralRemarkComponent from "../Detail/components/GeneralRemark/GeneralRemark.component";
import InstructionComponent from "../Detail/components/Instruction/Instruction.component";
import ManpowerComponent from "../Detail/components/Manpower/Manpower.component";
import MeetingComponent from "../Detail/components/Meeting/Meeting.component";
import PhotoComponent from "../Detail/components/Photo/Photo.component";
import ProgressComponent from "../Detail/components/Progress/Progress.component";
import QcComponent from "../Detail/components/Qc/Qc.component";
import ReportComponent from "../Detail/components/Report/Report.component";
import VariationComponent from "../Detail/components/Variation/Variation.component";
import SummaryComponent from "../Detail/components/Summary/Summary.component";
import moment from "moment";
const PrintRequestComponent: FC<MonthlyPrintPropType> = ({
  dataAction,
  visibilityAction,
  meetings,
  index,
  project,
  site_order,
  test_results,
  weekly_reports,
  payments,
  type,
  weekly_plans,
}) => {
  const [data, setData] = dataAction;
  const [is_visible, setVisibility] = visibilityAction;

  const [parsed, setParsed] = useState<any>(null);

  window.onafterprint = () => {
    setVisibility(false);
    setData(null);
    setParsed(null);
  };
  const { Footer } = Layout;
  useEffect(() => {
    if (data && is_visible && parsed) window.print();
  }, [data, is_visible, parsed]);

  useEffect(() => {
    if (data)
      setParsed(
        getDetailData(
          data,
          project.payload,
          test_results.payload,
          site_order.payload,
          weekly_reports.payload,
          weekly_plans.payload,
          meetings.payload,
          payments.payload,

          index
        )
      );
  }, [
    data,
    weekly_plans,
    project.payload,
    test_results.payload,
    site_order.payload,
    weekly_reports.payload,
    meetings.payload,
    payments.payload,
    index,
  ]);

  return (
    <div className="col-lg-12 visible-print">
      {parsed ? (
        type === "detail" ? (
          <>
            {/* <header
              style={{
                position: "fixed",
                top: "0",
                bottom: "0",
                right: "0",
                left: "0",
                margin: "auto",
                width: "100%",
                height: "100px",
                marginBottom: "100px",
                zIndex: "1",
              }}
            >
              <Image src={pic} width="100px" className="mb-4" />
            </header> */}
            <Footer
              style={{
                position: "fixed",
                bottom: "0",
                width: "60%",
                height: "40px",
              }}
            >
              {/* <h6></h6> */}
            </Footer>

            <div id="pageFooter">Page </div>
            <PdfHeaderComponent type="consultant" />
            <h2 className="text-center">{`Monthly Report Format of ${moment(
              data.date
            ).format("MMMM")}`}</h2>
            <ReportComponent data={parsed} />
            <ContractComponent data={parsed} />
            <div className="page-break"></div>
            <ConstructionStatusComponent data={parsed} />
            <div className="page-break"></div>
            <QcComponent data={parsed} />
            <div className="page-break"></div>
            <DifficultiesComponent data={parsed} />
            <div className="page-break"></div>
            <InstructionComponent data={parsed} />
            <div className="page-break"></div>
            <EvaluationComponent data={parsed} />
            <div className="page-break"></div>
            <VariationComponent data={parsed} />
            <div className="page-break"></div>
            <ClaimComponent data={parsed} />
            <div className="page-break"></div>
            <MeetingComponent data={parsed} />
            <div className="page-break"></div>
            <ProgressComponent data={parsed} />
            <div className="page-break"></div>
            <ManpowerComponent data={parsed} />
            <div className="page-break"></div>
            <GeneralRemarkComponent data={parsed} />
            <div className="page-break"></div>
            <PhotoComponent data={parsed} />
          </>
        ) : (
          <>
            <style type="text/css" media="print">
              {
                "\
                @page {size: A4 landscape;margin:0}\
              "
              }
            </style>

            <div className="print-blue">
              <SummaryComponent data={parsed} />
            </div>
          </>
        )
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
  master_schedules: state.master_schedule.fetchAll,
  test_results: state.test_result.fetchAll,
  site_order: state.site_book.fetchAll,
  variations: state.variation_file.fetchAll,
  weekly_reports: state.week_report.fetchAll,
  meetings: state.meeting.fetchAll,
  payments: state.payments.fetchAll,
  weekly_plans: state.weekly_plan.fetchAll,
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
