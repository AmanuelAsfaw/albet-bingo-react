import { FC, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import Table, { ColumnsType } from "antd/lib/table";
import {
  DatePicker,
  Switch,
  Typography,
  Statistic,
  Checkbox,
  Divider,
  Select,
  InputNumber,
  AutoComplete,
  Form,
  Input,
  Button,
} from "antd";
import {
  WeatherTypes,
  DateTypes,
  NotificationType,
  Message,
  ItemCategory,
  UNITS,
} from "../../../../../../../constants/Constants";
import moment from "moment";
import { addSiteDiary, AddSiteDiaryPropType } from "./AddSiteDiary.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  formatNumber,
  getUserData,
  handleChange,
  zeroPad,
} from "../../../../../../../utilities/utilities";
import { fetchAllSiteDiary } from "../../../../../../../redux/SiteDiary/SiteDiary.action";
import {
  ActivityType,
  ConstructionChangeDirectiveType,
  DelayType,
  formatFieldName,
  GivenInstructionType,
  InitialPEData,
  // MaterialOnSiteType,
  MeetingAndSignificanceType,
  NonWorkingType,
  PeType,
  RequestToContractorsType,
} from "../../util/SiteDiary.util";
import TextArea from "antd/lib/input/TextArea";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const AddSiteDiary: FC<AddSiteDiaryPropType> = ({
  material,
  users,
  fetchSiteDiary,
  site_diary,
  project,
  index,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [type, setType] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportDate, setReportDate] = useState<moment.Moment | null>(moment());
  const [dateRange, setDateRange] = useState<any>([
    moment(),
    moment().add(2, "days"),
  ]);
  const [weatherType, setWeatherType] = useState(WeatherTypes.FINE);
  const [pe, setPe] = useState<PeType[]>(InitialPEData);
  const [activity, setActivity] = useState<ActivityType[]>([
    { activity: "", quantity: 0, unit: "", location: "" },
  ]);
  const [nonWorking, setNonWorking] = useState<NonWorkingType[]>([
    { value: "" },
  ]);
  const [delay, setDelay] = useState<DelayType[]>([{ value: "" }]);
  // const [materialOnSite, setMaterialOnSite] = useState<MaterialOnSiteType[]>([
  //   { material: "", quantity: 0, unit: "" },
  // ]);
  const [meetingAndSignificance, setMeetingAndSignificance] = useState<
    MeetingAndSignificanceType[]
  >([{ value: "" }]);
  const [constructionChangeDirective, setConstructionChangeDirective] =
    useState<ConstructionChangeDirectiveType[]>([{ value: "" }]);
  const [givenInstruction, setGivenInstruction] = useState<
    GivenInstructionType[]
  >([{ value: "" }]);
  const [requestToContractors, setRequestToContractors] = useState<
    RequestToContractorsType[]
  >([{ value: "" }]);

  const resetForm = () => {
    form.resetFields();
    setPe([
      {
        position: "Project Manager",
        no: 1,
        description: "",
        noo: 0,
        material: "",
        quantity: 0,
        unit: "",
      },
      {
        position: "Office Engineer",
        no: 1,
        description: "",
        noo: 0,
        material: "",
        quantity: 0,
        unit: "",
      },
      {
        position: "Site Engineer",
        no: 1,
        description: "",
        noo: 0,
        material: "",
        quantity: 0,
        unit: "",
      },
      {
        position: "General Foreman",
        no: 1,
        description: "",
        noo: 0,
        material: "",
        quantity: 0,
        unit: "",
      },
      {
        position: "Casher",
        no: 1,
        description: "",
        noo: 0,
        material: "",
        quantity: 0,
        unit: "",
      },
      {
        position: "Project Administration",
        no: 1,
        description: "",
        noo: 0,
        material: "",
        quantity: 0,
        unit: "",
      },
      {
        position: "Time & Store Keeper",
        no: 1,
        description: "",
        noo: 0,
        material: "",
        quantity: 0,
        unit: "",
      },
    ]);
    setActivity([{ activity: "", quantity: 0, unit: "", location: "" }]);
    setNonWorking([{ value: "" }]);
    setDelay([{ value: "" }]);
    // setMaterialOnSite([{ material: "", quantity: 0, unit: "" }]);
    setMeetingAndSignificance([{ value: "" }]);
    setConstructionChangeDirective([{ value: "" }]);
    setGivenInstruction([{ value: "" }]);
    setRequestToContractors([{ value: "" }]);
    setWeatherType(WeatherTypes.FINE);
  };

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const Pecolumn: ColumnsType<PeType> = [
    {
      title: "Position of Person",
      width: "18%",
      dataIndex: "position",
      render: (record, data, index) => (
        <Input
          bordered={false}
          value={record}
          onChange={(e) =>
            handleChange(e.target.value, "position", data, index, pe, setPe)
          }
        />
      ),
    },
    {
      title: "No",
      dataIndex: "no",
      width: "4%",
      render: (record, data, index) => (
        <Input
          className="pl-0"
          bordered={false}
          value={record}
          onChange={(e) =>
            handleChange(e.target.value, "no", data, index, pe, setPe)
          }
        />
      ),
    },
    {
      title: "Description of Equipment",
      width: "30%",
      dataIndex: "description",
      render: (record, data, index) => (
        <Input
          bordered={false}
          value={record}
          onChange={(e) =>
            handleChange(e.target.value, "description", data, index, pe, setPe)
          }
        />
      ),
    },
    {
      title: "No",
      width: "4%",
      dataIndex: "noo",
      render: (record, data, index) => (
        <Input
          className="pl-0"
          bordered={false}
          value={record}
          onChange={(e) =>
            handleChange(e.target.value, "noo", data, index, pe, setPe)
          }
        />
      ),
    },
    {
      title: "Material",
      dataIndex: "material",
      width: "25%",
      render: (record, data, index) => (
        <AutoComplete
          style={{ width: "100%" }}
          value={record}
          options={material.payload.map((e, index) => ({
            name: e.description,
            value: e.description,
            key: index,
          }))}
          placeholder="Material"
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onChange={(e) => handleChange(e, "material", data, index, pe, setPe)}
        />
      ),
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      width: "6%",
      render: (record: any, data: any, index: any) => (
        <Input
          bordered={false}
          className="px-0"
          value={formatNumber(record)}
          onChange={(e) =>
            handleChange(e.target.value, "quantity", data, index, pe, setPe)
          }
        />
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      width: "10%",
      render: (record, data, index) => (
        <Select
          value={record}
          style={{ width: "100%" }}
          onChange={(e) => handleChange(e, "unit", data, index, pe, setPe)}
        >
          {UNITS.map((unit) => (
            <Select.Option value={unit.value}>{unit.name}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      width: "6%",
      render: (record, data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = pe;
                fr.push({
                  position: "",
                  no: 0,
                  description: "",
                  noo: 0,
                  material: "",
                  quantity: 0,
                  unit: "",
                });
                setPe([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = pe;
                  fr.splice(index, 1);
                  setPe([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const activityColumn: ColumnsType<ActivityType> = [
    {
      title: "Activity Description/Project Status",
      dataIndex: "activity",
      width: "40%",
      render: (record, data, index) => (
        <Input
          bordered={false}
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "activity",
              data,
              index,
              activity,
              setActivity
            )
          }
        />
      ),
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      width: "10%",
      render: (record, data, index) => (
        <InputNumber
          bordered={false}
          // formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          value={formatNumber(record)}
          onChange={(e) =>
            handleChange(e, "quantity", data, index, activity, setActivity)
          }
        />
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      width: "10%",
      render: (record, data, index) => (
        <Select
          style={{ width: "100%" }}
          value={record}
          onChange={(e) =>
            handleChange(e, "unit", data, index, activity, setActivity)
          }
        >
          {UNITS.map((unit) => (
            <Select.Option value={unit.value}>{unit.name}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (record, data, index) => (
        <Input
          bordered={false}
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "location",
              data,
              index,
              activity,
              setActivity
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
                let fr = activity;
                fr.push({
                  activity: "",
                  quantity: 0,
                  unit: "",
                  location: "",
                });
                setActivity([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = activity;
                  fr.splice(index, 1);
                  setActivity([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const nonworkingColumn: ColumnsType<NonWorkingType> = [
    {
      title: "",
      dataIndex: "value",
      render: (record, data, index) => (
        <Input.TextArea
          bordered={false}
          autoSize
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "value",
              data,
              index,
              nonWorking,
              setNonWorking
            )
          }
        />
      ),
    },
    {
      title: "",
      width: "15%",
      render: (record, data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = nonWorking;
                fr.push({ value: "" });
                setNonWorking([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = nonWorking;
                  fr.splice(index, 1);
                  setNonWorking([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const delayColumn: ColumnsType<DelayType> = [
    {
      dataIndex: "value",
      render: (record: any, data: any, index: any) => (
        <Input.TextArea
          bordered={false}
          autoSize
          value={record}
          onChange={(e) =>
            handleChange(e.target.value, "value", data, index, delay, setDelay)
          }
        />
      ),
    },
    {
      width: "15%",
      render: (record: any, data: any, index: any) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = delay;
                fr.push({ value: "" });
                setDelay([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = delay;
                  fr.splice(index, 1);
                  setDelay([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const meetingAndSignificanceColumn: ColumnsType<MeetingAndSignificanceType> =
    [
      {
        dataIndex: "value",
        render: (record, data, index) => (
          <Input
            bordered={false}
            value={record}
            onChange={(e) =>
              handleChange(
                e.target.value,
                "value",
                data,
                index,
                meetingAndSignificance,
                setMeetingAndSignificance
              )
            }
          />
        ),
      },
      {
        width: "15%",
        render: (record, data, index) => (
          <div className="d-flex justify-content-center">
            <div className="px-2">
              <PlusOutlined
                onClick={() => {
                  let fr = meetingAndSignificance;
                  fr.push({ value: "" });
                  setMeetingAndSignificance([...fr]);
                }}
              />
            </div>
            {index === 0 ? null : (
              <div className="px-2">
                <MinusOutlined
                  onClick={() => {
                    let fr = meetingAndSignificance;
                    fr.splice(index, 1);
                    setMeetingAndSignificance([...fr]);
                  }}
                />
              </div>
            )}
          </div>
        ),
      },
    ];

  const constructionChangeDirectiveColumn: ColumnsType<ConstructionChangeDirectiveType> =
    [
      {
        dataIndex: "value",
        render: (record, data, index) => (
          <Input
            bordered={false}
            value={record}
            onChange={(e) =>
              handleChange(
                e.target.value,
                "value",
                data,
                index,
                constructionChangeDirective,
                setConstructionChangeDirective
              )
            }
          />
        ),
      },
      {
        width: "15%",
        render: (record, data, index) => (
          <div className="d-flex justify-content-center">
            <div className="px-2">
              <PlusOutlined
                onClick={() => {
                  let fr = constructionChangeDirective;
                  fr.push({ value: "" });
                  setConstructionChangeDirective([...fr]);
                }}
              />
            </div>
            {index === 0 ? null : (
              <div className="px-2">
                <MinusOutlined
                  onClick={() => {
                    let fr = constructionChangeDirective;
                    fr.splice(index, 1);
                    setConstructionChangeDirective([...fr]);
                  }}
                />
              </div>
            )}
          </div>
        ),
      },
    ];

  const givenInstructionColumn: ColumnsType<GivenInstructionType> = [
    {
      dataIndex: "value",
      render: (record, data, index) => (
        <Input
          bordered={false}
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "value",
              data,
              index,
              givenInstruction,
              setGivenInstruction
            )
          }
        />
      ),
    },
    {
      title: "",
      width: "15%",
      render: (record, data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = givenInstruction;
                fr.push({ value: "" });
                setGivenInstruction([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = givenInstruction;
                  fr.splice(index, 1);
                  setGivenInstruction([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const requestToContractorsColumn: ColumnsType<RequestToContractorsType> = [
    {
      dataIndex: "value",
      render: (record, data, index) => (
        <Input
          bordered={false}
          value={record}
          onChange={(e) =>
            handleChange(
              e.target.value,
              "value",
              data,
              index,
              requestToContractors,
              setRequestToContractors
            )
          }
        />
      ),
    },
    {
      title: "",
      width: "15%",
      render: (record, data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = givenInstruction;
                fr.push({ value: "" });
                setRequestToContractors([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = givenInstruction;
                  fr.splice(index, 1);
                  setRequestToContractors([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const Submit = (values: any) => {
    setLoading(true);
    const finalDate = type
      ? reportDate?.format("YYYY-MM-DD")
      : dateRange.map((date: any) => date.format("YYYY-MM-DD")).join("--");

    const toSend = {
      project_id: project.payload?.id,
      date: finalDate,
      date_type: type ? DateTypes.DATE : DateTypes.RANGE,
      location: values.location,
      weather_condition: weatherType,
      bad_weather_description: values.describe_bad_weather ?? "",
      personnel_equipment: pe.map((data) => JSON.stringify(data)).join("---"),
      work_description: activity
        .map((data) => JSON.stringify(data))
        .join("---"),
      non_working_hrs: nonWorking
        .map((data) => JSON.stringify(data))
        .join("---"),
      services: delay.map((data) => JSON.stringify(data)).join("---"),
      // material: materialOnSite.map((data) => JSON.stringify(data)).join("---"),
      construction_change: constructionChangeDirective
        .map((data) => JSON.stringify(data))
        .join("---"),
      given_instruction: givenInstruction
        .map((data) => JSON.stringify(data))
        .join("---"),
      request_to_contractors: requestToContractors
        .map((data) => JSON.stringify(data))
        .join("---"),
      meeting: meetingAndSignificance
        .map((data) => JSON.stringify(data))
        .join("---"),
      project_manager_id: values.project_manager,
      resident_engineer_id: values.resident_engineer,
      prepared_by_id: getUserData().id,
      contractor: users.payload.find((e) => e.full_name === values.contractor)
        ?.id,
      approved_by_id: values.approved_by_id,
      site_inspector: users.payload.find(
        (e) => e.full_name === values.site_inspector
      )?.id,
      remark: values.remark,
    };
    addSiteDiary(toSend)
      .then(() => {
        resetForm();
        handleOk();
        setLoading(false);
        fetchSiteDiary({ project_id: project?.payload.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.SITE_DIARY_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.SITE_DIARY_FAILURE,
            e.message
          )
        );
      });
  };

  return (
    <div>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        loading={users.isPending || site_diary.isPending || project.isPending}
      >
        Add Site Diary
      </Button>
      <Modal
        title="Add Site Diary"
        centered
        className="fixed-modal"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1200}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Add Site Diary
            </Button>
          </>,
        ]}
      >
        <Form
          initialValues={{
            report_number: zeroPad(index),
          }}
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
          form={form}
        >
          <div className="row align-items-baseline">
            <div className="col-md-3">
              <Form.Item name="report_number">
                <Input
                  type="text"
                  name="report_number"
                  placeholder="Report number"
                  disabled
                />
              </Form.Item>
            </div>

            {type ? (
              <div className="col-md-3">
                <Form.Item
                  rules={[{ required: true, message: "Please input date" }]}
                >
                  <DatePicker
                    allowClear={false}
                    value={reportDate}
                    onChange={(date) => setReportDate(date)}
                  />
                </Form.Item>
              </div>
            ) : (
              <div className="col-md-5">
                <Form.Item
                  rules={[
                    { required: true, message: "Please input date range" },
                  ]}
                >
                  <RangePicker
                    allowClear={false}
                    value={dateRange}
                    ranges={{
                      "This week": [moment(), moment().add(1, "week")],
                    }}
                    onChange={(date) => setDateRange(date)}
                  />
                </Form.Item>
              </div>
            )}

            <div className="col-md-3">
              <Switch
                checkedChildren="Date"
                unCheckedChildren="Period"
                defaultChecked
                onChange={(value) => setType(value)}
              />
            </div>
          </div>

          <Divider />

          <div className="row">
            <div className="col-md-3">
              <Statistic
                title="Client"
                value={
                  project.payload?.client ? project.payload?.client?.name : "-"
                }
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-3">
              <Statistic
                title="Project title"
                value={project.payload?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>

          <Divider />

          <div className="row">
            <div className="col-md-12">
              <Text>1. Weather Condition</Text>
            </div>
            <div className="col-md-12 pt-10">
              <div className="row ml-1">
                <div>
                  <Checkbox
                    checked={weatherType === WeatherTypes.FINE}
                    onChange={(e: any) => setWeatherType(WeatherTypes.FINE)}
                  >
                    {WeatherTypes.FINE}
                  </Checkbox>
                </div>
                <div>
                  <Checkbox
                    checked={weatherType === WeatherTypes.GOOD}
                    onChange={(e: any) => setWeatherType(WeatherTypes.GOOD)}
                  >
                    {WeatherTypes.GOOD}
                  </Checkbox>
                </div>
                <div>
                  <Checkbox
                    checked={weatherType === WeatherTypes.BAD}
                    onChange={(e: any) => setWeatherType(WeatherTypes.BAD)}
                  >
                    {WeatherTypes.BAD}
                  </Checkbox>
                </div>
                <div className="col-md-6">
                  {weatherType === WeatherTypes.BAD ? (
                    <Form.Item
                      name="describe_bad_weather"
                      label="Describe the bad weather"
                    >
                      <Input
                        name="describe_bad_weather"
                        placeholder="describe"
                      />
                    </Form.Item>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <Divider />

          <div className="row mt-4">
            <div className="col-md-12">
              <Text>2. Personnel and equipment deployed for the day</Text>
              <Table
                tableLayout="fixed"
                className="sitediary-table"
                columns={Pecolumn}
                dataSource={pe}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <Text>3. Description of works performed during the day</Text>
              <Table
                columns={activityColumn}
                dataSource={activity}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <Text>
                4. Resident Engineer/Consultant Request to Contractors
              </Text>
              <Table
                className="pt-2"
                showHeader={false}
                columns={requestToContractorsColumn}
                dataSource={requestToContractors}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>
            <div className="col-md-6">
              <Text>5. Work done during non-working hrs/days</Text>
              <Table
                className="pt-2"
                showHeader={false}
                columns={nonworkingColumn}
                dataSource={nonWorking}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <Text>
                6. Stoppage, delays, services connected and disconnected
              </Text>
              <Table
                className="pt-2"
                showHeader={false}
                columns={delayColumn}
                dataSource={delay}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>
            <div className="col-md-6">
              <Text>7. Meeting and Significant decision</Text>
              <Table
                className="pt-2"
                columns={meetingAndSignificanceColumn}
                dataSource={meetingAndSignificance}
                size="small"
                pagination={false}
                bordered={true}
                showHeader={false}
              />
            </div>
          </div>

          {/* <div className="row mt-4">
            <div className="col-md-12">
              <Text>6. Material on site</Text>
              <div style={{ float: "right" }}>
                <ImportMaterialOnSite setMaterialOnSite={setMaterialOnSite} />
              </div>
              <Table
                columns={materialOnSiteColumn}
                dataSource={materialOnSite}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>
          </div> */}

          <div className="row mt-4">
            <div className="col-md-6">
              <Text>8. Construction Change Directives received</Text>
              <Table
                className="pt-2"
                columns={constructionChangeDirectiveColumn}
                dataSource={constructionChangeDirective}
                size="small"
                pagination={false}
                bordered={true}
                showHeader={false}
              />
            </div>
            <div className="col-md-6">
              <Text>9. Order and Instruction Given</Text>
              <Table
                className="pt-2"
                showHeader={false}
                columns={givenInstructionColumn}
                dataSource={givenInstruction}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>
          </div>

          <div className="col-md-12 px-0">
            <Form.Item label="Remark" name="remark">
              <TextArea autoSize name="remark" />
            </Form.Item>
          </div>

          <div className="row">
            <div className="col-md-4 pt-2">
              <Form.Item label="Prepared By (Contractor)" name="prepared_by_id">
                <Select disabled defaultValue={getUserData().id}>
                  {users.payload.map((emp: any, index: any) => (
                    <Select.Option value={emp.id}>
                      {emp.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item label="Approved By (Consultant)" name="approved_by_id">
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="approved by"
                >
                  {users.payload.map((emp: any, index: any) => (
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
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  material: state.material.fetchAll,
  site_diary: state.site_diary.fetchAll,
  users: state.user.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSiteDiary: (action: any) => dispatch(fetchAllSiteDiary(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSiteDiary);
