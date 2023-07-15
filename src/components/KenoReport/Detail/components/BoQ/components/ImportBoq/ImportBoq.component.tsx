import { UploadOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import { ImportBoQPropType, saveChanges } from "./ImportBoq.util";

import * as XLSX from "xlsx";
import { Button, Form, Modal, Select, Upload } from "antd";
import {
  ErrorHandler,
  parseBoQExcel,
  readExcel,
} from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import { fetchOneProjects } from "../../../../../../../redux/Project/Project.action";
import { connect } from "react-redux";
const ImportBoQComponent: FC<ImportBoQPropType> = ({
  project,
  fetchOneProject,
}) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setIsModalVisible] = useState(false);
  const [excel_data, setExcelData] = useState<XLSX.WorkBook>();

  const [form] = Form.useForm();

  const fileChecker = (rule: any, value: any) => {
    if (value === undefined) return Promise.reject("Please input File !");
    else if (value.fileList.length > 1) {
      return Promise.reject("Can not import multiple files");
    }
    return Promise.resolve();
  };

  const resetForm = () => {
    form.resetFields();
  };

  const onFileSelect = (file: any) => {
    readExcel(file).then((workbook) => {
      setExcelData(workbook);
    });
    return false;
  };

  const submit = (value: any) => {
    setLoading(true);
    const parsed: any = parseBoQExcel(excel_data, value.sheet_name);

    let temp = [...parsed].map((e, index) => ({
      ...e,
      key: index,
      project_id: e.project_id ? e.project_id : project.payload?.id,
    }));
    // setData(temp);
    const boqDatas = {
      boqs: temp,
      project_id: project.payload?.id,
      type: value.type,
    };
    saveChanges(boqDatas)
      .then(() => {
        resetForm();
        setIsModalVisible(false);
        fetchOneProject(project.payload?.id);
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "Contract Boq Saved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save contract boq",
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button type="link" onClick={() => setIsModalVisible(true)}>
        {"Import from Excel"}
      </Button>
      <Modal
        title="Import Excel"
        visible={showModal}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={submit}
          initialValues={{ type: "add" }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="File"
                name="file"
                rules={[{ validator: fileChecker, required: true }]}
              >
                <Upload
                  accept=".xls,.xlsx"
                  name="file"
                  beforeUpload={onFileSelect}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button>
                    <UploadOutlined /> Select a File
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                <Select>
                  <Select.Option key={0} value={"add"}>
                    Add
                  </Select.Option>
                  <Select.Option key={0} value={"replace"}>
                    Replace
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Sheet Name"
                name="sheet_name"
                rules={[{ required: true, message: "Sheet Name Required!" }]}
              >
                <Select
                  placeholder="Select"
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                >
                  {excel_data?.SheetNames.map((e, index) => (
                    <Select.Option key={index} value={e}>
                      {e}
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
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneProject: (action: any) => dispatch(fetchOneProjects(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportBoQComponent);
