import { Button, Modal, Table, Image } from "antd";
import { FC, useState } from "react";
import { ViewSHEPropType } from "../../util/she.util";
import { PlusOutlined } from "@ant-design/icons";
import { BASE_URI } from "../../../../../../../redux/ApiCall";
import moment from "moment";

const ViewSHEComponent: FC<ViewSHEPropType> = ({ she }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(she);
  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>View</Button>
      <Modal
        style={{ top: 10 }}
        title="View"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1300}
        footer={[
          <>
            <Button
              className="btn-outline"
              htmlType="reset"
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </Button>
          </>,
        ]}
      >
        <div className="row">
          <div className="col-md-12">
            <h6>Reports</h6>
            <Table
              size="small"
              pagination={false}
              bordered={true}
              columns={[
                {
                  title: "No",
                  width: "5%",
                  render: (record: any, data: any, index: any) => index + 1,
                },
                {
                  title: "Location/Working Area",
                  width: "20%",
                  dataIndex: "location",
                },
                {
                  title: "Corrective Measures were taken",
                  width: "30%",
                  dataIndex: "correction",
                },
                {
                  title: "Photos",
                  width: "15%",
                  dataIndex: "photos",
                  render: (record: any, data: any, index: any) =>
                    record === "" ? (
                      <p>No Image</p>
                    ) : (
                      <Image src={`${BASE_URI}/${record}`} />
                    ),
                },
                {
                  title: "Action By",
                  width: "10%",
                  dataIndex: "action_by",
                },
                {
                  title: "Status",
                  width: "10%",
                  dataIndex: "status",
                },
              ]}
              dataSource={she.sheReports}
            />
          </div>
          <div className="col-md-12 pt-4">
            <h6>Penalities Given</h6>
            <Table
              size="small"
              pagination={false}
              bordered={true}
              dataSource={she.shePenalties}
              columns={[
                {
                  title: "No",
                  width: "5%",
                  render: (record: any, data: any, index: any) => index + 1,
                },
                {
                  title: "Name",
                  dataIndex: "name",
                  width: "20%",
                },
                {
                  title: "Job Position",
                  width: "15%",
                  dataIndex: "job_position",
                },
                {
                  title: "Date",
                  dataIndex: "date",
                  render: (value: any) => moment(value).format("DD/MM/YYYY"),
                  width: "15%",
                },
                {
                  title: "Violation",
                  dataIndex: "violation",
                  width: "15%",
                },
                {
                  title: "Penalty",
                  dataIndex: "penality",
                  width: "15%",
                },
              ]}
            />
          </div>
          <div className="col-md-12 pt-4">
            <h6>Incidents</h6>
            <Table
              size="small"
              pagination={false}
              bordered={true}
              dataSource={she.sheIncidents}
              columns={[
                {
                  title: "No",
                  width: "5%",
                  render: (record: any, data: any, index: number) => index + 1,
                },
                {
                  title: "Name",
                  dataIndex: "name",
                  width: "15%",
                },
                {
                  title: "Job Position",
                  width: "15%",
                  dataIndex: "job_position",
                },
                {
                  title: "Age",
                  width: "10%",
                  dataIndex: "age",
                },
                {
                  title: "Date",
                  dataIndex: "date",
                  render: (value: any) => moment(value).format("DD/MM/YYYY"),
                  width: "15%",
                },
                {
                  title: "Type of injury",
                  dataIndex: "type_of_injury",
                  width: "15%",
                },
                {
                  title: "Reason for incident",
                  dataIndex: "reason_for_incident",
                  width: "15%",
                },
                {
                  title: "Treatment Given",
                  dataIndex: "treatment_given",
                  width: "20%",
                },
              ]}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewSHEComponent;
