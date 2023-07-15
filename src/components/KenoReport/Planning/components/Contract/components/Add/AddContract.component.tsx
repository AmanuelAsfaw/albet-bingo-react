import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { toNumber } from "lodash";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Message, NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllContracts } from "../../../../../../../redux/Contract/Contract.action";
import { fetchAllCostEstimations } from "../../../../../../../redux/CostEstimation/CostEstimation.action";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { AddContractPropType, sendData } from "../../utils/Contract.util";

const AddContractComponent: FC<AddContractPropType> = ({ fetchContract }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const param = useParams()
  const [id, setId] = useState<number>(1);
  useEffect(() => {
    if (param.id) {
      setId(toNumber(param.id))
    }
  }, [param])

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };


  const Submit = (value: any) => {
    setLoading(true);

    let formData = new FormData();
    formData.append("project_id", id.toString())
    formData.append("date", value.date);
    formData.append("end_date", value.end_date);
    formData.append("contract_type", value.contract_type);
    formData.append("ref_no", value.ref_no);
    formData.append("file", value.file.file);
    formData.append("description", value.description);

    sendData(formData)
      .then(() => {
        handleOk();
        fetchContract();
        form.resetFields();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CONTRACT_REGISTRATION_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CONTRACT_REGISTRATION_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        New Contract
      </Button>
      <Modal
        title="New Contract"
        className="fixed-modal"
        width={850}
        centered
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Register
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            date: moment(),
            end_date: moment()
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Contract Date"
                name="date"
                rules={[{ required: true, message: "Date Required!" }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Contract Endig Date"
                name="end_date"
                rules={[{ required: true, message: "Contract Ending Date Required!" }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Contract Type"
                name="contract_type"
                rules={[
                  { required: true, message: "Contract Type Required!" },
                ]}
              >
                <Select placeholder="Select" value="type 1" >
                  <Select.Option value="Design Build">Design Build</Select.Option>
                  <Select.Option value="Design Bid Build">Design Bid Build</Select.Option>
                  <Select.Option value="Cost plus profit">Cost plus profit</Select.Option>
                  <Select.Option value="Build oprate transfer(bot)">Build oprate transfer(bot)</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reference Number"
                name="ref_no"
                rules={[
                  { required: true, message: "Reference Number Required!" },
                ]}
              >
                <Input placeholder="reference number" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Description Required!" }]}
              >
                <TextArea autoSize rows={2} placeholder="Description" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="File"
                rules={[{ required: true, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button className="btn-outline-secondary">
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchContract: (action: any) => dispatch(fetchAllContracts(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddContractComponent);
