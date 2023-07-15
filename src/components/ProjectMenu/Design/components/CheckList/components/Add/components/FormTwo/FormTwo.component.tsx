import { Divider, Form, Select } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormTwoPropType } from "./FormTwo.util";
import { fetchOneCheckListForm } from "../../../../../../../../../redux/CheckListForm/CheckListForm.action";
import { checkListFormItemsBuilder } from "../../AddCheckList.util";
import { isNil } from "lodash";
import { CheckListForm } from "../../../../../../../../../redux/CheckListForm/CheckListForm.type";
import CheckListFormItemComponent from "../CheckListFormItem/CheckListFormItem.component";
import { DesignTabs } from "../../../../../../../../../constants/Constants";
import moment from "moment";
import {
  ApiCallState,
  resetApiCallState,
} from "../../../../../../../../../redux/Utils";

const FormTwoComponent: FC<FormTwoPropType> = ({
  module,
  dataAction,
  submitAction,
  resetAction,
  sendData,
  users,
  checkListForm,
  fetchOneCheckListForm,
  architecturalCheckListForms,
  structuralCheckListForms,
  plumbingCheckListForms,
  mechanicalCheckListForms,
  electricalCheckListForms,
  fireFightingCheckListForms,
  specialSystemCheckListForms,
  sanitaryCheckListForms,
}) => {
  const [form] = Form.useForm();
  const [data] = dataAction;
  const [submit, setSubmitAction] = submitAction;
  const [reset, setReset] = resetAction;

  const [selectedForm, setSelectedForm] = useState<number | null>(
    data?.check_list_form_id || null
  );

  const [checkListItems, setCheckListItems] = useState<any>([]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);

  useEffect(() => {
    if (!isNil(selectedForm)) {
      setCheckListItems([]);
      setExpandedKeys([]);

      fetchOneCheckListForm(selectedForm);
    }
  }, [selectedForm]);

  useEffect(() => {
    if (!checkListForm.isPending && checkListForm.isSuccessful) {
      let temp = checkListFormItemsBuilder(
        checkListForm.payload.check_list_form_items,
        expandedKeys
      );

      setCheckListItems(temp.data);
      setExpandedKeys(temp.expandedKeys);
    }
  }, [checkListForm]);

  useEffect(() => {
    if (submit) {
      form.submit();
      setSubmitAction(false);
    }

    if (reset) {
      resetForm();
      setReset(false);
    }
  }, [submit, reset, data]);

  const getData = () => {
    switch (module) {
      case DesignTabs.STRUCTURAL:
        return structuralCheckListForms;

      case DesignTabs.ARCHITECTURE:
        return architecturalCheckListForms;

      case DesignTabs.PLUMBING:
        return plumbingCheckListForms;

      case DesignTabs.MECHANICAL:
        return mechanicalCheckListForms;

      case DesignTabs.ELECTRICAL:
        return electricalCheckListForms;

      case DesignTabs.FIRE_FIGHTING:
        return fireFightingCheckListForms;

      case DesignTabs.SPECIAL_SYSTEM:
        return specialSystemCheckListForms;

      case DesignTabs.SANITARY:
        return sanitaryCheckListForms;

      default:
        return resetApiCallState([]);
    }
  };

  const checkListForms: ApiCallState<CheckListForm[]> = getData();

  const resetForm = () => {
    form.resetFields();
    setCheckListItems([]);
    setExpandedKeys([]);
    setSelectedForm(null);
  };

  const Submit = (value: any) => {
    sendData({
      ...data,
      date: moment(data.date).format("YYYY-MM-DD"),
      check_list_items: checkListItems,
      module,
      designed_by_id: value.designed_by_id,
      reviewed_by_id: value.reviewed_by_id,
      approved_by_id: value.approved_by_id,
      name: checkListForm.payload.name,
    });
  };

  return (
    <Form
      layout="vertical"
      onFinish={Submit}
      form={form}
      initialValues={{ ...data }}
    >
      <div className="row">
        <div className="col-md-4">
          <Form.Item
            name="check_list_form_id"
            label="Checklist Form"
            rules={[{ required: true, message: "Please select form" }]}
          >
            <Select
              placeholder="select form"
              onSelect={(e: any) => setSelectedForm(e)}
              loading={checkListForms.isPending}
            >
              {checkListForms.payload.map((item: CheckListForm) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {selectedForm && (
          <div className="col-12">
            <CheckListFormItemComponent
              dataAction={[checkListItems, setCheckListItems]}
              expandedAction={[expandedKeys, setExpandedKeys]}
            />
          </div>
        )}

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
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  users: state.user.fetchAll,
  checkListForm: state.checklist_form.fetchOne,
  structuralCheckListForms: state.checklist_form.fetchAllStructural,
  architecturalCheckListForms: state.checklist_form.fetchAllArchitecture,
  plumbingCheckListForms: state.checklist_form.fetchAllPlumbing,
  mechanicalCheckListForms: state.checklist_form.fetchAllMechanical,
  electricalCheckListForms: state.checklist_form.fetchAllElectrical,
  fireFightingCheckListForms: state.checklist_form.fetchAllFireFighting,
  specialSystemCheckListForms: state.checklist_form.fetchAllSpecialSystem,
  sanitaryCheckListForms: state.checklist_form.fetchAllSanitary,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneCheckListForm: (id: any) => dispatch(fetchOneCheckListForm(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormTwoComponent);
