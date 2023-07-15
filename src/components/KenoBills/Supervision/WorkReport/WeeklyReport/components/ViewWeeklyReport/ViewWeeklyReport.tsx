import { DatePicker, InputNumber, Statistic, Typography } from "antd";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal/Modal";
import Table, { ColumnsType } from "antd/lib/table";
import { isNil, toNumber } from "lodash";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BASE_URI } from "../../../../../../../redux/ApiCall";
import {
  format,
  formatNumber,
  parseUnit,
} from "../../../../../../../utilities/utilities";
import {
  DescriptionType,
  EquipmentType,
  ManPowerType,
  MaterialType,
  ProblemType,
} from "../AddWeeklyReport/addWeeklyReport.util";
import { ViewWeeklyReportPropType } from "./ViewWeeklyReport.util";

const { Text } = Typography;
const { TextArea } = Input;

const ViewWeeklyReport: FC<ViewWeeklyReportPropType> = ({
  weekReport,
  project,
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const descriptionColumn: ColumnsType<DescriptionType> = [
    {
      title: "Item No",
      dataIndex: "item_no",
      width: "10%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
    {
      title: "Activity description with location",
      dataIndex: "activity_desc",
      width: "40%",
      render: (record: any, data: any, index: any) => (
        <Input.TextArea rows={3} value={record} />
      ),
    },
    {
      title: "Block No",
      dataIndex: "block_no",
      width: "10%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
    {
      title: "Planned Qty in %",
      dataIndex: "planned_qty",
      render: (data: any, record: any, index: any) => (
        <Input value={format(toNumber(record.planned_qty))} />
      ),
    },
    {
      title: "Executed Qty in %",
      dataIndex: "executed_qty",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
  ];
  const problemColumn: ColumnsType<ProblemType> = [
    {
      title: "Problem ecountered",
      dataIndex: "problem_encountered",
      width: "10%",
      render: (record: any, data: any, index: any) => (
        <TextArea value={record} />
      ),
    },
    {
      title: "Solution given by contractor",
      dataIndex: "activity_desc",
      width: "40%",
      render: (record: any, data: any, index: any) => (
        <TextArea value={record} />
      ),
    },
    {
      title: "Solution given by client",
      dataIndex: "soln_by_client",
      width: "10%",
      render: (record: any, data: any, index: any) => (
        <TextArea value={record} />
      ),
    },
    {
      title: "No of days affected",
      dataIndex: "affected_days_no",
      render: (record: any, data: any, index: any) => (
        <TextArea value={record} />
      ),
    },
  ];
  const manPowerColumn: ColumnsType<ManPowerType> = [
    {
      title: "Trade name",
      dataIndex: "trade_name",
      width: "30%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
    {
      title: "Planned",
      dataIndex: "planned",
      width: "30%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
    {
      title: "Available",
      dataIndex: "available",
      width: "30%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
  ];
  const materialColumn: ColumnsType<MaterialType> = [
    {
      title: "Trade name",
      dataIndex: "trade_name",
      width: "30%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      width: "20%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
    {
      title: "Planned",
      dataIndex: "planned",
      width: "20%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
    {
      title: "Available",
      dataIndex: "available",
      width: "20%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
  ];
  const equipmentColumn: ColumnsType<EquipmentType> = [
    {
      title: "Trade name",
      dataIndex: "trade_name",
      width: "30%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
    {
      title: "Planned",
      dataIndex: "planned",
      width: "30%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
    {
      title: "Available",
      dataIndex: "available",
      width: "30%",
      render: (record: any, data: any, index: any) => <Input value={record} />,
    },
  ];

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        View
      </Button>
      <Modal
        title="View Weekly Report"
        className="fixed-modal"
        centered
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1300}
        footer={[]}
      >
        <Form
          form={form}
          initialValues={{
            reporting_date: moment(weekReport?.reporting_date),
            scheduling_date: moment(weekReport?.scheduling_date),
            resident_engineer: weekReport?.resident_engineer,
            site_inspector: weekReport?.site_inspector,
            block_no: weekReport?.block_no,
            reporting_week: moment()
              .week(parseInt(weekReport?.reporting_week.split(",")[1]))
              .year(parseInt(weekReport?.reporting_week.split(",")[0])),
            prepared_by_id: weekReport?.wr_prepared_by?.full_name,
            checked_by_id: weekReport?.wr_checked_by?.full_name,
            approved_by_id: weekReport?.wr_approved_by?.full_name,
            reported_by_id: weekReport?.wr_reported_by?.full_name,
            accepted_by_id: weekReport?.wr_accepted_by?.full_name,
            inspected_by_id: weekReport?.wr_inspected_by?.full_name,
            confirmed_by_id: weekReport?.wr_confirmed_by?.full_name,
          }}
          onFinish={(values) => console.log(values)}
          layout="vertical"
        >
          <div className="row">
            <div className="col-md-3">
              <Statistic
                title="Project"
                value={project.name}
                valueStyle={{ fontSize: 16, fontWeight: "bold" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Owner"
                value={project.client?.name}
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
                value={project.contractor?.name}
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
                name="reporting_week"
              >
                <DatePicker picker="week" allowClear={false} />
              </Form.Item>
            </div>

            <div className="col-md-4" style={{ paddingTop: 20 }}>
              <Form.Item
                label="Scheduling Date"
                rules={[
                  { required: true, message: "Please input Reporting Week" },
                ]}
                name="scheduling_date"
              >
                <DatePicker name="scheduling_date" allowClear={false} />
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
                <DatePicker name="reporting_date" allowClear={false} />
              </Form.Item>
            </div>

            <div className="col-md-4" style={{ paddingTop: 20 }}>
              <Form.Item
                label="Resident Engineer"
                rules={[
                  { required: true, message: "Please input Reporting date" },
                ]}
                name="resident_engineer"
              >
                <Input name="resident_engineer" />
              </Form.Item>
            </div>
            <div className="col-md-4" style={{ paddingTop: 20 }}>
              <Form.Item
                label="Site Inspector"
                rules={[
                  { required: true, message: "Please input Reporting date" },
                ]}
                name="site_inspector"
              >
                <Input name="site_inspector" />
              </Form.Item>
            </div>
            <div className="col-md-4" style={{ paddingTop: 20 }}>
              <Form.Item
                label="Block No"
                rules={[
                  { required: true, message: "Please input Reporting date" },
                ]}
                name="block_no"
              >
                <Input name="block_no" />
              </Form.Item>
            </div>

            <div className="col-md-12 pt-3">
              <Text>Description</Text>
            </div>

            <div className="col-md-12">
              <Table
                columns={descriptionColumn}
                dataSource={weekReport?.description
                  .split("---")
                  .map((form: any) => JSON.parse(form))}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>

            <div className="col-md-6 pt-2">
              <Table
                columns={manPowerColumn}
                dataSource={weekReport?.man_power
                  .split("---")
                  .map((form: any) => JSON.parse(form))}
                size="small"
                pagination={false}
                bordered={true}
                title={() => "Man Power"}
              />
            </div>

            <div className="col-md-6 pt-2">
              <Table
                columns={materialColumn}
                dataSource={weekReport?.material
                  .split("---")
                  .map((form: any) => JSON.parse(form))}
                size="small"
                pagination={false}
                bordered={true}
                title={() => "Material"}
              />
            </div>

            <div className="col-md-6 pt-2">
              <Table
                columns={equipmentColumn}
                dataSource={weekReport?.equipment
                  .split("---")
                  .map((form: any) => JSON.parse(form))}
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
                dataSource={weekReport?.problem
                  .split("---")
                  .map((form: any) => JSON.parse(form))}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>

            {/* <div className="col-md-12 pt-3">
              <Form.Item label="Comment">
                <TextArea
                  value={
                    weekReport?.comment === "undefined"
                      ? "-"
                      : weekReport?.comment
                  }
                  rows={4}
                />
              </Form.Item>
            </div> */}

            <div className="col-md-4 pt-2">
              <Form.Item label="Prepared By" name="prepared_by_id">
                <Input name="prepared_by_id" />
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item label="Checked By" name="checked_by_id">
                <Input name="checked_by_id" />
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item label="Reported By" name="reported_by_id">
                <Input name="reported_by_id" />
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item label="Accepted By" name="accepted_by_id">
                <Input name="accepted_by_id" />
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item label="Inspected By" name="inspected_by_id">
                <Input name="inspected_by_id" />
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item label="Confirmed By" name="confirmed_by_id">
                <Input name="confirmed_by_id" />
              </Form.Item>
            </div>

            <div className="col-md-4 pt-2">
              <Form.Item label="Approved By" name="approved_by_id">
                <Input name="approved_by_id" />
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewWeeklyReport);
