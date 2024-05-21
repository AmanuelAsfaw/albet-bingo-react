import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import BoqReducer from "./Boq/Boq.reducer";
// import ConsultantReducer from "./Consultant/Consultant.reducer";
// import ContractorReducer from "./Contractor/Contractor.reducer";
// import CustomerReducer from "./Customer/Customer.reducer";
// import DocumentReducer from "./Document/Document.reducer";
// import MaterialReducer from "./Material/Material.reducer";

// import ProjectReducer from "./Project/Project.reducer";
// import ScheduleReducer from "./Schedule/Schedule.reducer";
// import ServiceReducer from "./Service/Service.reducer";
// import UserReducer from "./User/User.reducer";
// import LogReducer from "./Log/Log.reducer";
// import ClientReducer from "./Client/Client.reducer";
// import ResourceReducer from "./Resource/Resource.reducer";
// import InspectionFormReducer from "./InspectionForm/InspectionForm.reducer";
// import InspectionReducer from "./Inspection/Inspection.reducer";
// import CastingReducer from "./Casting/Casting.reducer";
// import TestResultReducer from "./TestResult/TestResult.reducer";
// import TestRequestReducer from "./TestRequest/TestRequest.reducer";
// import SubmittalReducer from "./Submittal/Submittal.reducer";
// import MaterialRequestApprovalReducer from "./MaterialRequestApproval/MaterialRequestApproval.reducer";
// import SiteDiaryReducer from "./SiteDiary/SiteDiary.reducer";
// import WeekReportReducer from "./WeekReport/WeekReport.reducer";
// import MeetingReducer from "./Meeting/Meeting.reducer";
// import QueryReducer from "./Query/Query.reducer";
// import RFIReducer from "./RFI/RFI.reducer";
// import ReviewFormReducer from "./ReviewForm/ReviewForm.reducer";
// import VacancyReducer from "./Vacancy/vacancy.reducer";
// import MediaReducer from "./Media/Media.reducer";
// import SHEReducer from "./SHE/SHE.reducer";
// import SharedDocumentReducer from "./SharedDocument/SharedDocument.reducer";
// import LetterReducer from "./Letter/Letter.reducer";
// import RiskLogReducer from "./RiskLog/RiskLog.reducer";
// import StaffWorkReducer from "./StaffWork/StaffWork.reducer";
// import PaymentFileReducer from "./PaymentFile/PaymentFile.reducer";
// import TestEvaluationReducer from "./TestEvaluation/TestEvaluation.reducer";
// import PriceEscalationFileReducer from "./PriceEscalationFile/PriceEscalationFile.reducer";
// import SiteBookReducer from "./SiteBook/SiteBook.reducer";
// import MonthlyReportReducer from "./MonthlyReport/MonthlyReport.reducer";
// import MemoReducer from "./Memo/Memo.reducer";
// import MaterialRequestReducer from "./MaterialRequest/MaterialRequest.reducer";
// import MaterialEvaluationReducer from "./MaterialEvaluation/MaterialEvaluation.reducer";
// import TaskReducer from "./Task/Task.reducer";
// import TaskCategoryReducer from "./TaskCategory/TaskCategory.reducer";

