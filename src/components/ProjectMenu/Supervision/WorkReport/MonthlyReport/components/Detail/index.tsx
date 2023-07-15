import { Button, Form, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { MonthlyReportDetailPropType } from "../../util/MonthlyReport.util";
import { getDetailData } from "../../util/MonthlyReport.util";
import ReportComponent from "./components/Report/Report.component";
import ContractComponent from "./components/Contract/Contract.component";
import ConstructionStatusComponent from "./components/ConstructionStatus/ConstructionStatus.component";
import QcComponent from "./components/Qc/Qc.component";
import DifficultiesComponent from "./components/Difficulties/Difficulties.component";
import InstructionComponent from "./components/Instruction/Instruction.component";
import EvaluationComponent from "./components/Evaluation/Evaluation.component";
import VariationComponent from "./components/Variation/Variation.component";
import ClaimComponent from "./components/Claimes/Claim.component";
import MeetingComponent from "./components/Meeting/Meeting.component";
import ProgressComponent from "./components/Progress/Progress.component";
import ManpowerComponent from "./components/Manpower/Manpower.component";
import GeneralRemarkComponent from "./components/GeneralRemark/GeneralRemark.component";
import PhotoComponent from "./components/Photo/Photo.component";
import SummaryComponent from "./components/Summary/Summary.component";
import BoqExecutedComponent from "./components/BoqExecuted/BoqExecuted.component";
import PaymentComponent from "./components/Payment/Payment.component";
const DetailComponent: FC<MonthlyReportDetailPropType> = ({
  monthly_reports,
  index,
  project,
  site_order,
  weekly_reports,
  test_results,
  meetings,
  type,
  payments,
  weekly_plans,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (isModalVisible)
      setData(
        getDetailData(
          monthly_reports,
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
    isModalVisible,
    monthly_reports,
    project,
    test_results,
    site_order,
    weekly_reports,
    meetings,
    payments,
    index,
    weekly_plans,
  ]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        {type === "summary" ? "Detail" : "One Page Summary"}
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1500}
        title="Monthly-Summary Detail"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        <Form layout="vertical">
          {type === "summary" ? (
            <>
              <ReportComponent data={data} />
              <ContractComponent data={data} />
              <PaymentComponent data={data} />
              <ConstructionStatusComponent data={data} />
              <BoqExecutedComponent data={data} />
              <QcComponent data={data} />
              <DifficultiesComponent data={data} />
              <InstructionComponent data={data} />
              <EvaluationComponent data={data} />
              <VariationComponent data={data} />
              <ClaimComponent data={data} />
              <MeetingComponent data={data} />
              <ProgressComponent data={data} />
              <ManpowerComponent data={data} />
              <GeneralRemarkComponent data={data} />
              <PhotoComponent data={data} />
            </>
          ) : (
            <SummaryComponent data={data} />
          )}
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
  project: state.project.fetchOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
