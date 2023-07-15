import moment from "moment";

export const TaskPriority = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

export const TaskStage = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  WAITING: "Waiting",
  COMPLETED: "Completed",
} as const;

export const CommunicationSocketEvents = {
  NEW_COMMUNICATION_GROUP: "NEW_COMMUNICATION_GROUP",
  JOIN_ROOMS: "JOIN_ROOMS",
  LEAVE_ROOM: "LEAVE_ROOM",
  NEW_MESSAGE: "NEW_MESSAGE",
} as const;

export const Status = {
  PENDING: 0,
  APPROVED: 1,
  REVISE: 2,
};

export const ContractSalesTypes = {
  SALES: "Sales",
  OTHER: "Other",
};

export const MaterialEvaluationTypes = {
  ARCHITECTURAL: "Architectural",
  PLUMBING: "Plumbing",
  ELECTRICAL: "Electrical",
  FINISHING: "Finishing",
};

export const Currency = {
  ETB: "ETB",
  USD: "USD",
};

export const ApartmentExpenseFormType = {
  GENERAL: "General",
  SPECIFIC: "Specific",
};

export const ApartmentExpenseType = {
  INDIRECT_COST: "Indirect cost",
  DIRECT_COST: "Direct cost",
  COMPOUND_AND_PARKING: "Compound and parking",
  ADMINISTRATION: "Administration",
  COMMISSION: "Commission",
  CONTINGENCY: "Contingency",
  OTHER: "Other",
  ESTIMATE: "Estimate cost",
};

export const PenalityTypes = {
  WRITTEN_WARNING: "Written Warning",
  FINAL_WRITTEN_WARNING: "Final Written Warning",
  CASH_PENALITY: "Cash Penality",
  TERMINATION: "Termination",
};

export const TreatmentGivenTypes = {
  FIRST_AID: "First Aid",
  SENT_TO_HOSPITAL: "Sent to hospital",
  SENT_TO_CLINIC: "Sent to clinic",
};

export const WeeklyReportCatagoryTypes = {
  SKILLED: "Skilled",
  UNSKILLED: "UnSkilled",
};

export const SeverityOfInjury = {
  MINOR: "Minor",
  MAJOR: "Major",
};

export const AttendanceType = {
  Absence: "Absence",
  TimeSheet: "TimeSheet",
};

export const ApplicationStatus = {
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  INTERVIEW: "INTERVIEW",
  FOLLOW_UP_INTERVIEW: "FOLLOW_UP_INTERVIEW",
  TEST: "TEST",
  UNDER_REVIEW: "UNDER_REVIEW",
};

export const BuildType = {
  ENTERPRISE: "Enterprise",
  PROJECT: "Project",
  ENTERPRISE_PROJECT: "Enterprise Project",
};

export const BUILD = BuildType.ENTERPRISE;

export const DocumentTabs = {
  MY_DOCUMENT: "My Document",
  SHARED_DOCUMENT: "Shared Document",
  WORK_ORDER: "Work Order",
};

export const Company = {
  NAME_ENGLISH: "HillBottom Real estate",
  NAME_ENGLISH_LONG: "Jefor Construction & Real estate",
  NAME_AMHARIC: "ጄፎር ኮንስትራክሽን እና ሪል ስቴት ሀላፊነቱ የተወሰነ የግል ማህበር",
  NAME_ID: "J4",
  ADDRESS_AMHARIC: "አ/አ ቦሌ ክ/ከተማ ወረዳ __ አዲካ ህንጻ 6ኛ ፎቅ",
  LOGO: false,
  RENOVATION: false,
};

export const RFIStatus = {
  PENDING: "PENDING",
  ANSWERED: "ANSWERED",
};

export const UserAction = {
  APPROVE: "Approve",
  CHECK: "Check",
};
// export const Company = {
//   NAME_ENGLISH: "Shangi Furniture",
//   NAME_AMHARIC: "ሻንጊ  ፈርኒችር",
//   NAME_ID: "SF",
//   NAME_ENGLISH_LONG: "Shangi Furniture",
//   ADDRESS_AMHARIC: "አ/አ ቦሌ ክ/ከተማ ወረዳ __ አዲካ ህንጻ 6ኛ ፎቅ",
//   LOGO: false,
//   RENOVATION: true,
// };

// export const Company = {
//   NAME_ENGLISH: "GTS Construction",
//   NAME_AMHARIC: "GTS Construction",
//   NAME_ID: "GTS",
//   NAME_ENGLISH_LONG: "GTS Construction",
//   ADDRESS_AMHARIC: "አ/አ ቦሌ ክ/ከተማ ወረዳ __ አዲካ ህንጻ 6ኛ ፎቅ",
//   LOGO: false,
// RENOVATION:false
// };

// export const Company = {
//   NAME_ENGLISH: "Mudcon Construction",
//   NAME_AMHARIC: "Mudcon Construction",
//   NAME_ID: "Mudcon",
//   NAME_ENGLISH_LONG: "Mudcon Construction",
//   ADDRESS_AMHARIC: "__________________",
//   LOGO: false,
// RENOVATION:false
// };

export const ProjectTypes = {
  BUILDING: "Building",
  ROAD: "Road",
  WATER: "Water",
  INDUSTRY: "Industry",
  POWER: "Power",
  RENOVATION: "Renovation",
};

export const TypeOfProject = {
  PRE_CONTRACT: "pre-contract",
  POST_CONTRACT: "post-contract",
  SUB_CONTRACT: "sub-contract",
};

export const EmploymentType = {
  EMPLOYEE: "Employee",
  LABOUR: "Labour",
};

export const InventoryType = {
  MATERIAL: "Material",
  EQUIPMENT: "Equipment",
};

export const RoleType = {
  HUMAN_RESOURCE: "Human Resource",
  PROCUREMENT: "Procurement",
  PROJECT_MANAGER: "Project Manager",
  ACCOUNTING: "Accounting",
  SITE_MANAGER: "Site Manager",
  ROOT: "Root",
  CLIENT: "client",
  CONTRACTOR: "contractor",
  CONSULTANT: "consultant",
};

export const REBAR_SHEET_LIMIT = 32;
export const TRACKER_NAME = "Condigital-Project-Tracker";
export const ProcurementTabs = {
  MATERIAL_REQUISITION: "Material Requisition",
  PURCHASE_REQUISITION: "Purchase Requisition",
  PURCHASE_ORDER: "Purchase Order",
  PURCHASE_BILLING: "Purchase Billing",
  MATERIAL: "Material",
  SUPPLIER: "Supplier",
  PROFORMA: "Proforma",
  ANALYTICS: "Analytics",
  PLAN: "Plan",
  PROFORMA_COMPARISON: "Proforma Comparison",
};

export const ServiceType = {
  RETENTION: "Retention",
  PAYMENT: "Payment",
  SALES: "Sales",
};

export const ContractTypes = {
  DESIGN_BID_BUILD: "Design ,Bid and Build",
  DESIGN_BUILD: "Design and Build",
};

export const BoqSuperTitle = {
  SUBSTRUCTURE: "SUB STRUCTURE",
  SUPERSTRUCTURE: "SUPER STRUCTURE",
  VARIATION_WORK: "VARIATION WORK",
};

export const ProjectMenuTabs = {
  DESIGN: "Design",
  DELIVERABLES: "Deliverables",
  SUPERVISION: "Supervision",
  CONTRACT_ADMINISTRATION: "Contract Administration",
  DETAIL: "Detail",
  USER_CONTROL: "User Control",
  PLANNING: "Planning",
  CONCEPT: "Concept",
  PRE_CONCEPT: "Pre Concept",
  ITEM_GROUP: "Item Group",
  TASK_FOLLOW_UP: "Task Follow Up",
};

export const KenoReportTabs = {
  DESIGN: "Design",
  DELIVERABLES: "Deliverables",
  SUPERVISION: "Supervision",
  CONTRACT_ADMINISTRATION: "Contract Administration",
  DETAIL: "Detail",
  USER_CONTROL: "User Control",
  PLANNING: "Planning",
  CONCEPT: "Concept",
  PRE_CONCEPT: "Pre Concept",
  ITEM_GROUP: "Item Group",
  TASK_FOLLOW_UP: "Task Follow Up",
  TODAY: "Today",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  ANNUAL: "Annual",
  SUMMARY: "Summary",
};

export const DesignTabs = {
  STRUCTURAL: "Structural",
  ARCHITECTURE: "Architecture",
  PLUMBING: "Plumbing",
  MECHANICAL: "Mechanical",
  ELECTRICAL: "Electrical",
  FIRE_FIGHTING: "Fire Fighting",
  SPECIAL_SYSTEM: "Special System",
  BOQ: "BoQ",
  SANITARY: "Sanitary",
};

export const DeliverablesTabs = {
  PERSONNEL: "Personnel",
};

export const ReportTab = {
  WEEKLY_PLAN: "Weekly Plan",
  WEEKLY_REPORT: "Weekly Report",
  MONTHLY_REPORT: "Monthly Report",
  PHOTO_AND_VIDEO: "Photos And Videos",
  SUMMARY_REPORT: "Summary Report",
};

export const DetailTabs = {
  PROJECT: "Project",
  BOQ: "BoQ",
  CLIENT: "Client",
  CONSULTANT: "Consultant",
  CONTRACTOR: "Contractor",
  PAYMENT: "Payment",
  PROJECT_DURATION: "Project Duration",
  TIME_EXTENSION: "Time Extension",
};
export const ItemGroupTab = {
  CATEGORY: "Category",
  SUB_CATEGORY: "Sub Category",
};
export const TodayReportTab = {
  INSTANT_REPORT: "Instant",
  A_GAME_REPORT: "A Game",
  ANY_DAY_ALL_GAME_REPORT: "All Game - Any Day",
  ANY_DAY_BY_A_GAME_REPORT: "A Game - Any Day",
};
export const TodayBillsTab = {
  TODAY_BILLS: "Today's",
  TODAY_BILLS_BY_GAME: "Today's By Game",
  ANY_DAY_BILLS: "Any Day",
  ANY_DAY_BILLS_BY_GAME: "Any Day By Game",
};
export const WeeklyReportTab = {
  THIS_WEEK: "This Week",
  ANY_WEEK: "Any Week",
};
export const WeeklyBillsTab = {
  THIS_WEEK: "This Week",
  ANY_WEEK: "Any Week",
};
export const MonthlyReportTab = {
  THIS_MONTH: "This Month",
  ANY_MONTH: "Any Month",
};
export const MonthlyBillsTab = {
  THIS_MONTH: "This Month",
  ANY_MONTH: "Any Month",
};
export const AnnualReportTab = {
  THIS_YEAR: "This Year",
  ANY_YEAR: "Any Year",
};
export const SummaryReportTab = {
  IN_RANGE: "In Range",
  SCANNER: "Scanner",
  DAILY: "Daily",
  WEEKKLY: "Weekly",
  MONTHLY: "Monthly",
  ANNUAL: "Annual",
};
export const SupervisionReportTab = {
  MATERIAL_APPROVAL_STATUS: "Material Approval Status",
  DESIGN_CHANGE_LOG: "Design Change Log",
  FINANCIAL: "Financial",
  MONTHLY_REPORT: " Monthly Report",
};
export const FinanceTab = {
  BANK_ACCOUNT: "Bank Account",
};

