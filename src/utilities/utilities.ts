import moment, { Moment } from "moment";
import { groupBy, isArray, isNil, toNumber } from "lodash";
import axios, { AxiosError } from "axios";
import { User } from "../redux/User/User.type";
import xlsx, { WorkBook } from "xlsx";
import {
  ApprovalValue,
  BoqSuperTitle,
  ProjectTypes,
  UNITS,
} from "../constants/Constants";

import BuildingBoQ from "./excel/BuildingBoQ";
import { Boq } from "../redux/Boq/Boq.type";
import { ApiCallState } from "../redux/Utils";
import { Material } from "../redux/Material/Material.type";
import { Project } from "../redux/Project/Project.type";
import { matchRoutes } from "react-router-dom";
import { SelectProps } from "antd";

export const EtRegEx = /^(^\+251|^251|^0)?9\d{8}$/;
export const NumRegEx = /^[0-9]+$/;
export const WordsRegEx = /^[a-zA-Z_ ]*$/;

export const formatNumber = (x: string | number) => {
  if (isNil(x)) {
    return 0;
  } else {
    var val = Math.round(Number(x!) * 100) / 100;
    var parts = val.toString().split(".");
    var num =
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (parts[1] ? "." + parts[1] : "");
    return num;
  }
};

export const ParseDistributionLabel = (label: string) => {
  if (
    label === "estimate" ||
    label === "percentage" ||
    label === "other" ||
    label === "total"
  ) {
    return label.charAt(0).toUpperCase() + label.slice(1);
  } else {
    return label;
  }
};
export const searchProp: SelectProps = {
  showSearch: true,
  optionFilterProp: "children",
  filterOption: (input: any, option: any) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  className: "w-100",
};

export const handleChange = (
  value: any,
  key: any,
  data: any,
  index: any,
  state: any,
  setState: Function
) => {
  let st = data;
  st[key] = value;
  state[index] = st;
  setState([...state]);
};

