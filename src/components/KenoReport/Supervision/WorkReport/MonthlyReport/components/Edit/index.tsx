import { Button, Modal, Steps } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  updateData,
  parseBeforeRegister,
  EditMonthlyReportPropType,
  parsedEditData,
} from "../../util/MonthlyReport.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { fetchAllMonthlyReport } from "../../../../../../../redux/MonthlyReport/MonthlyReport.action";
import ReportComponent from "./components/Report/Report.component";
import ContractSummaryComponent from "../Add/components/ContractSummary/ContractSummary.component";
import ConstructionStatusComponent from "../Add/components/ConstructionStatus/ConstructionStatus.component";
import QcComponent from "../Add/components/QC/Qc.component";
import DifficultyComponent from "../Add/components/Difficulty/Difficulty.component";
import InstructionComponent from "../Add/components/Instruction/Instruction.component";
import EvaluationComponent from "../Add/components/Evaluation/Evaluation.component";
import VariationComponent from "../Add/components/Variation/Variation.component";
import ClaimComponent from "../Add/components/Claim/Claim.component";
import MeetingComponent from "../Add/components/Meeting/Meeting.component";
import ProgressComponent from "../Add/components/Progress/Progress.component";
import ManpowerComponent from "../Add/components/Manpower/Manpower.component";
import BoqExecutedComponent from "../Add/components/BoqExecuted/BoqExecuted.component";
import PaymentComponent from "../Add/components/Payment/Payment.component";
import IntroductionComponent from "../Add/components/Introduction/introduction.component";

