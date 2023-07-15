import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Statistic,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import {
  EditCheckListPropType,
  sendData,
  checkListItemsBuilder,
} from "./EditCheckList.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import CheckListFormItemComponent from "./components/CheckListFormItem/CheckListFormItem.component";
import { fetchOneCheckList } from "../../../../../../../redux/CheckList/CheckList.action";
import moment from "moment";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";

const EditCheckListComponent: FC<EditCheckListPropType> = ({
  data,
  module,
  fetchData,
  users,
  fetchAllUser,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checklistLoading, setChecklistLoading] = useState(false);

  const [form] = Form.useForm();

  const [checkListItems, setCheckListItems] = useState<any>([]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);

  useEffect(() => {
    if (isModalVisible) {
      fetchAllUser();

      setCheckListItems([]);
      setExpandedKeys([]);
      setChecklistLoading(true);

      setTimeout(() => {
        let temp = checkListItemsBuilder(data.check_list_items, expandedKeys);

        setCheckListItems(temp.data);
        setExpandedKeys(temp.expandedKeys);
        setChecklistLoading(false);
      }, 100);
    }
  }, [isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const resetForm = () => {
    form.resetFields();
    setCheckListItems([]);
    setExpandedKeys([]);
  };

  const Submit = (value: any) => {
    const _data = {
      ...value,
      id: data.id,
      date: moment(value.date).format("YYYY-MM-DD"),

      check_list_items: checkListItems,

      module,
      name: data.name,
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
          initialValues={{ ...data, date: moment(data.date) }}
        >
          <div className="row">
            <div className="col-md-3">
              <Statistic
                title="Project Name"
                value={data.project.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Project Number"
                value={data.project.project_no}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3">
              <Form.Item name="date" label="Date">
                <DatePicker />
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Form.Item name="user_id" label="Filled By">
                <Select loading={users.isPending} placeholder="select">
                  {users.payload.map((e) => (
                    <Select.Option value={e.id} key={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Divider />

            <div className="col-md-12">
              <p className="text-left">
                <i>To be filled at the end of each project.</i>
              </p>
            </div>

            <div className="col-md-12">
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="description" rows={3} />
              </Form.Item>
            </div>

            <div className="col-md-12">
              <p className="text-left">
                <i>
                  <b>Remarks</b> (Things that needs further investigation, major
                  problem observed in the project, lesson learned from this
                  project …)
                </i>
              </p>
            </div>

            <div className="col-md-12">
              <Form.Item name="remark" label="Remark">
                <Input.TextArea placeholder="remark" rows={3} />
              </Form.Item>
            </div>

            <Divider />

            <div className="col-12">
              <CheckListFormItemComponent
                dataAction={[checkListItems, setCheckListItems]}
                expandedKeyAction={[expandedKeys, setExpandedKeys]}
                loading={checklistLoading}
              />
            </div>

            <Divider />

            <div className="col-md-12">
              <Form.Item name="reviewer_remark" label="Reviewer Remark">
                <Input.TextArea
                  placeholder="remark"
                  rows={3}
                  disabled={getUserData().id !== data.reviewed_by_id}
                />
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item name="approver_remark" label="Approver Remark">
                <Input.TextArea
                  placeholder="remark"
                  rows={3}
                  disabled={getUserData().id !== data.approved_by_id}
                />
              </Form.Item>
            </div>

            <Divider />

            <div className="col-md-4">
              <Form.Item name="designed_by_id" label="Designed By">
                <Select loading={users.isPending} placeholder="select">
                  {users.payload.map((e) => (
                    <Select.Option value={e.id} key={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item name="reviewed_by_id" label="Reviewed By">
                <Select loading={users.isPending} placeholder="select">
                  {users.payload.map((e) => (
                    <Select.Option value={e.id} key={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item name="approved_by_id" label="Approved By">
                <Select loading={users.isPending} placeholder="select">
                  {users.payload.map((e) => (
                    <Select.Option value={e.id} key={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
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
  fetchOne: state.checklist.fetchOne,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneCheckList: (id: number) => dispatch(fetchOneCheckList(id)),
  fetchAllUser: () => dispatch(fetchAllUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCheckListComponent);
