import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Tag,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { std, mean } from "mathjs";
import {
  AddTestEvaluationPropType,
  getFuk,
  sendData,
} from "../../util/TestEvaluation.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  FC_CONSTANTS,
  Message,
  MU,
  NotificationType,
} from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  format,
  removeHandler,
} from "../../../../../../../utilities/utilities";
import { fetchAllTestEvaluation } from "../../../../../../../redux/TestEvaluation/TestEvaluation.action";
import { Casting } from "../../../../../../../redux/Casting/Casting.type";
import { toNumber } from "lodash";
const AddTestEvaluationComponent: FC<AddTestEvaluationPropType> = ({
  casting,
  fetchEvaluation,
  project,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [selected_casting, setCasting] = useState<Casting | undefined>();
  const [fc, setFc] = useState<any>(0);
  const [age, setAge] = useState<any>(0);
  const [data, setData] = useState([{ key: Date.now(), compression: 0 }]);
  const [mu, setMu] = useState<any>(MU);
  const [standard_deviation, setDeviations] = useState(0);
  const [mean_value, setMean] = useState(0);
  const [deviation_fck, setDeviationFck] = useState(0);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (selected_casting)
      setFc(toNumber(selected_casting.concrete_grade.split("-")[1]));
  }, [selected_casting]);

  const onChangeHandler = (key: number, value: any) => {
    const newData = [...data];

    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = {
        ...item,
        compression: value,
      };
      newData.splice(index, 1, item);
      setData(newData);
    }
  };

  useEffect(() => {
    let parsed: any = data.map((e) => e.compression);
    setDeviations(std(parsed));
    setMean(mean(parsed));
  }, [data]);

  useEffect(() => {
    setDeviationFck(mean_value - standard_deviation * mu);
  }, [mean_value, standard_deviation, mu]);

  const Submit = (value: any) => {
    setLoading(true);

    let parsed = {
      ...value,
      compression: data.map((e) => e.compression).join(";"),
      project_id: project.payload?.id,
    };

    sendData(parsed)
      .then(() => {
        fetchEvaluation({ project_id: project.payload?.id });
        handleOk();
        form.resetFields();
        setFc(0);
        setMu(MU);
        setCasting(undefined);
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.GENERAL_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.GENERAL_FAILED,
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
        Register Test Evaluation
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Register Test Evaluation"
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
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{ mu: MU }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Casting"
                name="casting_id"
                rules={[{ required: true, message: "Casting Required!" }]}
              >
                <Select
                  onChange={(e) =>
                    setCasting(casting.payload.find((cast) => cast.id === e))
                  }
                >
                  {casting.payload.map((e, index) => (
                    <Select.Option key={index} value={e.id}>
                      {`${e.concrete_grade} (${e.date})`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Structural Element">
                <Input value={selected_casting?.structure_type} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Cement Type">
                <Input value={selected_casting?.cement_type} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Cast Date">
                <Input value={selected_casting?.date} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Axis">
                <Input value={selected_casting?.axis} />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Required Grade">
                <Input value={selected_casting?.concrete_grade} />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item label="fck">
                <Input value={format(getFuk(fc))} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Test Age(days)"
                name={"test_age"}
                rules={[{ required: true, message: "Test Age Required!" }]}
              >
                <InputNumber
                  onChange={(e) => setAge(e)}
                  placeholder="age"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "")
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Expected fc @ test date">
                <Input
                  value={format(FC_CONSTANTS[age] ? FC_CONSTANTS[age] * fc : 0)}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Expected fck @ test date">
                <Input
                  value={format(
                    FC_CONSTANTS[age] ? FC_CONSTANTS[age] * getFuk(fc) : 0
                  )}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table
                pagination={false}
                size="small"
                dataSource={data}
                columns={[
                  {
                    title: "Sample id",
                    render: (value, record, index) => index + 1,
                  },
                  {
                    title: "Test Age in Days",
                    render: () => age,
                  },
                  {
                    title: "Compressive Strength",
                    dataIndex: "compression",
                    render: (value, record) => (
                      <InputNumber
                        onChange={(e) => onChangeHandler(record.key, e)}
                        value={value}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          toNumber(
                            value ? value.replace(/\$\s?|(,*)/g, "") : ""
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: "Action",
                    className: "d-flex",
                    render: (x, record) => (
                      <>
                        <Button
                          className="mr-1 btn-outline-secondary"
                          onClick={() =>
                            removeHandler(record.key, data, setData)
                          }
                        >
                          -
                        </Button>
                        <Button
                          className="btn-outline-secondary"
                          onClick={() =>
                            setData([
                              ...data,
                              { key: Date.now(), compression: 0 },
                            ])
                          }
                        >
                          +
                        </Button>
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-4 mb-2">
              <h6>Deviation of the samples</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Standard Dev. s">
                <Input value={format(standard_deviation)} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Mean;  X">
                <Input value={format(mean_value)} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="μ"
                name={"mu"}
                rules={[{ required: true, message: "μ Required!" }]}
              >
                <InputNumber
                  onChange={(e) => setMu(e)}
                  placeholder="μ"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "")
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="fck @ Test Date">
                <Input value={format(deviation_fck)} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Form.Item label="Status">
                {deviation_fck >
                (FC_CONSTANTS[age] ? FC_CONSTANTS[age] * getFuk(fc) : 0) ? (
                  <Tag color={"green"}>OK</Tag>
                ) : (
                  <Tag color={"red"}>NOT OK</Tag>
                )}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Conversion">
                <Input value={format(FC_CONSTANTS[age])} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="fck @ Test Date">
                <Input
                  value={format(
                    deviation_fck / (FC_CONSTANTS[age] ? FC_CONSTANTS[age] : 0)
                  )}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Form.Item label="Status">
                {deviation_fck / (FC_CONSTANTS[age] ? FC_CONSTANTS[age] : 0) >
                getFuk(fc) ? (
                  <Tag color={"green"}>OK</Tag>
                ) : (
                  <Tag color={"red"}>NOT OK</Tag>
                )}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Comment"
                name={"comment"}
                rules={[{ required: true, message: "Comment Required!" }]}
              >
                <Input.TextArea rows={4} placeholder="comment" />
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
const mapStateToProps = (state: any) => ({
  casting: state.casting.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchEvaluation: (action: any) => dispatch(fetchAllTestEvaluation(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTestEvaluationComponent);