export const SummaryTabs = {
  SUMMARY: "Contract Summary",
  BOQ: "Contract BoQ",
  VARIATION: "Variation",
  WORK_ITEM: "Work Item",
  MASTER_SCHEDULE: "Master Schedule",
  PLAN: "Plans",
  REPORT: "Reports",
  CASH_FLOW: "Cash Flow",
  GRAND_SUMMARY: "Executed Summary",
  MEASUREMENT_CERTIFICATE: "Measurement Certificate",
  PAYMENT_CERTIFICATE: "Payment Certificate",
  REQUESTED_PAYMENTS: "Requested Payments",
  PAYMENTS: "Payments",
  PRICE_ESCALATION: "Price Escalation",
  ANALYTICS: "Analytics",
  EDIT: "Edit",
  ACTIVITY: "Activity",
  MEETING: "Minutes Of Meeting",
  INSPECTION: "Inspection",
  SITE_DIARY: "Site-Diary",
  WEEKLY_PROGRESS_REPORT: "Weekly Progress Report",
  TEST: "Material Test",
  SUBMITTAL: "Submittal",
  MATERIAL_APPROVAL: "Material Approval",
  MATERIAL_EVALUATION: "Material Evaluation",
  MATERIAL_REQUEST: "Material Request",
  QUERY: "Query",
  SUBMITTAL_APPROVAL: "Submittal and Approvals",
  MEDIA: "Media",
  RFI: "RFI",
  LETTER: "Letter",
  STAFF_WORK: "Staff Works",
  RISK_LOG: "Risk Log",
  DOCUMENT: "Document",
  SITE_ORDER: "Site Book",
  MONTHLY_REPORT: "Monthly Report",
  MEMO: "Memo",
  PAYMENT: "Payment",
  DATA: "Data",
  SITE_HANDOVER: "Site-Handover",
  Kling_MATERIAL_APPROVAL: "Kling Material Approval",
  PROJECT_MONTHLY_REPORT: "Monthly Reports",
  PROJECT_VARIATION: "Project Variation",
};

export const DateTypes = {
  DATE: "Date",
  RANGE: "Range",
};

export const PurchaseOrderType = {
  REQUESTED: "Requested",
  NON_REQUESTED: "Non-Requested",
};

export const RISK_CATEGORY = ["Construction"];

export const RISK_OWNER = ["Contractor", "Consultant", "Client/Owner"];

export const RISK_RESPONSE_STRATEGY = ["Mitigate"];
export const MasterScheduleTab = {
  PROGRESS_REPORT: "Progress Report",
  USAGE_REPORT: "Usage Report",
};

export const WeatherTypes = {
  FINE: "Fine",
  GOOD: "Good",
  BAD: "Bad",
};

export const ConsultantSummaryTab = {
  GRAND_SUMMARY: "Executed Summary",
  MEASUREMENT_CERTIFICATE: "Measurement Certificate",
  PAYMENT_CERTIFICATE: "Payment Certificate",
  TAKEOFF: "TakeOff",
  REBAR: "Rebar",
  LS: "Lump Sum",
};

export const AccessType = {
  READ: "READ ONLY",
  WRITE: "WRITE",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

export const SUBMITTAL_TYPES = ["Master Schedule", "Work Methodology"];

export const PAYMENT_REQUEST_TYPES = [
  "Advance Payment",
  "Interim Payment",
  "Final Payment",
  "Escalation",
  "Retention",
];

export const DATA_TYPES = [
  "Architectural Design",
  "Structural Drawing",
  "Plumbing Drawing",
  "Fire Fighting Drawing",
  "Electrical Drawing",
  "Sanitary Drawing",
  "Mechanical Drawing",
  "Contract Document",
  "BoQ",
  "Technical Specification",
  "Design Report",
  "Structural Model File",
  "Others",
];

export const MEETING_FILE_TYPE = [
  "Regular Weekly",
  "Regular Bi-Weekly",
  "Regular Monthly",
  "Regular Quarterly",
  "Regular Annual",
  "Other",
];

export const CONTRACT_ADMINSTRATION_TYPES = [
  "Claim",
  "Variations",
  "Others",
  "Performance Guarantee",
  "Advance Guarantee",
  "Securities",
  "Contract Document",
];

export const PreContractTab = {
  SUMMARY: "Contract Summary",
  BOQ: "Contract BoQ",
  TAKE_OFF: "TakeOff",
  REBAR: "Rebar",
  LS: "Aggregate",
  UNIT_BREAK_DOWN: "Unit Breakdown",
};

export const InventoryTabs = {
  MATERIAL: "Material",
  SUPPLIER: "Supplier",
  INVENTORIES: "Inventory",
  REPORTS: "Summary Reports",
  REPORT: "Reports",
  REPORT_USAGE: "Report Usage",
  GOODS_RECEIVED: "Goods Received",
  GOODS_TRANSFER_OUT: "Goods Transfer Out",
  GOODS_RETURN_NOTE: "Goods Return Note",
  ASSET_GATE_PASS: "Asset Gate Pass",
  MY_FORMS: "My Forms",
};

export const FinanceTabs = {
  ACCOUNT: "Account",
  CUSTOMER: "Customers",
  SERVICE: "Service",
  INVOICE: "Invoices",
  PAYMENT: "Revenue",
  EXPENSE: "Expense",
  SUMMARY: "Company Finance",
  RETENTION: "Retention",
  DETAIL: "Project Finance",
  REPORT: "Reports",
  TRANSACTION: "Transactions",
  RECEIVABLE: "Receivables",
  PETTY_CASH: "Petty Cash",
  PAYABLE: "Payables",
  CONTRACT: "Contracts",
  COST_REVENUE_RECOGNITION: "Cost and revenue recognition",
  CONTRACT_SALES: "Contract sales",
};

export const ShipmentType = {
  AIR_FREIGHT: "Air Freight",
  SEA_FREIGHT: "Sea Freight",
  LAND_FREIGHT: "Land Freight",
  TRAIN: "Train",
  EMS: "EMS",
  POST_OFFICE: "Post Office",
  DHL: "DHL",
};

export const FinanceReportType = {
  GRAND_LEDGER: "Grand Ledger",
  AGED_RECEIVABLES: "Aged Receivables",
  CASHFLOW_STATEMENT: "Cashflow Statement",
  BALANCE_SHEET: "Balance Sheet",
};

export const PayrollInterval = {
  MONTHLY: "Monthly",
  BIWEEKLY: "Bi-Weekly",
  WEEKLY: "Weekly",
  CUSTOM: "Custom",
};
export const HRTabs = {
  LABOUR: "Daily Labour",
  STAFF: "Employee",
  DEPARTMENT: "Department",
  ASSIGNED_PROJECT: "Project Team Structure",
  REPORT: "Reports",
  PAYROLL: "Payroll",
  EMPLOYEE_ATTENDANCE: "Attendance",
  MEMO: "Memo",
  EMPLOYEE_REQUEST: "Benefits",
  PROMOTION: "Promotion",
  HR_POLICY: "HR Policy",
  QR_GENERATOR: "Labor Id QR",
  DOCUMENT: "Document",
  ALLOWANCE: "Allowance",
  HIRING: "Hiring",
  REVIEW: "Review",
};

export const WORK_DAYS_PER_MONTH = 26;

export const ALLOWANCE_TYPE = [
  { name: "Transport(Home to Work)", amount: 600, percentage: 0 },
  { name: "Transport (Fuel)", amount: 2200, percentage: 0 },
  { name: "Daily ", amount: 500, percentage: 0.04 },
  {
    name: "Daily (Breakfast,Lunch,Dinner)",
    amount: 300,
    percentage: 0.025,
  },
  { name: "Management", amount: 1000, percentage: 0.05 },
  {
    name: "Health Issue (Small)",
    amount: 0,
    percentage: 0.25,
  },
  {
    name: "Health Issue (Medium)",
    amount: 0,
    percentage: 0.4,
  },
  {
    name: "Health Issue (High)",
    amount: 0,
    percentage: 0.6,
  },
  {
    name: "Construction Operators",
    amount: Infinity,
    percentage: 0,
  },
  {
    name: "Gov Office Employee Hard Labour",
    amount: Infinity,
    percentage: 0,
  },
];

export const LabourStatus = {
  ACTIVE: "Active",
  TERMINATED: "Terminated",
};

export const AttendanceStatus = {
  ON_LEAVE: "On Leave",
  CLOCK_IN: "Clock In",
  CLOCK_OUT: "Clock OUT",
  ABSENT: "Absent",
  PRESENT: "Present",
};

export const ReportExpenseType = {
  MATERIAL: "Material",
  EQUIPMENT: "Equipment",
  LABOUR: "Labour",
  OVERTIME: "Overtime",
};

export const EmployeeRequestType = {
  TRAVEL_REQUEST: "Travel",
  BENEFIT_REQUEST: "Benefit",
  LEAVE_REQUEST: "Leave",
  OVERTIME_REQUEST: "Over-Time",
  LOAN: "Loan",
};

export const LeaveRequestType = {
  MATERNAL_PRE: "Maternal (Pre Birth)",
  MATERNAL_POST: "Maternal (Post Birth)",
  PATERNAL: "Paternal",
  SICK: "Sick",

  DISABILITY: "Disability",
  BEREAVEMENT: "Bereavement",
  OTHER: "Other",
  ANNUAL: "Annual",
};

export const Units = {
  M: "M",
  M2: "M²",
  M3: "M³",
  NO: "Nº",
};

export const Sex = {
  MALE: "Male",
  FEMALE: "Female",
};

export const RepaymentType = {
  PERCENTAGE: "Percentage",
  AMOUNT_PER_MONTH: "Amount Per Month ",
};

export const LeavePaymentType = {
  PAID: "Paid",
  UNPAID: "Unpaid",
};

export const HRPolicyType = {
  LEAVE: "Leave",
  OVERTIME: "Overtime",
  ALLOWANCE: "Allowance",
};

export const BenefitType = {
  MEDICAL_INSURANCE: "Medical Insurance",
  LIFE_INSURANCE: "Life Insurance",
  RETURN_PLANS: "Return Plans",
  DISABILITY_INSURANCE: "Disability Insurance",
  OTHER: "Other",
};

export const EquipmentTabs = {
  EQUIPMENT: "Equipment",
  REPORTS: "Summary Reports",
  REPORT: "Report Operation",
  WORK_ORDER: "Work Order",
};

export const EquipmentType = {
  RENT: "Rent",
  PURCHASE: "Purchase",
};

export const ManpowerType = {
  STAFF: "Staff",
  LABOUR: "Labour",
};

export const InventoryReport = {
  TRANSFER: "Transfer",
  USAGE: "Usage",
  OPERATION: "Operation",
  WORK_ORDER: "Work-Order",
};

export const ApprovalType = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  ADVANCE: "Advance Payment",
};

