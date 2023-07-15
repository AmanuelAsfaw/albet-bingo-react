import { ConfigProvider, List, Table, Image } from "antd";
import { FC } from "react";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";
import pic from "../../../../../../../../../Images/k2n-logo.png";
const InstructionComponent: FC<MonthlyDetailItemsPropType> = ({ data }) => {
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
              <b>5. INSTRUCTION GIVEN DURING THE MONTH UNDER REVIEW</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ConfigProvider
            renderEmpty={() => (
              <div>There are no records for Instruction Given</div>
            )}
          >
            <Table
              bordered={true}
              size="small"
              pagination={false}
              childrenColumnName="children"
              expandable={{ defaultExpandAllRows: true }}
              columns={[
                {
                  title: "Instruction",
                  key: "instruction",
                  dataIndex: "type",
                  render: (value: any) => value?.toUpperCase(),
                },
                {
                  title: "Date",
                  key: "date",
                  dataIndex: "date",
                },
                {
                  title: "Reference",
                  key: "index",
                  dataIndex: "index",
                },
              ]}
              dataSource={data?.instructions?.site_orders}
            />
          </ConfigProvider>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <List size="small" header="Remark">
            {data?.instructions?.remark ? (
              data?.instructions?.remark?.map((e: any, index: number) => (
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

export default InstructionComponent;