const EditComponent: FC<EditMonthlyReportPropType> = ({
  fetchMonthlyReports,

  monthly_report,
  project,
  test_results,
  site_order,

  weekly_reports,
  meetings,
  staff_works,
  medias,
  payments,
  index,
  weekly_plans,
}) => {
  const { Step } = Steps;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<any>(null);

  const [submitReport, setSubmitReport] = useState(false);
  const [resetReport, setResetReport] = useState(false);
  const [submitContractSummary, setSubmitContractSummary] = useState(false);
  const [resetContractSummary, setResetContractSummary] = useState(false);
  const [submitQc, setSubmitQc] = useState(false);
  const [resetQc, setResetQc] = useState(false);
  const [submitConstructionStatus, setSubmitConstructionStatus] =
    useState(false);
  const [resetConstructionStatus, setResetConstructionStatus] = useState(false);
  const [submitDifficulty, setSubmitDifficulty] = useState(false);
  const [resetDifficulty, setResetDifficulty] = useState(false);
  const [submitInstruction, setSubmitInstruction] = useState(false);
  const [resetInstruction, setResetInstruction] = useState(false);
  const [submitEvaluation, setSubmitEvaluation] = useState(false);
  const [resetEvaluation, setResetEvaluation] = useState(false);
  const [submitVariation, setSubmitVariation] = useState(false);
  const [resetVariation, setResetVariation] = useState(false);
  const [submitClaim, setSubmitClaim] = useState(false);
  const [resetClaim, setResetClaim] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(false);
  const [resetProgress, setResetProgress] = useState(false);
  const [submitMeeting, setSubmitMeeting] = useState(false);
  const [resetMeeting, setResetMeeting] = useState(false);
  const [submitManpower, setSubmitManpower] = useState(false);
  const [resetManpower, setResetManpower] = useState(false);
  const [submitIntroduction, setSubmitIntroduction] = useState(false);
  const [resetIntroduction, setResetIntroduction] = useState(false);
  const [submitPayment, setSubmitPayment] = useState(false);
  const [resetPayment, setResetPayment] = useState(false);
  const [submitBoqExecuted, setSubmitBoqExecuted] = useState(false);
  const [resetBoqExecuted, setResetBoqExecuted] = useState(false);

  useEffect(() => {
    setData(
      parsedEditData(
        monthly_report,
        project.payload,
        test_results.payload,
        site_order.payload,
        weekly_reports.payload,
        weekly_plans.payload,
        meetings.payload,
        payments.payload,
        medias.payload,
        index
      )
    );
  }, [
    project,
    weekly_plans,
    monthly_report,
    test_results,
    site_order,
    weekly_reports,
    meetings,
    payments,
    medias,
    index,
  ]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const Submit = (data: any) => {
    setLoading(true);
    console.log(parseBeforeRegister(data), data);
    updateData(parseBeforeRegister(data))
      .then(() => {
        handleOk();
        setCurrent(0);

        fetchMonthlyReports({ project_id: project.payload?.id });
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.GENERAL_SUCCESS, "");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.GENERAL_FAILED,
            e.message
          )
        );
      });
  };

  const steps = [
    {
      title: "1",
      content: (
        <IntroductionComponent
          submitAction={[submitIntroduction, setSubmitIntroduction]}
          resetFormAction={[resetIntroduction, setResetIntroduction]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "2",
      content: (
        <ReportComponent
          submitAction={[submitReport, setSubmitReport]}
          resetFormAction={[resetReport, setResetReport]}
          dataAction={[data, setData]}
          next={next}
          dateAction={["", () => {}]}
        />
      ),
    },
    {
      title: "3",
      content: (
        <ContractSummaryComponent
          submitAction={[submitContractSummary, setSubmitContractSummary]}
          resetFormAction={[resetContractSummary, setResetContractSummary]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "4",
      content: (
        <PaymentComponent
          submitAction={[submitPayment, setSubmitPayment]}
          resetFormAction={[resetPayment, setResetPayment]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "5",
      content: (
        <ConstructionStatusComponent
          submitAction={[submitConstructionStatus, setSubmitConstructionStatus]}
          resetFormAction={[
            resetConstructionStatus,
            setResetConstructionStatus,
          ]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "6",
      content: (
        <BoqExecutedComponent
          submitAction={[submitBoqExecuted, setSubmitBoqExecuted]}
          resetFormAction={[resetBoqExecuted, setResetBoqExecuted]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },

    {
      title: "7",
      content: (
        <QcComponent
          submitAction={[submitQc, setSubmitQc]}
          resetFormAction={[resetQc, setResetQc]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "8",
      content: (
        <DifficultyComponent
          submitAction={[submitDifficulty, setSubmitDifficulty]}
          resetFormAction={[resetDifficulty, setResetDifficulty]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "9",
      content: (
        <InstructionComponent
          submitAction={[submitInstruction, setSubmitInstruction]}
          resetFormAction={[resetInstruction, setResetInstruction]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "10",
      content: (
        <EvaluationComponent
          submitAction={[submitEvaluation, setSubmitEvaluation]}
          resetFormAction={[resetEvaluation, setResetEvaluation]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "11",
      content: (
        <VariationComponent
          submitAction={[submitVariation, setSubmitVariation]}
          resetFormAction={[resetVariation, setResetVariation]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "12",
      content: (
        <ClaimComponent
          submitAction={[submitClaim, setSubmitClaim]}
          resetFormAction={[resetClaim, setResetClaim]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "13",
      content: (
        <MeetingComponent
          submitAction={[submitMeeting, setSubmitMeeting]}
          resetFormAction={[resetMeeting, setResetMeeting]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "14",
      content: (
        <ProgressComponent
          submitAction={[submitProgress, setSubmitProgress]}
          resetFormAction={[resetProgress, setResetProgress]}
          dataAction={[data, setData]}
          next={next}
        />
      ),
    },
    {
      title: "15",
      content: (
        <ManpowerComponent
          submitAction={[submitManpower, setSubmitManpower]}
          resetFormAction={[resetManpower, setResetManpower]}
          dataAction={[data, setData]}
          submit_form={Submit}
        />
      ),
    },
  ];

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1360}
        title="Edit Monthly-Report"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            {current > 0 && (
              <Button
                className="btn-outline"
                style={{ margin: "0 8px" }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button
                key="submit"
                htmlType="submit"
                type="primary"
                onClick={() => {
                  console.log(
                    "🚀 ~ file: index.tsx ~ line 332 ~ steps",
                    steps,
                    current,
                    steps[current]
                  );
                  switch (steps[current].title) {
                    case "1":
                      setSubmitIntroduction(true);
                      break;
                    case "2":
                      setSubmitReport(true);
                      break;
                    case "3":
                      setSubmitContractSummary(true);
                      break;
                    case "4":
                      setSubmitPayment(true);
                      break;
                    case "5":
                      setSubmitConstructionStatus(true);
                      break;
                    case "6":
                      setSubmitBoqExecuted(true);
                      break;
                    case "7":
                      setSubmitQc(true);
                      break;
                    case "8":
                      setSubmitDifficulty(true);
                      break;
                    case "9":
                      setSubmitInstruction(true);
                      break;
                    case "10":
                      setSubmitEvaluation(true);
                      break;
                    case "11":
                      setSubmitVariation(true);
                      break;
                    case "12":
                      setSubmitClaim(true);
                      break;
                    case "13":
                      setSubmitMeeting(true);
                      break;
                    case "14":
                      setSubmitProgress(true);
                      break;
                    case "15":
                      setSubmitManpower(true);
                      break;
                    default:
                      next();
                      break;
                  }
                }}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                loading={loading}
                type="primary"
                onClick={() => {
                  setSubmitManpower(true);
                }}
              >
                Done
              </Button>
            )}
          </>,
        ]}
      >
        <Steps current={current} labelPlacement="horizontal">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action"></div>
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
  users: state.user.fetchAll,
  master_schedules: state.master_schedule.fetchAll,
  test_results: state.test_result.fetchAll,
  site_order: state.site_book.fetchAll,
  variations: state.variation_file.fetchAll,
  weekly_reports: state.week_report.fetchAll,
  meetings: state.meeting.fetchAll,
  staff_works: state.staff_work.fetchAll,
  medias: state.media.fetchAll,
  payments: state.payments.fetchAll,
  weekly_plans: state.weekly_plan.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMonthlyReports: (action: any) => dispatch(fetchAllMonthlyReport(action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);
