import { all, call } from "redux-saga/effects";

// import {
//   watcherFetchAllBoq,
//   watcherFetchDetailBoq,
//   watcherFetchOneBoq,
// } from "./Boq/Boq.saga";
// import { watcherFetchAllConsultants } from "./Consultant/Consultant.saga";
// import { watcherFetchAllContractors } from "./Contractor/Contractor.saga";
// import { watcherFetchAllCustomers } from "./Customer/Customer.saga";
// import { watcherFetchAllDocuments } from "./Document/Document.saga";
// import { watcherFetchMaterials } from "./Material/Material.saga";

// import { watcherFetchAllClients } from "./Client/Client.saga";
// import { watcherFetchAllLog, watcherFetchOneLog } from "./Log/Log.saga";
// import {
//   watcherFetchAllMeetings,
//   watcherFetchOneMeetings,
// } from "./Meeting/Meeting.saga";
// import {
//   watcherFetchAllListProjects,
//   watcherFetchAllPreProjects,
//   watcherFetchAllProjects,
//   watcherFetchOnePreProjects,
//   watcherFetchOneProjects,
// } from "./Project/Project.saga";
// import {
//   watcherFetchAllResources,
//   watcherFetchOneResources,
// } from "./Resource/Resource.sage";
// import { watcherFetchAllSchedules } from "./Schedule/Schedule.saga";
// import { watcherFetchAllServices } from "./Service/Service.saga";

// import { watcherFetchAllCastings } from "./Casting/Casting.saga";
// import {
//   watcherFetchAllInspection,
//   watcherFetchOneInspection,
// } from "./Inspection/Inspection.saga";
// import {
//   watcherFetchAllInspectionForm,
//   watcherFetchOneInspectionForm,
// } from "./InspectionForm/InspectionForm.saga";
// import {
//   watcherFetchAllMaterialRequestApprovals,
//   watcherFetchOneMaterialRequestApprovals,
// } from "./MaterialRequestApproval/MaterialRequestApproval.saga";
// import { watcherFetchAllMedias } from "./Media/Media.saga";
// import {
//   watcherFetchAllQueries,
//   watcherFetchOneQueries,
// } from "./Query/Query.saga";
// import { watcherFetchAllReviewForm } from "./ReviewForm/ReviewForm.saga";
// import { watcherFetchAllRFIs } from "./RFI/RFI.saga";
// import { watcherFetchAllSharedDocuments } from "./SharedDocument/SharedDocument.saga";
// import { watcherFetchAllSHEs } from "./SHE/SHE.saga";
// import { watcherFetchAllSiteDiary } from "./SiteDiary/SiteDiary.saga";
// import {
//   watcherFetchAllSubmittals,
//   watcherFetchOneSubmittals,
// } from "./Submittal/Submittal.saga";
// import {
//   watcherFetchAllTestRequest,
//   watcherFetchOneTestRequest,
// } from "./TestRequest/TestRequest.saga";
// import {
//   watcherFetchAllTestResult,
//   watcherFetchOneTestResult,
// } from "./TestResult/TestResult.saga";
// import {
//   watcherFetchAllVacancies,
//   watcherFetchVacanciesByAttributes,
//   watcherFetchVacanciesByJobId,
// } from "./Vacancy/Vacancy.saga";
// import { watcherFetchAllWeekReport } from "./WeekReport/WeekReport.saga";

// import {
//   watcherFetchAllLetters,
//   watcherFetchOneLetters,
// } from "./Letter/Letter.saga";
// import {
//   watcherFetchAllPaymentFiles,
//   watcherFetchOnePaymentFiles,
// } from "./PaymentFile/PaymentFile.saga";
// import {
//   watcherFetchAllRiskLogs,
//   watcherFetchOneRiskLogs,
// } from "./RiskLog/RiskLog.saga";
// import {
//   watcherFetchAllStaffWorks,
//   watcherFetchOneStaffWorks,
// } from "./StaffWork/StaffWork.saga";

