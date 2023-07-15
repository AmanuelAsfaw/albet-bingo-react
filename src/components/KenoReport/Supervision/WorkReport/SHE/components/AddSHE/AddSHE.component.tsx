import {
  Button,
  Form,
  Modal,
  Table,
  Input,
  Upload,
  Select,
  DatePicker,
  AutoComplete,
} from "antd";
import { FC, useState } from "react";
import { AddSHEPropType, addSHE } from "../../util/she.util";
import { PlusOutlined, MinusOutlined, UploadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  Message,
  NotificationType,
  PenalityTypes,
  TreatmentGivenTypes,
} from "../../../../../../../constants/Constants";
import { fetchAllSHEs } from "../../../../../../../redux/SHE/SHE.action";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";

const AddSHEComponent: FC<AddSHEPropType> = ({
  project,

  fetchSHE,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [report, setReport] = useState([
    {
      location: "",
      correction: "",
      photos: "",
      action_by: "",
      status: "",
    },
  ]);
  const [penality, setPenality] = useState([
    {
      name: "",
      job_position: "",
      date: "",
      violation: "",
      penalty: "",
    },
  ]);
  const [incident, setIncident] = useState([
    {
      name: "",
      job_position: "",
      age: "",
      date: "",
      type_of_injury: "",
      reason_for_incident: "",
      treatment_given: "",
    },
  ]);

  const resetForm = () => {
    form.resetFields();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (values: any) => {
    setLoading(true);
    const form_data = new FormData();

    report.forEach((rep: any) => {
      if (rep?.photos?.uid !== "") {
        form_data.append("files", rep?.photos);
      }
    });

    form_data.append("project_id", project?.payload?.id);
    form_data.append(
      "report",
      report.map((arr: any) => JSON.stringify(arr)).join("---")
    );
    form_data.append(
      "incident",
      incident.map((arr: any) => JSON.stringify(arr)).join("---")
    );
    form_data.append(
      "penalty",
      penality.map((arr: any) => JSON.stringify(arr)).join("---")
    );

    addSHE(form_data)
      .then(() => {
        resetForm();
        handleOk();
        setLoading(false);
        fetchSHE();
        OpenNotification(NotificationType.SUCCESS, Message.SHE_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.SHE_FAILED,
            e.message
          )
        );
      });
  };

  const handleReportChange = (
    value: any,
    key: string,
    data: any,
    index: any
  ) => {
    let st = data;
    st[key] = value;
    report[index] = st;
    setReport([...report]);
  };

  const handlePenalityChange = (
    value: any,
    key: string,
    data: any,
    index: any
  ) => {
    let st = data;
    st[key] = value;
    penality[index] = st;
    setPenality([...penality]);
  };

  const handleIncidentChange = (
    value: any,
    key: string,
    data: any,
    index: any
  ) => {
    let st = data;
    st[key] = value;
    incident[index] = st;
    setIncident([...incident]);
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Add SHE
      </Button>
      <Modal
        title="Add SHE"
        centered
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1300}
        className="fixed-modal"
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={false}
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form form={form} onFinish={Submit} layout="vertical">
          <div className="row">
            <div className="col-md-12">
              <h6>Report</h6>
              <Table
                size="small"
                pagination={false}
                dataSource={report}
                columns={[
                  {
                    title: "No",
                    width: "2%",
                    render: (record: any, data: any, index: any) => index + 1,
                  },
                  {
                    title: "Location/Working Area",
                    width: "20%",
                    dataIndex: "location",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_location`}
                        rules={[
                          { required: true, message: "Location is required" },
                        ]}
                      >
                        <Input
                          onChange={(e: any) =>
                            handleReportChange(
                              e.target.value,
                              "location",
                              data,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Corrective Measures were taken",
                    width: "25%",
                    dataIndex: "correction",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_correction`}
                        rules={[
                          {
                            required: true,
                            message: "Correction can not be empty",
                          },
                        ]}
                      >
                        <Input
                          onChange={(e: any) =>
                            handleReportChange(
                              e.target.value,
                              "correction",
                              data,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Photos",
                    width: "1%",
                    dataIndex: "photos",
                    className: "text-center pl-0 pr-0",
                    render: (record: any, data: any, index: any) => (
                      <Upload
                        accept="image/*"
                        multiple={false}
                        style={{ paddingTop: "8px", verticalAlign: "initial" }}
                        onChange={(e) =>
                          handleReportChange(e.file, "photos", data, index)
                        }
                        beforeUpload={(file) => {
                          return false;
                        }}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          className="btn-outline-secondary mr-0"
                        ></Button>
                      </Upload>
                    ),
                  },
                  {
                    title: "Action By",
                    width: "20%",
                    dataIndex: "action_by",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_action_by`}
                        rules={[
                          { required: true, message: "Please add action by" },
                        ]}
                      >
                        <Select
                          onChange={(e) =>
                            handleReportChange(e, "action_by", data, index)
                          }
                          style={{ width: "100%" }}
                        >
                          <Select.OptGroup label="Consultant">
                            <Select.Option
                              value={project?.payload?.consultant?.name!}
                            >
                              {project?.payload?.consultant?.name}
                            </Select.Option>
                          </Select.OptGroup>
                          <Select.OptGroup label="Contractor">
                            <Select.Option
                              value={project?.payload?.contractor?.name!}
                            >
                              {project?.payload?.contractor?.name}
                            </Select.Option>
                          </Select.OptGroup>
                        </Select>
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Status",
                    width: "10%",
                    dataIndex: "status",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_status`}
                        rules={[
                          { required: true, message: "Status is required" },
                        ]}
                      >
                        <Select
                          onChange={(e) =>
                            handleReportChange(e, "status", data, index)
                          }
                          style={{ width: "100%" }}
                        >
                          <Select.Option value="In Progress">
                            In Progress
                          </Select.Option>
                          <Select.Option value="Closed">Closed</Select.Option>
                        </Select>
                      </Form.Item>
                    ),
                  },
                  {
                    title: "",
                    width: "5%",
                    className: "text-center",
                    render: (record: any, data: any, index: any) =>
                      index !== 0 ? (
                        <div className="d-flex justify-content-center">
                          <Button
                            icon={<PlusOutlined />}
                            className="btn-outline-secondary"
                            onClick={() =>
                              setReport([
                                ...report,
                                {
                                  location: "",
                                  correction: "",
                                  photos: "",
                                  action_by: "",
                                  status: "",
                                },
                              ])
                            }
                          />
                          <Button
                            icon={<MinusOutlined />}
                            className="btn-outline-secondary"
                            onClick={() => {
                              let temp = report;
                              temp.splice(index, 1);
                              setReport([...temp]);
                            }}
                          />
                        </div>
                      ) : (
                        <Button
                          icon={<PlusOutlined />}
                          className="btn-outline-secondary"
                          onClick={() =>
                            setReport([
                              ...report,
                              {
                                location: "",
                                correction: "",
                                photos: "",
                                action_by: "",
                                status: "",
                              },
                            ])
                          }
                        />
                      ),
                  },
                ]}
                // footer={() => (
                //   <div className="d-flex justify-content-center">
                //     <Button
                //       style={{ width: "100px" }}
                //       icon={<PlusOutlined />}
                //       onClick={() =>
                //         setReport([
                //           ...report,
                //           {
                //             location: "",
                //             correction: "",
                //             photos: "",
                //             action_by: "",
                //             status: "",
                //           },
                //         ])
                //       }
                //     />
                //   </div>
                // )}
              />
            </div>
            <div className="col-md-12 pt-4">
              <h6>Penalities Given</h6>
              <Table
                size="small"
                pagination={false}
                dataSource={penality}
                columns={[
                  {
                    title: "No",
                    width: "2%",
                    render: (record: any, data: any, index: any) => index + 1,
                  },
                  {
                    title: "Name",
                    dataIndex: "name",
                    width: "20%",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_name`}
                        rules={[
                          { required: true, message: "Employee is required" },
                        ]}
                      >
                        <AutoComplete
                          options={[]}
                          onChange={(e: any, dat: any) =>
                            handlePenalityChange(e, "name", data, index)
                          }
                          style={{ width: "100%" }}
                          placeholder="input here"
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Job Position",
                    width: "15%",
                    dataIndex: "job_position",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_job_position`}
                        rules={[
                          { required: true, message: "Field is required" },
                        ]}
                      >
                        <Input
                          onChange={(e: any) =>
                            handlePenalityChange(
                              e.target.value,
                              "job_position",
                              data,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Date",
                    dataIndex: "date",
                    width: "15%",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_penalty_date`}
                        rules={[
                          { required: true, message: "Field is required" },
                        ]}
                      >
                        <DatePicker
                          onChange={(e: any) =>
                            handlePenalityChange(
                              e.format("DD-MM-YYYY"),
                              "date",
                              data,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Violation",
                    dataIndex: "violation",
                    width: "15%",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_violation`}
                        rules={[
                          { required: true, message: "Field is required" },
                        ]}
                      >
                        <Input
                          onChange={(e: any) =>
                            handlePenalityChange(
                              e.target.value,
                              "violation",
                              data,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Penality",
                    dataIndex: "penality",
                    width: "15%",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_penality`}
                        rules={[
                          { required: true, message: "Field is required" },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          onChange={(e: any) =>
                            handlePenalityChange(e, "penality", data, index)
                          }
                        >
                          <Select.Option value={PenalityTypes.WRITTEN_WARNING}>
                            {PenalityTypes.WRITTEN_WARNING}
                          </Select.Option>
                          <Select.Option
                            value={PenalityTypes.FINAL_WRITTEN_WARNING}
                          >
                            {PenalityTypes.FINAL_WRITTEN_WARNING}
                          </Select.Option>
                          <Select.Option value={PenalityTypes.CASH_PENALITY}>
                            {PenalityTypes.CASH_PENALITY}
                          </Select.Option>
                          <Select.Option value={PenalityTypes.TERMINATION}>
                            {PenalityTypes.TERMINATION}
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    ),
                  },
                  {
                    title: "",
                    width: "5%",
                    className: "text-center",
                    render: (record: any, data: any, index: any) =>
                      index !== 0 ? (
                        <div className="d-flex justify-content-center">
                          <Button
                            className="btn-outline-secondary"
                            icon={<PlusOutlined />}
                            onClick={() =>
                              setPenality([
                                ...penality,
                                {
                                  name: "",
                                  job_position: "",
                                  date: "",
                                  violation: "",
                                  penalty: "",
                                },
                              ])
                            }
                          />
                          <Button
                            icon={<MinusOutlined />}
                            className="btn-outline-secondary"
                            onClick={() => {
                              let temp = penality;
                              temp.splice(index, 1);
                              setPenality([...temp]);
                            }}
                          />
                        </div>
                      ) : (
                        <Button
                          className="btn-outline-secondary"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            setPenality([
                              ...penality,
                              {
                                name: "",
                                job_position: "",
                                date: "",
                                violation: "",
                                penalty: "",
                              },
                            ])
                          }
                        />
                      ),
                  },
                ]}
                // footer={() => (
                //   <div className="d-flex justify-content-center">
                //     <Button
                //       style={{ width: "100px" }}
                //       className="btn-outline-secondary"
                //       icon={<PlusOutlined />}
                //       onClick={() =>
                //         setPenality([
                //           ...penality,
                //           {
                //             name: "",
                //             job_position: "",
                //             date: "",
                //             violation: "",
                //             penalty: "",
                //           },
                //         ])
                //       }
                //     />
                //   </div>
                // )}
              />
            </div>
            <div className="col-md-12 pt-4">
              <h6>Incidents</h6>
              <Table
                size="small"
                pagination={false}
                dataSource={incident}
                columns={[
                  {
                    title: "No",
                    width: "2%",
                    render: (record: any, data: any, index: number) =>
                      index + 1,
                  },
                  {
                    title: "Name",
                    dataIndex: "name",
                    width: "20%",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_incident_name`}
                        rules={[
                          { required: true, message: "Employee is required" },
                        ]}
                      >
                        <AutoComplete
                          options={[]}
                          onChange={(e: any, dat: any) =>
                            handleIncidentChange(e, "name", data, index)
                          }
                          style={{ width: "100%" }}
                          placeholder="input here"
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Job Position",
                    width: "20%",
                    dataIndex: "job_position",
                    render: (record: any, data: any, index: any) => (
                      <Form.Item
                        name={`${index}_incident_job_position`}
                        rules={[
                          { required: true, message: "Field is required" },
                        ]}
                      >
                        <Input
                          onChange={(e: any) =>
                            handleIncidentChange(
                              e.target.value,
                              "job_position",
                              data,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Age",
                    width: "1%",
                    dataIndex: "age",
                    render: (record: any, data: any, index: number) => (
                      <Form.Item name={`${index}_age`}>
                        <Input
                          onChange={(e: any) =>
                            handleIncidentChange(
                              e.target.value,
                              "age",
                              data,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Date",
                    dataIndex: "date",
                    width: "15%",
                    render: (record: any, data: any, index: number) => (
                      <Form.Item
                        name={`${index}_incident_date`}
                        rules={[
                          { required: true, message: "Field is required" },
                        ]}
                      >
                        <DatePicker
                          onChange={(e: any) =>
                            handleIncidentChange(
                              e.format("DD-MM-YYYY"),
                              "date",
                              data,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Type of injury",
                    dataIndex: "type_of_injury",
                    width: "15%",
                    render: (record: any, data: any, index: number) => (
                      <Form.Item
                        name={`${index}_type_of_injury`}
                        rules={[
                          { required: true, message: "Field is required" },
                        ]}
                      >
                        <Input
                          onChange={(e: any) =>
                            handleIncidentChange(
                              e.target.value,
                              "type_of_injury",
                              data,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Reason for incident",
                    dataIndex: "reason_for_incident",
                    width: "15%",
                    render: (record: any, data: any, index: number) => (
                      <Form.Item
                        name={`${index}_reason_for_incident`}
                        rules={[
                          { required: true, message: "Field is required" },
                        ]}
                      >
                        <Input
                          onChange={(e: any) =>
                            handleIncidentChange(
                              e.target.value,
                              "reason_for_incident",
                              data,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Treatment Given",
                    dataIndex: "treatment_given",
                    width: "15%",
                    render: (record: any, data: any, index: number) => (
                      <Form.Item
                        name={`${index}_treatment_given`}
                        rules={[
                          { required: true, message: "Field is required" },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          onChange={(e: any) =>
                            handleIncidentChange(
                              e,
                              "treatment_given",
                              data,
                              index
                            )
                          }
                        >
                          <Select.Option value={TreatmentGivenTypes.FIRST_AID}>
                            {TreatmentGivenTypes.FIRST_AID}
                          </Select.Option>
                          <Select.Option
                            value={TreatmentGivenTypes.SENT_TO_CLINIC}
                          >
                            {TreatmentGivenTypes.SENT_TO_CLINIC}
                          </Select.Option>
                          <Select.Option
                            value={TreatmentGivenTypes.SENT_TO_HOSPITAL}
                          >
                            {TreatmentGivenTypes.SENT_TO_HOSPITAL}
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    ),
                  },
                  {
                    title: "",
                    width: "5%",
                    className: "text-center",
                    render: (record: any, data: any, index: any) =>
                      index !== 0 ? (
                        <div className="d-flex justify-content-center">
                          <Button
                            className="btn-outline-secondary"
                            icon={<PlusOutlined />}
                            onClick={() =>
                              setIncident([
                                ...incident,
                                {
                                  name: "",
                                  job_position: "",
                                  age: "",
                                  date: "",
                                  type_of_injury: "",
                                  reason_for_incident: "",
                                  treatment_given: "",
                                },
                              ])
                            }
                          />
                          <Button
                            icon={<MinusOutlined />}
                            className="btn-outline-secondary"
                            onClick={() => {
                              let temp = incident;
                              temp.splice(index, 1);
                              setIncident([...temp]);
                            }}
                          />
                        </div>
                      ) : (
                        <Button
                          className="btn-outline-secondary"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            setIncident([
                              ...incident,
                              {
                                name: "",
                                job_position: "",
                                age: "",
                                date: "",
                                type_of_injury: "",
                                reason_for_incident: "",
                                treatment_given: "",
                              },
                            ])
                          }
                        />
                      ),
                  },
                ]}
                // footer={() => (
                //   <div className="d-flex justify-content-center">
                //     <Button
                //       style={{ width: "100px" }}
                //       icon={<PlusOutlined />}
                //       onClick={() =>
                //         setIncident([
                //           ...incident,
                //           {
                //             name: "",
                //             job_position: "",
                //             age: "",
                //             date: "",
                //             type_of_injury: "",
                //             reason_for_incident: "",
                //             treatment_given: "",
                //           },
                //         ])
                //       }
                //     />
                //   </div>
                // )}
              />
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

const reportData = {
  location: "",
  correction: "",
  photos: "",
  action_by: "",
  status: "",
};

const incidentData = {
  name: "",
  job_position: "",
  age: "",
  date: "",
  type_of_injury: "",
  reason_for_incident: "",
  treatment_given: "",
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  staff: state.staff.fetchAll,
  project: state.project.fetchOne,
  labours: state.labour.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSHE: () => dispatch(fetchAllSHEs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSHEComponent);
