import { Checkbox, Form, Table } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { CheckListFormItemPropType } from "./CheckListFormItem.util";
import { AlignLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { isNil } from "lodash";

const CheckListFormItemComponent: FC<CheckListFormItemPropType> = ({
  dataAction,
  expandedKeyAction,
  loading,
}) => {
  const [data, setData] = dataAction;

  const [expandedKeys, setExpandedKeys] = expandedKeyAction;

  useEffect(() => {}, []);

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
      bordered
      pagination={false}
      loading={loading}
      dataSource={data}
      rowClassName={(record, index) =>
        !isNil(record.deleted) && record.deleted === true
          ? "table-row-red table-row-large"
          : !isNil(record.is_subtitle) && record.is_subtitle
          ? "table-row-dark table-row-large"
          : "table-row-light table-row-large"
      }
      expandable={{
        expandedRowKeys: expandedKeys,
        expandIcon: ({ record }) =>
          record.is_subtitle ? (
            <AlignLeftOutlined className="ml-1 mr-2" style={{ fontSize: 10 }} />
          ) : (
            <CheckOutlined className="ml-1 mr-2" style={{ fontSize: 10 }} />
          ),
      }}
      columns={[
        {
          title: "No",
          align: "left",
          width: 150,
          dataIndex: "index",
          render: (value, record) => record.is_numbered && value,
        },
        {
          title: "Description",
          dataIndex: "description",
          render: (value, record) =>
            record.is_subtitle ? <b>{value}</b> : value,
        },
        {
          title: (
            <>
              Check (<CheckOutlined style={{}} />)
            </>
          ),
          align: "center",
          width: 100,
          children: [
            {
              title: "C",
              align: "center",
              width: 50,
              render: (value, record) =>
                !record.is_subtitle && (
                  <Form.Item name={`is_subtitle_${record.key}`}>
                    <Checkbox
                      checked={record.value === "C"}
                      onClick={() =>
                        onChange(
                          record.key,
                          record.parent_id,
                          "value",
                          record.value === "C" ? null : "C"
                        )
                      }
                    />
                  </Form.Item>
                ),
            },
            {
              title: "NC",
              align: "center",
              width: 50,
              render: (value, record) =>
                !record.is_subtitle && (
                  <Form.Item name={`is_subtitle_${record.key}`}>
                    <Checkbox
                      checked={record.value === "NC"}
                      onClick={() =>
                        onChange(
                          record.key,
                          record.parent_id,
                          "value",
                          record.value === "NC" ? null : "NC"
                        )
                      }
                    />
                  </Form.Item>
                ),
            },
            {
              title: "NA",
              align: "center",
              width: 50,
              render: (value, record) =>
                !record.is_subtitle && (
                  <Form.Item name={`is_subtitle_${record.key}`}>
                    <Checkbox
                      checked={record.value === "NA"}
                      onClick={() =>
                        onChange(
                          record.key,
                          record.parent_id,
                          "value",
                          record.value === "NA" ? null : "NA"
                        )
                      }
                    />
                  </Form.Item>
                ),
            },
          ],
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
)(CheckListFormItemComponent);