// import CheckListFormReducer from "./CheckListForm/CheckListForm.reducer";
// import CheckListReducer from "./CheckList/CheckList.reducer";
// import FileStorageReducer from "./FileStorage/FileStorage.reducer";
// import WorkPermitReducer from "./WorkPermit/WorkPermit.reducer";
// import PaymentRequestReducer from "./PaymentRequest/PaymentRequest.reducer";
// import PaymentsReducer from "./Payments/Payments.reducer";
// import DataReducer from "./Data/Data.reducer";
// import ContractAdminstrationReducer from "./ContractAdminstration/ContractAdminstration.reducer";
// import ChecklistRemarkReducer from "./ChecklistRemark/ChecklistRemark.reducer";
// import WeeklyPlanReducer from "./WeeklyPlan/WeeklyPlan.reducer";
// import RequestForTestReducer from "./RequestForTest/RequestForTest.reducer";
// import SiteHandoverReducer from "./SiteHandover/SiteHandover.reducer";
// import ShareSiteHandoverReducer from "./ShareSiteHandover/ShareSiteHandover.reducer";
// import ShareDataReducer from "./ShareData/ShareData.reducer";
// import ShareSubmittalReducer from "./ShareSubmittal/ShareSubmittal.reducer";
// import ShareInspectionReducer from "./ShareInspection/ShareInspection.reducer";
// import MeetingFileReducer from "./MeetingFile/MeetingFile.reducer";
// import ShareMeetingFileReducer from "./ShareMeetingFile/ShareMeetingFile.reducer";
// import RoleReducer from "./Role/Role.reducer";
// import EmployerRequirementReducer from "./EmployerRequirement/EmployerRequirement.reducer";
// import CostEstimationReducer from "./CostEstimation/CostEstimation.reducer";
// import TenderDocumentReducer from "./Tenderdocument/TenderDocument.reducer";
// import ContractReducer from "./Contract/Contract.reducer";
// import DrawingReducer from "./Drawing/Drawing.reducer";
// import VariationReducer from "./Variation/Variation.reducer";
// import KeyPersonnelReducer from "./KeyPersonnel/KeyPersonnel.reducer";
// import ExternalDocumentReducer from "./ExternalDocument/ExternalDocument.reducer";

// import CommunicationGroupReducer from "./CommunicationGroup/CommunicationGroup.reducer";
// import CommunicationMessageReducer from "./CommunicationMessage/CommunicationMessage.reducer";
// import KlingMaterialApprovalReducer from "./KlingMaterialApproval/KlingMaterialApproval.reducer";
// import PreConceptReducer from "./PreConcept/PreConcept.reducer";
// import ConceptReducer from "./Concept/Concept.reducer";
// import WeeklyReportReducer from "./Report/WeeklyReport/WeeklyReport.reducer";
// import WeeklyPlanReportReducer from "./WeeklyPlanReport/WeeklyPlanReport.reducer";
// import MaterialApprovalStatusReducer from "./MaterialApprovalStatus/MaterialApprovalStatus.reducer";
// import DesignChangeLogReducer from "./DesignChangeLog/DesignChangeLog.reducer";
// import CategoryReducer from "./Category/Category.reducer";
// import SubCategoryReducer from "./SubCategory/SubCategory.reducer";
// import FinancialReducer from "./Financial/Financial.reducer";
// import SharedMeetingReducer from "./SharedMeeting/SharedMeeting.reducer";
// import StatusBoardReducer from "./StatusBoard/StatusBoard/StatusBoard.reducer";
// import ProjectTaskCategoryReducer from "./TaskFollowUp/ProjectTaskCategory/ProjectTaskCategory.reducer";
// import ProjectCategoryBoardReducer from "./TaskFollowUp/ProjectCategoryBoard/ProjectCategoryBoard.reducer";
// import ProjectDurationReducer from "./ProjectDuration/ProjectDuration.reducer";
// import TimeExtensionReducer from "./TimeExtension/TimeExtension.reducer";
// import ProjectVariationReducer from "./ProjectVariation/ProjectVariation.reducer";
// import BankAccountReducer from "./BankAccount/BankAccount.reducer";

// import KenoGameReducer from "./KenoGame/KenoGame.reducer";
// import KenoCasherReducer from "./KenoCasher/KenoCasher.reducer";
// import KenoBillReducer from "./KenoBills/KenoBill.reducer";

// import KenoTodayBillReducer from "./KenoBills/Today/Today.reducer";
// import KenoTodayByGameBillReducer from "./KenoBills/TodayByGame/TodayByGame.reducer";
// import KenoAnyDayBillReducer from "./KenoBills/AnyDayBills/AnyDay.reducer";
// import KenoAnyDayByGameBillReducer from "./KenoBills/AnyDayByGame/AnyDayByGame.reducer";

