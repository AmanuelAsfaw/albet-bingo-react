import { ConfigProvider, List, Table, Image } from "antd";
import { FC } from "react";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";
import pic from "../../../../../../../../../Images/k2n-logo.png";
const QcComponent: FC<MonthlyDetailItemsPropType> = ({ data }) => {
  return (
    <>
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <div id="pageFooter">Page </div>
          <div className="monthly-header">
            <Image src={pic} width="100px" className="mb-2" />
          </div>
          <h6>
            <u>
              <b>3. QUALITY CONTROL TEST CONDUCTED DURING THE MONTH</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ConfigProvider
            renderEmpty={() => (
              <div>There are no records for Material test</div>
            )}
          >
            <Table
              bordered={true}
              size="small"
              pagination={false}
              columns={[
                {
                  title: "Type of Material",
                  key: "type",
                  render: (value: any, record: any) =>
                    record.material.toUpperCase(),
                },
                {
                  title: "Test Expected",
                  key: "type",
                  dataIndex: "test_expected",
                },
                {
                  title: "Date of Tested",
                  key: "type",
                  children: [
                    {
                      title: "Ordered",
                      key: "ordered",
                      render: (value, record) => record.order,
                    },
                    {
                      title: "Submitted",
                      key: "submitted",
                      render: (value, record) => record.submitted,
                    },
                  ],
                },
                {
                  title: "Result",
                  key: "result",
                  children: [
                    {
                      title: "Accepted",
                      key: "accepted",
                      render: (value, record) =>
                        !record.material || record.is_rebar
                          ? record.accepted
                            ? "🗸"
                            : ""
                          : "",
                    },
                    {
                      title: "Rejected",
                      key: "rejected",
                      render: (value, record) =>
                        !record.material || record.is_rebar
                          ? record.accepted
                            ? ""
                            : "🗸"
                          : "",
                    },
                  ],
                },
              ]}
              dataSource={data?.qc?.material}
            />
          </ConfigProvider>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-4 mb-2">
          <h6>For Concrete test</h6>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <ConfigProvider
            renderEmpty={() => (
              <div>There are no records for Concrete test</div>
            )}
          >
            <Table
              bordered={true}
              size="small"
              pagination={false}
              columns={[
                {
                  title: "Cast Date",
                  key: "date",
                  render: (value, record) => record.cast_date,
                },
                {
                  title: "Submitted Date",
                  key: "date",
                  render: (value, record) => record.submitted_date,
                },
                {
                  title: "Test Type",
                  key: "type",
                  render: (value, record) => "Cube",
                },
                {
                  title: "Source of Concrete",
                  key: "source",
                  render: (value, record) => record.source_of_concrete,
                },

                {
                  title: "Location",
                  key: "location",
                  render: (value, record) => record.location,
                },
                {
                  title: "Result Day",
                  key: "type",
                  render: (value, record) => record.result_date,
                },

                {
                  title: "Test Result",
                  key: "type",
                  render: (value, record) => record.test_result,
                },
                {
                  title: "Remark",
                  key: "remark",
                  render: (value, record) => record.remark,
                },
              ]}
              dataSource={data?.qc?.concrete}
            />
          </ConfigProvider>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <List size="small" header="Remark">
            {data?.qc?.remark ? (
              data?.qc?.remark?.map((e: any, index: number) => (
                <List.Item key={index}>{e}</List.Item>
              ))
            ) : (
              <List.Item key={0}>-</List.Item>
            )}
          </List>
        </div>
      </div>
    </>
  );
};

export default QcComponent;
