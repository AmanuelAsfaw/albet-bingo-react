import { Button, Divider, Form, Input, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import {
  EditCheckListFormPropType,
  sendData,
  checkListFormItemsBuilder,
} from "./EditCheckListForm.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import CheckListFormItemComponent from "./components/CheckListFormItem/CheckListFormItem.component";
import { fetchOneCheckListForm } from "../../../../../../../redux/CheckListForm/CheckListForm.action";

const EditCheckListFormComponent: FC<EditCheckListFormPropType> = ({
  data,
  fetchOne,
  fetchOneCheckListForm,
  fetchData,
  module,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checklistsLoading, setChecklistsLoading] = useState(false);

  const [form] = Form.useForm();

  const [checkListFormItems, setCheckListFormItems] = useState<any>([]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);

  useEffect(() => {
    if (isModalVisible) {
      setCheckListFormItems([]);
      setExpandedKeys([]);

      setTimeout(() => {
        fetchOneCheckListForm(data.id);
      }, 100);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (!fetchOne.isPending && fetchOne.isSuccessful) {
      setChecklistsLoading(true);

      let temp = checkListFormItemsBuilder(
        fetchOne.payload.check_list_form_items,
        expandedKeys
      );

      setCheckListFormItems([]);
      setExpandedKeys([]);
      setChecklistsLoading(false);

      setCheckListFormItems(temp.data);
      setExpandedKeys(temp.expandedKeys);
    }
  }, [fetchOne]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const resetForm = () => {
    form.resetFields();
    setCheckListFormItems([]);
    setExpandedKeys([]);
    setChecklistsLoading(false);
  };

  const Submit = (value: any) => {
    const _data = {
      id: data.id,
      name: value.name,
      description: value.description,
      module,
      check_list_form_items: checkListFormItems,
    };

    setLoading(true);

    sendData(_data)
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
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        centered
        width={1000}
        className="fixed-modal"
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
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{ ...data }}
        >
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

            <Divider />

            <div className="col-12">
              <CheckListFormItemComponent
                dataAction={[checkListFormItems, setCheckListFormItems]}
                expandedKeyAction={[expandedKeys, setExpandedKeys]}
                loading={checklistsLoading}
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
  fetchOne: state.checklist_form.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneCheckListForm: (id: number) => dispatch(fetchOneCheckListForm(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCheckListFormComponent);