export const ApprovalValue = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
  ADVANCE: 3,
};

export const SupplierType = {
  LOCAL: "Local",
  FOREIGN: "Foreign",
};

export const LabourType = {
  SKILLED: "Skilled",
  UNSKILLED: "UnSkilled",
};

export const AnalyticsType = {
  PERFORMANCE: "Project Performance",
  CONTRACT_PERFORMED: "Contract Vs. Performed Vs. Planned",
  SCHEDULE_PERFORMANCE: "Schedule Performance",
  PAID_EXPENSE_PROFIT: "Paid Vs. Expense Vs. Profit",
  PERFORMED_PAID: "Performed Vs. Paid",
  PROFIT_MARGIN: "Profit Margin",
};

export const ReportType = {
  PROGRESS_REPORT: "Progress Report",
  VARIATION: "Variation",
  OVERTIME: "Overtime",
  EXPENSE_REPORT: "Expense Report",
  PETTY_CASH: "Petty Cash",
  SUB_CONTRACT_REPORT: "Sub-Contract Report",
};

export const ProjectCardType = {
  TOTAL: "Total",
  BUILDING: "Building",
  ROAD: "Road",
  POWER: "Power",
  WATER: "Water",
  INDUSTRIES: "Industries",
  RENOVATION: "Renovation",
};

export const ClientCard = {
  PROJECTS: "My Projects",
  DOCUMENTS: "My Documents",
  EMPLOYEES: "Employees",
  INVENTORY: "My Inventory",
};

export const ProgressType = {
  REBAR: "Rebar",
  TAKEOFF: "Takeoff",
  ROAD: "Road",
  LS: "LS",
};

export const LSType = {
  DIVIDED_BY_LOCATION: "Divided By Location",
  AGGREGATE: "Aggregate",
};

export const DateType = {
  DATE: "date",
  WEEK: "week",
  MONTH: "month",
  QUARTER: "quarter",
  YEAR: "year",
};

export const ProjectStatus = {
  PRE_CONTRACT: 0,
  POST_CONTRACT: 1,
  STALLED: 2,
  FINISHED: 3,
};

export const PlanTabs = {
  INCOME_SUMMARY: "Income-Breakdown",
  EXPENSE_SUMMARY: "Summary",
  MODE_OF_PAYMENT: "Execution Plan",
  ACTIVITY_PLAN: "Activity-Plan",
  UNIT_BREAKDOWN: "Unit Breakdown",
  SUB_CONTRACT: "Sub-Contract",
  RESOURCE_STATUS: "Resource Status",
  EQUIPMENT_SCHEDULE: "Equipment Schedule",
  MATERIAL_SCHEDULE: "Material Schedule",
  PERMANENT_LABOUR: "Permanent Manpower",
  TEMPORARY_LABOUR: "Temporary Manpower",
  EMPLOYEE_ACCOMMODATION_PLAN: "Employee Accommodation",
  OTHER_EXPENSE: "Other Expense",
};

export const ReportSummaryTabs = {
  TO_DATE_PROJECT_INFO: "To-Date Project Info",
  INCOME_EXPENSE_SUMMARY: "Income  Summary",
  DETAIL_REVENUE: "Detail Revenue",
  EXPENSE_ANALYSIS: "Expense Analysis",
  EXPENSE: "Expense",
  MAN_POWER_COST_SUMMARY: "Man Power Cost Summary",
  EARNED_VALUE: "Earned Value",
};

export const BudgetStatus = {
  OVER_BUDGET: "Over-Budget",
  UNDER_BUDGET: "Under-Budget",
  ON_BUDGET: "On-Budget",
  UNDETERMINED: "-",
  UNDER_PERFORMED: "Under-Performed",
  PERFORMED_AS_PLANNED: "Performed As Planned",
  OVER_PERFORMED: "Over-Performed",
};
export const ExpenseAnalysisType = {
  PERFORMANCE: "performance",
  BUDGET: "budget",
};

export const ExpenseType = {
  PLANNED: "planned",
  ACTUAL: "actual",
};

export const ExecutedType = {
  CURRENT: "current",
  PREVIOUS: "previous",
  TODATE: "to_date",
};

export const WorkTime = {
  IN_TIME: moment("9:00", "h:mm"),
  OUT_TIME: moment("17:00", "h:mm"),
  LUNCH_TIME_IN: moment("12:00", "h:mm"),
  LUNCH_TIME_OUT: moment("12:00", "h:mm"),
};

export const DateComponentType = {
  REPORT: "report",
  PLAN: "plan",
};

export const Region = [
  "Addis Abeba",
  "Afar",
  "Amhara",
  "Tigray",
  "Benshangul",
  "Dire Dawa",
  "Gambela",
  "Harar",
  "Oromia",
  "Somalia",
  "SNNPR",
];

export const NotificationType = {
  SUCCESS: "success",
  ERROR: "error",
  WARRING: "warning",
  INFO: "info",
};

export const SubContractType = {
  SUPPLY: "Supply",
  LABOUR: "Labour",
  SUPPLY_AND_FIX: "Supply and Fix",
};

export const SubmittalAction = {
  APPROVAL: "Approval",
  REVIEW: "Review",
  FOR_INFORMATION: "For Information",
  FOR_PRELIMINARY: "For Preliminary",
};

export const SubmittalItemType = {
  NEW: "New Submittal",
  RESUBMISSION: "Resubmission",
};

export const MaterialRequestType = {
  APPROVAL_REQUEST: "Material Approval Request",
  APPROVAL_RESUBMISSION: "Material Approval Resubmission",
};

export const PerformanceMeterics = {
  yes_no: "Yes/No",
  percentage: "Percentage",
};

export const ReviewTime = {
  EVERY_DAY: "Every Day",
  EVERY_WEEK: "Every Week",
  EVERY_MONTH: "Every Month",
  EVERY_YEAR: "Every Year",
};

export const FC_CONSTANTS: any = {
  0: 0,
  7: 0.65,
  14: 0.9,
  28: 1,
};

export const MU = 1.64;

export const SiteBookType = [
  "Design Change",
  "Quantity",
  "Variation",
  "Suspension",
  "Material Change",
  "Rectification (Work)",
  "Other",
];

