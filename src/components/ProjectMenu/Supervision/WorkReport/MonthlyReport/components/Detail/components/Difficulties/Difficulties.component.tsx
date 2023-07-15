import { List, Table, Image } from "antd";
import { FC } from "react";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";
import pic from "../../../../../../../../../Images/k2n-logo.png";
const DifficultiesComponent: FC<MonthlyDetailItemsPropType> = ({ data }) => {
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
              <b>4. DIFFICULTY ENCOUNTERED DURING THE MONTH UNDER REVIEW</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table
            bordered={true}
            size="small"
            columns={[
              {
                title: "Major Difficulties by Type",
                key: "no",
                dataIndex: "description",
                render: (value: any) => value.toUpperCase(),
              },
              {
                title: "Yes/No",
                key: "value",
                dataIndex: "value",
              },
            ]}
            dataSource={data.difficulties?.table}
            pagination={false}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <List size="small" header="Remark">
            {data.difficulties?.remark ? (
              data.difficulties?.remark?.map((e: any, index: number) => (
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

export default DifficultiesComponent;