// import {
//   watcherFetchAllTestEvaluations,
//   watcherFetchOneTestEvaluations,
// } from "./TestEvaluation/TestEvaluation.saga";

// import {
//   watcherFetchAllPriceEscalationFiles,
//   watcherFetchOnePriceEscalationFiles,
// } from "./PriceEscalationFile/PriceEscalationFile.saga";

// import {
//   watcherFetchAllSiteBooks,
//   watcherFetchOneSiteBooks,
// } from "./SiteBook/SiteBook.saga";

// import {
//   watcherFetchAllMaterialRequests,
//   watcherFetchOneMaterialRequests,
// } from "./MaterialRequest/MaterialRequest.saga";

// import {
//   watcherFetchAllMaterialEvaluations,
//   watcherFetchOneMaterialEvaluations,
// } from "./MaterialEvaluation/MaterialEvaluation.saga";

// import {
//   watcherFetchAllTasks,
//   watcherFetchAllFormTasks,
//   watcherFetchTaskReport,
//   watcherFetchOneTasks,
// } from "./Task/Task.saga";
// import {
//   watcherFetchAllTaskCategorys,
//   watcherFetchAllFormTaskCategorys,
//   watcherFetchAllDetailedTaskCategorys,
//   watcherFetchOneTaskCategorys,
// } from "./TaskCategory/TaskCategory.saga";

// import {
//   watcherFetchAllArchitectureCheckListForms,
//   watcherFetchAllElectricalCheckListForms,
//   watcherFetchAllFireFightingCheckListForms,
//   watcherFetchAllMechanicalCheckListForms,
//   watcherFetchAllPlumbingCheckListForms,
//   watcherFetchAllSanitaryCheckListForms,
//   watcherFetchAllSpecialSystemCheckListForms,
//   watcherFetchAllStructuralCheckListForms,
//   watcherFetchOneCheckListForms,
// } from "./CheckListForm/CheckListForm.saga";

// import {
//   watcherFetchAllArchitectureCheckLists,
//   watcherFetchAllElectricalCheckLists,
//   watcherFetchAllFireFightingCheckLists,
//   watcherFetchAllMechanicalCheckLists,
//   watcherFetchAllPlumbingCheckLists,
//   watcherFetchAllSanitaryCheckLists,
//   watcherFetchAllSpecialSystemCheckLists,
//   watcherFetchAllStructuralCheckLists,
//   watcherFetchOneCheckLists,
// } from "./CheckList/CheckList.saga";

// import {
//   watcherFetchAllArchitectureFileStorages,
//   watcherFetchAllElectricalFileStorages,
//   watcherFetchAllFireFightingFileStorages,
//   watcherFetchAllMechanicalFileStorages,
//   watcherFetchAllPlumbingFileStorages,
//   watcherFetchAllSanitaryFileStorages,
//   watcherFetchAllSpecialSystemFileStorages,
//   watcherFetchAllStructuralFileStorages,
//   watcherFetchOneFileStorages,
// } from "./FileStorage/FileStorage.saga";

// import {
//   watcherFetchAllWorkPermits,
//   watcherFetchOneWorkPermits,
// } from "./WorkPermit/WorkPermit.saga";

// import {
//   watcherFetchAllPaymentRequests,
//   watcherFetchOnePaymentRequests,
// } from "./PaymentRequest/PaymentRequest.saga";

// import {
//   watcherFetchAllPaymentss,
//   watcherFetchOnePaymentss,
// } from "./Payments/Payments.saga";

// import { watcherFetchAllDatas, watcherFetchOneDatas } from "./Data/Data.saga";

// import {
//   watcherFetchAllContractAdminstrations,
//   watcherFetchOneContractAdminstrations,
// } from "./ContractAdminstration/ContractAdminstration.saga";