export const Message = {
  REGISTER_SUCCESS: "Registered Successfully!",
  REGISTER_FAILED: "Failed to Register",

  UPDATE_SUCCESS: "Updated Successfully!",
  UPDATE_FAILED: "Failed to Update",

  DELETE_SUCCESS: "Deleted Successfully!",
  DELETE_FAILED: "Failed to Delete",

  UPLOAD_SUCCESS: "Upload successful",
  UPLOAD_FAILED: "Upload failed",
  LABOUR_ATTENDANCE_REMOVED: "Attendance Removed!",
  LABOUR_ATTENDANCE_FAILED: "Failed to Remove Attendance!",
  BONUS_SUCCESS: "Bonus successfully registered",
  BONUS_FAILED: "Bonus is not registered",
  DELETE_BONUS_SUCCESS: "Bonus deleted",
  DELETE_BONUS_FAILED: "Bonus not deleted",
  ADD_EMPLOYEE_REVIEW_SUCCESS: "Employee review added successfully",
  ADD_EMPLOYEE_REVIEW_FAILED: "Employee review could not be added",
  EMPLOYEE_REVIEW_UPDATE_SUCCESS: "Employee review updated Successfully",
  EMPLOYEE_REVIEW_UPDATE_FAILURE: "Employee review update failed",
  DELETE_EMPLOYEE_REVIEW_SUCCESS: "Employee review deleted",
  DELETE_EMPLOYEE_REVIEW_FAILED: "Employee review not deleted",
  REVIEW_FORM_UPDATE_SUCCESS: "Review form updated",
  REVIEW_FORM_UPDATE_FAILURE: "Review form update failed",
  REVIEW_FORM_SUCCESS: "Review Form Added Successfully",
  REVIEW_FORM_FAILURE: "Review form not added",
  DELETE_REVIEW_FORM_SUCCESS: "Review form deleted",
  DELETE_REVIEW_FORM_FAILED: "Review form not deleted",
  PROJECT_REGISTRATION_SUCCESS: "Project Registered!",
  PROJECT_REGISTRATION_FAILED: "Project Registration Failed!",
  BOQ_EDIT_SUCCESS: "BoQ Edited",
  BOQ_EDIT_FAILED: "Failed to Edit BoQ ",
  MODE_OF_PAYMENT_SUCCESS: "Execution Plan Registered!",
  MODE_OF_PAYMENT_FAILED: "Execution Plan Failed!",
  ACTIVITY_PLAN_SUCCESS: "Activity Plan Registered!",
  ACTIVITY_PLAN_FAILED: "Activity Plan Failed!",
  SUB_CONTRACT_PLAN_SUCCESS: "Sub Contract Plan Registered!",
  SUB_CONTRACT_PLAN_FAILED: "Sub Contract Plan Failed!",
  RESOURCE_STATUS_SUCCESS: "Resource Status Registered!",
  RESOURCE_STATUS_FAILED: "Resource Status Failed!",
  CAN_NOT_REMOVE_ITEM: "Can not remove item",
  REMOVE_FAIL: "Can not remove registered data",
  REBAR_FAILED: "Rebar Report Failed!",
  REBAR_SUCCESS: "Rebar Reported!",
  REBAR_REMOVE_FAILED: "Failed to Remove Rebar!",
  REBAR_REMOVE_SUCCESS: "Rebar Removed!",
  TAKEOFF_FAILED: "Takeoff Report Failed!",
  TAKEOFF_SUCCESS: "Takeoff Reported!",
  TAKEOFF_REMOVE_FAILED: "Failed to Remove Takeoff!",
  TAKEOFF_REMOVE_SUCCESS: "Takeoff Remove Failed",
  GENERAL_SUCCESS: "Report Successful!",
  PAYMENT_CERTIFICATE_SUCCESS: "Payment Certificate Registered!",
  PAYMENT_CERTIFICATE_FAILED: "Payment Certificate Registration Failed!",

  ESTIMATE_COST_ADDED: "Estimate cost added",
  ESTIMATE_COST_NOT_ADDED: "Estimate cost not added",

  ESTIMATE_COST_UPDATED: "Estimate cost updated",
  ESTIMATE_COST_NOT_UPDATED: "Estimate cost not updated",

  MATERIAL_SUCCESS: "Material Registered!",
  MATERIAL_FAILED: "Material Registration Failed!",
  SUPPLIER_SUCCESS: "Supplier Registered!",
  SUPPLIER_FAILED: "Supplier Registration Failed!",
  INVENTORY_SUCCESS: "Inventory Registered",
  INVENTORY_FAILED: "Inventory Registration Failed!",
  TRANSFER_SUCCESS: "Transfer Successful!",
  TRANSFER_FAILED: "Transfer Failed!",

  ESTIMATE_UPDATED: "Estimate updated",
  ESTIMATE_NOT_UPDATED: "Estimate not updated",

  ESTIMATE_DELETED: "Estimate deleted",
  ESTIMATE_NOT_DELETED: "Estimate not deleted",

  ESTIMATE_SUCCESS: "Estimate added",
  ESTIMATE_FAILED: "Estimate not added",

  USER_REGISTRATION_SUCCESS: "User Registration Successful",
  USER_REGISTRATION_FAILED: "Failed to Register User",

  LABOUR_SUCCESS: "Labour Registered",
  LABOUR_FAILED: "Labour Registration Failed!",

  LABOUR_USAGE_SUCCESS: "Labour Usage Registered",
  LABOUR_USAGE_FAILED: "Labour Usage Registration Failed!",

  EQUIPMENT_SCHEDULE_SUCCESS: "Equipment Schedule Registered",
  EQUIPMENT_SCHEDULE_FAILED: "Equipment Schedule Registration Failed!",

  MATERIAL_SCHEDULE_SUCCESS: "Material Schedule Registered",
  MATERIAL_SCHEDULE_FAILED: "Material Schedule Registration Failed!",

  TEMPORARY_LABOUR_SUCCESS: "Labour Registered",
  TEMPORARY_LABOUR_FAILED: "Labour Registration Failed!",

  WEEKLY_REPORT_PENDING_SUCCESS: "Weekly report updated",
  WEEKLY_REPORT_PENDING_FAILURE: "Weekly report not updated",

  SITE_DIARY_PENDING_SUCCESS: "Site diary updated",
  SITE_DIARY_PENDING_FAILURE: "Site diary not updated",

  MATERIAL_REQUEST_PENDING_SUCCESS: "Material Request updated",
  MATERIAL_REQUEST_PENDING_FAILURE: "Material Request not updated",

  MATERIAL_EVALUATION_PENDING_SUCCESS: "Material Evaluation updated",
  MATERIAL_EVALUATION_PENDING_FAILURE: "Material Evaluation not updated",

  SAVED: "Saved",
  NOT_SAVED: "Not Saved",

  ACCOUNT_SUCCESS: "Account Registered",
  ACCOUNT_FAILED: "Account Registration Failed!",
  ACCOUNT_UPDATE_SUCCESS: "Account Updated",
  ACCOUNT_UPDATE_FAILED: "Account Update Failed!",

  BUILDING_ADDED: "Building registered",
  BUILDING_NOT_ADDED: "Building not registered",

  BUILDING_UPDATED: "Building updated",
  BUILDING_NOT_UPDATED: "Building not updated",

  CUSTOMER_SUCCESS: "Customer Registered",
  CUSTOMER_FAILED: "Customer Registration Failed!",
  CUSTOMER_UPDATE_SUCCESS: "Customer Updated",
  CUSTOMER_UPDATE_FAILED: "Customer Update Failed!",

  APARTMENT_NOT_DELETED: "Apartment not deleted",

  SERVICE_SUCCESS: "Service Registered",
  SERVICE_FAILED: "Service Registration Failed!",
  SERVICE_UPDATE_SUCCESS: "Service Updated",
  SERVICE_UPDATE_FAILED: "Service Update Failed!",

  PERMANENT_MANPOWER_SUCCESS: "Permanent Manpower Registered",
  PERMANENT_MANPOWER_FAILED: "Permanent Manpower Registration Failed!",

  REMOVE_SUCCESS: "Successfully Removed!",
  REMOVE_FAILED: "Failed to Remove ",

  UNIT_BREAKDOWN_SUCCESS: "Unit-Breakdown Registered",
  UNIT_BREAKDOWN_FAILED: "Unit-Breakdown Registration Failed!",

  VARIATION_SUCCESS: "Variation Registered",
  VARIATION_FAILED: "Variation Registration Failed!",

  PAYMENT_APPROVAL_SUCCESS: "Payment Approval Successful",
  PAYMENT_APPROVAL_FAILED: "Payment Approval Failed!",

  PAYMENT_REJECT_SUCCESS: "Payment Rejected",
  PAYMENT_REJECT_FAILED: "Failed to Reject",

  PAYMENT_CERTIFICATE_ALREADY_GENERATED: "Payment Already Generated!",

  SUB_CONTRACT_SUCCESS: "Sub Contract Registered!",
  SUB_CONTRACT_FAILED: "Sub Contract Registration Failed!",

  SITE_DIARY_DELETE_SUCCESS: "Site diary deleted",
  SITE_DIARY_DELETE_FAILURE: "Site diary not deleted",

  MATERIAL_REQUEST_DELETE_SUCCESS: "Material Request deleted",
  MATERIAL_REQUEST_DELETE_FAILURE: "Material Request not deleted",

  MATERIAL_EVALUATION_DELETE_SUCCESS: "Material Evaluation deleted",
  MATERIAL_EVALUATION_DELETE_FAILURE: "Material Evaluation not deleted",

  INVOICE_SUCCESS: "Invoice Registered!",
  INVOICE_FAILED: "Invoice Registration Failed!",

  PAYMENT_SUCCESS: "Revenue Registered!",
  PAYMENT_FAILED: "Revenue Registration Failed!",

  PAYMENT_REMOVE_SUCCESS: "Revenue Removed!",
  PAYMENT_REMOVE_FAILED: "Failed to Remove Revenue",

  CONTRACT_SALES_SUCCESS: "Contract sales added",
  CONTRACT_SALES_FAILED: "Contract sales failed",

  WEEKLY_REPORT_DELETE_SUCCESS: "Weekly report deleted",
  wEEKLY_REPORT_DELETE_FAILURE: "Weekly report not deleted",

  EXPENSE_SUCCESS: "Expense Registered!",
  EXPENSE_FAILED: "Expense Registration Failed!",

  RFI_SUCCESS: "RFI Registered",
  RFI_FAILED: "RFI registration failed",

  RFI_RESPONSE_SUCCESS: "RFI Response Registered",
  RFI_RESPONSE_FAILED: "RFI Response registration failed",

  MEETING_SUCCESS: "Meeting Added!",
  MEETING_FAILED: " Failed to Add Meeting!",

  MEETING_REMOVED_SUCCESS: "Meeting Removed!",
  MEETING_REMOVED_FAILED: "Failed to Remove Meeting!",

  MATERIAL_EVALUATION_REMOVED_SUCCESS: "Meeting Removed!",
  MATERIAL_EVALUATION_REMOVED_FAILED: "Failed to Remove Meeting!",

  EXPENSE_REMOVE_SUCCESS: "Expense Removed!",
  EXPENSE_REMOVE_FAILED: "Failed to Remove Expense",

  PRICE_ESCALATION_SUCCESS: "Price Escalation Updated!",
  PRICE_ESCALATION_FAILED: "Price Escalation Update Failed!",

  PRICE_ADJUSTMENT_SUCCESS: "Price Adjustment Updated!",
  PRICE_ADJUSTMENT_FAILED: "Price Adjustment Update Failed!",

  DOCUMENT_DOWNLOAD_FAILED: "Document Download Failed!",
  DOCUMENT_REMOVE_SUCCESS: "Document Removed Success!",
  DOCUMENT_REMOVE_FAILED: "Failed to Remove Document!",

  DOCUMENT_UPLOAD_SUCCESS: "Document Upload Success!",
  DOCUMENT_UPLOAD_FAILED: "Failed to Upload Document!",

  SHE_SUCCESS: "SHE successfully added",
  SHE_FAILED: "SHE failed to register",

  DEPARTMENT_SUCCESS: "Department Registered!",
  DEPARTMENT_FAILED: "Failed to Register Department!",

  DEPARTMENT_UPDATE_SUCCESS: "Department Updated!",
  DEPARTMENT_UPDATE_FAILED: "Failed to Update Department!",

  STAFF_SUCCESS: "Staff Registered!",
  STAFF_FAILED: "Failed to  Registered Staff!",

  STAFF_UPDATE_SUCCESS: "Staff Updated!",
  STAFF_UPDATE_FAILED: "Failed to  Update Staff!",

  STAFF_TERMINATED_SUCCESS: "Staff Terminated!",
  STAFF_TERMINATED_FAILURE: "Failed to Terminate Staff!",
  PROJECT_ASSIGNED_SUCCESS: "Project Assigned Successful!",
  PROJECT_ASSIGNED_FAILED: "Project Assignment Failed!",

  EXPORT_FAILED: "Export Failed",
  ADVANCE_BUDGET: "Advance Should be Less then Budget",
  PROJECT_UPDATE_SUCCESS: "Project Update Successful!",
  PROJECT_UPDATE_FAILED: "Project Update Failed!",

  PROJECT_REMOVE_SUCCESS: "Demo Project Removed",
  PROJECT_REMOVE_FAILED: "Failed to Remove Project",

  MANPOWER_OVERTIME_SUCCESS: "Overtime Report Successful!",
  MANPOWER_OVERTIME_FAILED: "Overtime Report Failed!",

  PAYROLL_SUCCESS: "Payroll Registered Successful!",
  PAYROLL_FAILED: "Payroll Registration Failed!",

  PAYROLL_ROLLBACK_SUCCESS: "Payroll Rollback Successful!",
  PAYROLL_ROLLBACK_FAILED: "Payroll Rollback Failed!",

  SCHEDULING_FAILED: "Scheduling Error",

  EMPTY_FIELD: "Empty Field",

  EMPLOYEE_REQUEST_SUCCESS: "Employee Request Registered!",
  EMPLOYEE_REQUEST_FAILED: "Employee Request Registration Failed!",

  MATERIAL_REQUISITION_SUCCESS: "Material Requisition Registered! ",
  MATERIAL_REQUISITION_FAILED: "Material Requisition Registration Failed!",

  PURCHASE_REQUISITION_SUCCESS: "Purchase Requisition Registered! ",
  PURCHASE_REQUISITION_FAILED: "Purchase Requisition Registration Failed!",

  PURCHASE_ORDER_SUCCESS: "Purchase Order Registered! ",
  PURCHASE_ORDER_FAILED: "Purchase Order Registration Failed!",

  PURCHASE_BILLING_SUCCESS: "Purchase Billing Registered!",
  PURCHASE_BILLING_FAILED: "Purchase Billing Registration Failed!",

  GOOD_RECEIVED_SUCCESS: "Good Received Registered!",
  GOOD_RECEIVED_FAILED: "Good Received Registered Failed!",

  GOOD_OUT_SUCCESS: "Good Out Registered!",
  GOOD_OUT_FAILED: "Good Out Registered Failed!",

  PROMOTION_SUCCESS: "Employee Promoted!",
  PROMOTION_FAILED: "Employee Promotion Failed!",

  WORK_ORDER_SUCCESS: "Work Order Registered!",
  WORK_ORDER_FAILED: "Work Order Registration Failed!",

  WORK_ORDER_REMOVE_SUCCESS: "Work Order Removed!",
  WORK_ORDER_REMOVE_FAILED: "Failed to Remove Work Order!",

  ABSENCE_REGISTERED: "Absence Registered!",
  ABSENCE_REGISTRATION_FAILED: "Absence Registration Failed!",
  ABSENCE_REMOVED: "Absence Removed!",
  ABSENCE_REMOVAL_FAILED: "Absence Removal Failed!",
  ABSENCE_ALREADY_REGISTERED: "Can Not Register Absence!",

  HR_POLICY_REGISTERED: "HR Policy Registered!",
  HR_POLICY_REGISTRATION_FAILED: "HR Policy Registration Failed!",
  HR_POLICY_UPDATED: "HR Policy Updated!",
  HR_POLICY_UPDATE_FAILED: "HR Policy Update Failed!",
  HR_POLICY_REMOVED: "HR Policy Removed!",
  HR_POLICY_REMOVAL_FAILED: "HR Policy Removal Failed!",
  HR_POLICY_ALREADY_REGISTERED: "HR Policy Already Registered",

  BENEFIT_REQUEST_REMOVED_SUCCESS: "Benefit Removed!",
  BENEFIT_REQUEST_REMOVED_FAILED: "Failed to Remove!",

  MATERIAL_USAGE_REMOVED_SUCCESS: "Material Usage Removed!",
  MATERIAL_USAGE_REMOVED_FAILED: "Failed to Remove!",

  ALLOWANCE_REGISTERED: "Allowance Registered!",
  ALLOWANCE_REMOVED: "Allowance Removed!",

  ALLOWANCE_REGISTRATION_FAILED: "Failed to Register Allowance!",
  ALLOWANCE_REMOVAL_FAILED: "Failed to Remove!",
  ALLOWANCE_ALREADY_REGISTERED: "Allowance Already Registered",

  EMPLOYEE_ACCOMMODATION_PLAN_SUCCESS: "Employee Accommodation Registered!",
  EMPLOYEE_ACCOMMODATION_PLAN_FAILED:
    "Failed to Register Employee Accommodation!",
  EMPLOYEE_NOT_FOUND: "Employee Not Found!",

  CHECKED_SUCCESS: "Item Checked",
  GENERAL_FAILED: "Action Failed",

  APPROVED_SUCCESS: "Item Approved",
  APPROVED_FAILED: "Approval Failed",

  APPROVED_REVISE_SUCCESS: "Approve Revised",
  APPROVED_REVISE_FAILED: "Revise Approval Failed",

  REVISION_SUCCESS: "Item on revision",
  REVISION_FAILED: "Revision failed",

  ITEM_REMOVED: "Item Removed",

  RESOURCE_SUCCESS: "Resource Registered!",
  RESOURCE_FAILED: "Failed to Register Resource!",

  MATERIAL_REQUISITION_REMOVE_SUCCESS: "Material Requisition Removed!",
  MATERIAL_REQUISITION_REMOVE_FAILED: "Failed to Remove Material Requisition!",
  SIGNATURE_SUCCESS: "Signature Registered!",
  SIGNATURE_FAILED: "Failed to Register Signature!",

  SIGNATURE_REMOVE_SUCCESS: "Signature Removed!",
  SIGNATURE_REMOVE_FAILED: "Failed to Remove Signature!",

  PURCHASE_REQUISITION_REMOVE_SUCCESS: "Purchase Requisition Removed!",
  PURCHASE_REQUISITION_REMOVE_FAILED: "Failed to Remove Purchase Requisition!",

  PURCHASE_ORDER_REMOVE_SUCCESS: "Purchase Order Removed!",
  PURCHASE_ORDER_REMOVE_FAILED: "Failed to Remove Purchase Order!",

  INSPECTION_FORM_SUCCESS: "Inspection Form Registered!",
  INSPECTION_FORM_FAILED: "Failed to Registered Inspection Form!",

  INSPECTION_FORM_EDIT_SUCCESS: "Inspection Form Edited!",
  INSPECTION_FORM_EDIT_FAILED: "Failed to Edit Inspection Form!",

  INSPECTION_FORM_DELETE_SUCCESS: "Inspection Form Deleted!",
  INSPECTION_FORM_DELETE_FAILED: "Failed to Delete Inspection Form!",

  CASTING_FORM_SUCCESS: "Casting Registered!",
  CASTING_FORM_FAILED: "Failed to Register Casting!",

  TEST_FORM_SUCCESS: "Test Registered!",
  TEST_FORM_FAILED: "Failed to Register Test!",

  SUBMITTAL_SUCCESS: "Submittal Registered!",
  SUBMITTAL_FAILED: "Failed to Register Submittal!",

  REMARK_SUCCESS: "Remark Registered!",
  REMARK_FAILED: "Failed to Register Remark!",

  MATERIAL_APPROVAL_SUCCUSS: "Material Request Registered!",
  MATERIAL_APPROVAL_FAILED: "Material Request FAILED!",

  SITE_DIARY_SUCCESS: "Site Diary Registered!",
  SITE_DIARY_FAILURE: "Failed to Register Site Diary!",

  SITE_DIARY_UPDATE_SUCCESS: "Site Diary Updated Successfuly",
  SITE_DIARY_UPDATE_FAILED: "Site Diary Update Failed",

  MATERIAL_REQUEST_SUCCESS: "Material Request Registered!",
  MATERIAL_REQUEST_FAILURE: "Failed to Register Material Request!",

  MATERIAL_REQUEST_UPDATE_SUCCESS: "Material Request Updated Successfuly",
  MATERIAL_REQUEST_UPDATE_FAILED: "Material Request Update Failed",

  MATERIAL_EVALUATION_SUCCESS: "Material Evaluation Registered!",
  MATERIAL_EVALUATION_FAILURE: "Failed to Register Material Evaluation!",

  MATERIAL_EVALUATION_UPDATE_SUCCESS: "Material Evaluation Updated Successfuly",
  MATERIAL_EVALUATION_UPDATE_FAILED: "Material Evaluation Update Failed",

  WEEKLY_REPORT_SUCCESS: "Weekly report registered",
  WEEKLY_REPORT_FAILURE: "Weekly report not added",

  WEEKLY_PROGRESS_SUCCESS: "Weekly progress added successfuly",
  WEEKLY_PROGRESS_FAILURE: "Weekly Progress not added",

  WEEKLY_PROGRESS_UPDATE_SUCCESS: "Weekly Progress update successfuly",
  WEEKLY_PROGRESS_UPDATE_FAILURE: "Weekly Progress update failed",

  QUERY_SUCCESS: "Query Registered!",
  QUERY_FAILED: "Query Failed",

  SHARED_DOCUMENT_SUCCESS: "Document Shared!",
  SHARED_DOCUMENT_FAILED: "Document Sharing Failed!",

  DOCUMENT_STATUS_UPDATE_SUCCESS: "Document Status Updated!",
  DOCUMENT_STATUS_UPDATE_FAILED: "Failed to Update Document Status!",

  ACTION_REGISTERER_SUCCESS: "Item Action Registered",
  ACTION_REGISTERER_FAILED: "Item Action Registration Failed",

  BANK_ACCOUNT_REGISTERED_SUCCESS: "Bank Account Registered!",
  BANK_ACCOUNT_REGISTERED_FAILED: "Bank Account Registration failed!",

  LETTER_REGISTRATION_SUCCESS: "Letter Registered!",
  LETTER_REGISTRATION_FAILED: "Failed to Register Letter",

  EMPLOYER_REQUIREMENT_REGISTRATION_SUCCESS: "Employer requirement Registered!",
  EMPLOYER_REQUIREMENT_REGISTRATION_FAILED:
    "Failed to Register Employer requirement",

  COST_ESTIMATION_REGISTRATION_SUCCESS: "Cost Estimation Registered!",
  COST_ESTIMATION_REGISTRATION_FAILED: "Failed to Register cost estimation",

  TENDER_DOCUMENT_REGISTRATION_SUCCESS: "Tender Document Registered!",
  TENDER_DOCUMENT_REGISTRATION_FAILED: "Failed to Register Tender Document",

  CONTRACT_REGISTRATION_SUCCESS: "Contract Registered!",
  CONTRACT_REGISTRATION_FAILED: "Failed to Register Contract",

  DRAWING_REGISTRATION_SUCCESS: "Drawing Registered!",
  DRAWING_REGISTRATION_FAILED: "Failed to Register Drawing",

  USER_ASSIGNED_SUCCESS: "User Assigned!",
  USER_ASSIGNED_FAILED: "Failed to Assign User!",

  REJECT_SUCCESS: "Report Rejected!",
  REJECT_FAILED: "Failed to Reject Report!",
  CONTRACT_REGISTERED_SUCCESS: "Contract Registered!",
  CONTRACT_REGISTERED_FAILED: "Failed to Register Contract!",

  RECEIVABLE_REGISTRATION_SUCCESS: "Receivable Registered!",
  RECEIVABLE_REGISTRATION_FAILED: "Failed to Register Receivable!",

  ATTACHMENT_REGISTRATION_SUCCESS: "Attachment Registered!",
  ATTACHMENT_REGISTRATION_FAILED: "Failed to Register Attachment",

  PETTY_CASH_REGISTRATION_SUCCESS: "Petty Cash Registered!",
  PETTY_CASH_REGISTRATION_FAILED: "Failed to Register Petty Cash",

  REPLENISHMENT_TRANSACTION_REGISTRATION_SUCCESS: "Transaction Registered!",
  REPLENISHMENT_TRANSACTION_REGISTRATION_FAILED:
    "Failed to Register Transaction",

  REQUEST_REPLENISHMENT_REGISTRATION_SUCCESS:
    "Request Replenishment Registered!",
  REQUEST_REPLENISHMENT_REGISTRATION_FAILED: "Failed to Request Replenishment",

  POST_CHECK_REGISTRATION_SUCCESS: "Post Check Registered!",
  POST_CHECK_REGISTRATION_FAILED: "Failed to Register Post Check",

  POST_CHECK_CASHED_OUT_SUCCESS: "Post Check Cashed Out!",
  POST_CHECK_CASHED_OUT_FAILED: "Failed to Cash Out Post Check",

  POST_CHECK_Drop_SUCCESS: "Post Check Dropped!",
  POST_CHECK_Drop_FAILED: "Failed to Drop Post Check",

  CRV_PAYMENT_REMOVE_SUCCESS: "CRV Payment removed",
  CRV_PAYMENT_REMOVE_FAILED: "Failed to remove CRV Payment",

  DAILY_REPORT_SUCCESS: "Daily Report Registered!",
  DAILY_REPORT_FAILED: "Failed to Register Daily Report",

  CASTING_UPDATE_SUCCESS: "Casting updated!",
  CASTING_UPDATE_FAIL: "Failed to update Casting",

  CASTING_DELETE_SUCCESS: "Casting deleted!",
  CASTING_DELETE_FAILED: "Failed to delete Casting",

  INSPECTION_REQUEST_UPDATE_SUCCESS: "Inspection updated!",
  INSPECTION_REQUEST_UPDATE_FAILED: "Failed to update Inspection",

  INSPECTION_REQUEST_DELETE_SUCCESS: "Inspection deleted!",
  INSPECTION_REQUEST_DELETE_FAILED: "Failed to delete Inspection",

  TEST_RESULT_UPDATE_SUCCESS: "Test Result updated successfully!",
  TEST_RESULT_UPDATE_FAILED: "Failed to update Test Result update",

  TEST_RESULT_DELETE_SUCCESS: "Test Result deleted successfully!",
  TEST_RESULT_DELETE_FAIL: "Failed to delete Test Result",

  CHECK_LIST_FORM_REGISTERED_SUCCESS: "Checklist form registered successfully!",
  CHECK_LIST_FORM_REGISTERED_FAIL: "Failed to register Checklist form",

  CHECK_LIST_FORM_DELETE_SUCCESS: "Checklist form deleted successfully!",
  CHECK_LIST_FORM_DELETE_FAIL: "Failed to delete Checklist form",

  CHECK_LIST_REGISTERED_SUCCESS: "Checklist registered successfully!",
  CHECK_LIST_REGISTERED_FAIL: "Failed to register Checklist",

  CHECK_LIST_DELETE_SUCCESS: "Checklist deleted successfully!",
  CHECK_LIST_DELETE_FAIL: "Failed to delete Checklist",

  KEY_PERSONNEL_REGISTERED_SUCCESS: "Key Personnel registered successfully!",
  KEY_PERSONNEL_REGISTERED_FAIL: "Failed to register Key Personnel",

  KEY_PERSONNEL_UPDATE_SUCCESS: "Key Personnel registered successfully!",
  KEY_PERSONNEL_UPDATE_FAIL: "Failed to register Key Personnel",

  KEY_PERSONNEL_DELETE_SUCCESS: "Key Personnel deleted successfully!",
  KEY_PERSONNEL_DELETE_FAIL: "Failed to delete Key Personnel",

  CONCEPT_REGISTERED_SUCCESS: "Concept registered successfully!",
  CONCEPT_REGISTERED_FAIL: "Failed to register Concept",

  CONCEPT_UPDATE_SUCCESS: "Concept updated successfully!",
  CONCEPT_UPDATE_FAIL: "Failed to update Concept",

  CONCEPT_DELETE_SUCCESS: "Concept deleted successfully!",
  CONCEPT_DELETE_FAIL: "Failed to delete Concept",

  KEY_PERSONNEL_ATTACHMENT_DOWNLOAD_FAIL: "Failed to download Attachment",
  WEEKLY_PLAN_REPORT_REGISTERED_SUCCESS:
    "Weekly Plan Report registered successfully!",
  WEEKLY_PLAN_REPORT_REGISTERED_FAIL: "Failed to register Weekly Plan Report",

  WEEKLY_PLAN_REPORT_UPDATE_SUCCESS: "Weekly Plan Report updated successfully!",
  WEEKLY_PLAN_REPORT_UPDATE_FAIL: "Failed to update Weekly Plan Report",

  WEEKLY_PLAN_REPORT_DELETE_SUCCESS: "Weekly Plan Report deleted successfully!",
  WEEKLY_PLAN_REPORT_DELETE_FAIL: "Failed to delete Weekly Plan Report",

  MATERIAL_APPROVAL_STATUS_REGISTERED_SUCCESS:
    "Material Approval Status registered successfully!",
  MATERIAL_APPROVAL_STATUS_REGISTERED_FAIL:
    "Failed to register Material Approval Status",

  MATERIAL_APPROVAL_STATUS_UPDATE_SUCCESS:
    "Material Approval Status updated successfully!",
  MATERIAL_APPROVAL_STATUS_UPDATE_FAIL:
    "Failed to update Material Approval Status",

  MATERIAL_APPROVAL_STATUS_DELETE_SUCCESS:
    "Material Approval Status deleted successfully!",
  MATERIAL_APPROVAL_STATUS_DELETE_FAIL:
    "Failed to delete Material Approval Status",

  DESIGN_CHANGE_LOG_REGISTERED_SUCCESS:
    "Design Change Log registered successfully!",
  DESIGN_CHANGE_LOG_REGISTERED_FAIL: "Failed to register Design Change Log",

  DESIGN_CHANGE_LOG_UPDATE_SUCCESS: "Design Change Log updated successfully!",
  DESIGN_CHANGE_LOG_UPDATE_FAIL: "Failed to update Design Change Log",

  DESIGN_CHANGE_LOG_DELETE_SUCCESS: "Design Change Log deleted successfully!",
  DESIGN_CHANGE_LOG_DELETE_FAIL: "Failed to delete Design Change Log",

  CATEGORY_REGISTERED_SUCCESS: "Category registered successfully!",
  CATEGORY_REGISTERED_FAIL: "Failed to register Category",

  CATEGORY_UPDATE_SUCCESS: "Category updated successfully!",
  CATEGORY_UPDATE_FAIL: "Failed to update Category",

  CATEGORY_DELETE_SUCCESS: "Category deleted successfully!",
  CATEGORY_DELETE_FAIL: "Failed to delete Category",

  SUB_CATEGORY_REGISTERED_SUCCESS: "Sub Category registered successfully!",
  SUB_CATEGORY_REGISTERED_FAIL: "Failed to register Sub Category",

  SUB_CATEGORY_UPDATE_SUCCESS: "Sub Category updated successfully!",
  SUB_CATEGORY_UPDATE_FAIL: "Failed to update Sub Category",

  SUB_CATEGORY_DELETE_SUCCESS: "Sub Category deleted successfully!",
  SUB_CATEGORY_DELETE_FAIL: "Failed to delete Sub Category",

  FINANCIAL_REGISTERED_SUCCESS: "Financial report registered successfully!",
  FINANCIAL_REGISTERED_FAIL: "Failed to register Financial report",

  FINANCIAL_UPDATE_SUCCESS: "Financial report updated successfully!",
  FINANCIAL_UPDATE_FAIL: "Failed to update Financial report",

  FINANCIAL_DELETE_SUCCESS: "Financial report deleted successfully!",
  FINANCIAL_DELETE_FAIL: "Failed to delete Financial report",

  STATUS_BOARD_REGISTERED_SUCCESS: "Status-Board registered successfully!",
  STATUS_BOARD_REGISTERED_FAIL: "Failed to register Status-Board",

  STATUS_BOARD_UPDATE_SUCCESS: "Status-Board updated successfully!",
  STATUS_BOARD_UPDATE_FAIL: "Failed to update Status-Board",

  STATUS_BOARD_DELETE_SUCCESS: "Status-Board deleted successfully!",
  STATUS_BOARD_DELETE_FAIL: "Failed to delete Status-Board",

  BOARD_PROJECT_REGISTERED_SUCCESS: "Board-Project registered successfully!",
  BOARD_PROJECT_REGISTERED_FAIL: "Failed to register Board-Project",

  BOARD_PROJECT_UPDATE_SUCCESS: "Board-Project updated successfully!",
  BOARD_PROJECT_UPDATE_FAIL: "Failed to update Board-Project",

  BOARD_PROJECT_DELETE_SUCCESS: "Board-Project deleted successfully!",
  BOARD_PROJECT_DELETE_FAIL: "Failed to delete Board-Project",

  PROJECT_DURATION_REGISTERED_SUCCESS:
    "Project Duration registered successfully!",
  PROJECT_DURATION_REGISTERED_FAIL: "Failed to register Project Duration",

  PROJECT_DURATION_UPDATE_SUCCESS: "Project Duration updated successfully!",
  PROJECT_DURATION_UPDATE_FAIL: "Failed to update Project Duration",

  PROJECT_DURATION_DELETE_SUCCESS: "Project Duration deleted successfully!",
  PROJECT_DURATION_DELETE_FAIL: "Failed to delete Project Duration",

  PROJECT_VARIATION_REGISTERED_SUCCESS:
    "Project Variation registered successfully!",
  PROJECT_VARIATION_REGISTERED_FAIL: "Failed to register Project Variation",

  PROJECT_VARIATION_UPDATE_SUCCESS: "Project Variation updated successfully!",
  PROJECT_VARIATION_UPDATE_FAIL: "Failed to update Project Variation",

  PROJECT_VARIATION_DELETE_SUCCESS: "Project Variation deleted successfully!",
  PROJECT_VARIATION_DELETE_FAIL: "Failed to delete Project Variation",

  TIME_EXTENSION_REGISTERED_SUCCESS: "Time Extension registered successfully!",
  TIME_EXTENSION_REGISTERED_FAIL: "Failed to register Time Extension",

  TIME_EXTENSION_UPDATE_SUCCESS: "Time Extension updated successfully!",
  TIME_EXTENSION_UPDATE_FAIL: "Failed to update Time Extension",

  TIME_EXTENSION_DELETE_SUCCESS: "Time Extension deleted successfully!",
  TIME_EXTENSION_DELETE_FAIL: "Failed to delete Time Extension",
};

