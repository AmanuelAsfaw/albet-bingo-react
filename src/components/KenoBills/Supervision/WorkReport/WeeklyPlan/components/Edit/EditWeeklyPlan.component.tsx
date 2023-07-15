import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { EditWeeklyPlanPropType, POST } from "../../utils/WeeklyPlan.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import { ErrorHandler, format } from "../../../../../../../utilities/utilities";
import { WeeklyPlanItem } from "../../../../../../../redux/WeeklyPlan/WeeklyPlan.type";
import { toNumber } from "lodash";
import moment from "moment";
import BoqModalComponent from "../BoqModal/BoqModal.component";
import { fetchAllWeeklyPlan } from "../../../../../../../redux/WeeklyPlan/WeeklyPlan.action";
const EditWeeklyPlanComponent: FC<EditWeeklyPlanPropType> = ({
  fetchWeeklyPlans,
  project,
  weekly_plan,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [weekly_plan_items, setWeeklyPlanItems] = useState<WeeklyPlanItem[]>(
    []
  );

  useEffect(() => {
    if (weekly_plan.weekly_plan_items && isModalVisible) {
      setWeeklyPlanItems(
        weekly_plan.weekly_plan_items.map((e, index) => ({ ...e, key: index }))
      );
    }
  }, [weekly_plan, isModalVisible]);

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const setValue = (key: number, name: string, value: any) => {
    const new_data = [...weekly_plan_items];
    const index = new_data.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = { ...new_data[index], [name]: value };
      if (name === "description") {
        let found = project.payload?.boqs.find((e) => e.description === value);
        if (found) {
          const { item_no, unit_price, quantity } = found;
          item = { ...item, item_no, contract_amount: unit_price * quantity };
        }
      }
      new_data.splice(index, 1, item);
      setWeeklyPlanItems(new_data);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      weekly_plan_items,
      project_id: project.payload?.id,
      date: value.date.startOf("m").format("YYYY-MM-DD"),
      id: weekly_plan.id,
    };

    POST(data)
      .then(() => {
        handleOk();
        fetchWeeklyPlans({ project_id: project.payload?.id });
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          "Weekly Plan Registered",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Register Weekly Plan",
            e.message
          )
        );
      });
  };

  const onRemove = (key: number) => {
    const new_data = [...weekly_plan_items];
    const index = new_data.findIndex((e) => e.key === key);
    if (index !== -1) {
      new_data.splice(index, 1);
      setWeeklyPlanItems(new_data);
    }
  };

  const onEdit = () => {
    setWeeklyPlanItems([
      ...weekly_plan_items,
      {
        description: "",
        item_no: "",
        contract_amount: 0,
        key: Date.now(),
        week1: 0,
        week2: 0,
        week3: 0,
        week4: 0,
      },
    ]);
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1300}
        title="Weekly Plan"
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
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{ date: moment().startOf("month") }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Month"
                name="date"
                rules={[{ required: true, message: "Month Required" }]}
              >
                <DatePicker allowClear={false} picker="month" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <BoqModalComponent
                dataAction={[weekly_plan_items, setWeeklyPlanItems]}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <Table
                pagination={false}
                bordered
                columns={[
                  {
                    title: "Item No",
                    key: "item_no",

                    width: "5%",
                    render: (value, record, index) => (
                      <Input
                        bordered={false}
                        placeholder="item no"
                        value={record.item_no}
                        onChange={(e) =>
                          setValue(record.key, "item_no", e.target.value)
                        }
                      />
                    ),
                  },
                  {
                    title: "Description",
                    key: "description",
                    width: "30%",
                    render: (value, record, index) => (
                      <AutoComplete
                        bordered={false}
                        value={record.description}
                        onChange={(e) => setValue(record.key, "description", e)}
                        placeholder="name"
                        options={project.payload?.boqs
                          .filter((e) => e.unit)
                          .map((e, index) => ({
                            value: e.description,
                            key: index,
                          }))}
                        filterOption={(inputValue, option: any) =>
                          option!.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        style={{ width: "100%" }}
                      >
                        <Input.TextArea rows={3} />
                      </AutoComplete>
                    ),
                  },
                  {
                    title: "Contract Amount",
                    key: "contract_amount",
                    render: (value, record, index) => (
                      <InputNumber
                        value={record.contract_amount}
                        bordered={false}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          toNumber(
                            toNumber(
                              value ? value.replace(/\$\s?|(,*)/g, "") : ""
                            ).toFixed(2)
                          )
                        }
                        onChange={(value) =>
                          setValue(record.key, "contract_amount", value)
                        }
                        placeholder="amount"
                      />
                    ),
                  },
                  {
                    title: "Week 1",
                    key: "week_1",
                    render: (value, record, index) => (
                      <InputNumber
                        value={record.week1}
                        bordered={false}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          toNumber(
                            value ? value.replace(/\$\s?|(,*)/g, "") : ""
                          )
                        }
                        onChange={(value) =>
                          setValue(record.key, "week1", value)
                        }
                        placeholder="amount"
                      />
                    ),
                  },
                  {
                    title: "Week 2",
                    key: "week_2",
                    render: (value, record, index) => (
                      <InputNumber
                        value={record.week2}
                        bordered={false}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          toNumber(
                            value ? value.replace(/\$\s?|(,*)/g, "") : ""
                          )
                        }
                        onChange={(value) =>
                          setValue(record.key, "week2", value)
                        }
                        placeholder="amount"
                      />
                    ),
                  },
                  {
                    title: "Week 3",
                    key: "week_3",
                    render: (value, record, index) => (
                      <InputNumber
                        value={record.week3}
                        bordered={false}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          toNumber(
                            value ? value.replace(/\$\s?|(,*)/g, "") : ""
                          )
                        }
                        onChange={(value) =>
                          setValue(record.key, "week3", value)
                        }
                        placeholder="amount"
                      />
                    ),
                  },
                  {
                    title: "Week 4",
                    key: "week_4",
                    render: (value, record, index) => (
                      <InputNumber
                        value={record.week4}
                        bordered={false}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          toNumber(
                            value ? value.replace(/\$\s?|(,*)/g, "") : ""
                          )
                        }
                        onChange={(value) =>
                          setValue(record.key, "week4", value)
                        }
                        placeholder="amount"
                      />
                    ),
                  },
                  {
                    title: "Total",
                    key: "Total",
                    render: (value, record) =>
                      format(
                        record.week1 +
                          record.week2 +
                          record.week3 +
                          record.week4
                      ),
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (value, record) => (
                      <Button
                        className="btn-outline-danger"
                        onClick={() => onRemove(record.key)}
                      >
                        -
                      </Button>
                    ),
                  },
                ]}
                summary={(data) => {
                  let total_contract_amount = 0;
                  let total_week1 = 0;
                  let total_week2 = 0;
                  let total_week3 = 0;
                  let total_week4 = 0;

                  data.forEach((e) => {
                    total_contract_amount =
                      e.contract_amount + total_contract_amount;
                    total_week1 = total_week1 + e.week1;
                    total_week2 = total_week2 + e.week2;
                    total_week3 = total_week3 + e.week3;
                    total_week4 = total_week4 + e.week4;
                  });

                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell
                          index={0}
                          colSpan={2}
                          align="center"
                        >
                          Grand Total
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                          {format(total_contract_amount)}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          {format(total_week1)}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3}>
                          {format(total_week2)}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={4}>
                          {format(total_week3)}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={5}>
                          {format(total_week4)}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={5}>
                          {format(
                            total_week4 +
                              total_week3 +
                              total_week2 +
                              total_week1
                          )}
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                      <Table.Summary.Row>
                        <Table.Summary.Cell
                          index={0}
                          colSpan={9}
                          align="center"
                        >
                          <Button
                            className="btn-outline-secondary"
                            style={{ width: "50%" }}
                            onClick={onEdit}
                          >
                            +
                          </Button>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
                dataSource={weekly_plan_items}
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchWeeklyPlans: (action: any) => dispatch(fetchAllWeeklyPlan(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWeeklyPlanComponent);
