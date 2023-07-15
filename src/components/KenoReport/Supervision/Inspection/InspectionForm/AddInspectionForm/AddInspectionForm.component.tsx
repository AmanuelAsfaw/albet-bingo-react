import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import React, { FC, useState } from "react";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { AddInspectionFormPropType, sendData } from "./AddInspectionForm.util";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { fetchAllInspectionForm } from "../../../../../../redux/InspectionForm/InspectionForm.action";
import Modal from "antd/lib/modal/Modal";
import {
  InspectionFormItemObject,
  parseInspectionFormData,
} from "./AddInspectionForm.util";
import Table from "antd/lib/table";

const AddInspectionComponent: FC<AddInspectionFormPropType> = ({
  fetchAllInspectionForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inspectionItems, setInspectionItems] = useState<
    { key: any; description: any; is_subtitle: boolean }[]
  >([InspectionFormItemObject(Date.now())]);

  const resetForm = () => {
    form.resetFields();
    setInspectionItems([InspectionFormItemObject(Date.now())]);
  };

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const onChange = (key: any, value: string) => {
    let temp = inspectionItems;
    let index = temp.findIndex((ele) => ele.key === key);
    temp[index] = { ...temp[index], description: value };
    setInspectionItems(temp);
  };

  const appendItem = () => {
    setInspectionItems([
      ...inspectionItems,
      InspectionFormItemObject(Date.now()),
    ]);
  };

  const removeItem = (key: any) => {
    if (inspectionItems.length > 1) {
      setInspectionItems(
        inspectionItems.filter((element) => element.key !== key)
      );
    }
  };

  const toggleIsSubtitle = (key: any) => {
    let temp = inspectionItems;
    let index = temp.findIndex((ele) => ele.key === key);
    temp[index] = { ...temp[index], is_subtitle: !temp[index].is_subtitle };
    setInspectionItems(temp);
  };

  const Submit = (value: any) => {
    const parsed = parseInspectionFormData(value, inspectionItems);

    setLoading(true);
    sendData(parsed)
      .then(() => {
        resetForm();
        handleOk();
        setLoading(false);
        fetchAllInspectionForm();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.INSPECTION_FORM_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.INSPECTION_FORM_FAILED,
            e.message
          )
        );
      });
  };

  const columns = [
    {
      title: "Inspection Description",
      dataIndex: "description",
      render: (value: any, record: any, index: number) => (
        <Form.Item
          name={record.key}
          rules={[
            {
              required: true,
              message: "Please provide this Inspection Item or remove it",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Description"
            onChange={(event) => onChange(record.key, event.target.value)}
            value={record.description}
          />
        </Form.Item>
      ),
    },
    {
      title: "Is Subtitle",
      render: (value: any, record: any) => (
        <Form.Item name={`${record.key}_isSub`} className="mb-0">
          <Input
            type="checkbox"
            onChange={(event) => toggleIsSubtitle(record.key)}
          />
        </Form.Item>
      ),
    },
    {
      title: "Action",
      render: (value: any, record: any) => (
        <div className="d-flex">
          <Button type="dashed" onClick={() => removeItem(record.key)}>
            -
          </Button>
          <Button type="dashed" className="ml-1" onClick={() => appendItem()}>
            +
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Add Inspection Form
      </Button>
      <Modal
        title="Create Inspection Form"
        centered
        className="fixed-modal"
        visible={isModalVisible}
        onCancel={handleOk}
        width={700}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Create
            </Button>
          </>,
        ]}
      >
        <Form form={form} onFinish={Submit} layout="vertical">
          <div>
            <Form.Item
              label="Inspection Name"
              name="inspection_name"
              className="col-5 pl-0"
              rules={[
                { required: true, message: "Please input Inspection Name" },
              ]}
            >
              <Input placeholder="Inspection Name" />
            </Form.Item>
          </div>

          <Table
            className="inspection-table"
            columns={columns}
            dataSource={inspectionItems}
            pagination={false}
          />
        </Form>

        {/* <div className="col-12 mt-3 text-center">
						<Button style={{width: 300, alignSelf: 'center'}} type="dashed" onClick={() => appendItem()}>+</Button>
				</div> */}
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
  fetchAllInspectionForm: () => dispatch(fetchAllInspectionForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddInspectionComponent);
