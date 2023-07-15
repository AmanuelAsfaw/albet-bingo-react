import { Button, Form, Modal, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AlignLeftOutlined,
  CheckOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { fetchOneCheckListForm } from "../../../../../../../redux/CheckListForm/CheckListForm.action";
import { ViewCheckListFormPropType } from "./ViewCheckListForm.util";
import { checkListFormItemsBuilder } from "../Edit/EditCheckListForm.util";
import { isNil } from "lodash";

const ViewCheckListComponentComponent: FC<ViewCheckListFormPropType> = ({
  data,
  fetchOne,
  fetchOneCheckListForm,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [checkListFormItems, setCheckListFormItems] = useState<any[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);

  useEffect(() => {
    if (isModalVisible) {
      setCheckListFormItems([]);
      setExpandedKeys([]);

      setTimeout(() => {
        fetchOneCheckListForm(data.id);
      }, 100);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (!fetchOne.isPending && fetchOne.isSuccessful) {
      setLoading(true);
      let temp = checkListFormItemsBuilder(
        fetchOne.payload.check_list_form_items,
        expandedKeys
      );

      reset();
      setLoading(false);

      setCheckListFormItems(temp.data);
      setExpandedKeys(temp.expandedKeys);
    }
  }, [fetchOne]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const reset = () => {
    setCheckListFormItems([]);
    setExpandedKeys([]);
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        View
      </Button>
      <Modal
        centered
        title={
          <h3 style={{ color: "GrayText", fontFamily: "serif" }}>
            {data.name}
          </h3>
        }
        visible={isModalVisible}
        width={1000}
        onCancel={handleOk}
        footer={[<></>]}
      >
        <Form layout="vertical">
          <div className="row">
            <div className="col-4">
              <h4 style={{ color: "GrayText" }} className="mb-3">
                <AlignLeftOutlined /> Checklist
              </h4>
            </div>

            <div className="col-12">
              <Table
                className="checklist-table"
                loading={fetchOne.isPending || loading}
                pagination={false}
                dataSource={checkListFormItems}
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
                      <AlignLeftOutlined
                        className="ml-1 mr-2"
                        style={{ fontSize: 10 }}
                      />
                    ) : (
                      <CheckOutlined
                        className="ml-1 mr-2"
                        style={{ fontSize: 10 }}
                      />
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
                      record?.is_subtitle ? <b>{value}</b> : value,
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
const mapStateToProps = (state: any) => ({
  fetchOne: state.checklist_form.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneCheckListForm: (id: number) => dispatch(fetchOneCheckListForm(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCheckListComponentComponent);