export const UsageReportType = {
  DAILY: "Daily",
  RANGE: "Range",
  DOWN_TIME: "Down Time",
  MAINTENANCE: "Maintenance",
};

export const MasterScheduleActions = {
  APPROVER: "Approver",
  REPORTER: "Reporter",
};
export const PAYMENT_TYPE = [
  "Interim PC",
  "Penultimate Certificate",
  "Final Certificate",
  "Variation Certificate",
  "Certificate of Practical completion",
  "Certificate of Making good defects",
  "Certificate of non-completion",
];

export const LetterType = {
  NEW: "New",
  RESPONSE: "Response",
};

export const NEW_LETTER_TYPE = {
  INCOMING: "Incoming",
  OUT_GOING: "Outgoing",
};

export const TransferMode = {
  LAND: "Land",
  AIR: "Air",
};

export const StaffStatus = {
  ACTIVE: "Active",
  TERMINATED: "Terminated",
};

export const GoodReceivedType = {
  PURCHASES: "Purchase",
  TRANSFER: "Transfer",
  RENT: "Rent",
  REQUESTED: "Requested",
  ASSET: "Asset",
};

export const StaffType = {
  PERMANENT: "Permanent",
  TEMPORARY: "Temporary",
};

export const ResourceType = {
  STAFF: "Staff",
  LABOUR: "Labour",
  EQUIPMENT: "Equipment",
  VEHICLE: "Vehicle",
  MATERIAL: "Material",
};

