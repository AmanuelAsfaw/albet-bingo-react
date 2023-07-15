import { Button, Divider, Form, Input, Modal, Statistic, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AlignLeftOutlined,
  CheckOutlined,
  EyeOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
import { ViewCheckListPropType } from "./ViewCheckList.util";
import { checkListItemObject } from "../Add/AddCheckList.util";
import { isNil } from "lodash";
import moment from "moment";
import { checkListItemsBuilder } from "../Edit/EditCheckList.util";

const ViewCheckListComponentComponent: FC<ViewCheckListPropType> = ({
  data,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [checkListFormItems, setCheckListFormItems] = useState<any>([
    checkListItemObject(Date.now(), null, "1"),
  ]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);

  useEffect(() => {
    if (isModalVisible) {
      setCheckListFormItems([]);
      setExpandedKeys([]);
      setLoading(true);

      setTimeout(() => {
        let temp = checkListItemsBuilder(data.check_list_items, expandedKeys);

        setCheckListFormItems(temp.data);
        setExpandedKeys(temp.expandedKeys);
        setLoading(false);
      }, 100);
    }
  }, [isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
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
        className="fixed-modal"
        onCancel={handleOk}
        footer={[<></>]}
      >
        <Form layout="vertical">
          <div className="row">
            <div className="col-md-12">
              <h4>Project Description</h4>
            </div>

            <br />

            <div className="col-md-3">
              <Statistic
                title="Project Name"
                value={data?.project?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Project Number"
                value={data?.project?.project_no}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Date"
                value={moment(data.date).format("DD/MM/YYYY")}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-3">
              <Statistic
                title="Filled By"
                value={data?.user?.full_name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <Divider />

            <div className="col-md-12">
              <p className="text-left">
                <i>To be filled at the end of each project.</i>
              </p>

              <p className="text-left">
                <i>{data.description}</i>
              </p>

              <p className="text-left">
                <i>
                  <b>Remarks</b> (Things that needs further investigation, major
                  problem observed in the project, lesson learned from this
                  project …)
                </i>
              </p>

              <p className="text-left">
                <i>{data.remark}</i>
              </p>
            </div>

            <Divider />

            <div className="col-4">
              <h4 style={{ color: "GrayText" }} className="mb-3">
                <AlignLeftOutlined /> Checklist
              </h4>
            </div>

            <div className="col-12">
              <Table
                size="small"
                className="checklist-table"
                pagination={false}
                bordered
                loading={loading}
                dataSource={checkListFormItems}
                rowClassName={(record, index) =>
                  !isNil(record.is_subtitle) && record.is_subtitle
                    ? "table-row-dark table-row-large"
                    : "table-row-light table-row-large"
                }
                expandable={{
                  expandedRowKeys: expandedKeys,
                  expandIcon: ({ record }) =>
                    record.is_subtitle ? (
                      <AlignLeftOutlined
                        className="ml-2 mr-2"
                        style={{ fontSize: 10 }}
                      />
                    ) : (
                      <SwapRightOutlined
                        className="ml-2 mr-2"
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
                          !record.is_subtitle &&
                          record.value === "C" && (
                            <CheckOutlined style={{ fontSize: 10 }} />
                          ),
                      },
                      {
                        title: "NC",
                        align: "center",
                        width: 50,
                        render: (value, record) =>
                          !record.is_subtitle &&
                          record.value === "NC" && (
                            <CheckOutlined style={{ fontSize: 10 }} />
                          ),
                      },
                      {
                        title: "NA",
                        align: "center",
                        width: 50,
                        render: (value, record) =>
                          !record.is_subtitle &&
                          record.value === "NA" && (
                            <CheckOutlined style={{ fontSize: 10 }} />
                          ),
                      },
                    ],
                  },
                ]}
              />
            </div>

            <div className="col-12 mt-4">
              <h6>Reviewer Remark</h6>

              <Input.TextArea value={data.reviewer_remark} />
            </div>

            <div className="col-12 mt-2">
              <h6>Approver Remark</h6>

              <Input.TextArea value={data.approver_remark} />
            </div>

            <Divider />

            <div className="col-12">
              <div className="row">
                <div className="col-md-4 text-center">
                  <Statistic
                    title="Designed By"
                    value={
                      !isNil(data?.designed_by)
                        ? data?.designed_by?.full_name
                        : "-"
                    }
                    valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                  />
                </div>

                <div className="col-md-4 text-center">
                  <Statistic
                    title="Reviewed By"
                    value={
                      !isNil(data?.reviewed_by)
                        ? data?.reviewed_by?.full_name
                        : "-"
                    }
                    valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                  />
                </div>

                <div className="col-md-4 text-center">
                  <Statistic
                    title="Approved By"
                    value={
                      !isNil(data?.approved_by)
                        ? data?.approved_by?.full_name
                        : "-"
                    }
                    valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                  />
                </div>
              </div>
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
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCheckListComponentComponent);
