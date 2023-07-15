import Button from "antd/lib/button";
import React, { FC, useEffect, useState } from "react";
import { ViewInspectionPropType } from "./ViewInspection.util";
import { connect } from "react-redux";
import {
  fetchOneInspectionForm,
  fetchOneInspectionFormReset,
} from "../../../../../../redux/InspectionForm/InspectionForm.action";
import Modal from "antd/lib/modal/Modal";
import { Input, Table, Image, Statistic, Divider, Form, Checkbox } from "antd";
import CheckboxComponent from "./component/CheckboxGroup.component";
import { EyeOutlined } from "@ant-design/icons";
import { BASE_URI } from "../../../../../../redux/ApiCall";
import moment from "moment";
import SignatureComponent from "../../../../../common/Signature/Signature.component";
import CheckboxGroupComponent from "./component/CheckboxGroup.component";
import { isNil } from "lodash";

const ViewInspectionComponent: FC<ViewInspectionPropType> = ({
  inspection,
  project,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOnClick = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const MarkHeader = () => (
    <div>
      <p className="">Make a (√)</p>
      <div className="row" style={{ width: 250 }}>
        <h6 style={{ marginLeft: "24px" }}>C</h6>
        <h6 style={{ marginLeft: "32px" }}>NC</h6>
        <h6 style={{ marginLeft: "28px" }}>NA</h6>
      </div>
    </div>
  );

  return (
    <>
      <Button type="text" onClick={handleOnClick}>
        View
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Inspection Items"
        style={{ top: 10 }}
        visible={isModalVisible}
        onCancel={handleOk}
        width={1000}
        footer={[]}
      >
        <Form layout="vertical">
          <div>
            <h5>Checklist for Work Permit</h5>
            <div className="row mt-4">
              <div className="col-md-4">
                <Statistic
                  title="Project"
                  value={inspection.name}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
              <div className="col-md-4">
                <Statistic
                  title="Employer"
                  value={
                    project.payload?.client
                      ? project.payload?.client?.name
                      : "-"
                  }
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
              <div className="col-md-4">
                <Statistic
                  title="Contractor"
                  value={
                    project.payload?.contractor
                      ? project.payload?.contractor?.name
                      : "-"
                  }
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <Statistic
                  title="Consultant"
                  value={
                    project.payload?.consultant
                      ? project.payload?.consultant?.name
                      : "-"
                  }
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
              <div className="col-md-4">
                <Statistic
                  title="Location"
                  value={inspection.location}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>

              <div className="col-md-4">
                <Statistic
                  title="Block : Axis"
                  value={inspection.block}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
            </div>
          </div>
          <Divider />

          <div className="row">
            <div className="col-md-4">
              <h6>{inspection.name}</h6>
            </div>
            <div className="col-md-12">
              <Table
                dataSource={inspection?.inspection_items
                  .map((item, key) => {
                    return {
                      ...item,
                      key,
                    };
                  })
                  .sort((a, b) => a.id - b.id)}
                columns={[
                  {
                    title: "Description",
                    dataIndex: "description",
                    render: (value: any, record: any, index: number) =>
                      !record.is_subtitle ? (
                        record.description
                      ) : (
                        <b>{record.description}</b>
                      ),
                  },
                  {
                    title: <MarkHeader />,
                    render: (value: any, record: any, index: number) =>
                      !record.is_subtitle ? (
                        <CheckboxGroupComponent value={record.value} />
                      ) : null,
                  },
                ]}
                pagination={false}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 mt-4">
              <Form.Item label="Any other Remarks" name="remark">
                <Input.TextArea readOnly defaultValue={inspection.remark} />
              </Form.Item>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-7">
              <p>
                The above items are <span>FULLFILLED</span>{" "}
                <Checkbox
                  checked={
                    !isNil(inspection?.is_fullfilled)
                      ? inspection?.is_fullfilled
                      : false
                  }
                />{" "}
                / <span>NOT FULLFILLED</span>{" "}
                <Checkbox
                  checked={
                    !isNil(inspection?.is_fullfilled)
                      ? !inspection?.is_fullfilled
                      : false
                  }
                />
                {" , "}
                the Contractor is hereby <span>ALLOWED</span>{" "}
                <Checkbox
                  checked={
                    !isNil(inspection?.is_allowed)
                      ? inspection?.is_allowed
                      : false
                  }
                />{" "}
                / <span>REFUSED</span>{" "}
                <Checkbox
                  checked={
                    !isNil(inspection?.is_allowed)
                      ? !inspection?.is_allowed
                      : false
                  }
                />{" "}
                to proceed to the next work. The take-off sheet of this activity
                shall immediately be signed upon completion
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <p>
                <b>Name</b> {inspection?.consultant?.full_name}
              </p>
              <b>Signature</b>
              <SignatureComponent user={inspection?.consultant} />
              <p>
                <b>Date</b> {moment(inspection.updatedAt).format("DD/MM/YYYY")}
              </p>
            </div>

            <div className="col-md-6">
              <p>
                <b>Name</b> {inspection.contractor.full_name}
              </p>
              <b>Signature</b>{" "}
              <SignatureComponent user={inspection.contractor} />
              <p>
                <b>Date</b> {moment(inspection.updatedAt).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <h6 className="col-4">C = conform</h6>
            <h6 className="col-4">NC = not conform</h6>
            <h6 className="col-4">NA = not applicable</h6>
          </div>
        </Form>
      </Modal>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewInspectionComponent);
