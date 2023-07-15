import { List, Image } from "antd";
import { FC } from "react";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";
import pic from "../../../../../../../../../Images/k2n-logo.png";
const GeneralRemarkComponent: FC<MonthlyDetailItemsPropType> = ({ data }) => {
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
              <b>
                9.3 GENERAL REMARKS, ACTIONS TO BE TAKEN, ASSESSMENT PAST MONTH
                REPORT
              </b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <List size="small" header="Remark">
            {data.general_remark ? (
              data.general_remark?.map((e: any, index: number) => (
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

export default GeneralRemarkComponent;