export const StaffReportType = {
  EMPLOYEE: "Employee",
  PAYROLL: "Payroll",
  ATTENDANCE: "Attendance",
  LEAVE: "Leave",
  OVERTIME: "Overtime",
  LOAN: "Loan",
};

export const CashFlowTabs = {
  SUMMARY: "Summary",
  DETAIL: "Detail",
};

interface States {
  [state: number]: number; //indexer
}

export const WeightRebar: States = {
  6: 0.22,
  8: 0.395,
  10: 0.617,
  12: 0.888,
  14: 1.208,
  16: 1.58,
  20: 2.47,
  24: 3.55,
  32: 5.3,
};

export const REBAR_LENGTH = 12;

export const OvertimeMultiplier = {
  HOLIDAY: {
    multiplier: 2.5,
    start_time: moment("00:00", "h:mm"),
    end_time: moment("24:00", "h:mm"),
  },
  SUNDAY: {
    multiplier: 2,
    start_time: moment("00:00", "h:mm"),
    end_time: moment("24:00", "h:mm"),
  },
  SATURDAY: {
    multiplier: 2,
    start_time: moment("12:00", "h:mm"),
    end_time: moment("24:00", "h:mm"),
  },
  DAY_OVERTIME: {
    multiplier: 1.5,
    start_time: moment("6:00", "h:mm"),
    end_time: moment("21:00", "h:mm"),
  },
  NIGHT_OVERTIME: {
    multiplier: 1.75,
    start_time_night: moment("21:00", "h:mm"),
    end_time_night: moment("24:00", "h:mm"),
    start_time_day: moment("00:00", "h:mm"),
    end_time_day: moment("6:00", "h:mm"),
  },
};

