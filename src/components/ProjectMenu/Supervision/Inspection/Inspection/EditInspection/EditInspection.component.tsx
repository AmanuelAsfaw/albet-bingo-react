import { Button, Divider, Form, Input, Modal, Statistic, Table } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { EditInspectionPropType, sendData } from "./EditInspection.util";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import CheckboxGroupComponent from "./components/CheckboxGroup/CheckboxGroup.component";
import { fetchAllInspection } from "../../../../../../redux/Inspection/Inspection.action";

const EditInspectionComponent: FC<EditInspectionPropType> = ({
  fetchAllInspection,
  project,
  inspection,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      block: value.block,
      location: value.location,
    };

    sendData(inspection.id, data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllInspection({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.INSPECTION_REQUEST_UPDATE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.INSPECTION_REQUEST_UPDATE_FAILED,
            e.message
          )
        );
      });
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
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        centered
        className="fixed-modal"
        width={1000}
        title="Edit Inspection"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form
          form={form}
          onFinish={Submit}
          layout="vertical"
          initialValues={inspection}
        >
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
                label="Inspection Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please select Inspection Form",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Table
                dataSource={inspection.inspection_items.sort(
                  (a, b) => a.id - b.id
                )}
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
                        <CheckboxGroupComponent key={Date.now()} />
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
                  disabled={true}
                  rows={4}
                  placeholder="Remarks ...."
                ></Input.TextArea>
              </Form.Item>
            </div>
          </div>

          <div className="col-md-7 mt-4 pl-0"></div>

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
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllInspection: (project_id: any) =>
    dispatch(fetchAllInspection({ project_id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditInspectionComponent);
