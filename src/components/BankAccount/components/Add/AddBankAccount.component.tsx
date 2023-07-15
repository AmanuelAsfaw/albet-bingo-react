import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import React, { FC, useEffect, useState } from "react";
import {
  LIST_OF_COUNTRIES,
  Message,
  NotificationType,
} from "../../../../constants/Constants";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { AddBankAccountPropType, sendData } from "./AddBankAccount.util";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import { Select, AutoComplete, DatePicker, InputNumber } from "antd";
import { fetchAllBankAccount } from "../../../../redux/BankAccount/BankAccount.action";
import moment from "moment";
import { toNumber } from "lodash";

const AddBankAccountComponent: FC<AddBankAccountPropType> = ({
  is_private,
  fetchAllBankAccount,
}) => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!isModalVisible) {
      resetForm();
    }
  });

  const resetForm = () => {
    form.resetFields();
  };

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const disabledDate = (current: any) => {
    // Can not select days after today
    return current && current > moment().endOf("day");
  };

  const Submit = (value: any) => {
    value.is_private = is_private;
    value.starting_balance = toNumber(value.starting_balance);
    value.current_balance = value.starting_balance;
    value.minimum_balance_warning = toNumber(value.minimum_balance_warning);

    setLoading(true);
    sendData(value)
      .then(() => {
        resetForm();
        handleOk();
        setLoading(false);
        fetchAllBankAccount({ is_private: is_private ? 1 : 0 });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.BANK_ACCOUNT_REGISTERED_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.BANK_ACCOUNT_REGISTERED_FAILED,
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
        New Bank Account
      </Button>
      <Modal
        title="Bank Account Form"
        centered
        className="fixed-modal"
        open={isModalVisible}
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
              Register Bank Account
            </Button>
          </>,
        ]}
      >
        <Form
          form={form}
          onFinish={Submit}
          layout="vertical"
          initialValues={{
            account_type: "Checking",
            starting_date: moment(),
            minimum_balance_warning: 10000,
            currency: "ETB",
            country: "Ethiopia",
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Bank Name"
                name="bank_name"
                rules={[{ required: true, message: "Please input Bank Name" }]}
              >
                <AutoComplete
                  style={{
                    width: "100%",
                  }}
                  placeholder="bank account"
                  dropdownClassName="certain-category-search-dropdown"
                  options={[
                    { label: "CBE", value: "CBE" },
                    { label: "Awash Bank", value: "Awash Bank" },
                    { label: "Dashen Bank", value: "Dashen Bank" },
                    { label: "COOP Bank", value: "COOP Bank" },
                    { label: "Oromia Bank", value: "Oromia *Bank" },
                    { label: "Bank of Abyssinia", value: "Bank of Abyssinia" },
                    { label: "United Bank", value: "United Bank" },
                    { label: "Zemen Bank", value: "Zemen Bank" },
                    {
                      label: "Buna International Bank",
                      value: "Buna International Bank",
                    },
                  ]}
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Account Number"
                name="account_number"
                rules={[
                  { required: true, message: "Please input Account Number" },
                ]}
              >
                <Input placeholder="account number" />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Account type"
                name="account_type"
                rules={[
                  { required: true, message: "Please input Account type" },
                ]}
              >
                <Select
                  placeholder="account type"
                  style={{
                    width: "100%",
                  }}
                >
                  <Select.Option value="Checking">Checking</Select.Option>
                  <Select.Option value="Saving">Saving</Select.Option>
                  <Select.Option value="Special">Special</Select.Option>
                  <Select.Option value="Closed">Closed</Select.Option>
                  <Select.Option value="Over Draft">Over Draft</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Starting Balance"
                name="starting_balance"
                rules={[
                  { required: true, message: "Please input Starting Balance" },
                ]}
              >
                <InputNumber
                  placeholder="starting balance"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "")
                  }
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Date"
                name="starting_date"
                rules={[{ required: true, message: "Please select Date" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disabledDate}
                  placeholder="date"
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Minimum Balance Warning"
                name="minimum_balance_warning"
                rules={[
                  {
                    required: true,
                    message: "Please input Minimum Balance Warning",
                  },
                ]}
              >
                <InputNumber
                  placeholder="minimum balance warning"
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
            <div className="col-md-4">
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please select Country" }]}
              >
                <Select
                  placeholder="country"
                  style={{
                    width: "100%",
                  }}
                >
                  {LIST_OF_COUNTRIES.map((el, idx) => (
                    <Select.Option value={el.name}>{el.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Currency"
                name="currency"
                rules={[{ required: true, message: "Please select Currency" }]}
              >
                <Select
                  placeholder="currency"
                  style={{
                    width: "100%",
                  }}
                >
                  <Select.Option value="ETB">ETB</Select.Option>
                  <Select.Option value="USD">USD</Select.Option>
                  <Select.Option value="GBP">GBP</Select.Option>
                  <Select.Option value="EUR">EUR</Select.Option>
                  <Select.Option value="CNY">CNY</Select.Option>
                  <Select.Option value="AED">AED</Select.Option>
                </Select>
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
  fetchAllBankAccount: (payload: any) => dispatch(fetchAllBankAccount(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBankAccountComponent);