export const AttendanceUserType = {
  SIGNING: "Signing",
  NON_SIGNING: "Non-Signing",
};

export const UNITS = [
  { name: "M", value: "m", type: "length" },
  { name: "M²", value: "m2", type: "area" },
  { name: "M³", value: "m3", type: "volume" },
  { name: "KM", value: "km", type: "length" },
  { name: "KG", value: "kg", type: "mass" },
  { name: "Lt.", value: "l", type: "volume" },
  { name: "ML", value: "ml", type: "volume" },
  { name: "PCS", value: "pcs", type: "no" },
  { name: "Berga", value: "berga", type: "no" },
  { name: "Nº", value: "no", type: "no" },
  { name: "Quintal", value: "quintal", type: "mass" },
  { name: "Ton", value: "ton", type: "mass" },
];

export const COMPANY_CATEGORY = [
  "Contractor",
  "Consultant",
  "Real-Estate Developer",
  "Freelance",
];

export const ETHIOPIAN_MONTHS = [
  "መስከረም",
  "ጥቅምት",
  "ኅዳር",
  "ታኅሣሥ",
  "ጥር",
  "የካቲት",
  "መጋቢት",
  "ሚያዝያ",
  "ግንቦት",
  "ሰኔ",
  "ሐምሌ",
  "ነሐሴ",
  "ጳጉሜ",
];

export const ConversionRate: any = {
  g: {
    g: 1,
    kg: 0.001,
    quintal: 0.0001,
    ton: 0.000001,
  },
  kg: {
    g: 1000,
    kg: 1,
    quintal: 0.01,
    ton: 0.001,
  },
  quintal: {
    g: 100000,
    kg: 100,
    quintal: 1,
    ton: 0.1,
  },
  ton: {
    g: 1000000,
    kg: 1000,
    quintal: 100,
    ton: 1,
  },
};

export const ValidationStatus = {
  ERROR: "error",
  VALIDATING: "validating",
};
export const ItemCategory = {
  CONSTRUCTION_MATERIAL: "Construction Material",
  CONSTRUCTION_EQUIPMENT: "Construction Equipment",
  VEHICLE: "Vehicle",
};

export const PriorityType = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};
export const MeetingType = {
  REGULAR_WEEKLY: "Regular Weekly",
  REGULAR_BIWEEKLY: "Regular Biweekly",
  REGULAR_MONTHLY: "Regular Monthly",
  REGULAR_QUARTERLY: "Regular Quarterly",
  REGULAR_ANNUAL: "Regular Annual",
};

export const MATERIAL_LIST = [
  "Ceramic Product",
  "Cement Product",
  "Electrical Material",
  "Explosive",
  "Gas & Bottles Accessories",
  "Glass Material",
  "Gravel and Selected Material",
  "Iron Bar",
  "Laboratory Material",
  "Metallic Product",
  "Plastic Product",
  "Plumbing & Sanitary Materials",
  "Painting Material",
  "Wooden Material",
];

export const EQUIPMENT_LIST = [
  " Asphalt Batching Plant",
  "Generator",
  "Air Compressor",
  "Tower Cranes",
  "Pile Boring Machine",
  "Pile Driving Machine",
];

export const ACCOUNT_TYPES = [
  "Accounts Payable",
  "Accounts Receivable",
  "Accumulated Deprecation",
  "Cash",
  "Cost of Sales",
  "Equity-doesn't close",
  "Equity-Retained Earnings",
  "Expenses",
  "Fixed Assets",
  "Income",
  "Inventory",
  "Long Term Liabilities",
  "Other Assets",
];
export const VEHICLE_LIST = [
  "Backhoe",
  "Bulldozers",
  "Dragline Excavator",
  "Dozer",
  "Excavator",
  "Roller",
  "Grader",
  "Asphalt Paver",
  "Water Truck",
  "Asphalt Truck",
  "Pick up",
  "Fuel Truck",
  "Lowbed",
  "Small Vehicle",
  "Pneumatic Tyred Roller",
  "Double Drum Steel Roller",
  "Loader",
  "Asphalt Distributor",
  "Wheel Tractor Scraper",
  "Pavers",
  "Feller Bunchers",
  "Dump Trucks",
];

export const DEPARTMENT = [
  "Engineering",
  "Construction",
  "Equipment Maintenance",
  "Project administration",
  "Health and Safety",
  "Equipment",
];

export const HeaderType = {
  DESCRIPTION: "Description",
  DATA: "Data",
  TOTAL: "Total",
};

export const VariationType = {
  NEW: "New",
  UPDATE: "Update",
  REPORT: "Report",
};

export const PaymentMethod = {
  CASH: "Cash",
  CHECK: "Check",
  BANK_TRANSACTION: "Bank Transaction",
};

export const DOCUMENT_TYPE = [
  "Resume",
  "Education Document",
  "Employment verification",
  "letters",
  "Tax RecordsMedical Document",
  "Promotion Request",
  "Government Id",
  "Location Map",
  "Feasibility and Analysis",
  "Cost Document",
  "Contract Document",
  "Electrical Design",
  "Structural Design",
  "Sanitary Design",
  "Architectural Design",
  "Site Diary",
  "Inspection",
  "Claim And Variation",
  "Payroll",
  "Labour Time-Sheet",
  "Equipment Time-Sheet",
  "Photo",
  "Monthly Progress Report",
  "Design Modifications",
  "Carta",
  "Legal Documents",
  "Site Book",
  "Other",
];

export const GeneralWorkProgress = ["Completed", "Ongoing", "Planned"];

export const VAT = 1.15;
export const INCOME_TAX = 1.15;

export const TOUR_DELAY = 1000;

export const ALLOWED_FILE_SIZE = 104860000;

export const COMPANY_PENSION = 1.11;
export const EMPLOYEE_PENSION = 1.07;

export const OVERTIME = 1.2;
export const ONGOING = "OnGoing";
export const STALLED = "Stalled";
export const FINISHED = "Finished";
export const EXPECTED_ADJUSTMENT = 1.08;
export const OVERHEAD_EXPENSE = 1.1;
export const OTHER_EXPENSE = 1.05;
export const LESS_WITH_HOLDING_TAX = 1.02;
export const FUEL_RATE = 25.8;
export const WITH_HOLD = 1.02;

export const AMORTIZATION_EXPENSE = "Amortization Expense";
export const BAD_DEBTS = "Bad Debts";
export const BANK_CHARGES = "Bank Charges";
export const COMMISSIONS_AND_FEES = "Commissions & Fees";
export const DUES_AND_SUBSCRIPTION = "Dues & Subscriptions";
export const EQUIPMENT_RENTAL = "Equipment Rental";
export const INCOME_TAX_EXPENSE = "Income Tax Expense";
export const INSURANCE_DISABILITY = "Insurance - Disability";
export const INSURANCE_GENERAL = "Insurance - General";
export const INSURANCE_LIABILITY = "Insurance - Liability";
export const INTEREST_EXPENSE = "Interest Expense";
export const LEGAL_AND_PROFESSIONAL_FEES = "Legal & Professional Fees";
export const LOSS_ON_DISCONTINUED =
  "Loss on Discontinued Operations, Net of Tax";
export const MANAGEMENT_COMPENSATION = "Management Compensation";
export const MEALS_AND_ENTERTAINMENT = "Meals & Entertainment";
export const OFFICE_EXPENSES = "Office Expense";
export const OTHER_GENERAL_AND_ADMINISTRATIVE_EXPENSE =
  "Other General & Administrative Expenses";
export const OTHER_SELLING_EXPENSE = "Other Selling Expenses";
export const OTHER_TYPE_OF_EXPENSE_ADVERTISING_EXPENSES =
  "Other Types of Expenses-Advertising Expenses";
export const PAYROLL_EXPENSES = "Payroll Expenses";
export const PURCHASES = "Purchases";
export const RENT_OR_LEASE_PAYMENTS = "Rent or Lease Payments";
export const REPAIRS_AND_MAINTENANCE = "Repairs & Maintenance";
export const SHIPPING_AND_DELIVERY_EXPENSE = "Shipping & Delivery Expense";
export const STATIONERY_AND_PRINTING = "Stationery & Printing";
export const SUPPLIES = "Supplies";
export const TRAVEL_EXPENSES_GENERAL_AND_ADMIN_EXPENSES =
  "Travel Expenses - General & Admin Expenses";
export const TRAVEL_EXPENSES_SELLING_EXPENSES =
  "Travel Expenses - Selling Expenses";
export const UNCATEGORIZED_EXPENSE = "Uncategorized Expense";
export const UTILITIES = "Utilities";
export const WAGE_EXPENSES = "Wage Expenses";

export const CASH_AND_CASH_EQUIVALENTS = "Cash & Cash Equivalents";
export const FUEL_EXPENSE = "Fuel Expense";
export const ALLOWANCE_FOR_BAD_DEBT = "Allowance for Bad Debt";
export const AVAILABLE_FOR_SALE_ASSETS =
  "Available for sale assets (short-term)";
export const INVENTORY = "Inventory";
export const INVENTORY_ASSET = "Inventory Asset";
export const PREPAID_EXPENSE = "Prepaid expenses";
export const UNCATEGORIZED_ASSET = "Uncategorized Asset";
export const UNDEPOSITED_FUND = "Undeposited Funds";

export const ACCUMULATED_DEPRECIATION_ON_PROPERTY =
  "Accumulated Depreciation on Property, Plant & Equipment";
export const PROPERTY_PLANT_AND_EQUIPMENT = "Property, Plant & Equipment";

export const ASSETS_HELD_FOR_SALE = "Assets Held for Sale";
export const DEFERRED_TAX_ASSETS = "Deferred Tax Assets";
export const GOODWILL = "Goodwill";
export const INTANGIBLES = "Intangibles";
export const LONG_TERM_INVESTMENTS = "Long-Term Investments";

export const ACCRUED_LIABILITY = "Accrued Liabilities";
export const DIVIDENDS_PAYABLE = "Dividends Payable";
export const INCOME_TAX_PAYABLE = "Income Tax Payable";
export const PAYROLL_CLEARING = "Payroll Clearing";
export const PAYROLL_LIABILITIES = "Payroll Liabilities";
export const SHORT_TERM_DEBIT = "Short-Term Debit";

export const ACCRUED_HOLIDAY_PAYABLE = "Accrued Holiday Payable";
export const ACCRUED_NON_CURRENT_LIABILITIES =
  "Accrued Non-Current Liabilities";