// import {
//   watcherFetchAllChecklistRemarks,
//   watcherFetchOneChecklistRemarks,
// } from "./ChecklistRemark/ChecklistRemark.saga";

// import {
//   watcherFetchAllRequestForTests,
//   watcherFetchOneRequestForTests,
// } from "./RequestForTest/RequestForTest.saga";
// import {
//   watcherFetchAllSiteHandovers,
//   watcherFetchOneSiteHandovers,
// } from "./SiteHandover/SiteHandover.saga";
// import {
//   watcherFetchAllWeeklyPlans,
//   watcherFetchOneWeeklyPlans,
// } from "./WeeklyPlan/WeeklyPlan.saga";

// import {
//   watcherFetchAllShareSiteHandovers,
//   watcherFetchOneShareSiteHandovers,
// } from "./ShareSiteHandover/ShareSiteHandover.saga";

// import {
//   watcherFetchAllShareDatas,
//   watcherFetchOneShareDatas,
// } from "./ShareData/ShareData.saga";

// import {
//   watcherFetchAllShareSubmittals,
//   watcherFetchOneShareSubmittals,
// } from "./ShareSubmittal/ShareSubmittal.saga";

// import {
//   watcherFetchAllShareInspections,
//   watcherFetchOneShareInspections,
// } from "./ShareInspection/ShareInspection.saga";

// import {
//   watcherFetchAllMeetingFiles,
//   watcherFetchOneMeetingFiles,
// } from "./MeetingFile/MeetingFile.saga";

// import {
//   watcherFetchAllContracts,
//   watcherFetchOneContract,
// } from "./Contract/Contract.saga";
// import {
//   watcherFetchAllCostEstimations,
//   watcherFetchOneCostEstimation,
// } from "./CostEstimation/CostEstimation.saga";
// import {
//   watcherFetchAllDrawings,
//   watcherFetchOneDrawing,
// } from "./Drawing/Drawing.saga";
// import {
//   watcherFetchAllEmployerRequirements,
//   watcherFetchOneEmployerRequirement,
// } from "./EmployerRequirement/EmployerRequirement.saga";
// import {
//   watcherFetchAllExternalDocuments,
//   watcherFetchOneExternalDocuments,
// } from "./ExternalDocument/ExternalDocument.saga";
// import {
//   watcherFetchKeyPersonnel,
//   watcherFetchOneKeyPersonnel,
// } from "./KeyPersonnel/KeyPersonnel.saga";
// import { watcherFetchAllRoles, watcherFetchOneRoles } from "./Role/Role.saga";
// import {
//   watcherFetchAllShareMeetingFiles,
//   watcherFetchOneShareMeetingFiles,
// } from "./ShareMeetingFile/ShareMeetingFile.saga";
// import {
//   watcherFetchAllTenderDocuments,
//   watcherFetchOneTenderDocument,
// } from "./Tenderdocument/TenderDocument.saga";
// import {
//   watcherFetchAllUser,
//   watcherFetchFeatureUser,
//   watcherFetchOneUser,
// } from "./User/User.saga";
// import {
//   watcherFetchAllVariations,
//   watcherFetchOneVariation,
// } from "./Variation/Variation.saga";

// import {
//   watcherFetchAllCommunicationGroups,
//   watcherFetchAllCommunicationGroupUsers,
// } from "./CommunicationGroup/CommunicationGroup.saga";

// import {
//   watcherFetchPagedCommunicationMessages,
//   watcherSearchCommunicationMessages,
// } from "./CommunicationMessage/CommunicationMessage.saga";

// import {
//   watcherFetchAllKlingMaterialApprovals,
//   watcherFetchOneKlingMaterialApprovals,
// } from "./KlingMaterialApproval/KlingMaterialApproval.saga";
// import {
//   watcherFetchOnePreConcepts,
//   watcherFetchAllPreConcepts,
//   watcherFetchPagedPreConcepts,
// } from "./PreConcept/PreConcept.saga";
// import {
//   watcherFetchOneConcepts,
//   watcherFetchAllConcepts,
//   watcherFetchPagedConcepts,
// } from "./Concept/Concept.saga";
// import {
//   watcherFetchAllWeeklyPlanReports,
//   watcherFetchOneWeeklyPlanReports,
// } from "./WeeklyPlanReport/WeeklyPlanReport.saga";

