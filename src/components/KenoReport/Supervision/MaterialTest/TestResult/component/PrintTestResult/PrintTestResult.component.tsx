import { Button, Image, Input, Table } from "antd";
import { isNil } from "lodash";
import { FC, useRef } from "react";
import { BASE_URI } from "../../../../../../../redux/ApiCall";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";
import SignatureComponent from "../../../../../../common/Signature/Signature.component";
import { PrintTestResultPropType } from "./PrintTestResult.util";
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import TextArea from "antd/lib/input/TextArea";

const PrintTestResultComponent: FC<PrintTestResultPropType> = ({
  project,
  test_result,
}) => {
  const componentRef = useRef(null);
  return (
    // <div>
    //   <ReactToPrint
    //     trigger={() => (
    //       <Button type="text" icon={<PrinterOutlined />}>
    //         Print
    //       </Button>
    //     )}
    //     content={() => componentRef.current}
    //   />
    //   <div style={{ alignItems: "center", display: "none" }}>
    //     <div ref={componentRef}>
    <div className="col-lg-12 visible-print ">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h1 style={{ flex: 2, width: "80px", textAlign: "center" }}>
          Evaluation of Test Results
        </h1>
        <div
          style={{
            borderLeft: "2px solid black",
            paddingLeft: "10px",
            flex: 1,
          }}
        >
          <PdfHeaderComponent type="consultant" />
          {/* <h6>Addis Ababa, Ethiopia</h6>
          <h6>Tel. +251 930 07 76 03, +251 118 96 58 04</h6>
          <h6>Fax. +251 116 620364</h6>
          <h6>www.k2nconsultants.com</h6>
          <h6>Email: info@k2nconsultants.com</h6>
          <h6
            style={{
              color: "red",
              fontWeight: "bold",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Avails Professional Excellence
          </h6> */}
        </div>
      </div>
      <div className="row mt-4 mx-2" style={{ outline: "2px solid" }}>
        <div className="col-lg-6">
          <div>
            <b>Project - </b>
            <u>{project?.payload.name ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Employer - </b>
            <u>{test_result?.employer.full_name ?? "Not Specified"}</u>
          </div>

          <div>
            <b>Contractor - </b>
            <u>{test_result?.contractor?.full_name ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Supervisor - </b>
            <u>{test_result?.supervisor?.full_name ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Site - </b>
            <u>{test_result?.site ?? "Not Specified"}</u>
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <div>
            <b>Contract No - </b>
            <u>{test_result?.contract_number ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Testing Lab - </b>
            <u>{test_result?.testing_lab ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Testing No. - </b>
            <u>{test_result?.testing_number ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Date of Testing - </b>
            <u>{test_result?.date_of_testing ?? "Not Specified"}</u>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12">
          <Table
            className="mx-1"
            bordered
            pagination={false}
            dataSource={test_result?.test_result_items}
            columns={[
              {
                title: "Material Tested",
                dataIndex: "material_tested",
              },
              {
                title: "Casting",
                render: (value, record, index) =>
                  !isNil(record.casting)
                    ? `${record.casting.concrete_grade} / ${record.casting.structure_type} / ${record.casting.source_of_concrete}`
                    : "-",
              },
              {
                title: "Specified Quality",
                dataIndex: "specified_quality",
              },
              {
                title: "Test Result",
                dataIndex: "test_result",
              },
            ]}
          />
        </div>
      </div>
      <h6
        className="font-italic mt-2"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Recommendation of Designer:
      </h6>
      <div className="row mx-2 mt-4" style={{ outline: "2px solid" }}>
        <div className="col-lg-12">
          <TextArea
            value={test_result?.recommendation}
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </div>
      </div>
      <h6
        className="font-italic mt-2"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Approved By (Consultant/Designer):{" "}
      </h6>
      <div className="row mt-4 mx-2" style={{ outline: "2px solid" }}>
        <div className="col-lg-6">
          <div>
            <b>Name - </b>
            <u>{test_result?.approved_by?.full_name ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Title - </b>
            <u>{test_result?.approved_by?.role ?? "Not Specified"}</u>
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <div>
            <b>Signature and Seal - </b>
            <SignatureComponent user={test_result?.approved_by} />
          </div>
        </div>
      </div>
      <h6
        className="font-italic mt-4"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        C.C
      </h6>
      <div className="row mt-4 mx-2 mb-2" style={{ outline: "2px solid" }}>
        <div className="col-lg-4">
          <div>
            <b>To Site Supervisor - </b>
            <u>{test_result?.supervisor.full_name ?? "Not Specified"}</u>
          </div>
        </div>
        <div className="col-lg-4">
          <div>
            <b>To Contractor - </b>
            <u>{test_result?.contractor.full_name ?? "Not Specified"}</u>
          </div>
        </div>
        <div className="col-lg-4">
          <div>
            <b>To Employer - </b>
            <u>{test_result?.employer.full_name ?? "Not Specified"}</u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintTestResultComponent;
