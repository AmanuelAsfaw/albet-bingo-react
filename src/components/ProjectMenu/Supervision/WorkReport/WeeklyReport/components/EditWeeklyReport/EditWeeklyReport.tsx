import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  DatePicker,
  InputNumber,
  Select,
  Statistic,
  Typography,
  Upload,
} from "antd";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal/Modal";
import Table, { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditWeeklyReportPropType } from "./EditWeeklyReport.util";
import { fetchAllWeekReport } from "../../../../../../../redux/WeekReport/WeekReport.action";
import { editWeeklyReportUtil } from "./EditWeeklyReport.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
  UNITS,
} from "../../../../../../../constants/Constants";
import {
  DescriptionType,
  EquipmentType,
  ManPowerType,
  MaterialType,
  ProblemType,
} from "../AddWeeklyReport/addWeeklyReport.util";
import {
  format,
  getUserData,
  handleChange,
} from "../../../../../../../utilities/utilities";
import { fetchOneWeeklyPlan } from "../../../../../../../redux/WeeklyPlan/WeeklyPlan.action";
import { toNumber } from "lodash";

const { Text } = Typography;
const { TextArea } = Input;

const EditWeeklyReport: FC<EditWeeklyReportPropType> = ({
  fetchAllWeekReports,
  weekReport,
  project,
  users,
  weekly_plan,
  fetchWeeklyPlan,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportingDate, setReportingDate] = useState<moment.Moment>(moment());
  const [schedulingDate, setSchedulingDate] = useState<moment.Moment>(moment());
  const [reportingWeek, setReportingWeek] = useState<moment.Moment | null>(
    moment()
      .week(parseInt(weekReport?.reporting_week.split(",")[1]))
      .year(parseInt(weekReport?.reporting_week.split(",")[0]))
  );

  const [description, setDescription] = useState<DescriptionType[]>(
    weekReport.description.split("---").map((data: any) => JSON.parse(data))
  );
  const [manPower, setManPower] = useState<ManPowerType[]>(
    weekReport.man_power.split("---").map((data: any) => JSON.parse(data))
  );
  const [material, setMaterial] = useState<MaterialType[]>(
    weekReport.material.split("---").map((data: any) => JSON.parse(data))
  );
  const [equipment, setEquipment] = useState<EquipmentType[]>(
    weekReport.equipment.split("---").map((data: any) => JSON.parse(data))
  );
  const [problem, setProblem] = useState<ProblemType[]>(
    weekReport.problem.split("---").map((data: any) => JSON.parse(data))
  );

  const [week, setWeek] = useState<string>("");

  useEffect(() => {
    if (isModalVisible)
      fetchWeeklyPlan({
        date: moment(weekReport?.reporting_week, "YYYY-MM-DD")
          .startOf("month")
          .format("YYYY-MM-DD"),
        project_id: project.id,
      });
    setWeek(
      `week${
        moment(weekReport?.reporting_week, "YYYY-MM-DD").endOf("week").week() -
        moment(weekReport?.reporting_week, "YYYY-MM-DD").endOf("week").month() *
          4
      }`
    );
  }, [reportingWeek, fetchWeeklyPlan, project, isModalVisible]);

  const onChangeHandler = (data: any, index: any, value: any) => {
    let plan: any = weekly_plan.payload?.weekly_plan_items.find(
      (e) => e.description === value
    );
    let weeklyAmount = plan ? plan[week] : 0;
    let weeklyContractAmount = plan ? plan?.contract_amount : 1;
    let st = data;
    st["item_no"] = plan?.item_no;
    st["activity_desc"] = plan?.description;
    st["planned_qty"] = (weeklyAmount / weeklyContractAmount) * 100;
    description[index] = st;
    setDescription([...description]);
  };

  const descriptionColumn: ColumnsType<DescriptionType> = [
    // {
    //   title: "No",
    //   render: (record, data, index) => zeroPad(index + 1),
    // },
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
          options={weekly_plan.payload?.weekly_plan_items.map((e, index) => ({
            value: e.description,
            key: index,
          }))}
          filterOption={(inputValue, option: any) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          style={{ width: "100%" }}
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
          value={record}
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

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const Submit = (values: any) => {
    setLoading(true);
    const toSend = {
      reporting_date: reportingDate,
      scheduling_date: schedulingDate,
      reporting_week: reportingWeek,
      resident_engineer: values.resident_engineer,
      site_inspector: values.site_inspector,
      block_no: values.block_no,

      description: description
        .map((data: any) => JSON.stringify(data))
        .join("---"),
      man_power: manPower.map((data) => JSON.stringify(data)).join("---"),
      equipment: equipment.map((data) => JSON.stringify(data)).join("---"),
      material: material.map((data) => JSON.stringify(data)).join("---"),
      problem: problem.map((data) => JSON.stringify(data)).join("---"),

      checked_by_id: values.checked_by_id,
      reported_by_id: values.reported_by_id,
      accepted_by_id: values.accepted_by_id,
      inspected_by_id: values.inspected_by_id,
      confirmed_by_id: values.confirmed_by_id,
    };

    editWeeklyReportUtil(weekReport.id, toSend)
      .then(() => {
        resetForm();
        handleOk();
        setLoading(false);
        fetchAllWeekReports({ project_id: project?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.WEEKLY_PROGRESS_UPDATE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.WEEKLY_PROGRESS_UPDATE_FAILURE,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        title="Edit Weekly Report"
        className="fixed-modal"
        centered
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
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
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form
          form={form}
          initialValues={{
            reporting_date: moment(weekReport?.reporting_date),
            scheduling_date: moment(weekReport?.scheduling_date),
            reporting_week: weekReport?.reporting_week,
            block_no: weekReport.block_no,
            contractor_name: weekReport.contractor_name,
            resident_engineer: weekReport.resident_engineer,
            site_inspector: weekReport.site_inspector,
            prepared_by_id: weekReport.wr_prepared_by?.full_name,
            checked_by_id: weekReport.wr_checked_by?.full_name,
            approved_by_id: weekReport.wr_approved_by?.full_name,
            reported_by_id: weekReport.wr_reported_by?.full_name,
            accepted_by_id: weekReport.wr_accepted_by?.full_name,
            inspected_by_id: weekReport.wr_inspected_by?.full_name,
            confirmed_by_id: weekReport.wr_confirmed_by?.full_name,
          }}
          onFinish={Submit}
          layout="vertical"
        >
          <div className="row">
            <div className="col-md-3">
              <Statistic
                title="Project"
                value={project?.name}
                valueStyle={{ fontSize: 16, fontWeight: "bold" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Owner"
                value={project?.client?.name}
                valueStyle={{ fontSize: 16, fontWeight: "bold" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Consultant"
                value={project.consultant ? project.consultant.name : "-"}
                valueStyle={{ fontSize: 16, fontWeight: "bold" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Contractor"
                value={project?.contractor?.name}
                valueStyle={{ fontSize: 16, fontWeight: "bold" }}
              />
            </div>

            <div className="col-md-12">
              <hr />
            </div>

            <div className="col-md-4" style={{ paddingTop: 20 }}>
              <Form.Item
                label="Reporting Week"
                rules={[
                  { required: true, message: "Please input Reporting Week" },
                ]}
              >
                <DatePicker
                  value={reportingWeek}
                  onChange={(date, da) => setReportingWeek(date)}
                  picker="week"
                />
              </Form.Item>
            </div>

            <div className="col-md-4" style={{ paddingTop: 20 }}>
              <Form.Item
                label="Reporting Date"
                rules={[
                  { required: true, message: "Please input Reporting date" },
                ]}
                name="reporting_date"
              >
                <DatePicker
                  name="reporting_date"
                  onChange={(date, da) => console.log(date, da)}
                />
              </Form.Item>
            </div>

            <div className="col-md-4" style={{ paddingTop: 20 }}>
              <Form.Item
                label="Scheduling Date"
                rules={[
                  { required: true, message: "Please input Scheduling date" },
                ]}
                name="scheduling_date"
              >
                <DatePicker
                  name="scheduling_date"
                  onChange={(date, da) => console.log(date, da)}
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item label="Block no" name="block_no">
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
                  options={users.payload.map((e, index) => ({
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
                  options={users.payload.map((e, index) => ({
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
            <div className="col-md-12 pt-2">
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

            <div className="col-md-12 pt-3">
              <Form.Item label="Comment" name="comment">
                <TextArea
                  rows={4}
                  disabled={weekReport?.wr_approved_by?.id !== getUserData().id}
                />
              </Form.Item>
            </div>

            <div className="col-md-4 pt-2">
              <Form.Item label="Prepared By" name="prepared_by_id">
                <Input name="prepared_by_id" />
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item label="Approved By" name="approved_by_id">
                <Input disabled />
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
  users: state.user.fetchAll,
  weekly_plan: state.weekly_plan.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllWeekReports: (action: any) => dispatch(fetchAllWeekReport(action)),
  fetchWeeklyPlan: (action: any) => dispatch(fetchOneWeeklyPlan(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWeeklyReport);
