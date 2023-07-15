import Button from "antd/lib/button";
import React, { FC, useState } from "react";
import { AttachmentPropType, AttachmentObject } from "./Attachment.util";
import { Form, Input, Table, TableColumnProps, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AttachmentComponent: FC<AttachmentPropType> = ({ attachmentAction }) => {
  const [attachments, setAttachments] = attachmentAction;

  const appendItem = () => {
    setAttachments([...attachments, AttachmentObject(Date.now())]);
  };

  const removeItem = (key: any) => {
    if (attachments.length > 1) {
      setAttachments(
        attachments.filter((element: { key: any }) => element.key !== key)
      );
    }
  };

  const onDescriptionChange = (key: any, description: string) => {
    let temp = [...attachments];
    let index = temp.findIndex((ele) => ele.key === key);

    if (index === -1) {
      setAttachments([
        ...attachments,
        {
          key,
          description,
        },
      ]);
    } else {
      temp[index] = { key, description };
      setAttachments(temp);
    }
  };

  const columns: TableColumnProps<{
    description: string;
    key: any;
  }>[] = [
    {
      title: "No.",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Description",
      render: (value, record, index) => (
        <Form.Item
          name={record.key}
          rules={[{ required: true, message: "Please input Description" }]}
        >
          <Input.TextArea
            onChange={(event) =>
              onDescriptionChange(record.key, event.target.value)
            }
            placeholder="description"
          />
        </Form.Item>
      ),
    },
    {
      title: "Attachment",

      render: (value, record, index) => (
        <Form.Item
          className="mb-0"
          name={`attachment_${record.key}`}
          rules={[{ required: true, message: "Please upload Attachment" }]}
        >
          <Upload
            name={`attachment_${record.key}`}
            beforeUpload={() => {
              return false;
            }}
            maxCount={1}
          >
            <Button
              className="btn-outline-secondary"
              icon={<UploadOutlined />}
            ></Button>
          </Upload>
        </Form.Item>
      ),
    },
    {
      title: "Action",
      render: (value, record, index) => (
        <div className="d-flex">
          <Button
            className="btn-outline-secondary"
            onClick={() => removeItem(record.key)}
          >
            -
          </Button>
          <Button
            className="ml-1 btn-outline-secondary"
            onClick={() => appendItem()}
          >
            +
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        size="small"
        columns={columns}
        dataSource={attachments}
        pagination={false}
      />
    </>
  );
};

export default AttachmentComponent;