// import {
//   watcherFetchAllMaterialApprovalStatus,
//   watcherFetchOneMaterialApprovalStatus,
// } from "./MaterialApprovalStatus/MaterialApprovalStatus.saga";

// import {
//   watcherFetchAllDesignChangeLogs,
//   watcherFetchOneDesignChangeLogs,
// } from "./DesignChangeLog/DesignChangeLog.saga";

// import {
//   watcherFetchAllWeeklySiteReports,
//   watcherFetchOneWeeklySiteReports,
// } from "./Report/WeeklyReport/WeeklySiteReport.saga";
// import {
//   watcherFetchAllCategory,
//   watcherFetchOneCategory,
// } from "./Category/Category.saga";
// import {
//   watcherFetchAllSubCategory,
//   watcherFetchOneSubCategory,
// } from "./SubCategory/SubCategory.saga";
// import {
//   watcherFetchAllFinancials,
//   watcherFetchOneFinancials,
// } from "./Financial/Financial.saga";

// import { watcherFetchAllSharedMeetings } from "./SharedMeeting/SharedMeeting.saga";
// import {
//   watcherFetchAllProjectDurations,
//   watcherFetchOneProjectDurations,
// } from "./ProjectDuration/ProjectDuration.saga";
// import {
//   watcherFetchAllTimeExtensions,
//   watcherFetchOneTimeExtensions,
// } from "./TimeExtension/TimeExtension.saga";
// import {
//   watcherFetchAllProjectVariations,
//   watcherFetchOneProjectVariations,
// } from "./ProjectVariation/ProjectVariation.saga";
// import {
//   watcherFetchAllBankAccounts,
//   watcherFetchOneBankAccounts,
// } from "./BankAccount/BankAccount.saga";

// import {
//   watcherFetchAllStatusBoard,
//   watcherFetchOneStatusBoard,
// } from "./StatusBoard/StatusBoard/StatusBoard.saga";

// import {
//   watcherFetchAllProjectTaskCategory,
//   watcherFetchOneProjectTaskCategory,
// } from "./TaskFollowUp/ProjectTaskCategory/ProjectTaskCategory.saga";

// import {
//   watcherFetchAllKenoCashers,
//   watcherFetchOneKenoCasher,
// } from "./KenoCasher/KenoCasher.saga";

// import {
//   watcherFetchAllProjectCategoryBoard,
//   watcherFetchOneProjectCategoryBoard,
// } from "./TaskFollowUp/ProjectCategoryBoard/ProjectCategoryBoard.saga";

// import {
//   watcherFetchAllKenoGames,
//   watcherFetchOneKenoGame,
// } from "./KenoGame/KenoGame.saga";

// import {
//   watcherFetchAllKenoBills as watcherFetchAllTodayKenoBills,
//   watcherFetchOneKenoBill as watcherFetchOneTodayKenoBill,
// } from "./KenoBills/Today/Today.saga";

// import {
//   watcherFetchAllKenoBills as watcherFetchAllTodayByGameKenoBills,
//   watcherFetchOneKenoBill as watcherFetchOneTodayByGameKenoBill,
// } from "./KenoBills/TodayByGame/TodayByGame.saga";

// import {
//   watcherFetchAllKenoBills as watcherFetchAllAnyDayKenoBills,
//   watcherFetchOneKenoBill as watcherFetchOneAnyDayKenoBill,
// } from "./KenoBills/AnyDayBills/AnyDay.saga";

