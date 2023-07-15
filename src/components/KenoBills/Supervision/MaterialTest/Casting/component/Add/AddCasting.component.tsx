import React, { FC, useEffect, useState } from "react";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import Modal from "antd/lib/modal/Modal";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { PlusOutlined } from "@ant-design/icons";
import { sendData } from "./AddCasting.util";
import { fetchAllCasting } from "../../../../../../../redux/Casting/Casting.action";
import { connect } from "react-redux";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import moment from "moment";
import { ErrorHandler } from "../../../../../../../utilities/utilities";

const AddCastingComponent: FC<{ fetchAllCasting: Function }> = ({
  fetchAllCasting,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const resetForm = () => {
    form.resetFields();
  };

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const disabledDate = (current: any) => {
    // Can not select days after today or 30 days prior
    return (
      current &&
      (current > moment().endOf("day") ||
        current < moment().subtract(30, "day").endOf("day"))
    );
  };

  const Submit = (value: any) => {
    setLoading(true);

    value.concrete_grade = `${value.concrete_grade_char}-${value.concrete_grade_num}`;

    delete value.concrete_grade_num;
    delete value.concrete_grade_char;

    sendData(value)
      .then(() => {
        setLoading(false);
        handleOk();
        fetchAllCasting();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CASTING_FORM_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CASTING_FORM_FAILED,
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
        Add Casting
      </Button>
      <Modal
        title="New Casting"
        visible={isModalVisible}
        onCancel={handleOk}
        width={800}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Register Casting
            </Button>
          </>,
        ]}
      >
        <Form
          form={form}
          onFinish={Submit}
          layout="vertical"
          initialValues={{
            date: moment(),
            concrete_grade_char: "C",
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select Date" }]}
              >
                <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} />
              </Form.Item>
            </div>

            <div className="col md-4">
              <Form.Item
                label="Block"
                name="block"
                rules={[{ required: true, message: "Please input Block" }]}
              >
                <Input placeholder="block" />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Axis"
                name="axis"
                rules={[{ required: true, message: "Please input Axis" }]}
              >
                <Input placeholder="axis" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item label="Concrete Grade">
                <div className="row">
                  <div className="col-6">
                    <Form.Item
                      name="concrete_grade_char"
                      rules={[
                        {
                          required: true,
                          message: "Please select Field",
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="C">C</Select.Option>
                        <Select.Option value="M">M</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="col-6">
                    <Form.Item
                      name="concrete_grade_num"
                      rules={[
                        {
                          required: true,
                          message: "Provide field",
                        },
                      ]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </div>
                </div>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Structure Type"
                name="structure_type"
                rules={[
                  { required: true, message: "Please input Structure Type" },
                ]}
              >
                <AutoComplete
                  placeholder="structure type"
                  dropdownClassName="certain-category-search-dropdown"
                  options={[
                    {
                      label: "Foundation",
                      options: [
                        { label: "Mat Foundation", value: "Mat Foundation" },
                        {
                          label: "Strip Foundation",
                          value: "Strip Foundation",
                        },
                        {
                          label: "Isolated Foundation",
                          value: "Isolated Foundation",
                        },
                        {
                          label: "Combined Foundation",
                          value: "Combined Foundation",
                        },
                        { label: "Pile Foundation", value: "Pile Foundation" },
                        { label: "Pear Foundation", value: "Pear Foundation" },
                      ],
                    },
                    {
                      label: "Beam",
                      options: [
                        { label: "Grade Beam", value: "Grade Beam" },
                        { label: "Top Tie Beam", value: "Top Tie Beam" },
                        { label: "Beam", value: "Beam" },
                      ],
                    },
                    {
                      label: "Slab",
                      options: [
                        { label: "Flat Slab", value: "Flat Slab" },
                        { label: "Ribbed Slab", value: "Ribbed Slab" },
                        { label: "Waffle Slab", value: "Waffle Slab" },
                        { label: "Solid Slab", value: "Solid Slab" },
                        {
                          label: "Differs in floor level",
                          value: "Differs in floor level",
                        },
                      ],
                    },
                    {
                      label: "Other",
                      options: [
                        {
                          label: "Column",
                          value: "Column",
                        },
                        {
                          label: "Retaining Wall",
                          value: "Retaining Wall",
                        },
                        {
                          label: "Shear Wall",
                          value: "Shear Wall",
                        },
                        {
                          label: "Stairs",
                          value: "Stairs",
                        },
                        {
                          label: "For Lift...pit, shear wall, roof",
                          value: "For Lift...pit, shear wall, roof",
                        },
                        {
                          label: "Road Concrete",
                          value: "Road Concrete",
                        },
                        {
                          label: "Curve stone concrete",
                          value: "Curve stone concrete",
                        },
                      ],
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Source of Concrete"
                name="source_of_concrete"
                rules={[
                  {
                    required: true,
                    message: "Please input Source of Concrete",
                  },
                ]}
              >
                <Select placeholder="source of concrete">
                  <Select.Option value="Cast in Site" key={0}>
                    Cast in Site
                  </Select.Option>
                  <Select.Option value="Batching" key={0}>
                    Batching
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Concrete Slump"
                name="concrete_slump"
                rules={[
                  { required: true, message: "Please input Concrete Slump" },
                ]}
              >
                <Input placeholder="concrete slump" />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Cement Type"
                name="cement_type"
                rules={[
                  { required: true, message: "Please input Cement Type" },
                ]}
              >
                <Input placeholder="cement type" />
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
  fetchAllCasting: (data: any) => dispatch(fetchAllCasting(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCastingComponent);
