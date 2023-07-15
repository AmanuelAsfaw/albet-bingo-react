import { Button, DatePicker, Form, Modal, Select, Input } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import {
  AddMemoPropType,
  getReferenceNumber,
  sendData,
} from "../../util/Memo.util";

import {
  LetterType,
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
  zeroPad,
} from "../../../../../../utilities/utilities";
import {
  fetchAllMemo,
  fetchCountMemo,
} from "../../../../../../redux/Memo/Memo.action";
import moment from "moment";
import MemoHeaderComponent from "../../../../../common/MemoHeader/MemoHeader.component";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { Memo } from "../../../../../../redux/Memo/Memo.type";
const AddMemoComponent: FC<AddMemoPropType> = ({
  fetchMemo,
  memos,
  users,
  count,
  fetchMemoCount,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [type, setType] = useState<any>(LetterType.NEW);
  const [selected, setSelected] = useState<Memo | undefined>();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible)
      form.setFieldsValue({
        reference_number: `${
          getReferenceNumber("consultant") + zeroPad(count?.payload?.count + 1)
        }/${moment().format("YYYY")}`,
      });
  }, [count, form, isModalVisible, memos]);

  const Submit = (value: any) => {
    setLoading(true);
    value.from = getUserData().id;
    value.message = value.message.replaceAll("\n", "*---*");
    if (value.reference_id) {
      if (selected?.memo_to?.id) value.to = selected?.memo_from?.id;
    }

    sendData(value)
      .then(() => {
        setSelected(undefined);
        handleOk();
        fetchMemo();
        fetchMemoCount();
        form.resetFields();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.LETTER_REGISTRATION_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.LETTER_REGISTRATION_FAILED,
            e.message
          )
        );
      });
  };

  useEffect(() => {
    if (type === LetterType.RESPONSE && selected)
      form.setFieldsValue({ from: selected.memo_to.id });
    else form.setFieldsValue({ from: getUserData().id });
  }, [type, selected, form]);

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Register Memo
      </Button>
      <Modal
        title="Register Memo"
        className="fixed-modal"
        width={1000}
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
              Send
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
            type: LetterType.NEW,
            from: getUserData().id,
          }}
        >
          <MemoHeaderComponent type={"consultant"} />
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date Required!" }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Type" name="type">
                <Select onChange={(e) => setType(e)}>
                  <Select.Option key="0" value={LetterType.NEW}>
                    {LetterType.NEW}
                  </Select.Option>
                  <Select.Option key="1" value={LetterType.RESPONSE}>
                    {LetterType.RESPONSE}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            {type === LetterType.RESPONSE ? (
              <div className="col-md-12">
                <Form.Item
                  label="Response To"
                  name="reference_id"
                  rules={[{ message: "Response to Required!", required: true }]}
                >
                  <Select
                    placeholder="Reference Number"
                    onChange={(e) =>
                      setSelected(memos.payload.find((memo) => e === memo.id))
                    }
                  >
                    {memos.payload.map((e, index) => {
                      if (e.memo_from.id !== getUserData().id)
                        return (
                          <Select.Option key={index} value={e.id}>
                            {e.reference_number}
                          </Select.Option>
                        );
                      else return null;
                    })}
                  </Select>
                </Form.Item>
              </div>
            ) : null}
            <div className="col-md-3">
              <Form.Item
                label="Reference Number"
                name="reference_number"
                rules={[
                  { required: true, message: "Reference Number Required!" },
                ]}
              >
                <Input bordered={false} />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Subject Required!" }]}
              >
                <Input placeholder="subject" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Message"
                rules={[{ required: true, message: "Please input File" }]}
                name="message"
              >
                <Input.TextArea
                  autoSize={{ minRows: 2, maxRows: 100 }}
                  placeholder="body"
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="From">
                <Input value={getUserData().full_name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              {type === LetterType.RESPONSE ? (
                <Form.Item label="To">
                  <Input value={selected?.memo_from.full_name} />
                </Form.Item>
              ) : (
                <Form.Item
                  label="To"
                  name="to"
                  rules={[{ message: "To Required!", required: true }]}
                >
                  <Select placeholder="user">
                    {users.payload.map((e, index) => (
                      <Select.Option key={index} value={e.id}>
                        {e.full_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
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
  memos: state.memo.fetchAll,
  users: state.user.fetchAll,
  count: state.memo.fetchCount,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMemo: (action: any) => dispatch(fetchAllMemo(action)),

  fetchMemoCount: (action: any) => dispatch(fetchCountMemo(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMemoComponent);
