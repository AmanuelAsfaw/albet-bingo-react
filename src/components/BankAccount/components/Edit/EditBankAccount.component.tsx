import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { EditBankAccountPropType, sendData } from "./EditBankAccount.util";
import { fetchAllBankAccount } from "../../../../redux/BankAccount/BankAccount.action";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../utilities/utilities";
import {
  LIST_OF_COUNTRIES,
  NotificationType,
} from "../../../../constants/Constants";
import { toNumber } from "lodash";
import moment from "moment";

const EditBankAccountComponent: FC<EditBankAccountPropType> = ({
  fetchAllBankAccount,
  data,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);

    const _data = {
      id: data.id,
      ...value,
    };

    sendData(_data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllBankAccount({});
        OpenNotification(
          NotificationType.SUCCESS,
          "Bank Account updated successfully!",
          ""
        );
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to update Bank Account",
            e.message
          )
        );
      });
  };

  const disabledDate = (current: any) => {
    // Can not select days after today
    return current && current > moment().endOf("day");
  };

  return (
    <>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Edit
      </Button>
      <Modal
        className="fixed-modal"
        width={800}
        centered
        title="Update Bank Account"
        open={isModalVisible}
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
              Save Change
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{ ...data, starting_date: moment(data.starting_date) }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Bank Name"
                name="bank_name"
                rules={[{ required: true, message: "Please input Bank Name" }]}
              >
                <AutoComplete
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
                >
                  <Input placeholder="bank account" />
                </AutoComplete>
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
                <Select placeholder="account type">
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
                <Select placeholder="country">
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
                <Select placeholder="currency">
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
const mapStateToProps = (state: any) => ({
  users: state.user.fetchAll,
});

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
)(EditBankAccountComponent);
