import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  DatePicker,
  Divider,
  Select,
  Statistic,
  Typography,
} from "antd";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal/Modal";
import Table, { ColumnsType } from "antd/lib/table";
import { toNumber } from "lodash";

import moment, { Moment } from "moment";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Message,
  NotificationType,
  UNITS,
} from "../../../../../../../constants/Constants";
import { fetchOneWeeklyPlan } from "../../../../../../../redux/WeeklyPlan/WeeklyPlan.action";
import {
  format,
  getUserData,
  handleChange,
} from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  AddWeeklyReportPropTypes,
  addWeeklyReportUtil,
  DescriptionType,
  formatFieldName,
  ManPowerType,
  EquipmentType,
  MaterialType,
  ProblemType,
} from "./addWeeklyReport.util";

const { Text } = Typography;
const { TextArea } = Input;

const AddWeeklyReport: FC<AddWeeklyReportPropTypes> = ({
  user,
  fetchAllWeekReports,
  project,
  fetchWeeklyPlan,
  weekly_plan,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportingDate, setReportingDate] = useState<moment.Moment>(moment());
  const [schedulingDate, setSchedulingDate] = useState<moment.Moment>(moment());
  const [reportingWeek, setReportingWeek] = useState<moment.Moment>(moment());
  const [week, setWeek] = useState<string>("");
  console.log("🚀 ~ file: addWeeklyReport.tsx ~ line 57 ~ week", week);
  const [description, setDescription] = useState<DescriptionType[]>([
    {
      key: Date.now(),
      item_no: "",
      activity_desc: "",
      block_no: "",
      planned_qty: "",
      executed_qty: "",
      total: "",
    },
  ]);
  const [manPower, setManPower] = useState<ManPowerType[]>([
    {
      key: Date.now(),

      trade_name: "Project manager",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 1,

      trade_name: "Site engineer",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 2,

      trade_name: "General forman",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 3,

      trade_name: "Store keeper",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 4,

      trade_name: "Mason",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 5,

      trade_name: "Plasterer",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 6,

      trade_name: "Welder",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 7,

      trade_name: "Painter",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 8,

      trade_name: "Carpenter",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 9,

      trade_name: "Bar bender",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 10,

      trade_name: "Chisler",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 11,

      trade_name: "Mix oper daily lab",
      planned: "",
      available: "",
    },
  ]);
  const [equipment, setEquipment] = useState<EquipmentType[]>([
    {
      key: Date.now(),
      trade_name: "Generator",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 1,
      trade_name: "Water pump",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 2,
      trade_name: "Truck",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 3,
      trade_name: "Mixer",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 4,
      trade_name: "Vibrator",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 5,
      trade_name: "Compactor",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 6,
      trade_name: "Excavator",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 7,
      trade_name: "Loader",
      planned: "",
      available: "",
    },
  ]);
  const [material, setMaterial] = useState<MaterialType[]>([
    {
      key: Date.now(),
      trade_name: "Cement",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 1,
      trade_name: "Sand",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 2,
      trade_name: "Aggregate",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 3,
      trade_name: "Stone",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 4,
      trade_name: "Select",
      planned: "",
      available: "",
    },
    {
      key: Date.now() + 5,
      trade_name: "Pvc",
      planned: "",
      available: "",
    },
  ]);
  const [problem, setProblem] = useState<ProblemType[]>([
    {
      key: Date.now(),
      problem_encountered: "",
      soln_by_client: "",
      soln_by_contractor: "",
      affected_days_no: "",
    },
  ]);

  const onChangeHandler = (data: any, index: any, value: any) => {
    if (weekly_plan.payload && weekly_plan.payload.weekly_plan_items) {
      let plan: any = weekly_plan.payload.weekly_plan_items.find(
        (e) => e.description === value
      );
      let weeklyAmount = plan ? plan[week] : 0;
      let weeklyContractAmount = plan ? plan?.contract_amount : 1;
      console.log({ plan, weeklyAmount, weeklyContractAmount, week });
      let st = data;
      st["item_no"] = plan?.item_no;
      st["activity_desc"] = plan?.description;
      st["planned_qty"] = (weeklyAmount / weeklyContractAmount) * 100;
      description[index] = st;
      setDescription([...description]);
    }
  };

  const descriptionColumn: ColumnsType<DescriptionType> = [
    {
      title: "Item No",
      dataIndex: "item_no",
      width: "10%",
      render: (data, record) => <Input value={record.item_no} readOnly />,
    },
    {
      title: "Activity description with location",
      dataIndex: "activity_desc",
      width: "40%",
      render: (record, data, index) => (
        <AutoComplete
          value={record}
          options={weekly_plan.payload?.weekly_plan_items?.map((e, index) => ({
            value: e.description,
            key: index,
          }))}
          filterOption={(inputValue, option: any) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          style={{ width: "100%" }}
          // onSelect={(e: any) => onChangeHandler(data,index, e)}
          onChange={(e) => onChangeHandler(data, index, e)}
        >
          <Input.TextArea />
        </AutoComplete>
      ),
    },
    {
      title: "Block No",
      dataIndex: "block_no",
      width: "10%",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "block_no",
              data,
              index,
              description,
              setDescription
            )
          }
        />
      ),
    },
    {
      title: "Planned Qty in %",
      dataIndex: "planned_qty",
      render: (data, record) => (
        <Input
          bordered={false}
          value={format(toNumber(record.planned_qty))}
          readOnly
        />
      ),
    },
    {
      title: "Executed Qty in %",
      dataIndex: "executed_qty",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "executed_qty",
              data,
              index,
              description,
              setDescription
            )
          }
        />
      ),
    },
    {
      title: "Action",
      width: "5%",
      render: (record, data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = description;
                fr.push({
                  key: Date.now(),
                  item_no: "",
                  activity_desc: "",
                  block_no: "",
                  planned_qty: "",
                  executed_qty: "",
                  total: "",
                });
                setDescription([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = description;
                  fr.splice(index, 1);
                  setDescription([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];
  const manPowerColumn: ColumnsType<ManPowerType> = [
    {
      title: "Trade name",
      dataIndex: "trade_name",
      width: "30%",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "trade_name",
              data,
              index,
              manPower,
              setManPower
            )
          }
        />
      ),
    },
    {
      title: "Planned",
      dataIndex: "planned",
      width: "30%",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "planned",
              data,
              index,
              manPower,
              setManPower
            )
          }
        />
      ),
    },
    {
      title: "Available",
      dataIndex: "available",
      width: "30%",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "available",
              data,
              index,
              manPower,
              setManPower
            )
          }
        />
      ),
    },
    {
      title: "Action",
      width: "5%",
      render: (record, data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = manPower;
                fr.push({
                  key: Date.now(),

                  trade_name: "",
                  planned: "",
                  available: "",
                });
                setManPower([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = manPower;
                  fr.splice(index, 1);
                  setManPower([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const equiupmentColumn: ColumnsType<EquipmentType> = [
    {
      title: "Trade name",
      dataIndex: "trade_name",
      width: "30%",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "trade_name",
              data,
              index,
              equipment,
              setEquipment
            )
          }
        />
      ),
    },
    {
      title: "Planned",
      dataIndex: "planned",
      width: "30%",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "planned",
              data,
              index,
              equipment,
              setEquipment
            )
          }
        />
      ),
    },
    {
      title: "Available",
      dataIndex: "available",
      width: "30%",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "available",
              data,
              index,
              equipment,
              setEquipment
            )
          }
        />
      ),
    },
    {
      title: "Action",
      width: "5%",
      render: (record, data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = equipment;
                fr.push({
                  key: Date.now(),

                  trade_name: "",
                  planned: "",
                  available: "",
                });
                setEquipment([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = equipment;
                  fr.splice(index, 1);
                  setEquipment([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const materialColumn: ColumnsType<MaterialType> = [
    {
      title: "Trade name",
      dataIndex: "trade_name",
      width: "30%",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "trade_name",
              data,
              index,
              material,
              setMaterial
            )
          }
        />
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      width: "30%",
      render: (record, data, index) => (
        <AutoComplete
          style={{ width: "100%" }}
          onChange={(e) =>
            handleChange(e, "unit", data, index, material, setMaterial)
          }
          options={UNITS.map((e) => ({
            name: e.name,
            value: e.name,
          }))}
          filterOption={(inputValue, option: any) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      ),
    },

    {
      title: "Planned",
      dataIndex: "Trade name",
      width: "30%",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "planned",
              data,
              index,
              material,
              setMaterial
            )
          }
        />
      ),
    },
    {
      title: "Available",
      dataIndex: "available",
      width: "30%",
      render: (record, data, index) => (
        <Input
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "available",
              data,
              index,
              material,
              setMaterial
            )
          }
        />
      ),
    },
    {
      title: "Action",
      width: "5%",
      render: (record, data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = material;
                fr.push({
                  key: Date.now(),

                  trade_name: "",
                  planned: "",
                  available: "",
                });
                setMaterial([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = material;
                  fr.splice(index, 1);
                  setMaterial([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const problemColumn: ColumnsType<ProblemType> = [
    {
      title: "Problem ecountered ",
      dataIndex: "problem_encountered",
      width: "20%",
      render: (record, data, index) => (
        <TextArea
          autoSize
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "problem_encountered",
              data,
              index,
              problem,
              setProblem
            )
          }
        />
      ),
    },
    {
      title: "Solution given by contractor",
      dataIndex: "soln_by_contractor",
      width: "20%",
      render: (record, data, index) => (
        <TextArea
          autoSize
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "soln_by_contractor",
              data,
              index,
              problem,
              setProblem
            )
          }
        />
      ),
    },
    {
      title: "Solution given by client",
      dataIndex: "soln_by_client",
      width: "20%",
      render: (record, data, index) => (
        <TextArea
          autoSize
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "soln_by_client",
              data,
              index,
              problem,
              setProblem
            )
          }
        />
      ),
    },
    {
      title: "No of days affected",
      dataIndex: "affected_days_no",
      width: "20%",
      render: (record, data, index) => (
        <TextArea
          autoSize
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "affected_days_no",
              data,
              index,
              problem,
              setProblem
            )
          }
        />
      ),
    },
    {
      title: "Action",
      width: "5%",
      render: (record, data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = problem;
                fr.push({
                  key: Date.now(),
                  problem_encountered: "",
                  soln_by_client: "",
                  soln_by_contractor: "",
                  affected_days_no: "",
                });
                setProblem([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = problem;
                  fr.splice(index, 1);
                  setProblem([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const resetForm = () => {
    // setReportingWeek(moment());
    setReportingDate(moment());
    setSchedulingDate(moment());
    setDescription([
      {
        key: Date.now(),
        item_no: "",
        activity_desc: "",
        block_no: "",
        planned_qty: "",
        executed_qty: "",
        total: "",
      },
    ]);
    setManPower([
      {
        key: Date.now(),

        trade_name: "Project manager",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 1,

        trade_name: "Site engineer",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 2,

        trade_name: "General forman",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 3,

        trade_name: "Store keeper",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 4,

        trade_name: "Mason",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 5,

        trade_name: "Plasterer",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 6,

        trade_name: "Welder",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 7,

        trade_name: "Painter",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 8,

        trade_name: "Carpenter",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 9,

        trade_name: "Bar bender",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 10,

        trade_name: "Chisler",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 11,

        trade_name: "Mix oper daily lab",
        planned: "",
        available: "",
      },
    ]);
    setEquipment([
      {
        key: Date.now(),
        trade_name: "Generator",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 1,
        trade_name: "Water pump",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 2,
        trade_name: "Truck",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 3,
        trade_name: "Mixer",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 4,
        trade_name: "Vibrator",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 5,
        trade_name: "Compactor",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 6,
        trade_name: "Excavator",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 7,
        trade_name: "Loader",
        planned: "",
        available: "",
      },
    ]);
    setMaterial([
      {
        key: Date.now(),
        trade_name: "Cement",

        planned: "",
        available: "",
      },
      {
        key: Date.now() + 1,
        trade_name: "Sand",

        planned: "",
        available: "",
      },
      {
        key: Date.now() + 2,
        trade_name: "Aggregate",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 3,
        trade_name: "Stone",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 4,
        trade_name: "Select",
        planned: "",
        available: "",
      },
      {
        key: Date.now() + 5,
        trade_name: "Pvc",
        planned: "",
        available: "",
      },
    ]);
    setProblem([
      {
        key: Date.now(),
        problem_encountered: "",
        soln_by_client: "",
        soln_by_contractor: "",
        affected_days_no: "",
      },
    ]);
    form.resetFields();
  };

  const getWeekNumber = (date: Moment) => {
    let start_week = date.clone().startOf("week");
    let start_month = date.clone().startOf("month");
    if (start_month.isSame(start_week, "M")) {
      return {
        week: Math.ceil(toNumber(start_week.format("DD")) / 7),
        date: start_month.clone().startOf("month"),
      };
    } else {
      console.log("is Not Same");
      return {
        week: 4,
        date: start_month.subtract(1, "month").clone().startOf("month"),
      };
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      const { date, week } = getWeekNumber(reportingWeek.clone());
      fetchWeeklyPlan({
        project_id: project.payload?.id,
        date: date.format("YYYY-MM-DD"),
      });

      console.log(date.format("YYYY-MM-DD"), week);
      setWeek(`week${week}`);
      resetForm();
    }
  }, [reportingWeek, fetchWeeklyPlan, project, isModalVisible]);

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const Submit = (values: any) => {
    setLoading(true);

    const toSend = {
      project_id: project.payload?.id,
      reporting_date: reportingDate,
      reporting_week: reportingWeek.endOf("week").format("YYYY-MM-DD"),
      scheduling_date: schedulingDate,
      block_no: values.block_no,
      contractor_name: project.payload?.contractor?.name,
      resident_engineer: values.resident_engineer,
      site_inspector: values.site_inspector,

      description: description.map((data) => JSON.stringify(data)).join("---"),
      man_power: manPower.map((data) => JSON.stringify(data)).join("---"),
      equipment: equipment.map((data) => JSON.stringify(data)).join("---"),
      material: material.map((data) => JSON.stringify(data)).join("---"),
      problem: problem.map((data) => JSON.stringify(data)).join("---"),

      project_manager_id: values.project_manager,
      resident_engineer_id: values.resident_engineer,
      prepared_by_id: getUserData().id,
      approved_by_id: values.approved_by_id,
      checked_by_id: values.checked_by_id,
      reported_by_id: values.reported_by_id,
      accepted_by_id: values.accepted_by_id,
      inspected_by_id: values.inspected_by_id,
      confirmed_by_id: values.confirmed_by_id,
    };
    addWeeklyReportUtil(toSend)
      .then(() => {
        resetForm();
        handleOk();
        setLoading(false);
        fetchAllWeekReports();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.WEEKLY_REPORT_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.WEEKLY_REPORT_FAILURE,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        loading={loading}
        onClick={() => setIsModalVisible(true)}
      >
        Add Weekly Report
      </Button>
      <Modal
        title="Add Weekly Report"
        centered
        className="fixed-modal"
        visible={isModalVisible}
        onCancel={handleOk}
        width={1300}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Add Weekly Report
            </Button>
          </>,
        ]}
      >
        <Form
          form={form}
          // initialValues={{
          //   etb_contract_amount,
          // }}
          onFinish={Submit}
          onFinishFailed={(err) => {
            const { values, errorFields, outOfDate } = err;
            console.log("values ", values);
            console.log("error feilds ", errorFields);
            console.log("outofDate ", outOfDate);
            errorFields.map((field) =>
              OpenNotification(
                NotificationType.ERROR,
                formatFieldName(field.name[0].toString()),
                field.errors[0]
              )
            );
          }}
          layout="vertical"
        >
          <div className="row">
            <div className="col-md-3">
              <Statistic
                title="Project"
                value={project.payload?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Owner"
                value={project.payload?.client?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Consultant"
                value={
                  project.payload?.consultant
                    ? project.payload?.consultant.name
                    : "-"
                }
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Contractor"
                value={project.payload?.contractor?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <Divider />

            <div className="col-md-4">
              <Form.Item
                label="Reporting Week"
                rules={[
                  { required: true, message: "Please input Reporting Week" },
                ]}
              >
                <DatePicker
                  onChange={(date) => setReportingWeek(date!)}
                  value={reportingWeek}
                  picker="week"
                  allowClear={false}
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Reporting Date"
                rules={[
                  { required: true, message: "Please input Reporting date" },
                ]}
              >
                <DatePicker
                  name="reporting_date"
                  value={reportingDate}
                  allowClear={false}
                  onChange={(date, dateString) => setReportingDate(date!)}
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Scheduling Date"
                rules={[
                  { required: true, message: "Please input Scheduling date" },
                ]}
              >
                <DatePicker
                  name="scheduling_date"
                  value={schedulingDate}
                  allowClear={false}
                  onChange={(date, dateString) => setSchedulingDate(date!)}
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Block no"
                name="block_no"
                rules={[{ required: true, message: "Please input block no" }]}
              >
                <Input name="block_no" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Resident Engineer"
                name="resident_engineer"
                rules={[
                  {
                    required: true,
                    message: "Resident Engineer is required",
                  },
                ]}
              >
                <AutoComplete
                  placeholder="Resident Engineer"
                  options={user.map((e, index) => ({
                    value: e.full_name,
                    key: index,
                  }))}
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Site Inspector"
                name="site_inspector"
                rules={[
                  {
                    required: true,
                    message: "Site Inspector is required",
                  },
                ]}
              >
                <AutoComplete
                  placeholder="Site Inspector"
                  options={user.map((e, index) => ({
                    value: e.full_name,
                    key: index,
                  }))}
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>

            <div className="col-md-12 pt-4">
              <Text>Description</Text>
            </div>
            <div className="col-md-12">
              <Table
                columns={descriptionColumn}
                dataSource={description}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>

            <div className="col-md-6 pt-2">
              <Table
                columns={manPowerColumn}
                dataSource={manPower}
                size="small"
                pagination={false}
                bordered={true}
                title={() => "Man Power"}
              />
            </div>
            <div className="col-md-6 pt-2">
              <Table
                columns={materialColumn}
                dataSource={material}
                size="small"
                pagination={false}
                bordered={true}
                title={() => "Material"}
              />
            </div>
            <div className="col-md-6 pt-2">
              <Table
                columns={equiupmentColumn}
                dataSource={equipment}
                size="small"
                pagination={false}
                bordered={true}
                title={() => "Equipment"}
              />
            </div>

            <div className="col-md-12 pt-3">
              <Text>Problem ecountered and solution given</Text>
            </div>
            <div className="col-md-12 pt-2">
              <Table
                columns={problemColumn}
                dataSource={problem}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>

            <div className="col-md-4 pt-2">
              <Form.Item label="Prepared By" name="prepared_by_id">
                <Select disabled defaultValue={getUserData().id}>
                  {user?.map((emp: any, index: any) => (
                    <Select.Option value={emp.id}>
                      {emp.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item
                label="Approved By"
                name="approved_by_id"
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Select>
                  {user
                    ?.filter((us: any) => us.id !== getUserData().id)
                    .map((emp: any, index: any) => (
                      <Select.Option value={emp.id}>
                        {emp.full_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item
                label="Checked By"
                name="checked_by_id"
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Select>
                  {user
                    ?.filter((us: any) => us.id !== getUserData().id)
                    .map((emp: any, index: any) => (
                      <Select.Option value={emp.id}>
                        {emp.full_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item
                label="Reported By"
                name="reported_by_id"
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Select>
                  {user
                    ?.filter((us: any) => us.id !== getUserData().id)
                    .map((emp: any, index: any) => (
                      <Select.Option value={emp.id}>
                        {emp.full_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item
                label="Accepted By"
                name="accepted_by_id"
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Select>
                  {user
                    ?.filter((us: any) => us.id !== getUserData().id)
                    .map((emp: any, index: any) => (
                      <Select.Option value={emp.id}>
                        {emp.full_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item
                label="Inspected By"
                name="inspected_by_id"
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Select>
                  {user
                    ?.filter((us: any) => us.id !== getUserData().id)
                    .map((emp: any, index: any) => (
                      <Select.Option value={emp.id}>
                        {emp.full_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item
                label="Confirmed By"
                name="confirmed_by_id"
                rules={[{ required: true, message: "Field is required" }]}
              >
                <Select>
                  {user
                    ?.filter((us: any) => us.id !== getUserData().id)
                    .map((emp: any, index: any) => (
                      <Select.Option value={emp.id}>
                        {emp.full_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
          </div>
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
  weekly_plan: state.weekly_plan.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchWeeklyPlan: (action: any) => dispatch(fetchOneWeeklyPlan(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWeeklyReport);
