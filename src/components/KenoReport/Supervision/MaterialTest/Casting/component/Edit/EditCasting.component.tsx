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
import { EditCastingComponentPropType, sendData } from "./EditCasting.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllCasting } from "../../../../../../../redux/Casting/Casting.action";

const EditCastingComponentComponent: FC<EditCastingComponentPropType> = ({
  data,
  fetchAllCasting,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);

    value.concrete_grade = `${value.concrete_grade_char}-${value.concrete_grade_num}`;

    delete value.concrete_grade_num;
    delete value.concrete_grade_char;

    sendData(data.id, value)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllCasting();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CASTING_UPDATE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CASTING_UPDATE_FAIL,
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
        title="Edit Casting"
        visible={isModalVisible}
        width={800}
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
          form={form}
          onFinish={Submit}
          layout="vertical"
          initialValues={{
            date: moment(data.date),
            block: data.block,
            axis: data.axis,
            concrete_grade_char: data.concrete_grade?.split("-")[0],
            concrete_grade_num: data.concrete_grade?.split("-")[1],
            structure_type: data.structure_type,
            source_of_concrete: data.source_of_concrete,
            concrete_slump: data.concrete_slump,
            cement_type: data.cement_type,
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select Date" }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </div>

            <div className="col md-4">
              <Form.Item
                label="Block"
                name="block"
                rules={[{ required: true, message: "Please input Block" }]}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Axis"
                name="axis"
                rules={[{ required: true, message: "Please input Axis" }]}
              >
                <Input />
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
                <Select>
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
                <Input />
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
                <Input />
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
  fetchAllCasting: () => dispatch(fetchAllCasting()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCastingComponentComponent);