export const generatePassword = () => {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  var charactersLength = characters.length;

  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getCompany = (
  access_type: "consultant" | "contractor" | "client",
  project: Project
) => {
  if (access_type === "consultant") return project.consultant?.name;
  else if (access_type === "client") return project.client?.name;
  else if (access_type === "contractor") return project.contractor?.name;
};

export const standardDeviation = (values: number[]) => {
  var avg = average(values);

  var squareDiffs = values.map((value) => {
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
};

const average = (data: number[]) => {
  var sum = data.reduce((sum, value) => {
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
};

export const generateRandomStr = (length: number = 10) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const format = (data: any, type?: boolean): string => {
  if (data || type) {
    return data === 0
      ? type
        ? "0"
        : "-"
      : eEnglish(toNumber(toNumber(data).toFixed(2)));
  } else if (data === "-") return "";
  else return "-";
};

export const calculateBonus = (val: number, salary: any) => {
  let monthlyBonus = val / 12;
  let aggregate = monthlyBonus + salary;
  let aggregateTax = calculateIncomeTax(aggregate);
  let annualAggregateTax = aggregateTax * 12;
  let basicSalaryTax = calculateIncomeTax(salary);
  let aggregateBasicSalaryTax = 12 * basicSalaryTax;
  let bonusTax = annualAggregateTax - aggregateBasicSalaryTax;
  // let net = val - bonusTax;
  return bonusTax;
  // setTax(bonusTax);
  // setNet(net);
};

const eEnglish = (x: number) => {
  return x.toLocaleString("en-US");
};
export const zeroPad = (num: any, length: number = 4): string =>
  String(num).padStart(length, "0");

export const getRevisionNumber = (
  data: any[],
  id: number | null,
  ref: number | null
) => {
  let filtered = data?.filter((e) => e.ref === ref);

  if (id) {
    const found = data.find((e) => e.id === id);
    if (found && found.ref)
      return (
        filtered.filter((e) => moment(e.date).isBefore(moment(found.date)))
          .length + 1
      );
    else return 0;
  } else {
    return (data ? data?.filter((e) => e.ref === ref).length : 0) + 1;
  }
};

export const toEthiopianCalender = (date: Moment, type?: string) => {
  switch (type) {
    case "YYYY":
      return { format: "", ethiopian_calender: "" };
    case "MMMM-YYYY":
      return {
        format: ``,
        ethiopian_calender: ``,
      };
    case "dddd":
      return {
        format: ``,
        ethiopian_calender: ``,
      };
    default:
      return {
        format: ``,
        ethiopian_calender: ``,
      };
  }
};

export const formatMoney = (money: number) => {
  return money
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const DataFormat = (size: any): string => {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

export const authHeader = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
};

export const NumberValidator = (rule: any, value: number) => {
  return new Promise((resolve, reject) => {
    if (!value) reject("Required!");
    else if (value < 0) reject("Positive Number Only!");
    else resolve(null);
  });
};

export const PhoneValidator = (rule: any, value: string) => {
  return new Promise((resolve, reject) => {
    var phone_number_regx = /^(^\+251|^251|^0)?9\d{8}$/;
    if (!value) reject("Phone Number Required!");
    else if (!value.match(phone_number_regx))
      reject("Incorrect Phone Number Format!");
    else resolve(null);
  });
};

export const ErrorHandler = (error: AxiosError) => {
  const errors: { message: string; type: number | undefined }[] = [];

  if (error.response) {
    if (isArray(error.response.data.errors))
      error.response.data.errors.forEach((e: any) => {
        errors.push({ message: e.message, type: error.response?.status });
      });
    else errors.push({ message: "Unknown Error", type: undefined });
  } else if (error.request) {
    errors.push({ message: "Connection Error", type: error.request?.status });
  } else {
    errors.push({ message: "Unknown Error", type: undefined });
  }

  return errors;
};

export const DownloadErrorHandler = (error: AxiosError) => {
  const errors: { message: string; type: number | undefined }[] = [];
  if (error.response) {
    errors.push({ message: "Nothing to Export", type: 400 });
  } else if (error.request) {
    errors.push({ message: "Connection Error", type: error.request?.status });
  }
  return errors;
};

export const formatterNumber = (val: any) => {
  if (!val) return "0";
  return `${val}`
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    .replace(/\.(?=\d{0,2}$)/g, ",");
};

export const parserNumber = (val: any) => {
  if (!val) return 0;
  return Number.parseFloat(
    val.replace(/\$\s?|(\.*)/g, "").replace(/(,{1})/g, ".")
  ).toFixed(2);
};

export const saveUserData = (data: any) => {
  console.log({ data });
  localStorage.setItem(
    "data",
    JSON.stringify({
      email: data?.email,
      full_name: data?.name,
      id: data?.id,
      company: data?.company,
      role: data?.role,
      access_type: data?.access_type,
      is_super_user: data?.is_super_user,
    })
  );
  localStorage.setItem("token", data?.token);
  localStorage.setItem("user_id", data?.id);

  localStorage.setItem("expiresIn", moment.now().toString());
};

export const saveProjectRegistration = (project: any, boq: any) => {
  localStorage.setItem("project_registration", JSON.stringify(project));
  localStorage.setItem("boq_registration", JSON.stringify(boq));
};

export const clearProjectData = () => {
  localStorage.removeItem("project_registration");
  localStorage.removeItem("boq_registration");
};

export const from24HourToEthiopianTime = (time: string) => {
  let timeArr: string[] = time.split(":");
  let etHour;
  let secDesc;
  let timDesc;
  const hour = parseInt(timeArr[0]);
  if ((hour >= 0 && hour <= 5) || (hour >= 18 && hour <= 23)) {
    secDesc = "ምሽት";
    if (hour >= 0 && hour <= 5) {
      etHour = hour + 6;
    } else {
      if (hour === 18) etHour = 12;
      else etHour = hour - 18;
    }
  } else {
    secDesc = "ቀን";
    hour === 6 ? (etHour = 6) : (etHour = hour - 6);
    (etHour >= 1 && etHour <= 6) || etHour === 12
      ? (timDesc = "ጠዋት")
      : (timDesc = "ከሰዓት");
  }
  timeArr[0] = etHour.toString();
  // format 1:00,ጠዋት || 6:32,ምሽት
  return timDesc
    ? timeArr[0].length === 2
      ? timeArr[0]
      : `0${timeArr[0]}:${timeArr[1]},${timDesc}`
    : timeArr[0].length === 2
    ? timeArr[0]
    : `0${timeArr[0]}:${timeArr[1]},${secDesc}`;
};

export const getUserData = (): User => {
  const temp: any = localStorage.getItem("data");
  if (temp) return JSON.parse(temp);
  else
    return {
      full_name: "",
      id: 1,
      phone_number: "",
      chat_id: "",
      company: {
        name: "",
        address: "",
        category: "",
        country: "",
        id: 1,
        type: "",
      },
      email: "",
      access_type: [],
      signature: null,
      last_seen: null,
      role: "",
      is_super_user: false,
      status: "Active",
    };
};

export const getProjectRegistrationData = (project_type: any) => {
  const building_boq = [
    {
      is_super_title: true,
      is_title: true,
      is_sub_title: false,
      description: BoqSuperTitle.SUBSTRUCTURE,
      item_no: "",
      key: Date.now(),
      amount: 0,
      quantity: 0,
      unit: "",
      unit_price: 0,
      sheet_name: "sheet 1",
      reference_id: null,
      remark: "",
    },
    {
      is_super_title: false,
      is_title: true,
      is_sub_title: false,
      description: "",
      item_no: "",
      key: Date.now() + 1,
      amount: 0,
      quantity: 0,
      unit: "",
      unit_price: 0,
      sheet_name: "sheet 1",
      reference_id: null,
      remark: "",
    },
    {
      is_super_title: false,
      is_title: false,
      is_sub_title: false,
      description: "",
      item_no: "",
      key: Date.now() + 2,
      amount: 0,
      quantity: 0,
      unit: "",
      unit_price: 0,
      sheet_name: "sheet 1",
      reference_id: null,
      remark: "",
    },
    {
      is_super_title: true,
      is_title: true,
      is_sub_title: false,
      description: BoqSuperTitle.SUPERSTRUCTURE,
      item_no: "",
      key: Date.now() + 3,
      amount: 0,
      quantity: 0,
      unit: "",
      unit_price: 0,
      sheet_name: "sheet 1",
      reference_id: null,
      remark: "",
    },
    {
      is_super_title: false,
      is_title: true,
      is_sub_title: false,
      description: "",
      item_no: "",
      key: Date.now() + 4,
      amount: 0,
      quantity: 0,
      unit: "",
      unit_price: 0,
      sheet_name: "sheet 1",
      reference_id: null,
      remark: "",
    },
    {
      is_super_title: false,
      is_title: false,
      is_sub_title: false,
      description: "",
      item_no: "",
      key: Date.now() + 5,
      amount: 0,
      quantity: 0,
      unit: "",
      unit_price: 0,
      sheet_name: "sheet 1",
      reference_id: null,
      remark: "",
    },
  ];

  const road_boq = [
    {
      is_super_title: true,
      is_title: true,
      is_sub_title: false,
      description: "",
      item_no: "",
      key: Date.now(),
      amount: 0,
      quantity: 0,
      unit: "",
      unit_price: 0,
      sheet_name: "sheet 1",
      reference_id: null,
      remark: "",
    },
    {
      is_super_title: false,
      is_title: true,
      is_sub_title: false,
      description: "",
      item_no: "",
      key: Date.now() + 1,
      amount: 0,
      quantity: 0,
      unit: "",
      unit_price: 0,
      sheet_name: "sheet 1",
      reference_id: null,
      remark: "",
    },
  ];

  return project_type === ProjectTypes.ROAD ? road_boq : building_boq;
};

export const calculateIncomeTax = (salary: number) => {
  if (salary <= 600) {
    return salary * 0;
  } else if (salary > 600 && salary <= 1650) {
    return salary * 0.1 - 60;
  } else if (salary > 1650 && salary <= 3200) {
    return salary * 0.15 - 142.5;
  } else if (salary > 3200 && salary <= 5250) {
    return salary * 0.2 - 302.5;
  } else if (salary > 5250 && salary <= 7800) {
    return salary * 0.25 - 565;
  } else if (salary > 7800 && salary <= 10900) {
    return salary * 0.3 - 955;
  } else {
    return salary * 0.35 - 1500;
  }
};
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  const expiresIn = localStorage.getItem("expiresIn");

  if (!token) {
    logout();
    return false;
  }

  if (expiresIn) {
    const expiresInDate = moment(parseInt(expiresIn, 10));

    const duration = moment.duration(moment().diff(expiresInDate));

    if (duration.asDays() >= 1) {
      logout();
      return false;
    }

    return true;
  }

  logout();
  return false;
};

export const checkAuthorization = (path: string): boolean => {
  const access_type = getUserData().access_type;

  if (access_type) {
    return matchRoutes(
      access_type.map((e) => ({ path: e })),
      { pathname: path }
    )
      ? true
      : false;
  } else return false;
};

export const logout = (): void => {
  localStorage.setItem("data", "");
  localStorage.setItem("token", "");
  localStorage.setItem("expiresIn", "");
};

export const groupOption = (data: any[], item: string) => {
  const parsed = [];
  const grouped = groupBy(data, (e) => e[item]);
  for (const x in grouped) {
    parsed.push(x);
  }
  return parsed;
};

export const groupOptionGrouped = (data: any[], item: string) => {
  const parsed: { data: any[]; title: string }[] = [];
  const grouped = groupBy(data, (e) => e[item]);
  for (const x in grouped) {
    parsed.push({ data: grouped[x], title: x });
  }
  return parsed;
};

export const groupOptionAll = (data: any[], item: string) => {
  const parsed = [];
  const grouped = groupBy(data, (e) => e.material[item]);

  for (const x in grouped) {
    parsed.push(x);
  }

  return parsed;
};

export const groupOptionMaterial = (data: any[], item: string) => {
  const parsed = [];
  const grouped = groupBy(data, (e) => e.material[item]);

  for (const x in grouped) {
    parsed.push(grouped[x]);
  }

  return parsed;
};

export const groupMaterial = (data: any[], item: string) => {
  const parsed = [];
  const grouped = groupBy(data, (e) => e[item]);

  for (const x in grouped) {
    parsed.push(grouped[x][0]);
  }

  return parsed;
};

export const groupFilterOption = (data: any[], item: string): any[] => {
  const parsed = [];
  const grouped = groupBy(data, (e) => e[item]);
  for (const x in grouped) {
    if (item === "title") {
      parsed.push({ [item]: x, super_title: grouped[x][0].super_title });
    } else {
      parsed.push({ [item]: x, super_title: x });
    }
  }

  return parsed;
};

export const getDescriptionType = (value: string) => {
  let is_title: boolean = false;
  let is_sub_title: boolean = true;
  let description: string = "";
  let split = value.trim().split(".");

  if (isUpperCase(value)) {
    if (split[0].charCodeAt(0) > 46 && split[0].charCodeAt(0) < 58) {
      description = split[1]?.trim();
      is_title = true;
    } else description = value;
  } else description = value;

  return { is_title, is_sub_title, description };
};

export const isUpperCase = (str: any) => {
  let result = str
    .split("")
    .map((letter: any) => !/[a-z]/.test(letter))
    .reduce((a: any, b: any) => a + b);

  return result === str.length;
};

// export const inWords = (num: any) => {};

const arr = (x: any) => Array.from(x);
const num = (x: any) => Number(x) || 0;
const isEmpty = (xs: any) => xs.length === 0;
const take = (n: any) => (xs: any) => xs.slice(0, n);
const drop = (n: any) => (xs: any) => xs.slice(n);
const reverse = (xs: any) => xs.slice(0).reverse();
const comp = (f: any) => (g: any) => (x: any) => f(g(x));
const not = (x: any) => !x;
const chunk =
  (n: any) =>
  (xs: any): any =>
    isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];

// numToWords :: (Number a, String a) => a -> String
export const inWords = (n: any): String => {
  let a = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  let b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  let g = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
  ];

  let makeGroup = ([ones, tens, huns]: any) => {
    return [
      num(huns) === 0 ? "" : a[huns] + " hundred ",
      num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + "-") || "",
      a[tens + ones] || a[ones],
    ].join("");
  };

  let thousand = (group: any, i: any) =>
    group === "" ? group : `${group} ${g[i]}`;

  if (typeof n === "number") return inWords(String(n));
  else if (n === "0") return "zero";
  else
    return comp(chunk(3))(reverse)(arr(n))
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(" ");
};

export const initAxios = (token: any) => {
  console.log(token);
  
  if(token)
    localStorage.setItem("token", token.toString())
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token ? token : localStorage.getItem("token")}`,
  };
};

export const minimizeNumber = (number: any) => {
  return Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(parseInt(number));
};

export const readExcel = (file: any) => {
  return new Promise<xlsx.WorkBook>((resolve, reject) => {
    var reader = new FileReader();

    reader.onload = (event: any) => {
      var data = event.target.result;

      var workbook = xlsx.read(data, { type: "binary" });

      resolve(workbook);
    };
    reader.readAsBinaryString(file);
  });
};

export const parseBoQExcel = (
  workbook: WorkBook | undefined,
  sheet_names: string[]
) => {
  const parsed: any[] = [];
  if (workbook) {
    sheet_names.forEach((sheet_name) => {
      const ws = workbook.Sheets[sheet_name];
      const data = xlsx.utils.sheet_to_json(ws, { header: 1 });
      const BuildingParsed = new BuildingBoQ(data, sheet_name);
      parsed.push(...BuildingParsed.parseBoq());
    });
  }
  return parsed;
};

export const parseMaterialOnSiteExcel = (
  workbook: WorkBook | undefined,
  sheet_names: string[],
  project_id: number
) => {
  const parsed: any[] = [];
  if (workbook) {
    sheet_names.forEach((sheet_name) => {
      const ws = workbook.Sheets[sheet_name];
      const data = xlsx.utils.sheet_to_json(ws, { header: 1 });
      parsed.push(...parseMaterialOnSiteData(data));
    });
  }
  return parsed.length > 0 ? parsed : [{ material: "", quantity: 0, unit: "" }];
};

export const getUrl = (key: string) => {
  return key?.toLocaleLowerCase()?.split(" ").join("-");
};

const parseMaterialOnSiteData = (data: any[]) => {
  const sliced = data.splice(9).filter((data) => data.length === 14);
  const formatted = sliced.map((data) => ({
    material: data[1],
    unit: data[2]?.toString()?.toLowerCase(),
    quantity: data[13],
  }));
  return formatted.filter(
    (data) =>
      !isNil(data.material) && !isNil(data.quantity) && !isNil(data.unit)
  );
};

export const checkStatus = (
  data: ApiCallState<any>
): { status: "validating" | "error" | "warning"; message: string } => {
  if (data.isPending) {
    return { status: "validating", message: "Loading" };
  } else if (data.error)
    return { status: "error", message: "Failed to Fetch Data" };
  else return { status: "warning", message: "Select Item" };
};

export const SelectorFeedBack = (
  selected_item: any,
  data: ApiCallState<any>
) => {
  if (selected_item) {
    return {
      hasFeedback: false,
    };
  } else {
    const { status, message } = checkStatus(data);
    return {
      hasFeedback: true,
      validateStatus: status,
      help: message,
    };
  }
};

export const getLastId = (data: any[]) => {
  if (data) {
    const length = data?.length;
    if (length === 0) return 1;
    else return data[length - 1].id + 1;
  } else return 1;
};

export const getLast = (data: any[], name: string) => {
  if (data) {
    const length = data?.length;
    if (length === 0) return 1;
    else return toNumber(data[length - 1][name]) + 1;
  } else return 1;
};

export const parseRawBoQ = (data: RawBoQType[]) => {
  let parsed: any[] = [];

  let super_title: any = null;
  let title: any = null;
  let remark: any = "";
  let sub_title: any = null;
  for (let i = 0; i < data.length; i++) {
    let e = data[i];
    if (e.is_super_title) {
      super_title = e.description;
      title = null;
      sub_title = null;
    } else if (e.is_title) {
      title = e.description;
      remark = e.remark;

      sub_title = null;
    } else if (e.is_sub_title) {
      sub_title = (sub_title ? sub_title + "\n" : "") + e.description;
    } else {
      parsed.push({
        id: e.id,
        super_title,
        remark,
        title,
        sub_title,
        item_no: e.item_no,
        task_name: e.description,
        unit: e.unit,
        quantity: e.quantity,
        unit_price: e.unit_price,
        total: e.amount,
        sheet_name: e.sheet_name,
        reference_id: e.reference_id,
      });
      remark = null;

      if (data[i + 1]?.is_sub_title) sub_title = null;
    }
  }

  return parsed;
};

export type RawBoQType = {
  id?: number;
  is_super_title: boolean;
  is_title: boolean;
  is_sub_title: boolean;
  description: string;
  item_no: string;
  key: number;
  amount: number;
  quantity: number;
  unit: string;
  unit_price: number;
  sheet_name: string;
  reference_id: number | null;
  remark: any;
};

export const removeHandler = (key: number, data: any[], setData: Function) => {
  const newData = [...data];
  const index = newData.findIndex((e) => e.key === key);
  if (index !== -1 && data.length > 1) {
    newData.splice(index, 1);
    setData(newData);
  }
};

export const parseUnit = (unit: string) => {
  let parsed = unit;
  UNITS.forEach((e) => {
    if (e.value === unit) parsed = e.name;
  });
  return parsed;
};

export const getUnits = (material?: Material) => {
  if (material) {
    if (material.sub_category === "Iron Bar") {
      return [
        { name: "KG", value: "kg", type: "mass" },
        { name: "PCS", value: "pcs", type: "no" },
        { name: "Berga", value: "berga", type: "no" },
      ];
    } else return UNITS.filter((e) => e.type === getUnitType(material.unit));
  }
  return UNITS;
};

export const getUnitType = (unit: string) => {
  let found_type = "mass";
  let found = UNITS.find((e) => e.value === unit);
  if (found) {
    return found.type;
  }
  return found_type;
};

export const getInitials = (full_name: string) => {
  if (full_name) {
    let split = full_name?.toUpperCase().split(" ");
    if (split.length === 1) {
      return `${split[0].charAt(0)}${split[0].charAt(1)}`;
    } else {
      return `${split[0].charAt(0)}${split[1].charAt(0)}`;
    }
  }
  return "";
};

export const getRebarDiameter = (material: Material) => {
  var matches = material.description.match(/(\d+)/);
  if (matches) return matches[0];
  return null;
};
