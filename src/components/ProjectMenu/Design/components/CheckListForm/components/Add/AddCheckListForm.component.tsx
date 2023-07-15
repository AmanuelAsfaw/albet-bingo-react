import { Button, Divider, Form, Input, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import {
  AddCheckListFormPropType,
  checkListFormItemObject,
  sendData,
} from "./AddCheckListForm.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import CheckListFormItemComponent from "./components/CheckListFormItem/CheckListFormItem.component";

const AddCheckListFormComponent: FC<AddCheckListFormPropType> = ({
  module,
  fetchData,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [checkListFormItems, setCheckListFormItems] = useState<any>([
    checkListFormItemObject(Date.now(), null, "1"),
  ]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const resetForm = () => {
    form.resetFields();
    setCheckListFormItems([checkListFormItemObject(Date.now(), null, "1")]);
  };

  const Submit = (value: any) => {
    const data = {
      name: value.name,
      description: value.description,
      module: module,
      check_list_form_items: checkListFormItems,
    };

    setLoading(true);

    sendData(data)
      .then(() => {
        handleOk();
        resetForm();
        setLoading(false);
        fetchData();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CHECK_LIST_FORM_REGISTERED_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CHECK_LIST_FORM_REGISTERED_FAIL,
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
        New Checklist Form
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1000}
        title="Register Checklist Form"
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
              Register
            </Button>
          </>,
        ]}
      >
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="name"
                label="Form Name"
                rules={[{ required: true, message: "field required" }]}
              >
                <Input placeholder="form name" />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Button
                style={{ float: "right" }}
                className="btn-outline"
                htmlType="reset"
                onClick={resetForm}
                type="text"
              >
                Clear
              </Button>
            </div>

            <Divider />

            <div className="col-12">
              <CheckListFormItemComponent
                dataAction={[checkListFormItems, setCheckListFormItems]}
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCheckListFormComponent);
