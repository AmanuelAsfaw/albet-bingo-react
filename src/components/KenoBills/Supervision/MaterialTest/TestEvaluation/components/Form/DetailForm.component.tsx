import { Divider, Statistic, Table, Tag } from "antd";
import { FC } from "react";
import { connect } from "react-redux";
import { calculate, DetailPropType } from "../../util/TestEvaluation.util";
import { format } from "../../../../../../../utilities/utilities";
import SignatureComponent from "../../../../../../common/Signature/Signature.component";
const DetailComponent: FC<DetailPropType> = ({ test_evaluation, project }) => {
  const {
    fck,
    expected_fc,
    expected_fck,
    standard_deviation,
    mean_value,
    fck_test,
    fck_status,
    fck_ultimate,
    conversion,
    fck_ultimate_status,
  } = calculate(test_evaluation);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <Statistic
            title="Project Name"
            value={project.payload?.name}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
        <div className="col-md-6">
          <Statistic
            title="Client"
            value={project.payload?.client?.name}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Statistic
            title="Consultant"
            value={project.payload?.consultant?.name}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
        <div className="col-md-6">
          <Statistic
            title="Contractor"
            value={project.payload?.contractor?.name}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
      </div>
      <Divider />
      <div className="row">
        <div className="col-md-12">
          <h5>Data from Test Result</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Statistic
            title="Structural Element"
            value={test_evaluation?.casting?.structure_type}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
        <div className="col-md-6">
          <Statistic
            title="Cement Type"
            value={test_evaluation?.casting?.cement_type}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Statistic
            title="Cast Date"
            value={test_evaluation?.casting?.date}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
        <div className="col-md-6">
          <Statistic
            title="Axis"
            value={test_evaluation?.casting?.axis}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-4">
          <Table
            bordered
            size={"small"}
            pagination={false}
            showHeader={false}
            dataSource={[
              {
                description: "Required Concrete Grade",
                value: test_evaluation?.casting.concrete_grade,
              },

              {
                description: "fck",
                value: format(fck),
              },
              {
                description: "Test Age (days)",
                value: format(test_evaluation?.test_age),
              },
              {
                description: "Expected fc @ test date",
                value: format(expected_fc),
              },
              {
                description: "Expected fck @ test date",
                value: format(expected_fck),
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
      <div className="row">
        <div className="col-md-12">
          <Table
            bordered
            pagination={false}
            size="small"
            dataSource={test_evaluation?.compression?.map((e: any) => ({
              compression: e,
            }))}
            columns={[
              {
                title: "Sample id",
                render: (value, record, index) => index + 1,
              },
              {
                title: "Test Age in Days",
                render: () => test_evaluation?.test_age,
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
      <div className="row">
        <div className="col-md-12 mt-4">
          <h5>Deviation of the samples</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table
            bordered
            size={"small"}
            pagination={false}
            showHeader={false}
            dataSource={[
              {
                description: "Standard Dev. s",
                value: format(standard_deviation),
              },
              {
                description: "Mean;  X",
                value: format(mean_value),
              },
              {
                description: "μ",
                value: format(test_evaluation?.mu),
              },
              {
                description: "fck @ Test Date",
                value: format(fck_test),
              },
              {
                description: "",
                value: fck_status ? (
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
      <div className="row">
        <div className="col-md-12 mt-2">
          <Table
            bordered
            size={"small"}
            pagination={false}
            showHeader={false}
            dataSource={[
              {
                description: "Conversion",
                value: format(conversion),
              },
              {
                description: "fck @ ultimate",
                value: format(fck_ultimate),
              },

              {
                description: "",
                value: fck_ultimate_status ? (
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
      <div className="row">
        <div className="col-md-12">
          <Statistic
            title="Comment"
            value={test_evaluation?.comment}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <Statistic
            title="Name"
            value={test_evaluation?.user?.full_name}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
        <div className="col-md-4">
          <h6 style={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.45)" }}>
            Signature
          </h6>{" "}
          <SignatureComponent user={test_evaluation?.user} />
        </div>
        <div className="col-md-4">
          <Statistic
            title="Date"
            value={test_evaluation?.date}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </div>
      </div>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
