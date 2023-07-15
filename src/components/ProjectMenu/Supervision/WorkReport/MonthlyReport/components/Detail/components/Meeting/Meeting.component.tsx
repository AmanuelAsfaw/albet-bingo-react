import { ConfigProvider, List, Image } from "antd";
import { FC } from "react";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";
import pic from "../../../../../../../../../Images/k2n-logo.png";
const MeetingComponent: FC<MonthlyDetailItemsPropType> = ({ data }) => {
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
              <b>9. MEETING CONDUCTED</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <ConfigProvider
            renderEmpty={() => (
              <div>There are no records for Meeting Conducted</div>
            )}
          >
            <List size="small" header="">
              {data?.meetings ? (
                data?.meetings?.map((e: any, index: number) => (
                  <List.Item key={index}>{e}</List.Item>
                ))
              ) : (
                <List.Item key={0}>-</List.Item>
              )}
            </List>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default MeetingComponent;
