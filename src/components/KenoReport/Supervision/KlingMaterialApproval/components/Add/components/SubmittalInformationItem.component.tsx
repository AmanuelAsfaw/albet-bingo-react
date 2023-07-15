import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { SubmittalInformationItemPropType } from "../../../util/KlingMaterialApproval.util";
import { Button, Checkbox, Table, Upload } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { DownloadFile } from "../../../../../../Document/MyDocument/index.util";
import DocumentViewerComponent from "../../../../../../common/DocumentViewer/DocumentViewer.component";

const SubmittalInformationItemComponent: FC<
  SubmittalInformationItemPropType
> = ({ submittal_info_item, setSubmittalInfoItem, is_new }) => {
  useEffect(() => {}, []);

  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...submittal_info_item];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = {
        ...item,
        [name]: value,
      };
      newData.splice(index, 1, item);
      setSubmittalInfoItem(newData);
    }
  };

  return (
    <>
      <Table
        dataSource={submittal_info_item}
        pagination={false}
        columns={[
          {
            title: "",
            key: "is_checked",
            dataIndex: "is_checked",
            width: "8%",
            render: (value, record) => (
              <Checkbox
                checked={value}
                onChange={(e) =>
                  onChangeHandler(record.key, "is_checked", e.target.checked)
                }
                disabled={!is_new}
              />
            ),
          },
          {
            title: "",
            key: "description",
            dataIndex: "description",
            width: "50%",
          },
          {
            title: "",
            key: "file",
            dataIndex: "file",
            width: "40%",
            render: (value, record) =>
              record.is_checked ? (
               <>
                <Upload
                  className="approval-upload"
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                  onChange={(e) => onChangeHandler(record.key, "file", e.file)}
                  disabled={!is_new}
                >
                  <Button
                    className="btn-outline-secondary px-2"
                    icon={<UploadOutlined />}
                  ></Button>
                </Upload>
               </>
              ) : null,
          },
          {
            title:"",
            key:"document",
            render: (value, record) => record.document? (
              <div className="d-flex">
                <Button
                  type="link"
                  icon={<DownloadOutlined />}
                  className="mr-2"
                  onClick={() => DownloadFile(record.document)}
                ></Button>

                <DocumentViewerComponent document={record.document} />
              </div>
            ):null
          }
        ]}
        title={() => (
          <div className="d-flex justify-content-center align-items-center">
            Items Submitted
          </div>
        )}
      />
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
)(SubmittalInformationItemComponent);