export const LIABILITIES_RELATED_TO_ASSETS_HELD_FOR_SALE =
  "Liabilities Related To Assets Held For Sale";
export const LONG_TERM_DEBT = "Long-Term Debt";

export const DIVIDEND_DISBURSED = "Dividend Disbursed";
export const EQUITY_IN_EARNINGS_OF_SUBSIDIARIES =
  "Equity in Earnings of Subsidiaries";
export const OTHER_COMPREHENSIVE_INCOME = "Other Comprehensive Income";
export const RETAINED_EARNINGS = "Retained Earnings";
export const SHARE_CAPITAL = "Share Capital";

export const BILLABLE_EXPENSE_INCOME = "Billable Expense Income";
export const REVENUE_GENERAL = "Revenue - General";
export const SALES = "Sales";
export const SALES_RETAIL = "Sales - Retail";
export const SALES_WHOLESALE = "Sales - Wholesale";
export const SALES_OF_PRODUCT_INCOME = "Sales of Product Income";
export const UNCATEGORIZED_INCOME = "Uncategorised Income";

export const CHANGE_IN_INVENTORY_COS = "Change in Inventory - COS";
export const COST_OF_SALES = "Cost of Sales";
export const DIRECT_LABOUR_COS = "Direct Labour - COS";
export const DISCOUNT_GIVEN_COS = "Discounts Given - COS";
export const FREIGHT_AND_DELIVERY_COS = "Freight and Delivery - COS";
export const MATERIAL_COS = "Materials - COS";
export const OTHER_COS = "Other - COS";
export const SUBCONTRACTOR_COS = "Subcontractors - COS";

export const DIVIDEND_INCOME = "Dividend Income";
export const INTEREST_INCOME = "Interest Income";
export const LOSS_ON_DISPOSAL_OF_ASSETS = "Loss on Disposal of Assets";
export const OTHER_OPERATING_INCOME = "Other Operating Income (Expenses)";
export const UNREALIZED_LOSS_ON_SECURITIES =
  "Unrealized Loss on Securities, Net of Tax";
export const RECONCILIATION_DISCREPANCIES = "Reconciliation Discrepancies";

export const TRAVEL_REQUEST = "travel_request";
export const BENEFIT_REQUEST = "benefit_request";
export const LEAVE_REQUEST = "leave_request";
export const OVERTIME_REQUEST = "overtime_request";

export const CONSTRUCTION_MATERIAL = "Construction Material";
export const CONSTRUCTION_EQUIPMENT = "Construction Equipment";
export const VEHICLE = "Vehicle";

export const AGRICULTURE = "Agriculture";
export const FUEL_OIL_LIBRATION = "Fuel,Oil & Lubrication";
export const OTHER_MATERIAL = "Other Material";
export const OFFICE_SUPPLIES = "Office Supplies";
export const FURNITURE = "Furniture";
export const SPARE_PART = "Spare-Part";

export const DASHBOARD_STEPS = (name: string) => [
  {
    target: ".body",
    title: `Hello ${name}`,
    content: "Welcome to Condigital Enterprise.",
    disableBeacon: true,
  },
  {
    target: ".show_tip",
    content:
      "Here you can find introductory information to help you through journey with ConDigital Platform.",
    disableBeacon: false,
  },
];

export const PROJECT_STEPS = [
  {
    target: ".project_list_table",
    title: "Project List",
    content:
      "In this Page projects under your supervision are listed with summarized information defining them. Click View Project button to view more information about your project.",
    disableBeacon: true,
  },
];
export const REGISTER_PROJECT_STEP = [
  {
    target: ".register_project",
    title: "Register Project",
    content:
      "You can register projects by 1. Registering basic information and contract finance data 2. By registering the projects Bill of Quanitites.",
    disableBeacon: true,
  },
];
export const PROJECT_TAB_STEPS = [
  {
    target: ".plan_tab",
    title: "Project Detail",
    content:
      "Here you can find planning, execution and evaluation data about your project. Use the menu to view each aspect of the project lifecycle",
    disableBeacon: true,
  },
];
export const DOCUMENT_STEP = [
  {
    target: ".document",
    title: "Document",
    content:
      "Here you can upload, categorically store files and documents under your project. You can upload Pdf, Excel, AutoCAD files, Images, Videos",
    disableBeacon: true,
  },
];
export const REPORT_STEP = [
  {
    target: ".report",
    title: "Report",
    content:
      "Register progress, variation and expense on the projects you supervise. Use the designed takeoff templates to report detailed data regarding the project.",
    disableBeacon: true,
  },
];
export const PROCUREMENT_STEP = [
  {
    target: ".procurement",
    title: "Procurement",
    content:
      "Manage Material or Purchase requisitions along with generating purchase order to be submitted to suppliers.",
    disableBeacon: true,
  },
];
export const FINANCE_STEP = [
  {
    target: ".finance",
    title: "Finance",
    content:
      "Manage your Project and Company Finance transactions grouped into payments and expenses. Summarized and Detailed reports are also provided to give you accurate financial performance of your enterprise.",
    disableBeacon: true,
  },
];
export const INVENTORY_STEP = [
  {
    target: ".inventory",
    title: "Inventory",
    content:
      "Manage you material inventory be registering purchase, transfer and usage.",
    disableBeacon: true,
  },
];
export const FIXED_ASSET_STEP = [
  {
    target: ".fixed_asset",
    title: "Fixed Asset",
    content:
      "Register and manager your fixed assets like vehicles and Equipment.",
    disableBeacon: true,
  },
];
export const HR_STEP = [
  {
    target: ".hr",
    title: "Human Resource",
    content: "Hire, assign and generate payroll for your Human resources.",
    disableBeacon: true,
  },
];
export const SIDE_MENU = [
  {
    target: ".project_list_table",
    content: "We accept returns after 14 days max",
    disableBeacon: true,
  },
];

export const TAKEOFF_STEPS = [
  {
    target: ".item_selector",
    content:
      "Please select an item from the contract BoQ you want to report on",
    disableBeacon: true,
  },
  {
    target: ".sheet_tab",
    content: "You can add take off Sheets here Multiple Sheets",
    disableBeacon: true,
  },
];

export const DOCUMENT_WORK_ORDER_TYPE = [
  "Review",
  "Approve",
  "Action Submittal",
  "Information Submittal",
];

export const EXPENSE_TYPES = [
  BAD_DEBTS,
  BANK_CHARGES,
  CASH_AND_CASH_EQUIVALENTS,
  COMMISSIONS_AND_FEES,
  DUES_AND_SUBSCRIPTION,
  EQUIPMENT_RENTAL,
  INCOME_TAX_EXPENSE,
  INSURANCE_DISABILITY,
  INSURANCE_GENERAL,
  INTEREST_EXPENSE,
  LEGAL_AND_PROFESSIONAL_FEES,
  LOSS_ON_DISCONTINUED,
  MANAGEMENT_COMPENSATION,
  MEALS_AND_ENTERTAINMENT,
  OFFICE_EXPENSES,
  OTHER_GENERAL_AND_ADMINISTRATIVE_EXPENSE,
  OTHER_SELLING_EXPENSE,
  OTHER_TYPE_OF_EXPENSE_ADVERTISING_EXPENSES,
  PAYROLL_EXPENSES,
  PURCHASES,
  RENT_OR_LEASE_PAYMENTS,
  REPAIRS_AND_MAINTENANCE,
  SHIPPING_AND_DELIVERY_EXPENSE,
  STATIONERY_AND_PRINTING,
  SUPPLIES,
  TRAVEL_EXPENSES_GENERAL_AND_ADMIN_EXPENSES,
  TRAVEL_EXPENSES_SELLING_EXPENSES,
  UNCATEGORIZED_EXPENSE,
  UTILITIES,
  WAGE_EXPENSES,
  ALLOWANCE_FOR_BAD_DEBT,
  UNDEPOSITED_FUND,
  UNCATEGORIZED_ASSET,
  PREPAID_EXPENSE,
  INVENTORY_ASSET,
  INVENTORY,
  AVAILABLE_FOR_SALE_ASSETS,
  SUBCONTRACTOR_COS,
  OTHER_COS,
  MATERIAL_COS,
  FREIGHT_AND_DELIVERY_COS,
  DISCOUNT_GIVEN_COS,
  DIRECT_LABOUR_COS,
  COST_OF_SALES,
  CHANGE_IN_INVENTORY_COS,
  SHARE_CAPITAL,
  RETAINED_EARNINGS,
  OTHER_COMPREHENSIVE_INCOME,
  EQUITY_IN_EARNINGS_OF_SUBSIDIARIES,
  DIVIDEND_DISBURSED,
  LONG_TERM_DEBT,
  LIABILITIES_RELATED_TO_ASSETS_HELD_FOR_SALE,
  ACCRUED_NON_CURRENT_LIABILITIES,
  ACCRUED_HOLIDAY_PAYABLE,
  SHORT_TERM_DEBIT,
  PAYROLL_LIABILITIES,
  PAYROLL_CLEARING,
  INCOME_TAX_PAYABLE,
  DIVIDENDS_PAYABLE,
  ACCRUED_LIABILITY,
  LONG_TERM_INVESTMENTS,
  INTANGIBLES,
  GOODWILL,
  DEFERRED_TAX_ASSETS,
  ASSETS_HELD_FOR_SALE,
  PROPERTY_PLANT_AND_EQUIPMENT,
  ACCUMULATED_DEPRECIATION_ON_PROPERTY,
  INSURANCE_LIABILITY,
  AMORTIZATION_EXPENSE,
  FUEL_EXPENSE,
];

export const PEData = [
  {
    position: "Project Manager",
    no: 1,
    description: "",
    noo: 0,
    workedHours: 0,
    idleHour: 0,
    downHours: 0,
  },
  {
    position: "Office Engineer",
    no: 1,
    description: "",
    noo: 0,
    workedHours: 0,
    idleHour: 0,
    downHours: 0,
  },
  {
    position: "Site Engineer",
    no: 1,
    description: "",
    noo: 0,
    workedHours: 0,
    idleHour: 0,
    downHours: 0,
  },
  {
    position: "General Foreman",
    no: 1,
    description: "",
    noo: 0,
    workedHours: 0,
    idleHour: 0,
    downHours: 0,
  },
  {
    position: "Casher",
    no: 1,
    description: "",
    noo: 0,
    workedHours: 0,
    idleHour: 0,
    downHours: 0,
  },
  {
    position: "Project Administration",
    no: 1,
    description: "",
    noo: 0,
    workedHours: 0,
    idleHour: 0,
    downHours: 0,
  },
  {
    position: "Time & Store Keeper",
    no: 1,
    description: "",
    noo: 0,
    workedHours: 0,
    idleHour: 0,
    downHours: 0,
  },
];

export const LIST_OF_COUNTRIES = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Cote D'Ivoire", code: "CI" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Democratic People'S Republic of", code: "KP" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Lao People'S Democratic Republic", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia and Montenegro", code: "CS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];
