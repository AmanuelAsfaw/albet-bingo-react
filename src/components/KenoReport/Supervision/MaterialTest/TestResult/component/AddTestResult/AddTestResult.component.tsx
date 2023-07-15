import React, { FC, useEffect, useState } from "react";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import Modal from "antd/lib/modal/Modal";
import Statistic from "antd/lib/statistic";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { AddTestResultPropType } from "./AddTestResult.util";
import { fetchAllTestResult } from "../../../../../../../redux/TestResult/TestResult.action";
import { sendData } from "./AddTestResult.util";
import {
  Select,
  DatePicker,
  AutoComplete,
  Divider,
  Table,
  Checkbox,
  Form,
  Button,
  Input,
} from "antd";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";
import moment from "moment";
import { getUserData } from "../../../../../../../utilities/utilities";
import { AttachmentObject } from "./component/Attachment/Attachment.util";
import AttachmentComponent from "./component/Attachment/Attachment.component";
import { MaterialTestedObject } from "./component/MaterialTested/MaterialTested.util";
import MaterialTestedComponent from "./component/MaterialTested/MaterialTested.component";
import { toNumber } from "lodash";

const AddTestComponent: FC<AddTestResultPropType> = ({
  project,
  fetchAllTestResult,
  users,
  fetchAllUser,
  casting,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allConcrete, setAllConcrete] = useState(false);

  const [attachments, setAttachments] = useState<
    {
      key: any;
      description: any;
    }[]
  >([AttachmentObject(Date.now())]);

  const [materialTested, setMaterialTested] = useState<
    {
      key: any;
      specified_quality: any;
      test_result: any;
      casting_id: any;
      material_tested: any;
      is_concrete: boolean;
      submitted_date: any;
      is_accepted: boolean | null;
    }[]
  >([MaterialTestedObject(Date.now())]);

  useEffect(() => {
    if (!isModalVisible) resetForm();
  }, [isModalVisible]);

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  const resetForm = () => {
    form.resetFields();
    setAttachments([AttachmentObject(Date.now())]);
    setMaterialTested([MaterialTestedObject(Date.now())]);
    setAllConcrete(false);
  };

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);

    let formData = new FormData();

    formData.append("project_id", project.payload?.id.toString());
    formData.append("approved_by_id", getUserData().id.toString());
    formData.append("supervisor_id", value.supervisor_id);
    formData.append("employer_id", value.employer_id);
    formData.append("contractor_id", value.contractor_id);

    formData.append("contract_number", value.contract_number);
    formData.append("site", value.site);
    formData.append("testing_lab", value.testing_lab);
    formData.append("testing_number", value.testing_number);
    formData.append("recommendation", value.recommendation);
    formData.append(
      "date_of_testing",
      value.date_of_testing.format("YYYY-MM-DD")
    );

    if (allConcrete) {
      formData.append(
        "materialsTested",
        JSON.stringify(
          materialTested.map(
            ({
              key,
              casting_id,
              material_tested,
              specified_quality,
              test_result,
              is_accepted,
              submitted_date,
              is_concrete,
            }) => {
              let elCasting = casting.payload.find(
                (e) => e.id === toNumber(casting_id)
              );

              return {
                casting_id,
                material_tested: "Concrete",
                specified_quality,
                test_result,
                is_accepted,
                submitted_date: moment(elCasting?.date).format("YYYY-MM-DD"),
              };
            }
          )
        )
      );
    } else {
      formData.append(
        "materialsTested",
        JSON.stringify(
          materialTested.map(
            ({
              key,
              casting_id,
              material_tested,
              specified_quality,
              test_result,
              is_accepted,
              submitted_date,
              is_concrete,
            }) => {
              return {
                casting_id,
                material_tested,
                specified_quality,
                test_result,
                is_accepted,
                submitted_date: moment(value.submitted_date).format(
                  "YYYY-MM-DD"
                ),
              };
            }
          )
        )
      );
    }

    formData.append(
      "attachments",
      JSON.stringify(attachments.map(({ key, description }) => description))
    );

    attachments.forEach(({ key, description }) => {
      formData.append(`files`, value[`attachment_${key}`].file);
    });

    sendData(formData)
      .then((res) => {
        console.log(res.data);
        resetForm();
        handleOk();
        setLoading(false);
        fetchAllTestResult(project.payload?.id);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.TEST_FORM_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.TEST_FORM_FAILED,
            e.message
          )
        );
      });
  };

  const disabledForwardDate = (current: any) => {
    // Can not select days after today
    return current && current > moment().endOf("day");
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        New Results
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="New Test Result"
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
              Register Test
            </Button>
          </>,
        ]}
      >
        <Form
          form={form}
          onFinish={Submit}
          layout="vertical"
          initialValues={{
            date_of_testing: moment(),
            approved_by: `${getUserData()?.full_name}/${
              getUserData()?.company?.name
            }`,
          }}
        >
          <div className="row">
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
                value={project.payload?.client?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-4">
              <Statistic
                title="Contractor"
                value={project.payload?.contractor?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>

          <Divider />

          <div className="row mt-3">
            <div className="col-md-4">
              <Form.Item
                label="Contract Number"
                name="contract_number"
                rules={[
                  { required: true, message: "Please input Contract Number" },
                ]}
              >
                <Input size="middle" placeholder="contract number" />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Supervisor"
                name="supervisor_id"
                rules={[{ required: true, message: "Please input SUPERVISOR" }]}
              >
                <Select loading={users.isPending} placeholder="supervisor">
                  {users.payload.map((ele) => (
                    <Select.Option value={`${ele.id}`}>
                      {ele.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Site"
                name="site"
                rules={[{ required: true, message: "Please input Site" }]}
              >
                <Input size="middle" placeholder="site" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Testing Lab"
                name="testing_lab"
                rules={[
                  { required: true, message: "Please input Testing Lab" },
                ]}
              >
                <Input size="middle" placeholder="testing lab" />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Testing No."
                name="testing_number"
                rules={[
                  { required: true, message: "Please input Testing Number" },
                ]}
              >
                <Input size="middle" placeholder="testing number" />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Date of Testing"
                name="date_of_testing"
                rules={[
                  { required: true, message: "Please input Date of Testing" },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disabledForwardDate}
                />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item label="CONCRETE" name="is_concrete">
                <Checkbox onClick={() => setAllConcrete(!allConcrete)} />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Submitted Date"
                name="submitted_date"
                rules={[
                  {
                    required: !allConcrete,
                    message: "Please input submitted Date",
                  },
                ]}
              >
                <DatePicker
                  disabled={allConcrete}
                  format="YYYY-MM-DD"
                  disabledDate={disabledForwardDate}
                />
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="row mb-3">
            <div className="col-md-4">
              <h6>Materials Tested</h6>
            </div>
            <div className="col-md-12">
              <MaterialTestedComponent
                casting={casting}
                dataAction={[materialTested, setMaterialTested]}
                allConcreteAction={[allConcrete, setAllConcrete]}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <h6>Attachments</h6>
            </div>
            <div className="col-md-12">
              <AttachmentComponent
                attachmentAction={[attachments, setAttachments]}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-9">
              <Form.Item
                label="Recommendation of Designer"
                name="recommendation"
                rules={[
                  { required: true, message: "Please input Recommendation" },
                ]}
              >
                <Input.TextArea rows={4} placeholder="recommendation" />
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="row mt-4">
            <div className="col-md-1">
              <h3 className="pt-4">C.C</h3>
            </div>
            <div className="col-md-3">
              <Form.Item label="To Site Supervisor" name="supervisor_id">
                <Select
                  loading={users.isPending}
                  disabled
                  placeholder="supervisor"
                >
                  {users.payload.map((ele) => (
                    <Select.Option value={`${ele.id}`}>
                      {ele.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Form.Item
                label="To Contractor"
                name="contractor_id"
                rules={[
                  { required: true, message: "Please select Contractor" },
                ]}
              >
                <Select loading={users.isPending} placeholder="contractor">
                  {users.payload.map((ele) => (
                    <Select.Option value={`${ele.id}`}>
                      {ele.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Form.Item
                label="To Employer"
                name="employer_id"
                rules={[{ required: true, message: "Please select Employer" }]}
              >
                <Select loading={users.isPending} placeholder="employer">
                  {users.payload.map((ele) => (
                    <Select.Option value={`${ele.id}`}>
                      {ele.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-4">
              <Statistic
                title="Approved By"
                value={`${getUserData()?.full_name} ${
                  getUserData()?.company?.name
                    ? `/${getUserData()?.company?.name}`
                    : ""
                }`}
                valueStyle={{ fontSize: 18, fontFamily: "Campton-Medium" }}
              />
            </div>
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
  users: state.user.fetchAll,
  casting: state.casting.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllTestResult: (project_id: any) =>
    dispatch(fetchAllTestResult(project_id)),
  fetchAllUser: (payload: any) => dispatch(fetchAllUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTestComponent);
