import { Table, Tag } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FC, useEffect } from "react";
import { format } from "../../../../../../../utilities/utilities";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";
import SignatureComponent from "../../../../../../common/Signature/Signature.component";
import { PrintPropType, calculate } from "../../util/TestEvaluation.util";
import DetailFormComponent from "../Form/DetailForm.component";

const PrintRequestComponent: FC<PrintPropType> = ({
  selected,
  is_visible,
  setVisibility,
  setSelected,
  project,
}) => {
  window.onafterprint = () => {
    setVisibility(false);
    setSelected(null);
  };

  useEffect(() => {
    if (selected && is_visible) window.print();
  }, [selected, is_visible]);

  return (
    // <div className="col-lg-12 visible-print">
    //   <PdfHeaderComponent type="consultant" />
    //   <div style={{ width: "600px" }}>
    //     <DetailFormComponent test_evaluation={selected} />
    //   </div>
    // </div>

    <div className="col-lg-12 visible-print">
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
          <h6>Email: info@acuteconsultants.com</h6>
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
            <b>Client - </b>
            <u>{project?.payload.client?.name ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Contractor - </b>
            <u>{project.payload?.contractor?.name ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Consultant - </b>
            <u>{project.payload?.consultant?.name ?? "Not Specified"}</u>
          </div>
        </div>
      </div>
      <h6
        className="font-italic mt-2"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Data from Test Result:
      </h6>
      <div className="row mt-4 mx-2" style={{ outline: "2px solid" }}>
        <div className="col-lg-6">
          <div>
            <b>Structural Element - </b>
            <u>{selected?.casting?.structure_type ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Cement Type - </b>
            <u>{selected?.casting?.cement_type ?? "Not Specified"}</u>
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <div>
            <b>Cast Date - </b>
            <u>{selected?.casting?.date ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Axis - </b>
            <u>{selected?.casting?.axis ?? "Not Specified"}</u>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-4">
          <Table
            bordered
            size={"small"}
            pagination={false}
            showHeader={false}
            dataSource={[
              {
                description: "Required Concrete Grade",
                value: selected?.casting.concrete_grade,
              },

              {
                description: "fck",
                value: format(selected ? calculate(selected).fck : null),
              },
              {
                description: "Test Age (days)",
                value: format(selected?.test_age),
              },
              {
                description: "Expected fc @ test date",
                value: format(
                  selected ? calculate(selected).expected_fc : null
                ),
              },
              {
                description: "Expected fck @ test date",
                value: format(
                  selected ? calculate(selected).expected_fck : null
                ),
              },
            ]}
            columns={[
              { title: "", dataIndex: "description", key: "description" },
              {
                title: "",
                dataIndex: "value",
                key: "value",
              },
            ]}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-6">
          <Table
            bordered
            pagination={false}
            size="small"
            dataSource={selected?.compression?.map((e: any) => ({
              compression: e,
            }))}
            columns={[
              {
                title: "Sample id",
                render: (value, record, index) => index + 1,
              },
              {
                title: "Test Age in Days",
                render: () => selected?.test_age,
              },
              {
                title: "Compressive Strength",
                dataIndex: "compression",
                render: (value) => format(value),
              },
            ]}
          />
        </div>
      </div>
      <h6
        className="font-italic mt-2"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Deviation of the Samples:
      </h6>
      <div className="row mt-2">
        <div className="col-md-6">
          <Table
            bordered
            size={"small"}
            pagination={false}
            showHeader={false}
            dataSource={[
              {
                description: "Standard Dev. s",
                value: format(
                  selected ? calculate(selected).standard_deviation : null
                ),
              },
              {
                description: "Mean;  X",
                value: format(selected ? calculate(selected).mean_value : null),
              },
              {
                description: "μ",
                value: format(selected?.mu),
              },
              {
                description: "fck @ Test Date",
                value: format(selected ? calculate(selected).fck_test : null),
              },
              {
                description: "",
                value: selected ? (
                  calculate(selected).fck_status
                ) : null ? (
                  <Tag color={"green"}>OK</Tag>
                ) : (
                  <Tag color={"red"}>NOT OK</Tag>
                ),
              },
            ]}
            columns={[
              { title: "", dataIndex: "description", key: "description" },
              {
                title: "",
                dataIndex: "value",
                key: "value",
              },
            ]}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-6 mt-2">
          <Table
            bordered
            size={"small"}
            pagination={false}
            showHeader={false}
            dataSource={[
              {
                description: "Conversion",
                value: format(selected ? calculate(selected).conversion : null),
              },
              {
                description: "fck @ ultimate",
                value: format(
                  selected ? calculate(selected).fck_ultimate : null
                ),
              },

              {
                description: "",
                value: selected ? (
                  calculate(selected).fck_ultimate_status
                ) : null ? (
                  <Tag color={"green"}>OK</Tag>
                ) : (
                  <Tag color={"red"}>NOT OK</Tag>
                ),
              },
            ]}
            columns={[
              { title: "", dataIndex: "description", key: "description" },
              {
                title: "",
                dataIndex: "value",
                key: "value",
              },
            ]}
          />
        </div>
      </div>
      <h6
        className="font-italic mt-2"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        Comment:
      </h6>
      <div className="row ml-1 mr-3 mt-4">
        <div className="col-lg-6" style={{ outline: "2px solid" }}>
          <TextArea
            value={selected?.comment}
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </div>
      </div>
      <div className="row mt-4 ml-1 mr-3 mb-2">
        <div className="col-lg-6" style={{ outline: "2px solid" }}>
          <div>
            <b>Name - </b>
            <u>{selected?.user?.full_name ?? "Not Specified"}</u>
          </div>
          <div>
            <b>Signature</b>
            <SignatureComponent user={selected?.user} />
          </div>
          <div>
            <b>Date - </b>
            <u>{selected?.date ?? "Not Specified"}</u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintRequestComponent;
