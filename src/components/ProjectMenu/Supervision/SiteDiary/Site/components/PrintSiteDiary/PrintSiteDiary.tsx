import { Table, Typography, List } from "antd";
import { FC, useEffect } from "react";
import { parseData, PrintSiteDiaryPrintPropType } from "./PrintSiteDiary.util";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";
import { formatNumber } from "../../../../../../../utilities/utilities";

const { Title } = Typography;

const PrintSiteDiaryPrint: FC<PrintSiteDiaryPrintPropType> = ({
  project,
  dataAction,
  visibilityAction,
}) => {
  const [site_diary, setSiteDiary] = dataAction;
  const [visibility, setVisibility] = visibilityAction;
  const {
    activity,
    constructionChangeDirective,
    delay,
    givenInstruction,
    requestToContractors,
    is_done,
    meetingAndSignificance,
    nonWorking,
    pe,
  } = parseData(site_diary);

  window.onafterprint = () => {
    setVisibility(false);
    setSiteDiary(null);
  };

  useEffect(() => {
    if (site_diary && visibility && is_done) window.print();
  }, [site_diary, visibility, is_done]);

  // printMR visible-print
  return (
    <div className="col-lg-12 visible-print">
      <PdfHeaderComponent type="consultant" />
      <div className="mb-2 text-left">
        <h6>Site Diary</h6>
      </div>
      <div className="row mt-2">
        <div className="col-sm-6">
          <div>
            <b>Date - </b>
            {site_diary?.date}
          </div>
          <div>
            <b>Client - </b>
            {project?.client?.name}
          </div>
          <div>
            <b>Project - </b>
            {project?.name}
          </div>
        </div>
        <div className="col-sm-6">
          <div>
            <b>Weather Condition - </b>
            {site_diary?.weather_condition}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Title level={4} className="py-0 my-0" style={{ fontSize: "14px" }}>
            Personnel and equipment deployed for the day
          </Title>
          <Table
            className="pt-0 mt-0 sitediary-table"
            bordered
            pagination={false}
            dataSource={pe}
            columns={[
              {
                title: "Postion of Person",
                width: "20%",
                render: (record: any, data: any, index: any) => data.position,
              },
              {
                title: "NO",
                render: (record: any, data: any, index: any) => data.no,
              },
              {
                title: "Description of Equipment",
                width: "40%",
                render: (record: any, data: any, index: any) =>
                  data.description,
              },
              {
                title: "No",
                render: (record: any, data: any, index: any) => data.noo,
              },
              {
                title: "Material",
                render: (record: any, data: any, index: any) => data.material,
              },
              {
                title: "Quantity",
                render: (record: any, data: any, index: any) => data.quantity,
              },
              {
                title: "Unit",
                render: (record: any, data: any, index: any) => data.unit,
              },
            ]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Title level={4} className="py-0 my-0" style={{ fontSize: "14px" }}>
            Description of works performed during the day
          </Title>
          <Table
            className="sitediary-table"
            pagination={false}
            bordered
            dataSource={activity}
            columns={[
              {
                title: "Activity Description/Project Status",
                dataIndex: "activity",
                width: "40%",
              },
              {
                title: "Qty",
                dataIndex: "quantity",
                width: "10%",
                render: (record, data, index) => formatNumber(record),
              },
              {
                title: "Unit",
                dataIndex: "unit",
                width: "10%",
              },
              {
                title: "Location",
                dataIndex: "location",
              },
            ]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 ">
          <List
            header={
              <h6 style={{ fontSize: "14px" }}>
                Resident Engineer/Consultant Request to Contractors
              </h6>
            }
            bordered
            dataSource={requestToContractors}
            renderItem={(item: any, index: any) => {
              console.log(item);
              return (
                <List.Item style={{ fontSize: "13px" }}>
                  <Typography.Text mark>- </Typography.Text> {item.value}
                </List.Item>
              );
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <List
            header={
              <h6 style={{ fontSize: "14px" }}>
                Work done during non-working hrs/days
              </h6>
            }
            bordered
            dataSource={nonWorking}
            renderItem={(item: any, index: any) => {
              console.log(item);
              return (
                <List.Item style={{ fontSize: "13px" }}>
                  <Typography.Text mark>- </Typography.Text> {item.value}
                </List.Item>
              );
            }}
          />
        </div>
        <div className="col-md-6">
          <List
            // className="page-break-after"
            header={
              <h6 style={{ fontSize: "14px" }}>
                Stoppage, delays, services connected and disconnected
              </h6>
            }
            bordered
            dataSource={delay}
            renderItem={(item: any, index: any) => {
              console.log(item);
              return (
                <List.Item style={{ fontSize: "13px" }}>
                  <Typography.Text mark>- </Typography.Text> {item.value}
                </List.Item>
              );
            }}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-6">
          <List
            header={
              <h6 style={{ fontSize: "14px" }}>
                Meeting and Significant decision
              </h6>
            }
            bordered
            dataSource={meetingAndSignificance}
            renderItem={(item: any, index: any) => {
              console.log(item);
              return (
                <List.Item style={{ fontSize: "13px" }}>
                  <Typography.Text mark>- </Typography.Text> {item.value}
                </List.Item>
              );
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 ">
          <List
            header={
              <h6 style={{ fontSize: "14px" }}>
                Construction Change Directives received
              </h6>
            }
            bordered
            dataSource={constructionChangeDirective}
            renderItem={(item: any, index: any) => {
              console.log(item);
              return (
                <List.Item style={{ fontSize: "13px" }}>
                  <Typography.Text mark>- </Typography.Text> {item.value}
                </List.Item>
              );
            }}
          />
        </div>
        <div className="col-md-6 ">
          <List
            header={
              <h6 style={{ fontSize: "14px" }}>Order and Instruction Given</h6>
            }
            bordered
            dataSource={givenInstruction}
            renderItem={(item: any, index: any) => {
              console.log(item);
              return (
                <List.Item style={{ fontSize: "13px" }}>
                  <Typography.Text mark>- </Typography.Text> {item.value}
                </List.Item>
              );
            }}
          />
        </div>
        {/* <div className="col-md-12 ">
          <h6 style={{ fontSize: "14px" }}>Comments</h6>
          <p>{site_diary?.comment}</p>
        </div> */}
        <div className="col-md-12 ">
          <h6 style={{ fontSize: "14px" }}>Remark</h6>
          <p>{site_diary?.remark}</p>
        </div>
      </div>
      <div className="row mt-4 mb-0">
        <div className="col-sm-6">
          <div>
            <b>Prepared By (Contractor)</b>
            {site_diary?.sd_prepared_by?.full_name ?? "-"}
          </div>
          <div className="mt-1">
            <b>Approved by (Consultant)</b>
            {site_diary?.sd_approved_by?.full_name ?? "-"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrintSiteDiaryPrint;