// import {
//   watcherFetchAllKenoBills as watcherFetchAllAnyDayByGameKenoBills,
//   watcherFetchOneKenoBill as watcherFetchOneAnyDayByGameKenoBill,
// } from "./KenoBills/AnyDayByGame/AnyDayByGame.saga";

// import {
//   watcherFetchAllKenoBills as watcherFetchAllThisWeekKenoBills,
//   watcherFetchOneKenoBill as watcherFetchOneThisWeekKenoBill,
// } from "./KenoBills/ThisWeekBill/ThisWeekBill.saga";

// import {
//   watcherFetchAllKenoBills as watcherFetchAllAnyWeekKenoBills,
//   watcherFetchOneKenoBill as watcherFetchOneAnyWeekKenoBill,
// } from "./KenoBills/AnyWeekBill/AnyWeekBill.saga";

// import {
//   watcherFetchAllKenoBills as watcherFetchAllThisMonthKenoBills,
//   watcherFetchOneKenoBill as watcherFetchOneThisMonthKenoBill,
// } from "./KenoBills/ThisMonth/ThisMonthBill.saga";

// import {
//   watcherFetchAllKenoBills as watcherFetchAllAnyMonthKenoBills,
//   watcherFetchOneKenoBill as watcherFetchOneAnyMonthKenoBill,
// } from "./KenoBills/AnyMonth/AnyMonthBill.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllInstantKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneInstantKenoReport,
// } from "./KenoReport/InstantReport/InstantReport.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllAnyDayInstantKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneAnyDayInstantKenoReport,
// } from "./KenoReport/AnyDayInstantReport/InstantReport.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllAGameKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneAGameKenoReport,
// } from "./KenoReport/A-GameReport/A-GameReport.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllAnyDayKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneAnyDayKenoReport,
// } from "./KenoReport/AnyDayReport/AnyDayReport.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllAnyDayByGameKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneAnyDayByGameKenoReport,
// } from "./KenoReport/A-GameAnyDayReport/A-GameAnyDayReport.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllThisWeekKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneThisWeekKenoReport,
// } from "./KenoReport/ThisWeekReport/ThisWeekReport.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllAnyWeekKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneAnyWeekKenoReport,
// } from "./KenoReport/AnyWeekReport/AnyWeekReport.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllThisMonthKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneThisMonthKenoReport,
// } from "./KenoReport/ThisMonthReport/ThisMonthReport.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllAnyMonthKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneAnyMonthKenoReport,
// } from "./KenoReport/AnyMonthReport/AnyMonthReport.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllThisYearKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneThisYearKenoReport,
// } from "./KenoReport/ThisYearReport/ThisYearReport.saga";

// import {
//   watcherFetchAllKenoReports as watcherFetchAllAnyYearKenoReports,
//   watcherFetchOneKenoReport as watcherFetchOneAnyYearKenoReport,
// } from "./KenoReport/AnyYearReport/AnyYearReport.saga";

import {
  watcherFetchAllCartelas,
  watcherFetchOneCartela,
} from "./Cartelas/TodayBill.saga";