// import KenoThisWeekBillReducer from "./KenoBills/ThisWeekBill/ThisWeekBill.reducer";
// import KenoAnyWeekBillReducer from "./KenoBills/AnyWeekBill/AnyWeekBill.reducer";

// import KenoThisMonthBillReducer from "./KenoBills/ThisMonth/ThisMonthBill.reducer";
// import KenoAnyMonthBillReducer from "./KenoBills/AnyMonth/AnyMonthBill.reducer";

// import KenoInstantReportReducer from "./KenoReport/InstantReport/InstantReport.reducer";
// import KenoAnyDayInstantReportReducer from "./KenoReport/AnyDayInstantReport/InstantReport.reducer";
// import KenoAGameReportReducer from "./KenoReport/A-GameReport/A-GameReport.reducer";
// import KenoAnyDayReportReducer from "./KenoReport/AnyDayReport/AnyDayReport.reducer";
// import KenoAGameAnyDayReportReducer from "./KenoReport/A-GameAnyDayReport/A-GameAnyDayReport.reducer";

// import KenoThisWeekReportReducer from "./KenoReport/ThisWeekReport/ThisWeekReport.reducer";
// import KenoAnyWeekReportReducer from "./KenoReport/AnyWeekReport/AnyWeekReport.reducer";

// import KenoThisMonthReportReducer from "./KenoReport/ThisMonthReport/ThisMonthReport.reducer";
// import KenoAnyMonthReportReducer from "./KenoReport/AnyMonthReport/AnyMonthReport.reducer";

// import KenoThisYearReportReducer from "./KenoReport/ThisYearReport/ThisYearReport.reducer";
// import KenoAnyYearReportReducer from "./KenoReport/AnyYearReport/AnyYearReport.reducer";

// BINGO
import CartelaReducer from "./Cartelas/TodayBill.reducer";

// import GameReducer from "./Game/Game.reducer";

const PersistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const RootReducer = combineReducers({
  // project: ProjectReducer,
  // contractor: ContractorReducer,
  // consultant: ConsultantReducer,
  // boq: BoqReducer,
  // material: MaterialReducer,
  // customer: CustomerReducer,
  // service: ServiceReducer,
  // document: DocumentReducer,
  // schedule: ScheduleReducer,
  // user: UserReducer,
  // client: ClientReducer,
  // log: LogReducer,
  // resource: ResourceReducer,
  // inspection_form: InspectionFormReducer,
  // inspection: InspectionReducer,
  // casting: CastingReducer,
  // submittal: SubmittalReducer,
  // material_request_approval: MaterialRequestApprovalReducer,
  // test_result: TestResultReducer,
  // test_request: TestRequestReducer,
  // meeting: MeetingReducer,
  // site_diary: SiteDiaryReducer,
  // week_report: WeekReportReducer,
  // query: QueryReducer,
  // rfi: RFIReducer,
  // review_form: ReviewFormReducer,
  // vacancies: VacancyReducer,
  // media: MediaReducer,
  // she: SHEReducer,
  // sharedDocument: SharedDocumentReducer,
  // letter: LetterReducer,
  // risk_log: RiskLogReducer,
  // staff_work: StaffWorkReducer,
  // test_evaluation: TestEvaluationReducer,
  // payment_file: PaymentFileReducer,
  // price_escalation_file: PriceEscalationFileReducer,
  // site_book: SiteBookReducer,
  // monthly_report: MonthlyReportReducer,
  // memo: MemoReducer,
  // material_request: MaterialRequestReducer,
  // material_evaluation: MaterialEvaluationReducer,
  // task: TaskReducer,
  // task_category: TaskCategoryReducer,
  // checklist_form: CheckListFormReducer,
  // checklist: CheckListReducer,
  // file_storage: FileStorageReducer,
  // work_permit: WorkPermitReducer,
  // payment_request: PaymentRequestReducer,
  // payments: PaymentsReducer,
  // data: DataReducer,
  // contract_adminstration: ContractAdminstrationReducer,
  // checklist_remark: ChecklistRemarkReducer,
  // weekly_plan: WeeklyPlanReducer,
  // request_for_test: RequestForTestReducer,
  // site_handover: SiteHandoverReducer,
  // share_site_handover: ShareSiteHandoverReducer,
  // share_data: ShareDataReducer,
  // share_submittal: ShareSubmittalReducer,
  // share_inspection: ShareInspectionReducer,
  // meeting_file: MeetingFileReducer,
  // share_meeting_file: ShareMeetingFileReducer,
  // role: RoleReducer,
  // employer_requirement: EmployerRequirementReducer,
  // cost_estimation: CostEstimationReducer,
  // tender_document: TenderDocumentReducer,
  // contract: ContractReducer,
  // drawing: DrawingReducer,
  // variation: VariationReducer,
  // key_personnel: KeyPersonnelReducer,
  // external_document: ExternalDocumentReducer,
  // communication_group: CommunicationGroupReducer,
  // communication_message: CommunicationMessageReducer,
  // kling_material_approval: KlingMaterialApprovalReducer,
  // pre_concept: PreConceptReducer,
  // concept: ConceptReducer,
  // weekly_site_report: WeeklyReportReducer,
  // weekly_report: WeeklyReportReducer,
  // weekly_plan_report: WeeklyPlanReportReducer,
  // material_approval_status: MaterialApprovalStatusReducer,
  // design_change_log: DesignChangeLogReducer,
  // category: CategoryReducer,
  // sub_category: SubCategoryReducer,
  // financial: FinancialReducer,
  // shared_meeting: SharedMeetingReducer,
  // status_board: StatusBoardReducer,
  // project_task_category: ProjectTaskCategoryReducer,
  // project_category_board: ProjectCategoryBoardReducer,
  // project_duration: ProjectDurationReducer,
  // time_extension: TimeExtensionReducer,
  // project_variation: ProjectVariationReducer,
  // bank_account: BankAccountReducer,

  
  // // Keno - Game  
  // keno_game: KenoGameReducer,
  // keno_casher: KenoCasherReducer,
  // game: GameReducer,

  // // Bills
  // // Bills Daily
  // Keno_bill: KenoBillReducer,
  // Keno_today_bill: KenoTodayBillReducer,
  // Keno_today_bill_by_game: KenoTodayByGameBillReducer,
  // Keno_anyday_bill: KenoAnyDayBillReducer,
  // Keno_anyday_bill_by_game: KenoAnyDayByGameBillReducer,

  // // Bills Weekly
  // Keno_this_week_bill: KenoThisWeekBillReducer,
  // Keno_any_week_bill: KenoAnyWeekBillReducer,

  // // Bills Monthly
  // Keno_this_month_bill: KenoThisMonthBillReducer,
  // Keno_any_month_bill: KenoAnyMonthBillReducer,
  
  // // Report
  // // Report Today
  // keno_instant_report : KenoInstantReportReducer,
  // keno_any_day_instant_report : KenoAnyDayInstantReportReducer,
  // keno_a_game_today_report : KenoAGameReportReducer,
  // keno_any_day_report : KenoAnyDayReportReducer,
  // keno_any_day_by_game_report : KenoAGameAnyDayReportReducer,
  
  // // Report Weekly
  // keno_this_week_report : KenoThisWeekReportReducer,
  // keno_any_week_report : KenoAnyWeekReportReducer,
  
  // // Report Monthly
  // keno_this_month_report : KenoThisMonthReportReducer,
  // keno_any_month_report : KenoAnyMonthReportReducer,
  
  // Report Annual
  // keno_this_year_report : KenoThisYearReportReducer,
  // keno_any_year_report : KenoAnyYearReportReducer,

  // BINGO
  cartelas: CartelaReducer,
});

export default persistReducer(PersistConfig, RootReducer);
