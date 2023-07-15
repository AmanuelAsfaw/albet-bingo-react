import React, { FC, useState } from "react";
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
  Select,
  InputNumber,
  Divider,
  AutoComplete,
  Form,
  Input,
  Button,
} from "antd";
import {
  WeatherTypes,
  DateTypes,
  UNITS,
  NotificationType,
  Message,
  ItemCategory,
} from "../../../../../../../constants/Constants";
import moment from "moment";
import {
  ActivityType,
  ConstructionChangeDirectiveType,
  DelayType,
  GivenInstructionType,
  // MaterialOnSiteType,
  MeetingAndSignificanceType,
  NonWorkingType,
  PeType,
  RequestToContractorsType,
  updateSiteDiary,
} from "../../util/SiteDiary.util";
import { fetchAllSiteDiary } from "../../../../../../../redux/SiteDiary/SiteDiary.action";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { EditSiteDiaryPropType } from "./EditSiteDiary.util";
import {
  formatNumber,
  getUserData,
  handleChange,
  zeroPad,
} from "../../../../../../../utilities/utilities";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const EditSiteDiary: FC<EditSiteDiaryPropType> = ({
  fetchSiteDiaries,
  project,
  users,
  site_diary,
  index,
  material,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [type, setType] = useState(site_diary.date_type === "Date");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [weatherType, setWeatherType] = useState(site_diary.weather_condition);
  const [pe, setPe] = useState<PeType[]>(
    site_diary.personnel_equipment
      .split("---")
      .map((form: any) => JSON.parse(form))
  );
  const [activity, setActivity] = useState<ActivityType[]>(
    site_diary.work_description
      .split("---")
      .map((form: any) => JSON.parse(form))
  );
  const [nonWorking, setNonWorking] = useState<NonWorkingType[]>(
    site_diary.non_working_hrs.split("---").map((form: any) => JSON.parse(form))
  );
  const [delay, setDelay] = useState<DelayType[]>(
    site_diary.services.split("---").map((form: any) => JSON.parse(form))
  );
  // const [materialOnSite, setMaterialOnSite] = useState<MaterialOnSiteType[]>(
  //   site_diary.material.split("---").map((form: any) => JSON.parse(form))
  // );
  const [meetingAndSignificance, setMeetingAndSignificance] = useState<
    MeetingAndSignificanceType[]
  >(site_diary.meeting.split("---").map((form: any) => JSON.parse(form)));
  const [constructionChangeDirective, setConstructionChangeDirective] =
    useState<ConstructionChangeDirectiveType[]>(
      site_diary.construction_change
        .split("---")
        .map((form: any) => JSON.parse(form))
    );
  const [givenInstruction, setGivenInstruction] = useState<
    GivenInstructionType[]
  >(
    site_diary.given_instruction
      .split("---")
      .map((form: any) => JSON.parse(form))
  );
  const [requestToContractors, setRequestToContractors] = useState<
    RequestToContractorsType[]
  >(
    site_diary.request_to_contractors
      .split("---")
      .map((form: any) => JSON.parse(form))
  );

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
        <Select
          value={record}
          style={{ width: "100%" }}
          onChange={(e) => handleChange(e, "material", data, index, pe, setPe)}
        >
          {material.payload
            .filter(
              (data) =>
                data.item_category === ItemCategory.CONSTRUCTION_MATERIAL
            )
            .map((data) => (
              <Select.Option value={data.description}>
                {data.description}
              </Select.Option>
            ))}
        </Select>
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
      width: "8%",
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
      width: "5%",
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
      render: (record: any, data: any, index: any) => (
        <Input
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
      render: (record: any, data: any, index: any) => (
        <InputNumber
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
      render: (record: any, data: any, index: any) => (
        <Select
          value={record}
          style={{ width: "100%" }}
          onChange={(e: any) =>
            handleChange(e, "unit", data, index, activity, setActivity)
          }
        >
          {UNITS.map((unit: any) => (
            <Select.Option value={unit.value}>{unit.name}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (record: any, data: any, index: any) => (
        <Input
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
      render: (record: any, data: any, index: any) => (
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
      dataIndex: "value",
      width: "85%",
      render: (record: any, data: any, index: any) => (
        <Input.TextArea
          placeholder=""
          rows={2}
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
      render: (record: any, data: any, index: any) => (
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
          rows={2}
          placeholder=""
          value={record}
          onChange={(e) =>
            handleChange(e.target.value, "value", data, index, delay, setDelay)
          }
        />
      ),
    },
    {
      title: "",
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
        render: (record: any, data: any, index: any) => (
          <Input
            placeholder=""
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
        title: "",
        width: "15%",
        render: (record: any, data: any, index: any) => (
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
        render: (record: any, data: any, index: any) => (
          <Input
            placeholder=""
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
        title: "",
        width: "15%",
        render: (record: any, data: any, index: any) => (
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
      render: (record: any, data: any, index: any) => (
        <Input
          placeholder=""
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
      render: (record: any, data: any, index: any) => (
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
      render: (record: any, data: any, index: any) => (
        <Input
          placeholder=""
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
      render: (record: any, data: any, index: any) => (
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
      ? values.date.format("YYYY-MM-DD")
      : values.date_range.map((dr: any) => dr.format("YYYY-MM-DD")).join("--");

    const toSend = {
      id: site_diary.id,
      date: finalDate,
      date_type: type ? DateTypes.DATE : DateTypes.RANGE,
      location: values.location,
      weather_condition: weatherType,
      bad_weather_description: values?.describe_bad_weather,
      personnel_equipment: pe
        .map((data: any) => JSON.stringify(data))
        .join("---"),
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
      site_engineer_id: values.site_engineer,
      project_manager_id: values.project_manager,
      resident_engineer_id: values.resident_engineer,
      comment: values.comment,
      remark: values.remark,
      approved_by_id: values.approved_by_id,
    };

    updateSiteDiary(toSend)
      .then(() => {
        setLoading(false);
        resetForm();
        handleOk();
        fetchSiteDiaries({ project_id: project?.payload.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.SITE_DIARY_UPDATE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // error.response.data.errors.map((e: any) =>
        OpenNotification(
          NotificationType.ERROR,
          Message.SITE_DIARY_UPDATE_FAILED,
          "Error occured"
        );
        // );
      });
  };

  const getDateRange = (date: string) => {
    if (date) {
      let range = date.split("--");
      if (range.length === 2) return [moment(range[0]), moment(range[1])];
      else return [moment(), moment().add(3, "days")];
    } else return [moment(), moment().add(3, "days")];
  };

  return (
    <div>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        title="Edit Site Diary"
        className="fixed-modal"
        centered
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1200}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save changes
            </Button>
          </>,
        ]}
      >
        <div className="hidden-print">
          <Form
            initialValues={{
              date: site_diary?.date ? moment(site_diary.date) : moment(),
              date_range: getDateRange(site_diary.date),

              report_number: zeroPad(index),
              prepared_by_id: site_diary.sd_prepared_by?.full_name,
              checked_by_id: site_diary.sd_checked_by?.full_name,
              approved_by_id: site_diary.sd_approved_by?.full_name,
              site_engineer_id: site_diary.sd_site_engineer?.id,
              project_manager_id: site_diary.sd_project_manager?.id,
              resident_engineer_id: site_diary.sd_resident_engineer?.id,
              comment: site_diary.comment,
              describe_bad_weather: site_diary?.bad_weather_description,
            }}
            onFinish={Submit}
            layout="vertical"
            form={form}
          >
            <div className="row">
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
              <div className="col-md-6">
                {type ? (
                  <Form.Item
                    rules={[{ required: true, message: "Please input Name" }]}
                    name="date"
                  >
                    <DatePicker name="date" />
                  </Form.Item>
                ) : (
                  <Form.Item
                    rules={[{ required: true, message: "Please input Name" }]}
                    name="date_range"
                  >
                    <RangePicker name="date_range" />
                  </Form.Item>
                )}
              </div>
              <div className="col-md-3">
                <Switch
                  checkedChildren="Date"
                  unCheckedChildren="Period"
                  defaultChecked
                  onChange={(value) => setType(value)}
                />
              </div>
              <div className="col-md-3">
                <Statistic
                  title="Client"
                  value={
                    project.payload?.client
                      ? project.payload?.client?.name
                      : "-"
                  }
                  valueStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
              </div>
              <div className="col-md-3">
                <Statistic
                  title="Project title"
                  value={project.payload?.name}
                  valueStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
              </div>

              <div className="col-md-12">
                <hr />
              </div>
              <div className="col-md-12">
                <Text>Weather Condition</Text>
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
                        <Input placeholder="Describe the bad weather" />
                      </Form.Item>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-12 pt-2">
                <Text>Personnel and equipment deployed for the day</Text>
              </div>
              <div className="col-md-12">
                <Table
                  columns={Pecolumn}
                  dataSource={pe}
                  size="small"
                  pagination={false}
                  bordered={true}
                />
              </div>
              <div className="col-md-12" style={{ paddingTop: 20 }}>
                <Text>Description of works performed during the day</Text>
              </div>
              <div className="col-md-12">
                <Table
                  columns={activityColumn}
                  dataSource={activity}
                  size="small"
                  pagination={false}
                  bordered={true}
                />
              </div>
              <div className="col-md-12" style={{ paddingTop: 20 }}>
                <Text>Resident Engineer/Consultant Request to Contractors</Text>
              </div>
              <div className="col-md-6">
                <Table
                  columns={requestToContractorsColumn}
                  dataSource={requestToContractors}
                  size="small"
                  pagination={false}
                  bordered={true}
                  className="pt-2"
                  showHeader={false}
                />
              </div>
              <Divider />

              <div className="col-md-6" style={{ paddingTop: 20 }}>
                <Text>Work done during non-working hrs/days</Text>
              </div>
              <div className="col-md-6" style={{ paddingTop: 20 }}>
                <Text>
                  Stoppage, delays, services connected and disconnected
                </Text>
              </div>
              <div className="col-md-6">
                <Table
                  columns={nonworkingColumn}
                  dataSource={nonWorking}
                  size="small"
                  pagination={false}
                  bordered={true}
                  className="pt-2"
                  showHeader={false}
                />
              </div>
              <div className="col-md-6">
                <Table
                  columns={delayColumn}
                  dataSource={delay}
                  size="small"
                  pagination={false}
                  bordered={true}
                  showHeader={false}
                  className="pt-2"
                />
              </div>
              <div className="col-md-12">
                {/* <div className="col-md-6" style={{ paddingTop: 20 }}> */}
                {/* <Text>Material on site</Text> */}
                {/* </div> */}
                {/* <div style={{ float: "right" }}>
                  <ImportMaterialOnSite setMaterialOnSite={setMaterialOnSite} />
                </div> */}

                {/* <Table
                  columns={materialOnSiteColumn}
                  dataSource={materialOnSite}
                  size="small"
                  pagination={false}
                  bordered={true}
                /> */}
              </div>
              <div className="col-md-6" style={{ paddingTop: 20 }}>
                <Text>Meeting and Significant decision</Text>
              </div>
              <div className="col-md-6" style={{ paddingTop: 20 }}>
                <Text>Construction Change Directives received</Text>
              </div>
              <div className="col-md-6">
                <Table
                  columns={meetingAndSignificanceColumn}
                  dataSource={meetingAndSignificance}
                  size="small"
                  pagination={false}
                  bordered={true}
                  className="pt-2"
                  showHeader={false}
                />
              </div>

              <div className="col-md-6">
                <Table
                  columns={constructionChangeDirectiveColumn}
                  dataSource={constructionChangeDirective}
                  size="small"
                  pagination={false}
                  bordered={true}
                  className="pt-2"
                  showHeader={false}
                />
              </div>

              <div className="col-md-6" style={{ paddingTop: 20 }}>
                <Text>Given instruction</Text>
                <Table
                  columns={givenInstructionColumn}
                  dataSource={givenInstruction}
                  size="small"
                  pagination={false}
                  bordered={true}
                  className="pt-2"
                  showHeader={false}
                />
              </div>

              <div className="col-md-4 pt-2">
                <Form.Item
                  label="Prepared By (Contractor)"
                  name="prepared_by_id"
                >
                  <Input disabled name="prepared_by_id" />
                </Form.Item>
              </div>
              <div className="col-md-4 pt-2">
                <Form.Item
                  label="Approved By (Consultant)"
                  name="approved_by_id"
                >
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
        </div>
        <div className="col-md-12"></div>
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
  users: state.user.fetchAll,
  project: state.project.fetchOne,
  material: state.material.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSiteDiaries: (action: any) => dispatch(fetchAllSiteDiary(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSiteDiary);