export default function* RootSaga() {
  yield all([
    /**
     * Project Sagas
     */
    // call(watcherFetchAllProjects),
    // call(watcherFetchOneProjects),
    // call(watcherFetchAllListProjects),
    // call(watcherFetchAllContractors),
    // call(watcherFetchAllConsultants),
    // call(watcherFetchAllBoq),
    // call(watcherFetchOneBoq),
    // call(watcherFetchMaterials),
    // call(watcherFetchDetailBoq),
    // call(watcherFetchAllCustomers),
    // call(watcherFetchAllServices),
    // call(watcherFetchAllDocuments),
    // call(watcherFetchAllSchedules),
    // call(watcherFetchAllClients),
    // call(watcherFetchAllPreProjects),
    // call(watcherFetchOnePreProjects),
    // call(watcherFetchAllLog),
    // call(watcherFetchOneLog),
    // call(watcherFetchAllMeetings),
    // call(watcherFetchOneMeetings),
    // call(watcherFetchAllResources),
    // call(watcherFetchOneResources),
    // call(watcherFetchAllInspectionForm),
    // call(watcherFetchOneInspectionForm),
    // call(watcherFetchAllInspection),
    // call(watcherFetchOneInspection),
    // call(watcherFetchAllCastings),
    // call(watcherFetchAllTestResult),
    // call(watcherFetchOneTestResult),
    // call(watcherFetchAllTestRequest),
    // call(watcherFetchOneTestRequest),
    // call(watcherFetchAllSubmittals),
    // call(watcherFetchOneSubmittals),
    // call(watcherFetchAllMaterialRequestApprovals),
    // call(watcherFetchOneMaterialRequestApprovals),
    // call(watcherFetchAllSiteDiary),
    // call(watcherFetchAllWeekReport),
    // call(watcherFetchAllQueries),
    // call(watcherFetchOneQueries),
    // call(watcherFetchAllRFIs),
    // call(watcherFetchAllReviewForm),
    // call(watcherFetchAllVacancies),
    // call(watcherFetchVacanciesByAttributes),
    // call(watcherFetchVacanciesByJobId),
    // call(watcherFetchAllMedias),
    // call(watcherFetchAllSHEs),
    // call(watcherFetchAllSharedDocuments),
    // call(watcherFetchAllLetters),
    // call(watcherFetchOneLetters),
    // call(watcherFetchAllRiskLogs),
    // call(watcherFetchOneRiskLogs),
    // call(watcherFetchAllStaffWorks),
    // call(watcherFetchOneStaffWorks),
    // call(watcherFetchAllTestEvaluations),
    // call(watcherFetchOneTestEvaluations),
    // call(watcherFetchAllPaymentFiles),
    // call(watcherFetchOnePaymentFiles),
    // call(watcherFetchAllPriceEscalationFiles),
    // call(watcherFetchOnePriceEscalationFiles),
    // call(watcherFetchAllSiteBooks),
    // call(watcherFetchOneSiteBooks),
    // call(watcherFetchAllMaterialRequests),
    // call(watcherFetchOneMaterialRequests),
    // call(watcherFetchAllMaterialEvaluations),
    // call(watcherFetchOneMaterialEvaluations),
    // call(watcherFetchAllTasks),
    // call(watcherFetchAllFormTasks),
    // call(watcherFetchTaskReport),
    // call(watcherFetchOneTasks),
    // call(watcherFetchAllTaskCategorys),
    // call(watcherFetchAllFormTaskCategorys),
    // call(watcherFetchAllDetailedTaskCategorys),
    // call(watcherFetchOneTaskCategorys),
    // call(watcherFetchAllStructuralCheckListForms),
    // call(watcherFetchAllArchitectureCheckListForms),
    // call(watcherFetchAllElectricalCheckListForms),
    // call(watcherFetchAllFireFightingCheckListForms),
    // call(watcherFetchAllMechanicalCheckListForms),
    // call(watcherFetchAllPlumbingCheckListForms),
    // call(watcherFetchAllSpecialSystemCheckListForms),
    // call(watcherFetchOneCheckListForms),
    // call(watcherFetchAllSanitaryCheckListForms),
    // call(watcherFetchAllStructuralCheckLists),
    // call(watcherFetchAllArchitectureCheckLists),
    // call(watcherFetchAllElectricalCheckLists),
    // call(watcherFetchAllFireFightingCheckLists),
    // call(watcherFetchAllMechanicalCheckLists),
    // call(watcherFetchAllPlumbingCheckLists),
    // call(watcherFetchAllSpecialSystemCheckLists),
    // call(watcherFetchAllSanitaryCheckLists),
    // call(watcherFetchOneCheckLists),
    // call(watcherFetchAllArchitectureFileStorages),
    // call(watcherFetchAllElectricalFileStorages),
    // call(watcherFetchAllFireFightingFileStorages),
    // call(watcherFetchAllMechanicalFileStorages),
    // call(watcherFetchAllPlumbingFileStorages),
    // call(watcherFetchAllSpecialSystemFileStorages),
    // call(watcherFetchAllSanitaryFileStorages),
    // call(watcherFetchAllStructuralFileStorages),
    // call(watcherFetchOneFileStorages),
    // call(watcherFetchAllWorkPermits),
    // call(watcherFetchOneWorkPermits),
    // call(watcherFetchAllPaymentRequests),
    // call(watcherFetchOnePaymentRequests),
    // call(watcherFetchAllPaymentss),
    // call(watcherFetchOnePaymentss),
    // call(watcherFetchAllDatas),
    // call(watcherFetchOneDatas),
    // call(watcherFetchAllContractAdminstrations),
    // call(watcherFetchOneContractAdminstrations),
    // call(watcherFetchAllChecklistRemarks),
    // call(watcherFetchOneChecklistRemarks),
    // call(watcherFetchAllWeeklyPlans),
    // call(watcherFetchOneWeeklyPlans),
    // call(watcherFetchAllRequestForTests),
    // call(watcherFetchOneRequestForTests),
    // call(watcherFetchAllSiteHandovers),
    // call(watcherFetchOneSiteHandovers),
    // call(watcherFetchAllShareSiteHandovers),
    // call(watcherFetchOneShareSiteHandovers),
    // call(watcherFetchAllShareDatas),
    // call(watcherFetchOneShareDatas),
    // call(watcherFetchAllShareSubmittals),
    // call(watcherFetchOneShareSubmittals),
    // call(watcherFetchAllShareInspections),
    // call(watcherFetchOneShareInspections),
    // call(watcherFetchAllMeetingFiles),
    // call(watcherFetchOneMeetingFiles),
    // call(watcherFetchAllShareMeetingFiles),
    // call(watcherFetchOneShareMeetingFiles),
    // call(watcherFetchOneRoles),
    // call(watcherFetchAllRoles),
    // call(watcherFetchAllUser),
    // call(watcherFetchOneUser),
    // call(watcherFetchFeatureUser),
    // call(watcherFetchAllEmployerRequirements),
    // call(watcherFetchOneEmployerRequirement),
    // call(watcherFetchAllCostEstimations),
    // call(watcherFetchOneCostEstimation),
    // call(watcherFetchAllTenderDocuments),
    // call(watcherFetchOneTenderDocument),
    // call(watcherFetchAllDrawings),
    // call(watcherFetchOneDrawing),
    // call(watcherFetchAllContracts),
    // call(watcherFetchOneContract),
    // call(watcherFetchAllVariations),
    // call(watcherFetchOneVariation),
    // call(watcherFetchKeyPersonnel),
    // call(watcherFetchOneKeyPersonnel),
    // call(watcherFetchAllExternalDocuments),
    // call(watcherFetchOneExternalDocuments),
    // call(watcherFetchAllCommunicationGroups),
    // call(watcherFetchAllCommunicationGroupUsers),
    // call(watcherFetchPagedCommunicationMessages),
    // call(watcherSearchCommunicationMessages),
    // call(watcherFetchAllKlingMaterialApprovals),
    // call(watcherFetchOneKlingMaterialApprovals),
    // call(watcherFetchAllPreConcepts),
    // call(watcherFetchPagedPreConcepts),
    // call(watcherFetchOnePreConcepts),
    // call(watcherFetchAllConcepts),
    // call(watcherFetchPagedConcepts),
    // call(watcherFetchOneConcepts),
    // call(watcherFetchAllWeeklySiteReports),
    // call(watcherFetchOneWeeklySiteReports),
    // call(watcherFetchAllWeeklyPlanReports),
    // call(watcherFetchOneWeeklyPlanReports),
    // call(watcherFetchAllMaterialApprovalStatus),
    // call(watcherFetchOneMaterialApprovalStatus),
    // call(watcherFetchAllDesignChangeLogs),
    // call(watcherFetchOneDesignChangeLogs),
    // call(watcherFetchAllSharedMeetings),
    // call(watcherFetchAllCategory),
    // call(watcherFetchOneCategory),
    // call(watcherFetchAllSubCategory),
    // call(watcherFetchOneSubCategory),
    // call(watcherFetchAllFinancials),
    // call(watcherFetchOneFinancials),
    // call(watcherFetchAllStatusBoard),
    // call(watcherFetchOneStatusBoard),
    // call(watcherFetchAllProjectTaskCategory),
    // call(watcherFetchOneProjectTaskCategory),
    // call(watcherFetchAllProjectCategoryBoard),
    // call(watcherFetchOneProjectCategoryBoard),
    // call(watcherFetchOneProjectDurations),
    // call(watcherFetchAllProjectDurations),
    // call(watcherFetchAllTimeExtensions),
    // call(watcherFetchOneTimeExtensions),
    // call(watcherFetchAllProjectVariations),
    // call(watcherFetchOneProjectVariations),
    
    // call(watcherFetchAllBankAccounts),
    // call(watcherFetchOneBankAccounts),

    
    // // Keno - Game
    // call(watcherFetchAllKenoGames),
    // call(watcherFetchOneKenoGame),    
    // call(watcherFetchAllKenoCashers),
    // call(watcherFetchOneKenoCasher),    
    // call(watcherFetchAllTodayKenoBills),
    // call(watcherFetchOneTodayKenoBill),   
    // call(watcherFetchAllTodayByGameKenoBills),
    // call(watcherFetchOneTodayByGameKenoBill),
    // call(watcherFetchAllAnyDayKenoBills),
    // call(watcherFetchOneAnyDayKenoBill),   
    // call(watcherFetchAllAnyDayByGameKenoBills),
    // call(watcherFetchOneAnyDayByGameKenoBill),  

    // call(watcherFetchAllThisWeekKenoBills),
    // call(watcherFetchOneThisWeekKenoBill),     
    // call(watcherFetchAllAnyWeekKenoBills),
    // call(watcherFetchOneAnyWeekKenoBill),   

    // call(watcherFetchAllThisMonthKenoBills),
    // call(watcherFetchOneThisMonthKenoBill),      
    // call(watcherFetchAllAnyMonthKenoBills),
    // call(watcherFetchOneAnyMonthKenoBill),   
         
    // call(watcherFetchAllInstantKenoReports),
    // call(watcherFetchOneInstantKenoReport), 
    // call(watcherFetchAllAnyDayInstantKenoReports),
    // call(watcherFetchOneAnyDayInstantKenoReport), 
    // call(watcherFetchAllAGameKenoReports),
    // call(watcherFetchOneAGameKenoReport),   
    // call(watcherFetchAllAnyDayKenoReports),
    // call(watcherFetchOneAnyDayKenoReport),   
    // call(watcherFetchAllAnyDayByGameKenoReports),
    // call(watcherFetchOneAnyDayByGameKenoReport),     
    
    // call(watcherFetchAllThisWeekKenoReports),
    // call(watcherFetchOneThisWeekKenoReport), 
    // call(watcherFetchAllAnyWeekKenoReports),
    // call(watcherFetchOneAnyWeekKenoReport),    
    
    // call(watcherFetchAllThisMonthKenoReports),
    // call(watcherFetchOneThisMonthKenoReport),  
    // call(watcherFetchAllAnyMonthKenoReports),
    // call(watcherFetchOneAnyMonthKenoReport),   
    
    // call(watcherFetchAllThisYearKenoReports),
    // call(watcherFetchOneThisYearKenoReport),  
    // call(watcherFetchAllAnyYearKenoReports),
    // call(watcherFetchOneAnyYearKenoReport),   

    call(watcherFetchAllCartelas),
    call(watcherFetchOneCartela),

  ]);
}
