import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, InputNumber, Modal, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AddFinancialPropType,
  sendFinancial,
} from "../../utils/Category.utils";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";

import { fetchAllCategory } from "../../../../../../redux/Category/Category.action";
import { fetchAllSubCategory } from "../../../../../../redux/SubCategory/SubCategory.action";
import { fetchAllFinancial } from "../../../../../../redux/Financial/Financial.action";
import moment from "moment";
import { useParams } from "react-router-dom";

const AddSubCategory: FC<AddFinancialPropType> = ({
  fetchAll,
  financial,
  fetchAllCategory,
  fetchAllSubCategory,
  sub_category,
  category,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modifiedCategory, setModifiedCategory] = useState<any>([]);
  const [date, setDate] = useState<any>(moment());
  const [general_form] = Form.useForm();
  const [grandTotal, setGrandTotal] = useState({
    contract_amount_in_birr: 0,
    previous_planned_in_birr: 0,
    previous_executed_in_birr: 0,
    this_month_planned_in_birr: 0,
    this_month_executed_in_birr: 0,
    this_month_comp_from_plan: 0,
    to_date_planned_in_birr: 0,
    to_date_executed_in_birr: 0,
    to_date_comp_from_plan: 0,
    accmp_in_percent: 0,
  });
  const [subTotal, setSubTotal] = useState([
    {
      contract_amount_in_birr: 0,
      previous_planned_in_birr: 0,
      previous_executed_in_birr: 0,
      this_month_planned_in_birr: 0,
      this_month_executed_in_birr: 0,
      this_month_comp_from_plan: 0,
      to_date_planned_in_birr: 0,
      to_date_executed_in_birr: 0,
      to_date_comp_from_plan: 0,
      accmp_in_percent: 0,
    },
  ]);

  useEffect(() => {
    fetchAll(isModalVisible ? { date, project_id: id } : {});
    fetchAllCategory({ project_id: id });
    fetchAllSubCategory({ project_id: id });
  }, [date]);

  const { id } = useParams();
  const onChange = (
    key: any,
    selector: any,
    value: any,
    outerIndex: number
  ) => {
    let temp = [...modifiedCategory];
    let index = temp[outerIndex].sub_category.findIndex(
      (e: any) => e.key === key
    );
    if (index !== -1) {
      temp[outerIndex].sub_category[index] = {
        ...temp[outerIndex].sub_category[index],
        [selector]: value,
      };
    } else {
      temp[outerIndex].sub_category.push({
        sub_category_id: key,
        [selector]: value,
      });
    }
    setModifiedCategory(temp);
    calculateTableTotal(temp);
    calculateSubCategoryTotal(temp[outerIndex].sub_category);
  };

  useEffect(() => {
    let grouped_categories: any = [];
    if (!category.isPending && category.payload.length) {
      if (!sub_category.isPending && sub_category.payload.length) {
        sub_category.payload.forEach((sub_category, index: number) => {
          sub_category.key = `${new Date()}_${sub_category.id}`;
          const category_id = sub_category.category_id;
          let categories = grouped_categories.find(
            (category: any) => category?.id === category_id
          );
          let temp = financial.payload.find(
            (item) => item.sub_category_id == sub_category.id
          );
          let newTemp = { sub_category_id: sub_category.id, ...sub_category };
          let newData;
          if (!temp) {
            let { id, ...rest } = newTemp;
            newData = { ...rest };
          } else {
            newData = { ...newTemp, ...temp };
          }
          if (!categories) {
            const category_description = category.payload.find(
              (category) => category?.id === category_id
            )?.description;
            grouped_categories.push({
              id: category_id,
              description: category_description,
              sub_category: [newData],
            });
          } else {
            categories.sub_category.push(newData);
          }
        });
      }
    }
    setModifiedCategory(grouped_categories);
    calculateTableTotal(grouped_categories);
  }, [category, sub_category, financial]);

  const handleOk = () => {
    setIsModalVisible(false);
    clearForm();
  };

  const handleCancel = () => {
    clearForm();
    setIsModalVisible(false);
  };

  const clearForm = () => {
    general_form.resetFields();
    setDate(moment());
  };

  useEffect(() => {
    let subTotalTemp = {
      contract_amount_in_birr: 0,
      previous_planned_in_birr: 0,
      previous_executed_in_birr: 0,
      this_month_planned_in_birr: 0,
      this_month_executed_in_birr: 0,
      this_month_comp_from_plan: 0,
      to_date_planned_in_birr: 0,
      to_date_executed_in_birr: 0,
      to_date_comp_from_plan: 0,
      accmp_in_percent: 0,
    };
    let temp = [...subTotal];
    modifiedCategory.forEach((category: any, index: number) => {
      const subTotal = calculateSubCategoryTotal(category.sub_category);
      subTotalTemp.contract_amount_in_birr += subTotal.contract_amount_in_birr;
      subTotalTemp.previous_planned_in_birr +=
        subTotal.previous_planned_in_birr;
      subTotalTemp.previous_executed_in_birr +=
        subTotal.previous_executed_in_birr;
      subTotalTemp.this_month_planned_in_birr +=
        subTotal.this_month_planned_in_birr;
      subTotalTemp.this_month_executed_in_birr +=
        subTotal.this_month_executed_in_birr;
      subTotalTemp.this_month_comp_from_plan +=
        subTotal.this_month_comp_from_plan;
      subTotalTemp.to_date_comp_from_plan += subTotal.to_date_comp_from_plan;
      subTotalTemp.to_date_executed_in_birr +=
        subTotal.to_date_executed_in_birr;
      subTotalTemp.to_date_planned_in_birr += subTotal.to_date_planned_in_birr;
      subTotalTemp.accmp_in_percent += subTotal.accmp_in_percent;
      temp[index] = subTotal;
    });

    setSubTotal(temp);
  }, [modifiedCategory]);

  const calculateSubCategoryTotal = (sub_categories: any) => {
    const totals = sub_categories.reduce(
      (acc: any, curr: any) => {
        acc.contract_amount_in_birr += curr.contract_amount_in_birr || 0;
        acc.previous_planned_in_birr += curr.previous_planned_in_birr || 0;
        acc.previous_executed_in_birr += curr.previous_executed_in_birr || 0;
        acc.this_month_planned_in_birr += curr.this_month_planned_in_birr || 0;
        acc.this_month_executed_in_birr +=
          curr.this_month_executed_in_birr || 0;
        acc.this_month_comp_from_plan += curr.this_month_comp_from_plan || 0;
        acc.to_date_planned_in_birr += curr.to_date_planned_in_birr || 0;
        acc.to_date_executed_in_birr += curr.to_date_executed_in_birr || 0;
        acc.to_date_comp_from_plan += curr.to_date_comp_from_plan || 0;
        acc.accmp_in_percent += curr.accmp_in_percent || 0;

        return acc;
      },
      {
        contract_amount_in_birr: 0,
        previous_planned_in_birr: 0,
        previous_executed_in_birr: 0,
        this_month_planned_in_birr: 0,
        this_month_executed_in_birr: 0,
        this_month_comp_from_plan: 0,
        to_date_planned_in_birr: 0,
        to_date_executed_in_birr: 0,
        to_date_comp_from_plan: 0,
        accmp_in_percent: 0,
      }
    );

    return totals;
  };

  const calculateTableTotal = (grouped_categories: any) => {
    let grandTotalTemp = {
      contract_amount_in_birr: 0,
      previous_planned_in_birr: 0,
      previous_executed_in_birr: 0,
      this_month_planned_in_birr: 0,
      this_month_executed_in_birr: 0,
      this_month_comp_from_plan: 0,
      to_date_planned_in_birr: 0,
      to_date_executed_in_birr: 0,
      to_date_comp_from_plan: 0,
      accmp_in_percent: 0,
    };
    grouped_categories.forEach((category: any) => {
      const subTotal = calculateSubCategoryTotal(category.sub_category);
      if (subTotal) {
        grandTotalTemp.contract_amount_in_birr +=
          subTotal.contract_amount_in_birr;
        grandTotalTemp.previous_planned_in_birr +=
          subTotal.previous_planned_in_birr;
        grandTotalTemp.previous_executed_in_birr +=
          subTotal.previous_executed_in_birr;
        grandTotalTemp.this_month_planned_in_birr +=
          subTotal.this_month_planned_in_birr;
        grandTotalTemp.this_month_executed_in_birr +=
          subTotal.this_month_executed_in_birr;
        grandTotalTemp.this_month_comp_from_plan +=
          subTotal.this_month_comp_from_plan;
        grandTotalTemp.to_date_comp_from_plan +=
          subTotal.to_date_comp_from_plan;
        grandTotalTemp.to_date_executed_in_birr +=
          subTotal.to_date_executed_in_birr;
        grandTotalTemp.to_date_planned_in_birr +=
          subTotal.to_date_planned_in_birr;
        grandTotalTemp.accmp_in_percent += subTotal.accmp_in_percent;
      }
    });

    setGrandTotal(grandTotalTemp);
  };

  const Submit = () => {
    setLoading(true);
    let newData: any = [];
    modifiedCategory.forEach((categories: any) => {
      categories.sub_category.forEach((subcategory: any) => {
        subcategory.date = date;
        subcategory.project_id = id;
        const {
          description,
          category,
          category_id,
          createdAt,
          updatedAt,
          key,
          ...rest
        } = subcategory;
        if (subcategory.contract_amount_in_birr) newData.push(rest);
      });
    });
    sendFinancial(newData)
      .then(() => {
        setTimeout(() => {
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.FINANCIAL_REGISTERED_SUCCESS,
            ""
          );
          fetchAll({ project_id: id });
          setLoading(false);
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.FINANCIAL_REGISTERED_FAIL,
            e.message
          )
        );
      });
  };

  const renderContent = () => {
    return (
      <>
        <Form layout="vertical" form={general_form} onFinish={Submit}>
          <p>Select Month</p>
          <DatePicker
            style={{ width: "150px" }}
            value={date}
            picker="month"
            allowClear={false}
            onChange={(value) => setDate(value)}
          />

          {modifiedCategory.map((items: any, index: number) => (
            <div key={items?.id} className="mt-2">
              <p>{items.description}</p>
              <Table
                columns={[
                  {
                    title: "No.",
                    dataIndex: "no",
                    width: "50px",
                    render: (record: any, value: any, index: any) => index + 1,
                  },

                  {
                    title: "Description",
                    dataIndex: "description",
                    width: "30%",
                    render: (value: any) => value,
                  },

                  {
                    title: "Contract amount in birr",
                    dataIndex: "contract_amount_in_birr",
                    width: "400px",
                    render: (value: any, record: any) => (
                      <Form.Item
                        style={{ width: "150px" }}
                        name={`contract_amount_in_birr_${record.key}`}
                        initialValue={record.contract_amount_in_birr}
                      >
                        <InputNumber
                          onChange={(value) =>
                            onChange(
                              record.key,
                              "contract_amount_in_birr",
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Previous planned in birr",
                    dataIndex: "previous_planned_in_birr",
                    width: "400px",
                    render: (value: any, record: any) => (
                      <Form.Item
                        style={{ width: "150px" }}
                        name={`previous_planned_in_birr_${record.key}`}
                        initialValue={record.previous_planned_in_birr}
                      >
                        <InputNumber
                          onChange={(value) =>
                            onChange(
                              record.key,
                              "previous_planned_in_birr",
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Previous executed in birr",
                    dataIndex: "previous_executed_in_birr",
                    width: "400px",
                    render: (value: any, record: any) => (
                      <Form.Item
                        style={{ width: "150px" }}
                        name={`previous_executed_in_birr_${record.key}`}
                        initialValue={record.previous_executed_in_birr}
                      >
                        <InputNumber
                          onChange={(value) =>
                            onChange(
                              record.key,
                              "previous_executed_in_birr",
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "This month planned in birr",
                    dataIndex: "this_month_planned_in_birr",
                    width: "400px",
                    render: (value: any, record: any) => (
                      <Form.Item
                        style={{ width: "150px" }}
                        name={`this_month_planned_in_birr_${record.key}`}
                        initialValue={record.this_month_planned_in_birr}
                      >
                        <InputNumber
                          onChange={(value) =>
                            onChange(
                              record.key,
                              "this_month_planned_in_birr",
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },

                  {
                    title: "This month executed in birr",
                    dataIndex: "this_month_executed_in_birr",
                    width: "400px",
                    render: (value: any, record: any) => (
                      <Form.Item
                        style={{ width: "150px" }}
                        name={`this_month_executed_in_birr_${record.key}`}
                        initialValue={record.this_month_executed_in_birr}
                      >
                        <InputNumber
                          onChange={(value) =>
                            onChange(
                              record.key,
                              "this_month_executed_in_birr",
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "This month comp from plan",
                    dataIndex: "this_month_comp_from_plan",
                    width: "400px",
                    render: (value: any, record: any) => (
                      <Form.Item
                        style={{ width: "150px" }}
                        name={`this_month_comp_from_plan_${record.key}`}
                        initialValue={record.this_month_comp_from_plan}
                      >
                        <InputNumber
                          onChange={(value) =>
                            onChange(
                              record.key,
                              "this_month_comp_from_plan",
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "To date planned in birr",
                    dataIndex: "to_date_planned_in_birr",
                    width: "400px",
                    render: (value: any, record: any) => (
                      <Form.Item
                        style={{ width: "150px" }}
                        name={`to_date_planned_in_birr_${record.key}`}
                        initialValue={record.to_date_planned_in_birr}
                      >
                        <InputNumber
                          onChange={(value) =>
                            onChange(
                              record.key,
                              "to_date_planned_in_birr",
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "To date executed in birr",
                    dataIndex: "to_date_executed_in_birr",
                    width: "400px",
                    render: (value: any, record: any) => (
                      <Form.Item
                        style={{ width: "150px" }}
                        name={`to_date_executed_in_birr_${record.key}`}
                        initialValue={record.to_date_executed_in_birr}
                      >
                        <InputNumber
                          onChange={(value) =>
                            onChange(
                              record.key,
                              "to_date_executed_in_birr",
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },

                  {
                    title: "To date comp from plan",
                    dataIndex: "to_date_comp_from_plan",
                    width: "400px",
                    render: (value: any, record: any) => (
                      <Form.Item
                        style={{ width: "150px" }}
                        name={`to_date_comp_from_plan_${record.key}`}
                        initialValue={record.to_date_comp_from_plan}
                      >
                        <InputNumber
                          onChange={(value) =>
                            onChange(
                              record.key,
                              "to_date_comp_from_plan",
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Accmp in percent",
                    dataIndex: "accmp_in_percent",
                    width: "400px",
                    render: (value: any, record: any) => (
                      <Form.Item
                        style={{ width: "150px" }}
                        name={`accmp_in_percent_from${record.key}`}
                        initialValue={record.accmp_in_percent}
                      >
                        <InputNumber
                          onChange={(value) =>
                            onChange(
                              record.key,
                              "accmp_in_percent",
                              value,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                ]}
                dataSource={items.sub_category}
                loading={
                  category.isPending ||
                  sub_category.isPending ||
                  financial.isPending
                }
                summary={(data) => {
                  return (
                    <Table.Summary fixed>
                      <Table.Summary.Row>
                        <Table.Summary.Cell
                          index={1}
                          colSpan={2}
                          align="center"
                        >
                          Sub Total
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                          {subTotal[index].contract_amount_in_birr}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          {subTotal[index].previous_planned_in_birr}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3}>
                          {subTotal[index].previous_executed_in_birr}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={4}>
                          {subTotal[index].this_month_planned_in_birr}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={5}>
                          {subTotal[index].this_month_executed_in_birr}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={6}>
                          {subTotal[index].this_month_comp_from_plan}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={7}>
                          {subTotal[index].to_date_planned_in_birr}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={8}>
                          {subTotal[index].to_date_executed_in_birr}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={9}>
                          {subTotal[index].to_date_comp_from_plan}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={10}>
                          {subTotal[index].accmp_in_percent}
                        </Table.Summary.Cell>
                      </Table.Summary.Row>

                      {category.payload.length - 1 == index ? (
                        <Table.Summary.Row>
                          <Table.Summary.Cell
                            index={1}
                            colSpan={2}
                            align="center"
                          >
                            Grand Total
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1}>
                            {grandTotal.contract_amount_in_birr}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={2}>
                            {grandTotal.previous_planned_in_birr}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={3}>
                            {grandTotal.previous_executed_in_birr}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={4}>
                            {grandTotal.this_month_planned_in_birr}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={5}>
                            {grandTotal.this_month_executed_in_birr}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={6}>
                            {grandTotal.this_month_comp_from_plan}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={7}>
                            {grandTotal.to_date_planned_in_birr}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={8}>
                            {grandTotal.to_date_executed_in_birr}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={9}>
                            {grandTotal.to_date_comp_from_plan}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={10}>
                            {grandTotal.accmp_in_percent}
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      ) : null}
                    </Table.Summary>
                  );
                }}
              />
            </div>
          ))}
        </Form>
      </>
    );
  };

  return (
    <div>
      <Button
        onClick={() => setIsModalVisible(true)}
        type="link"
        icon={<PlusOutlined />}
      >
        Add Financial
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={1300}
          title="New Financial report"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <>
              <Button loading={loading} onClick={() => general_form.submit()}>
                Add
              </Button>
            </>,
          ]}
        >
          {renderContent()}
        </Modal>
      </>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  category: state.category.fetchAll,
  sub_category: state.sub_category.fetchAll,
  financial: state.financial.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllSubCategory: (action: any) => dispatch(fetchAllSubCategory(action)),
  fetchAllCategory: (action: any) => dispatch(fetchAllCategory(action)),
  fetchAll: (action: any) => dispatch(fetchAllFinancial(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSubCategory);
