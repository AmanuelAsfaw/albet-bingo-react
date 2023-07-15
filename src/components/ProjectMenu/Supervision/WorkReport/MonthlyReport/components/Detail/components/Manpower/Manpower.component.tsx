import { Table, Image } from "antd";
import moment from "moment";
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
              <b>9.2 SITE MANPOWER</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table
            size="small"
            bordered={true}
            columns={[
              {
                title: "Date",
                key: "date",
                sortOrder: "ascend",
                sortDirections: [],
                sorter: (a, b) =>
                  moment(a.date).isBefore(moment(b.date)) ? -1 : 1,
                render: (value, render) =>
                  moment(render.date).format("DD/MM/YYYY"),
              },
              {
                title: "Project Manager",
                key: "pm",
                render: (value, render) => (render.project_manager ? "🗸" : "-"),
              },
              {
                title: "Office Engineer",
                key: "oe",
                render: (value, render) => (render.office_engineer ? "🗸" : "-"),
              },
              {
                title: "Site Engineer",
                key: "se",
                render: (value, render) => (render.site_engineer ? "🗸" : "-"),
              },
              {
                title: "General Forman",
                key: "gf",
                render: (value, render) => (render.general_forman ? "🗸" : "-"),
              },
            ]}
            dataSource={data?.monthly_manpowers}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
};

export default EvaluationComponent;
