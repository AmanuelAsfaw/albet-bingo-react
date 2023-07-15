import { FileTextOutlined } from "@ant-design/icons";
import { Checkbox, Divider } from "antd";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal/Modal";
import Statistic from "antd/lib/statistic";
import Table from "antd/lib/table";
import { isNil } from "lodash";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { fetchAllInspection } from "../../../../../../redux/Inspection/Inspection.action";
import { Inspection } from "../../../../../../redux/Inspection/Inspection.type";
import { fetchAllInspectionForm } from "../../../../../../redux/InspectionForm/InspectionForm.action";
import { fetchAllUser } from "../../../../../../redux/User/User.action";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import CheckAllComponent from "./component/CheckAll/CheckAll.component";
import CheckboxGroupComponent from "./component/CheckboxGroup/CheckboxGroup.component";
import {
  parseTableData,
  RegisterInspectionPropType,
  sendData,
} from "./RegisterInspection.util";

const RegisterInspectionComponent: FC<RegisterInspectionPropType> = ({
  inspection,
  project,
  fetchAllInspection,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [inspectionData, setInspectionData] = useState<Inspection | null>({
    ...inspection,
  });
  const [checkAllValue, setCheckAllValue] = useState<string | null>(null);

  useEffect(() => {
    fetchAllInspectionForm();
    fetchAllUser();
  }, [fetchAllInspectionForm, fetchAllUser]);

  const resetForm = () => {
    setInspectionData({ ...inspection });
    form.resetFields();
  };

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const handleChecking = (id: any, value: string) => {
    let temp: any = { ...inspectionData };
    let index = temp.inspection_items.findIndex((ele: any) => ele.id === id);

    if (index !== -1) {
      temp.inspection_items[index] = { ...temp.inspection_items[index], value };
      setInspectionData(temp);
    }
  };

  const allItemsChecked = () => {
    return !inspectionData?.inspection_items?.some(
      (item) => !item.is_subtitle && isNil(item.value)
    );
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

  const Submit = (value: any) => {
    if (!allItemsChecked()) {
      OpenNotification(
        NotificationType.WARRING,
        "Please check all inspection items",
        ""
      );
    } else if (isNil(inspectionData?.is_fullfilled)) {
      OpenNotification(
        NotificationType.WARRING,
        "Please check inspection items are fullfilled or not",
        ""
      );
    } else if (isNil(inspectionData?.is_allowed)) {
      OpenNotification(
        NotificationType.WARRING,
        "Please check if the Contractor is hereby allowed/refused to proceed",
        ""
      );
    } else {
      let data: any = {
        ...inspectionData,
        remark: value.remark,
      };

      setLoading(true);
      sendData(data)
        .then(() => {
          resetForm();
          handleOk();
          setLoading(false);
          fetchAllInspection(project.payload?.id);
          OpenNotification(
            NotificationType.SUCCESS,
            Message.INSPECTION_FORM_SUCCESS,
            ""
          );
        })
        .catch((error) => {
          setLoading(false);
          error.response.data.errors.map((e: any) =>
            OpenNotification(
              NotificationType.ERROR,
              Message.INSPECTION_FORM_FAILED,
              e.message
            )
          );
        });
    }
  };

  const onChange = (key: string, value: any) => {
    let temp: any = { ...inspectionData, [key]: value };
    setInspectionData(temp);
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Register
      </Button>

      <Modal
        title="New Inspection"
        centered
        className="fixed-modal"
        visible={isModalVisible}
        onCancel={handleOk}
        width={1000}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Register Inspection
            </Button>
          </>,
        ]}
      >
        <Form form={form} onFinish={Submit} layout="vertical">
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
                  title="Block"
                  value={inspection.block}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
            </div>
          </div>
          <Divider />

          <div className="row">
            <div className="col-md-12">
              <Table
                dataSource={parseTableData(inspectionData)}
                columns={[
                  {
                    title: "Description",
                    dataIndex: "description",
                    render: (value: any, record: any, index: number) =>
                      !record.is_subtitle && record.type !== "all" ? (
                        record.description
                      ) : (
                        <b>{record.description}</b>
                      ),
                  },
                  {
                    title: MarkHeader(),
                    render: (value: any, record: any, index: number) =>
                      !record.is_subtitle && record.type !== "all" ? (
                        <CheckboxGroupComponent
                          inspection_item={record}
                          inspection={inspectionData}
                          checkAllValueAction={[
                            checkAllValue,
                            setCheckAllValue,
                          ]}
                          handleChange={handleChecking}
                        />
                      ) : record.type === "all" ? (
                        <CheckAllComponent
                          dataAction={[inspectionData, setInspectionData]}
                          valueAction={[checkAllValue, setCheckAllValue]}
                        />
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
                <Input.TextArea
                  disabled={false}
                  rows={4}
                  placeholder="Remarks ...."
                  onChange={(e) => onChange("remark", e.target.value)}
                ></Input.TextArea>
              </Form.Item>
            </div>
          </div>

          <div className="col-md-7 mt-4 pl-0">
            <p>
              The above items are{" "}
              <span
                onClick={() => onChange("is_fullfilled", true)}
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                FULLFILLED
              </span>{" "}
              <Checkbox
                onClick={() => onChange("is_fullfilled", true)}
                checked={
                  inspectionData?.is_fullfilled === null
                    ? false
                    : inspectionData?.is_fullfilled
                }
              />{" "}
              /{" "}
              <span
                onClick={() => onChange("is_fullfilled", false)}
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                NOT FULLFILLED
              </span>{" "}
              <Checkbox
                onClick={() => onChange("is_fullfilled", false)}
                checked={
                  inspectionData?.is_fullfilled === null
                    ? false
                    : !inspectionData?.is_fullfilled
                }
              />
              {" , "}
              the Contractor is hereby{" "}
              <span
                onClick={() => onChange("is_allowed", true)}
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                ALLOWED
              </span>{" "}
              <Checkbox
                onClick={() => onChange("is_allowed", true)}
                checked={
                  inspectionData?.is_allowed === null
                    ? false
                    : inspectionData?.is_allowed
                }
              />{" "}
              /{" "}
              <span
                onClick={() => onChange("is_allowed", false)}
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                REFUSED
              </span>{" "}
              <Checkbox
                onClick={() => onChange("is_allowed", false)}
                checked={
                  inspectionData?.is_allowed === null
                    ? false
                    : !inspectionData?.is_allowed
                }
              />{" "}
              to proceed to the next work. The take-off sheet of this activity
              shall immediately be signed upon completion
            </p>
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
  inspectionForms: state.inspection_form.fetchAll,
  inspectionFormItems: state.inspection_form.fetchOne,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllInspectionForm: () => dispatch(fetchAllInspectionForm()),
  fetchAllInspection: (project_id: any) =>
    dispatch(fetchAllInspection({ project_id })),
  fetchAllUser: (payload: any) => dispatch(fetchAllUser(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterInspectionComponent);
