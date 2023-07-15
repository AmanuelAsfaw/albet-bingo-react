import { FC, useState } from "react";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import Table, { ColumnsType } from "antd/lib/table";
import {
  DatePicker,
  Switch,
  Typography,
  Statistic,
  Checkbox,
  InputNumber,
  Divider,
  Input,
  Form,
  Button,
} from "antd";
import { WeatherTypes } from "../../../../../../../constants/Constants";
import moment from "moment";
import { ViewSiteDiaryPropType } from "./ViewSiteDiary.util";
import {
  formatNumber,
  parseUnit,
  zeroPad,
} from "../../../../../../../utilities/utilities";
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
} from "../../util/SiteDiary.util";
// import { OpenNotification } from "../../../../Notification/Notification.component";
// import PrintSiteDiaryPrint from "../PrintSiteDiary/PrintSiteDiary";

const { RangePicker } = DatePicker;
const { Text } = Typography;
const { TextArea } = Input;

const ViewSiteDiary: FC<ViewSiteDiaryPropType> = ({
  project,
  site_diary,
  index,
}) => {
  const [form] = Form.useForm();
  const [type, setType] = useState(site_diary.date_type === "Date");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [weatherType, setWeatherType] = useState(site_diary.weather_condition);

  const Pecolumn: ColumnsType<PeType> = [
    {
      title: "Postion of Person",
      width: "20%",
      dataIndex: "position",
      render: (record: any, data: any, index: any) => (
        <Input bordered={false} value={record} />
      ),
    },
    {
      title: "NO",
      dataIndex: "no",
      render: (record: any, data: any, index: any) => (
        <InputNumber bordered={false} value={record} />
      ),
    },
    {
      title: "Description of Equipment",
      width: "40%",
      dataIndex: "description",
      render: (record: any, data: any, index: any) => (
        <Input bordered={false} value={record} />
      ),
    },
    {
      title: "No",
      dataIndex: "noo",
      render: (record: any, data: any, index: any) => (
        <InputNumber bordered={false} value={record} />
      ),
    },
    {
      title: "Material",
      dataIndex: "material",
      render: (record: any, data: any, index: any) => (
        <Input bordered={false} value={record} />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (record: any, data: any, index: any) => (
        <InputNumber bordered={false} value={formatNumber(record)} />
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      render: (record: any, data: any, index: any) => (
        <Input bordered={false} value={parseUnit(record)} />
      ),
    },
  ];

  const activityColumn: ColumnsType<ActivityType> = [
    {
      title: "Activity Description/Project Status",
      dataIndex: "activity",
      width: "40%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      width: "10%",
      render: (record: any, data: any, index: any) => (
        <InputNumber bordered={false} value={formatNumber(record)} />
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      width: "10%",
      render: (record: any, data: any, index: any) => (
        <InputNumber bordered={false} value={parseUnit(record)} />
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (record: any, data: any, index: any) => (
        <Input bordered={false} value={record} />
      ),
    },
  ];

  const nonworkingColumn: ColumnsType<NonWorkingType> = [
    {
      dataIndex: "value",
      render: (record: any, data: any, index: any) => (
        <Input.TextArea bordered={false} rows={2} value={record} />
      ),
    },
  ];

  const delayColumn: ColumnsType<DelayType> = [
    {
      dataIndex: "value",
      render: (record: any, data: any, index: any) => (
        <Input.TextArea bordered={false} rows={2} value={record} />
      ),
    },
  ];

  const meetingAndSignificanceColumn: ColumnsType<MeetingAndSignificanceType> =
    [
      {
        dataIndex: "value",
        render: (record: any, data: any, index: any) => (
          <Input bordered={false} value={record} />
        ),
      },
    ];

  const constructionChangeDirectiveColumn: ColumnsType<ConstructionChangeDirectiveType> =
    [
      {
        dataIndex: "value",
        render: (record: any, data: any, index: any) => (
          <Input bordered={false} value={record} />
        ),
      },
    ];

  const givenInstructionColumn: ColumnsType<GivenInstructionType> = [
    {
      dataIndex: "value",
      render: (record: any, data: any, index: any) => (
        <Input bordered={false} value={record} />
      ),
    },
  ];

  const requestToContractorsColumn: ColumnsType<RequestToContractorsType> = [
    {
      dataIndex: "value",
      render: (record: any, data: any, index: any) => (
        <Input bordered={false} value={record} />
      ),
    },
  ];

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
        View
      </Button>
      <Modal
        title="View Site Diary"
        className="fixed-modal"
        centered
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
        footer={() => <></>}
      >
        <div className="hidden-print">
          <Form
            initialValues={{
              date: moment(site_diary?.date),
              date_range: getDateRange(site_diary?.date),
              describe_bad_weather: site_diary?.bad_weather_description,

              report_number: zeroPad(index),
              prepared_by_id: site_diary.sd_prepared_by?.full_name,
              checked_by_id: site_diary.sd_checked_by?.full_name,
              approved_by_id: site_diary.sd_approved_by?.full_name,
              site_engineer_id: site_diary.sd_site_engineer?.full_name,
              project_manager_id: site_diary.sd_project_manager?.full_name,
              resident_engineer_id: site_diary.sd_resident_engineer?.full_name,
              comment: site_diary.comment,
              remark: site_diary.remark,
            }}
            layout="vertical"
            form={form}
          >
            <div className="row">
              <div className="col-md-3">
                <Input
                  type="text"
                  value={zeroPad(index)}
                  placeholder="Report number"
                  disabled
                />
              </div>
              <div className="col-md-6">
                {type ? (
                  <Form.Item name="date">
                    <DatePicker name="date" disabled />
                  </Form.Item>
                ) : (
                  <Form.Item name="date_range">
                    <RangePicker name="date_range" disabled />
                  </Form.Item>
                )}
              </div>
              <div className="col-md-3">
                <Switch
                  disabled
                  checkedChildren="Date"
                  unCheckedChildren="Period"
                  defaultChecked
                  onChange={(value) => setType(value)}
                />
              </div>
              <div className="col-md-3">
                <Statistic
                  title="Client"
                  value={project.payload?.client?.name}
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
                  <div className="col-md-1">
                    <Checkbox
                      checked={weatherType === WeatherTypes.FINE}
                      onChange={(e: any) => setWeatherType(WeatherTypes.FINE)}
                    >
                      {WeatherTypes.FINE}
                    </Checkbox>
                  </div>
                  <div className="col-md-1">
                    <Checkbox
                      checked={weatherType === WeatherTypes.GOOD}
                      onChange={(e: any) => setWeatherType(WeatherTypes.GOOD)}
                    >
                      {WeatherTypes.GOOD}
                    </Checkbox>
                  </div>
                  <div className="col-md-1">
                    <Checkbox
                      checked={weatherType === WeatherTypes.BAD}
                      onChange={(e: any) => setWeatherType(WeatherTypes.BAD)}
                    >
                      {WeatherTypes.BAD}
                    </Checkbox>
                  </div>
                  <div className="col-md-6">
                    {weatherType === WeatherTypes.BAD ? (
                      <>
                        <Text>Because: </Text>
                        <Input value={site_diary?.bad_weather_description} />
                      </>
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
                  dataSource={site_diary.personnel_equipment
                    .split("---")
                    .map((form: any) => JSON.parse(form))}
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
                  dataSource={site_diary.work_description
                    .split("---")
                    .map((form: any) => JSON.parse(form))}
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
                  dataSource={site_diary.request_to_contractors
                    .split("---")
                    .map((form: any) => JSON.parse(form))}
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
                  dataSource={site_diary.non_working_hrs
                    .split("---")
                    .map((form: any) => JSON.parse(form))}
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
                  dataSource={site_diary.services
                    .split("---")
                    .map((form: any) => JSON.parse(form))}
                  size="small"
                  pagination={false}
                  bordered={true}
                  className="pt-2"
                  showHeader={false}
                />
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
                  dataSource={site_diary.meeting
                    .split("---")
                    .map((form: any) => JSON.parse(form))}
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
                  dataSource={site_diary.construction_change
                    .split("---")
                    .map((form: any) => JSON.parse(form))}
                  size="small"
                  pagination={false}
                  bordered={true}
                  className="pt-2"
                  showHeader={false}
                />
              </div>

              <div className="col-md-6" style={{ paddingTop: 20 }}>
                <Text>Order and Instruction Given</Text>
                <Table
                  columns={givenInstructionColumn}
                  dataSource={site_diary.given_instruction
                    .split("---")
                    .map((form: any) => JSON.parse(form))}
                  size="small"
                  pagination={false}
                  bordered={true}
                  className="pt-2"
                  showHeader={false}
                />
              </div>
              <div className="col-md-6"></div>

              <div className="col-md-12">
                <Form.Item label="Remark" name="remark">
                  <TextArea autoSize name="remark" rows={2} />
                </Form.Item>
              </div>

              <div className="col-md-4 pt-2">
                <Form.Item label="Prepared By" name="prepared_by_id">
                  <Input name="prepared_by_id" />
                </Form.Item>
              </div>
              <div className="col-md-4 pt-2">
                <Form.Item label="Approved By" name="approved_by_id">
                  <Input name="approved_by_id" />
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
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  // fetchAllInspectionForm: () => dispatch(fetchAllInspectionForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewSiteDiary);
