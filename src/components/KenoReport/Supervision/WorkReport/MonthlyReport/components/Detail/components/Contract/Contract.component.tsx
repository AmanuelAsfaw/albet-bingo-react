import { Table } from "antd";
import { FC } from "react";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";

const ContractComponent: FC<MonthlyDetailItemsPropType> = ({ data }) => {
  return (
    <>
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>1. CONTRACT SUMMARY</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table
            bordered={true}
            columns={[
              {
                title: "No",
                render: (value, record, index) => index + 1,
                key: "no",
              },
              {
                title: "Contract Summary",
                dataIndex: "description",
                key: "description",
                render: (value: any) => value.toUpperCase(),
              },
              {
                title: "",
                dataIndex: "value",
                key: "value",
                render: (value, record, index) =>
                  record.bold ? <b>{value}</b> : value,
              },
            ]}
            dataSource={data?.contract_summary}
            pagination={false}
            size="small"
          />
        </div>
      </div>
    </>
  );
};

export default ContractComponent;
