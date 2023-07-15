import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Statistic from "antd/lib/statistic";
import React, { FC, useEffect, useState } from "react";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { RequestInspectionPropType, sendData } from "./RequestInspection.util";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { fetchAllInspectionForm } from "../../../../../../redux/InspectionForm/InspectionForm.action";
import Modal from "antd/lib/modal/Modal";
import Table from "antd/lib/table";
import { Select, Divider } from "antd";
import CheckboxGroupComponent from "./component/CheckboxGroup/CheckboxGroup.component";
import { fetchAllInspection } from "../../../../../../redux/Inspection/Inspection.action";
import { fetchAllUser } from "../../../../../../redux/User/User.action";
import { InspectionFormItem } from "../../../../../../redux/InspectionForm/InspectionForm.type";
import { ErrorHandler } from "../../../../../../utilities/utilities";

const RequestInspectionComponent: FC<RequestInspectionPropType> = ({
  fetchAllInspectionForm,
  project,
  inspectionForms,
  inspectionFormItems,
  fetchAllInspection,
  fetchAllUser,
  users,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedInspectionForm, setSelectedInspectionForm] =
    useState<any>(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inspection_items, setInspection_items] = useState<any>([]);
  const [fullfilled, setFullfilled] = useState<boolean | null>(null);

  useEffect(() => {
    fetchAllInspectionForm();
    fetchAllUser();
  }, [fetchAllInspectionForm, fetchAllUser]);

  useEffect(() => {
    if (selectedInspectionForm !== null) {
      setInspection_items(
        inspectionForms.payload
          .find((form) => form.id === selectedInspectionForm)
          ?.inspection_form_items?.map((item, index) => {
            return {
              key: index,
              id: item.id,
              description: item.description,
              is_subtitle: item.is_subtitle,
            };
          })
          .sort((a, b) => a.id - b.id)
      );
    } else {
      setInspection_items([]);
    }
  }, [selectedInspectionForm]);

  const resetForm = () => {
    form.resetFields();
    setSelectedInspectionForm(null);
    setInspection_items([]);
    setFullfilled(null);
  };

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);

    value.project_id = project.payload?.id;
    value.name = inspectionForms.payload.find(
      (form) => form.id === selectedInspectionForm
    )?.name;
    value.inspection_items = inspection_items.map((item: any) => {
      return {
        description: item.description,
        is_subtitle: item.is_subtitle,
      };
    });

    delete value.inspection_form_id;
    delete value.remark;

    sendData(value)
      .then(() => {
        setLoading(false);
        resetForm();
        handleOk();
        fetchAllInspection(project.payload?.id);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.INSPECTION_FORM_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.INSPECTION_FORM_FAILED,
            e.message
          )
        );
      });
  };

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      render: (value: any, record: any, index: number) =>
        !record.is_subtitle ? record.description : <b>{record.description}</b>,
    },
  ];

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Request Inspection
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
              Request Inspection
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
                  value={project.payload?.name}
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
                <Form.Item
                  label="Location"
                  name="location"
                  rules={[{ required: true, message: "Please input Location" }]}
                >
                  <Input bordered={true} placeholder="Location" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Block : Axis"
                  name="block"
                  rules={[{ required: true, message: "Please input Block" }]}
                >
                  <Input bordered={true} placeholder="Block" />
                </Form.Item>
              </div>
            </div>
          </div>

          <Divider />

          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Inspection Form"
                name="inspection_form_id"
                rules={[
                  {
                    required: true,
                    message: "Please select Inspection Form",
                  },
                ]}
              >
                <Select
                  value={selectedInspectionForm}
                  onChange={(e) => setSelectedInspectionForm(e)}
                  style={{ width: 400, alignSelf: "center" }}
                  placeholder="Select Inspection Form"
                  loading={inspectionForms.isPending}
                >
                  <Select.Option value={""} key={-1}>
                    -
                  </Select.Option>
                  {inspectionForms.payload.map((ele, idx) => (
                    <Select.Option value={ele.id} key={idx}>
                      {ele.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Table
                loading={inspectionForms.isPending}
                dataSource={inspection_items}
                columns={columns}
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
                ></Input.TextArea>
              </Form.Item>
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
)(RequestInspectionComponent);
