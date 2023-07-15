import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Select, Upload } from "antd";

import { FC, useState } from "react";
import { connect } from "react-redux";
import * as XLSX from "xlsx";
import {
  parseMaterialOnSiteExcel,
  readExcel,
} from "../../../../../../../utilities/utilities";
import { ImportMaterialOnSitePropType } from "./ImportMaterialOnSite.util";

const ImportMaterialOnSite: FC<ImportMaterialOnSitePropType> = ({
  setMaterialOnSite,
  project,
}) => {
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

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFileSelect = (file: any) => {
    readExcel(file).then((workbook) => {
      setExcelData(workbook);
    });
    return false;
  };

  const submit = (value: any) => {
    const parsed = parseMaterialOnSiteExcel(
      excel_data,
      value.sheet_name,
      project.payload?.id
    );
    setMaterialOnSite(parsed);
    handleOk();
  };

  return (
    <>
      <Button type="link" onClick={() => setIsModalVisible(true)}>
        Import from Excel
      </Button>
      <Modal
        title="Import Excel"
        visible={showModal}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={() => form.submit()}
            >
              Set
            </Button>
          </>,
        ]}
      >
        <Form layout="vertical" form={form} onFinish={submit}>
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
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportMaterialOnSite);
