import { List, Image } from "antd";
import { FC } from "react";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";
import pic from "../../../../../../../../../Images/k2n-logo.png";
const ConstructionStatusComponent: FC<MonthlyDetailItemsPropType> = ({
  data,
}) => {
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
              <b>2. CURRENT STATE OF CONSTRUCTION</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <List size="small" header="A. Works Planned & Completed">
            {data.construction_status?.completed ? (
              data.construction_status?.completed?.map(
                (e: any, index: number) => (
                  <List.Item key={index}>{e}</List.Item>
                )
              )
            ) : (
              <List.Item key={"0"}>-</List.Item>
            )}
          </List>
        </div>
      </div>
      <div className="row  mt-2">
        <div className="col-md-12 ">
          <List size="small" header="B. Works Under Progress">
            {data.construction_status?.under_progress ? (
              data.construction_status?.under_progress?.map(
                (e: any, index: number) => (
                  <List.Item key={index}>{e}</List.Item>
                )
              )
            ) : (
              <List.Item key={"0"}>-</List.Item>
            )}
          </List>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <List size="small" header="C. Works Planned But Not Started">
            {data.construction_status?.not_started ? (
              data.construction_status?.not_started?.map(
                (e: any, index: number) => (
                  <List.Item key={index}>{e}</List.Item>
                )
              )
            ) : (
              <List.Item key={"0"}>-</List.Item>
            )}
          </List>
        </div>
      </div>
    </>
  );
};

export default ConstructionStatusComponent;
