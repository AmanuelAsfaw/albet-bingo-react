import { ConfigProvider, Table, Image } from "antd";
import { FC } from "react";
import { format } from "../../../../../../../../../utilities/utilities";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";
import pic from "../../../../../../../../../Images/k2n-logo.png";
const VariationComponent: FC<MonthlyDetailItemsPropType> = ({ data }) => {
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
              <b>7. VARIATION GIVEN OR APPROVED </b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ConfigProvider
            renderEmpty={() => (
              <div>There are no records for Variation given</div>
            )}
          >
            <Table
              bordered={true}
              size="small"
              columns={[
                {
                  title: "Description",
                  key: "description",
                  dataIndex: "description",
                  render: (value: any) => value.toUpperCase(),
                },
                {
                  title: "Amount",
                  key: "amount",
                  dataIndex: "amount",
                  render: (value) => format(value),
                },
              ]}
              dataSource={data?.variations}
              pagination={false}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default VariationComponent;
