import { Button, Modal, Steps } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AddMonthlyReportPropType,
  sendData,
  parsedData,
  parseBeforeRegister,
} from "../../util/MonthlyReport.util";
import { PlusOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { fetchAllMonthlyReport } from "../../../../../../../redux/MonthlyReport/MonthlyReport.action";
import ContractSummaryComponent from "./components/ContractSummary/ContractSummary.component";
import moment from "moment";
import QcComponent from "./components/QC/Qc.component";
import ReportComponent from "./components/Report/Report.component";
import ConstructionStatusComponent from "./components/ConstructionStatus/ConstructionStatus.component";
import DifficultyComponent from "./components/Difficulty/Difficulty.component";
import InstructionComponent from "./components/Instruction/Instruction.component";
import EvaluationComponent from "./components/Evaluation/Evaluation.component";
import VariationComponent from "./components/Variation/Variation.component";
import ClaimComponent from "./components/Claim/Claim.component";
import ProgressComponent from "./components/Progress/Progress.component";
import MeetingComponent from "./components/Meeting/Meeting.component";
import ManpowerComponent from "./components/Manpower/Manpower.component";
import IntroductionComponent from "./components/Introduction/introduction.component";
import PaymentComponent from "./components/Payment/Payment.component";
import BoqExecutedComponent from "./components/BoqExecuted/BoqExecuted.component";

const AddMonthlyReportComponent: FC<AddMonthlyReportPropType> = ({
  fetchMonthlyReports,
  monthly_reports,
  project,
  users,
  test_results,
  site_order,
  weekly_reports,
  meetings,
  medias,
  payments,
  weekly_plans,
}) => {
  const { Step } = Steps;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<any>(null);
  const [date, setDate] = useState(moment().subtract(1, "M").endOf("month"));

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
      parsedData(
        date,
        project.payload,
        monthly_reports.payload,
        test_results.payload,
        site_order.payload,
        weekly_reports.payload,
        weekly_plans.payload,
        meetings.payload,
        payments.payload,
        medias.payload
      )
    );
  }, [
    project,
    date,
    monthly_reports,
    test_results,
    site_order,
    weekly_reports,
    meetings,
    payments,
    medias,
    weekly_plans,
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
    sendData(parseBeforeRegister(data))
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
          dateAction={[date, setDate]}
          next={next}
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
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Register Monthly-Report
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1360}
        title="Register Monthly-Report"
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
  monthly_reports: state.monthly_report.fetchAll,
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  test_results: state.test_result.fetchAll,
  site_order: state.site_book.fetchAll,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMonthlyReportComponent);
