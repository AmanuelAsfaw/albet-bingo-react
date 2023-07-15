import { List, Table, Image } from "antd";
import { FC } from "react";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";
import pic from "../../../../../../../../../Images/k2n-logo.png";
const EvaluationComponent: FC<MonthlyDetailItemsPropType> = ({ data }) => {
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
              <b>6. EVALUATION</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table
            bordered={true}
            size="small"
            showHeader={false}
            columns={[
              {
                title: "description",
                key: "description",
                dataIndex: "description",
                render: (value: any) => value.toUpperCase(),
              },
              {
                title: "Status",
                key: "status",
                dataIndex: "status",
              },
            ]}
            dataSource={data.evaluations}
            pagination={false}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <List size="small" header="Remark">
            {data?.evaluation_remark ? (
              data?.evaluation_remark?.map((e: any, index: number) => (
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

export default EvaluationComponent;
