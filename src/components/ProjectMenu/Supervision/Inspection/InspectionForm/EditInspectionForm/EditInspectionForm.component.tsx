import { Button, Form, Modal, Input, Table } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import {
  EditInspectionFormPropType,
  sendData,
} from "./EditInspectionForm.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import { fetchAllInspectionForm } from "../../../../../../redux/InspectionForm/InspectionForm.action";
import Checkbox from "antd/lib/checkbox/Checkbox";

const EditInspectionFormComponent: FC<EditInspectionFormPropType> = ({
  inspection_form,
  fetchAllInspectionForm,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [inspectionFormData, setInspectionFormData] = useState(inspection_form);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleOnItemChange = (id: number, key: string, value: any) => {
    let temp: any = { ...inspectionFormData };

    let index: number = temp.inspection_form_items?.findIndex(
      (e: any) => e.id === id
    );

    if (index !== -1) {
      temp.inspection_form_items[index] = {
        ...temp.inspection_form_items[index],
        [key]: value,
      };

      setInspectionFormData(temp);
    }
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...inspectionFormData,
      name: value.name,
    };

    sendData(data)
      .then(() => {
        handleOk();
        fetchAllInspectionForm();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.INSPECTION_FORM_EDIT_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.INSPECTION_FORM_EDIT_FAILED,
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
        title="Edit Inspection From"
        width={800}
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
          initialValues={{
            name: inspectionFormData.name,
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Form Name" name="name">
                <Input
                  onChange={(e) =>
                    setInspectionFormData({
                      ...inspectionFormData,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <Table
                pagination={false}
                dataSource={inspectionFormData.inspection_form_items?.map(
                  (item, index) => {
                    return {
                      ...item,
                      key: index,
                    };
                  }
                )}
                columns={[
                  {
                    title: "No",
                    render: (value, record, index) => index + 1,
                  },
                  {
                    title: "Description",
                    render: (value, record) => (
                      <Input.TextArea
                        defaultValue={record.description}
                        onChange={(e) =>
                          handleOnItemChange(
                            record.id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: "Is Subtitle",
                    render: (value, record) => (
                      <Checkbox
                        defaultChecked={record.is_subtitle}
                        onClick={() =>
                          handleOnItemChange(
                            record.id,
                            "is_subtitle",
                            !record.is_subtitle
                          )
                        }
                      />
                    ),
                  },
                ]}
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
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllInspectionForm: () => dispatch(fetchAllInspectionForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditInspectionFormComponent);
