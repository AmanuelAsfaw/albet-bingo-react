import { Table, Typography } from "antd";
import { FC, useEffect } from "react";
import {
  parseData,
  PrintMaterialRequestPrintPropType,
} from "./PrintMaterialRequest.util";
import PdfHeaderComponent from "../../../../../common/PdfHeader/PdfHeader.component";
import { zeroPad } from "../../../../../../utilities/utilities";

const { Title } = Typography;

const PrintMaterialRequest: FC<PrintMaterialRequestPrintPropType> = ({
  project,
  dataAction,
  visibilityAction,
}) => {
  const [material_request, setMaterialRequest] = dataAction;
  const [visibility, setVisibility] = visibilityAction;
  const { is_done, pe } = parseData(material_request);

  window.onafterprint = () => {
    setVisibility(false);
    setMaterialRequest(null);
  };

  useEffect(() => {
    if (material_request && visibility && is_done) window.print();
  }, [material_request, visibility, is_done]);

  // printMR visible-print
  return (
    <div className="col-lg-12 visible-print">
      <div className="row">
        <div className="col-sm-4">
          <PdfHeaderComponent type="consultant" />
        </div>
        <div className="col-sm-8">
          <div className="row justify-content-center">
            <h2>Acute Consultancy PLC</h2>
            <h4>
              CONSTRUCTION MATERIAL REQUEST FORM - የግንባታ ግብአት ጥያቄ ማቅረቢያ ፎርም
            </h4>
            <h6>{project?.name}</h6>
          </div>
        </div>
      </div>
      <div className="row mt-2 justify-content-between">
        <div className="col-sm-6 text-left">
          <div>
            <b>Contractor - </b>
            {project?.contractor?.name}
          </div>
        </div>
        <div className="col-sm-6 text-right">
          <div>
            <b>Date - </b>
            {material_request?.date}
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-between">
        <div className="col-sm-4 text-left">
          PARCEL No. {material_request?.parcel_no}
        </div>
        <div className="col-sm-4 text-center">
          BLOCK No. {material_request?.block_no}
        </div>
        <div className="col-sm-4 text-right">
          BLOCK TYPE {material_request?.block_type}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12">
          {/* <Title level={4} className="py-0 my-0" style={{ fontSize: "14px" }}>
            Personnel and equipment deployed for the day
          </Title> */}
          <Table
            className="pt-0 mt-0 sitediary-table"
            bordered
            pagination={false}
            dataSource={pe}
            columns={[
              {
                title: "No",
                width: "3%",
                render: (record: any, data: any, index: any) =>
                  zeroPad(index + 1),
              },
              {
                title: "Description of Material",
                width: "30%",
                render: (record: any, data: any, index: any) =>
                  data.description,
              },
              {
                title: "Unit Measurement",
                width: "8%",
                render: (record: any, data: any, index: any) =>
                  data.unit_measurement,
              },
              {
                title: "New Request In (አዲስ የተጠየቀ)",
                width: "10%",
                render: (record: any, data: any, index: any) =>
                  data.new_request,
              },
              {
                title: "Approved (የተፈቀደ)",
                width: "10%",
                render: (record: any, data: any, index: any) => data.approved,
              },
              {
                title:
                  "Total quantity received up to this request (እስክ አሁን የተወሰደ)",
                width: "10%",
                render: (record: any, data: any, index: any) =>
                  data.total_quantity_received,
              },
              {
                title: "Total quantity remaining on site (በሳይት የቀረ)",
                width: "10%",
                render: (record: any, data: any, index: any) =>
                  data.total_quantity_remaining_on_site,
              },
              {
                title: "Total quantity remaining (እስክ አሁን የተወሰደ የአሁኑን ጥያቄ ጨምሮ)",
                width: "10%",
                render: (record: any, data: any, index: any) =>
                  data.total_quantity_remaining,
              },
              {
                title: "Remark (ምርመራ)",
                width: "20%",
                render: (record: any, data: any, index: any) => data.remark,
              },
            ]}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 ">
          <h6 style={{ fontSize: "14px" }}>Requested by</h6>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-sm-4">
          <div className="mt-2">
            <b>Contractor</b>
          </div>
          <div>Name - &nbsp;{material_request?.contractor_name ?? "-"}</div>
          <div>Date -</div>
          <div>Signature - </div>
        </div>
        <div className="col-sm-4">
          <div className="mt-2">
            <b>Site Inspector - </b>
          </div>
          <div>Name - &nbsp;{material_request?.site_inspector_name ?? "-"}</div>
          <div>Date - </div>
          <div>Signature - </div>
        </div>
        <div className="col-sm-4">
          <div className="mt-2">
            <b>Resident Engineer -</b>
          </div>
          <div>
            Name - &nbsp;{material_request?.resident_engineer_name ?? "-"}
          </div>
          <div>Date - </div>
          <div>Signature - </div>
        </div>
        <div className="col-sm-4">
          <div className="mt-2">
            <b>Project Coordinator - </b>
          </div>
          <div>
            Name - &nbsp;{material_request?.project_coordinator_name ?? "-"}
          </div>
          <div>Date - </div>
          <div>Signature - </div>
        </div>
        <div className="col-sm-4">
          <div className="mt-2">
            <b>SHDE Construction process head - </b>
          </div>
          <div>Name - &nbsp;{material_request?.shde_head_name ?? "-"}</div>
          <div>Date - </div>
          <div>Signature - </div>
        </div>
      </div>
    </div>
  );
};
export default PrintMaterialRequest;
