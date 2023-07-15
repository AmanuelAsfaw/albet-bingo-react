import { Button, Checkbox, Form, Input, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CheckListFormItemPropType } from "./CheckListFormItem.util";
import {
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  AlignLeftOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import {
  checkListFormItemObject,
  childIndexGenerator,
  parentIndexGenerator,
} from "../../EditCheckListForm.util";
import { isNil } from "lodash";

const CheckListFormItemComponent: FC<CheckListFormItemPropType> = ({
  dataAction,
  fetchOne,
  expandedKeyAction,
  loading,
}) => {
  const [data, setData] = dataAction;

  const [expandedKeys, setExpandedKeys] = expandedKeyAction;

  useEffect(() => {}, []);

  const append = (key: any) => {
    let temp = [...data];

    if (isNil(key)) {
      let _key = Date.now();
      temp.push(
        checkListFormItemObject(_key, null, parentIndexGenerator(data))
      );

      setData(temp);
    } else {
      appendIterator(key, temp);
      setData(temp);
    }
  };

  const appendIterator = (key: any, children: any[]) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].key === key) {
        let _key = Date.now();

        children[i].children.push(
          checkListFormItemObject(
            _key,
            children[i].id,
            childIndexGenerator(children[i].index, children[i].children)
          )
        );
        return;
      }

      if (children[i].children && children[i].children.length > 0) {
        appendIterator(key, children[i].children);
      }
    }
  };

  const remove = (record: any) => {
    let { key, parent_id } = record;
    let temp = [...data];

    if (isNil(parent_id)) {
      let index = temp.findIndex((e: any) => e.key === key);

      if (index !== -1) {
        if (!isNil(temp[index].id)) temp[index].deleted = true;
        else temp = temp.filter((e) => e.key !== key);

        setData(temp);
      }
    } else {
      removeIterator(key, parent_id, temp);
      setData(temp);
    }
  };

  const removeIterator = (key: any, parent_id: any, children: any[]) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === parent_id) {
        let index = children[i].children.findIndex((e: any) => e.key === key);

        if (index !== -1) {
          if (!isNil(children[i].children[index].id)) {
            children[i].children[index] = {
              ...children[i].children[index],
              deleted: true,
            };
            return;
          } else {
            children[i].children = children[i].children.filter(
              (e: any) => e.key !== key
            );
            return;
          }
        }
      }

      if (children[i].children && children[i].children.length > 0) {
        removeIterator(key, parent_id, children[i].children);
      }
    }
  };

  const onChange = (key: any, parent_id: any, selector: any, value: any) => {
    if (isNil(parent_id)) {
      let index = data.findIndex((e: any) => e.key === key);

      if (index !== -1) {
        let temp = [...data];

        temp[index] = { ...temp[index], [selector]: value, updated: true };

        setData(temp);
      }
    } else {
      let temp = [...data];

      onChangeIterator(key, selector, value, temp);
      setData(temp);
    }
  };

  const onChangeIterator = (
    key: any,
    selector: any,
    value: any,
    children: any[]
  ) => {
    for (let i = 0; i < children.length; i++) {
      if (children[i].key === key) {
        children[i] = { ...children[i], [selector]: value, updated: true };
        return;
      }

      if (children[i].children && children[i].children.length > 0) {
        onChangeIterator(key, selector, value, children[i].children);
      }
    }
  };

  return (
    <Table
      size="small"
      className="checklist-table"
      pagination={false}
      loading={fetchOne.isPending || loading}
      dataSource={data}
      rowClassName={(record, index) =>
        !isNil(record.deleted) && record.deleted === true
          ? "table-row-red"
          : !isNil(record.is_subtitle) && record.is_subtitle
          ? "table-row-dark"
          : "table-row-light"
      }
      expandable={{
        expandedRowKeys: expandedKeys,
        expandIcon: ({ record }) =>
          record.is_subtitle ? (
            <AlignLeftOutlined className="ml-1 mr-2" style={{ fontSize: 10 }} />
          ) : (
            <MinusOutlined className="ml-1 mr-2" style={{ fontSize: 10 }} />
          ),
      }}
      columns={[
        {
          title: "No",
          align: "left",
          width: 150,
          dataIndex: "index",
          render: (value, record) => (
            <>
              {value}
              <Button
                className="ml-2"
                style={{
                  width: 17,
                  height: 17,
                  backgroundColor: "#0033a1",
                  color: "white",
                }}
                type="default"
                onClick={() => append(record.key)}
                icon={<PlusOutlined style={{ fontSize: 10 }} />}
              />
            </>
          ),
        },
        {
          title: "Description",
          render: (value, record) => (
            <Form.Item
              name={`description_${record.key}`}
              rules={[{ required: true, message: "field required" }]}
              initialValue={record.description}
            >
              {record.is_subtitle ? (
                <Input
                  bordered={false}
                  placeholder="title"
                  onChange={(e) =>
                    onChange(
                      record.key,
                      record.parent_id,
                      "description",
                      e.target.value
                    )
                  }
                />
              ) : (
                <Input.TextArea
                  bordered={false}
                  placeholder="description"
                  onChange={(e) =>
                    onChange(
                      record.key,
                      record.parent_id,
                      "description",
                      e.target.value
                    )
                  }
                />
              )}
            </Form.Item>
          ),
        },
        {
          title: "Is title",
          align: "center",
          width: 100,
          render: (value, record) => (
            <Checkbox
              checked={record.is_subtitle}
              onClick={() =>
                onChange(
                  record.key,
                  record.parent_id,
                  "is_subtitle",
                  !record.is_subtitle
                )
              }
            />
          ),
        },
        {
          title: "Is number",
          align: "center",
          width: 100,
          render: (value, record) => (
            <Checkbox
              checked={record.is_numbered}
              onClick={() =>
                onChange(
                  record.key,
                  record.parent_id,
                  "is_numbered",
                  !record.is_numbered
                )
              }
            />
          ),
        },
        {
          title: "Action",
          align: "center",
          width: 100,
          render: (value, record, index) => (
            <div className="d-flex justify-content-center">
              {record.deleted ? (
                <div className="px-2">
                  <CloseOutlined
                    onClick={() =>
                      onChange(record.key, record.parent_id, "deleted", null)
                    }
                  />
                </div>
              ) : (
                <>
                  <div className="px-2">
                    <PlusOutlined onClick={() => append(record.parent_id)} />
                  </div>
                  {(index > 0 || !isNil(record.parent_id)) && (
                    <div className="px-2">
                      {isNil(record.id) ? (
                        <MinusOutlined onClick={() => remove(record)} />
                      ) : (
                        <DeleteOutlined
                          style={{ color: "red" }}
                          onClick={() => remove(record)}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ),
        },
      ]}
    />
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  fetchOne: state.checklist_form.fetchOne,
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
)(CheckListFormItemComponent);
