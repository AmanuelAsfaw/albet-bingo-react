import { FC } from "react";
import {
  MonthlyDetailItemsPropType,
  ParsePie,
  ParsePie2,
  ParsePie3,
  ParsePie4,
} from "../../../../util/MonthlyReport.util";
import { List, Image, Row, Col, Card, Divider } from "antd";
import { format } from "../../../../../../../../../utilities/utilities";
import consultant_image from "../../../../../../../../../Images/ovid-klingLogo.png";
import contractor_image from "../../../../../../../../../Images/ovid-klingLogo.png";
import client_image from "../../../../../../../../../Images/ovid-klingLogo.png";
import { BASE_URI } from "../../../../../../../../../redux/ApiCall";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { toNumber } from "lodash";

const Summary: FC<MonthlyDetailItemsPropType> = ({ data }) => {
  // const pie_data = [
  //   { name: "g", value: 20 },
  //   { name: "g", value: 80 },
  // ];
  const pie_data = ParsePie(data);
  const pie_data2 = ParsePie2(data);
  const pie_data3 = ParsePie3(data);
  const pie_data4 = ParsePie4(data);
  console.log({ data });
  const COLORS = ["#a38c50", "#c8bc9d"];

  return (
    <>
      <Row style={{ backgroundColor: "#a38c50" }}>
        <Col span={24}>
          <h2
            className="text-center p-4 mb-0 onepage-title"
            style={{ color: "#fff" }}
          >
            Summary Report - {data?.this_month_executed?.month} (Block A)
          </h2>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-4">
        <Col span={7}>
          <h6 className="text-print">
            <b>Project</b>
          </h6>
          <h6 className="text-print">{data?.project?.name}</h6>
          <h6 className="text-print">
            <b>Client</b>
          </h6>
          <h6 className="text-print">{data?.project?.client?.name}</h6>
          <h6 className="text-print">
            <b>Consultant</b>
          </h6>
          <h6 className="text-print">{data?.project?.consultant?.name}</h6>
          <h6 className="text-print">
            <b>Contractor</b>
          </h6>
          <h6 className="text-print">{data?.project?.contractor?.name}</h6>
          <Divider style={{ borderTop: "3px solid #a38c50" }} />
          <Row gutter={12}>
            <Col span={8}>
              <Image
                width={100}
                height={100}
                preview={false}
                src={client_image}
              />
            </Col>
            <Col span={8}>
              <Image
                width={100}
                height={100}
                preview={false}
                src={consultant_image}
              />
            </Col>
            <Col span={8}>
              <Image
                width={110}
                height={110}
                preview={false}
                src={contractor_image}
              />
            </Col>
          </Row>
          <Divider style={{ borderTop: "3px solid #a38c50" }} />
          <h5 className="text-center text-print mb-0">
            <b>Tests Performed</b>
          </h5>
          {data?.qc?.one_page?.map((e: any, index: any) => (
            <List.Item key={index} className="pb-0 text-small">
              • {e.material}
            </List.Item>
          ))}
        </Col>
        <Col span={8} style={{ borderLeft: "3px solid #a38c50" }}>
          <Row>
            <Col span={24}>
              <h5 className="text-center text-print">
                <b>Contract Summary</b>
              </h5>
              <h6 className="text-print">
                <b>Total Amount -</b>
                {format(data?.total_amount) + "ETB"}
              </h6>
              <h6 className="text-print">
                <b>Total Duration -</b>
                {data?.total_duration}
              </h6>
              <h6 className="text-print">
                <b>Time Elapse -</b>
                {data?.time_elapsed}
              </h6>
            </Col>
          </Row>
          <Divider style={{ borderTop: "3px solid #a38c50" }} />
          <Row style={{ marginTop: "-23px", marginLeft: "-20px" }}>
            <Col span={12}>
              <PieChart width={200} height={180}>
                <Pie
                  data={pie_data4}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={false}
                >
                  {pie_data4.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <h5 style={{ position: "absolute", top: "82px", left: "65px" }}>
                {format(data?.executed_work)} %
              </h5>
              <h6
                style={{
                  position: "absolute",
                  top: "110px",
                  left: "36px",
                  width: "130px",
                  textAlign: "center",
                }}
              >
                Executed Work This Month
              </h6>
            </Col>
            <Col span={12}>
              <PieChart width={200} height={180}>
                <Pie
                  data={pie_data3}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  textAnchor="middle"
                  isAnimationActive={false}
                >
                  {pie_data3.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <h5 style={{ position: "absolute", top: "82px", left: "65px" }}>
                {format(data?.cumulative_executed_work)} %
              </h5>
              <h6
                style={{
                  position: "absolute",
                  top: "110px",
                  left: "36px",
                  width: "130px",
                  textAlign: "center",
                }}
              >
                Executed Work Cumulative
              </h6>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "-30px",
              marginBottom: "-28px",
              marginLeft: "-20px",
            }}
          >
            <Col span={12}>
              <PieChart width={200} height={180}>
                <Pie
                  data={pie_data}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={false}
                >
                  {pie_data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <h5 style={{ position: "absolute", top: "82px", left: "65px" }}>
                {format(data?.planned_work)} %
              </h5>
              <h6
                style={{
                  position: "absolute",
                  top: "110px",
                  left: "36px",
                  width: "130px",
                  textAlign: "center",
                }}
              >
                Planned Work This Month
              </h6>
            </Col>
            <Col span={12}>
              <PieChart width={200} height={180}>
                <Pie
                  data={pie_data2}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={false}
                >
                  {pie_data2.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>

              <h5 style={{ position: "absolute", top: "82px", left: "65px" }}>
                {format(data?.cumulative_planned_work)} %
              </h5>
              <h6
                style={{
                  position: "absolute",
                  top: "110px",
                  left: "36px",
                  width: "130px",
                  textAlign: "center",
                }}
              >
                Planned Work Cumulative
              </h6>
            </Col>
          </Row>
          <Divider style={{ borderTop: "3px solid #a38c50" }} />
          <Row>
            <Col span={24}>
              <h5 className="text-center text-print mb-0">
                <b>Main Challenges</b>
              </h5>
              {data?.difficulties?.remark?.map((e: any, index: any) => (
                <List.Item key={index} className="text-small">
                  • {e}
                </List.Item>
              ))}
            </Col>
          </Row>
        </Col>
        <Col span={9} style={{ borderLeft: "3px solid #a38c50" }}>
          <Row>
            {data?.Uploads?.map((e: any, index: number) => {
              if (index === 0)
                return (
                  <Col span={12}>
                    <Image
                      className="border-0"
                      preview={false}
                      width={220}
                      height={240}
                      src={`${BASE_URI}/${e.fileName}`}
                    />
                  </Col>
                );
              else if (index === 1)
                return (
                  <Col span={12}>
                    <Image
                      className="border-0"
                      preview={false}
                      width={220}
                      height={240}
                      src={`${BASE_URI}/${e.fileName}`}
                    />
                  </Col>
                );
            })}
          </Row>
          <Row>
            {data?.Uploads?.map((e: any, index: number) => {
              if (index === 3)
                return (
                  <Col span={12}>
                    <Image
                      className="border-0"
                      preview={false}
                      width={220}
                      height={120}
                      src={`${BASE_URI}/${e.fileName}`}
                    />
                  </Col>
                );
              else if (index === 4)
                return (
                  <Col span={12}>
                    <Image
                      className="border-0"
                      preview={false}
                      width={220}
                      height={120}
                      src={`${BASE_URI}/${e.fileName}`}
                    />
                  </Col>
                );
            })}
          </Row>
          <Row>
            {data?.Uploads?.map((e: any, index: number) => {
              if (index === 5)
                return (
                  <Col span={12}>
                    <Image
                      className="border-0"
                      preview={false}
                      width={220}
                      height={120}
                      src={`${BASE_URI}/${e.fileName}`}
                    />
                  </Col>
                );
              else if (index === 6)
                return (
                  <Col span={12}>
                    <Image
                      className="border-0"
                      preview={false}
                      width={220}
                      height={120}
                      src={`${BASE_URI}/${e.fileName}`}
                    />
                  </Col>
                );
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Summary;
