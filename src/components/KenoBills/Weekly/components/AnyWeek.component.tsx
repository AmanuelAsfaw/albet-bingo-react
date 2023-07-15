import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { AnyWeekPropType, deleteCategory } from "../util/Weekly.util";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { Button, DatePicker, Form, Popconfirm, Popover, Select, Table } from "antd";
import { CheckCircleFilled, CloseCircleFilled, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";
import { useParams } from "react-router-dom";
import { fetchAllAnyWeekKenoBill } from "../../../../redux/KenoBills/AnyWeekBill/AnyWeekBill.action";

const AnyWeekComponent: FC<AnyWeekPropType> = ({ bills, fetchBills }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<any>(null);
  const { id } = useParams();
  const [form] = Form.useForm();

  const RemoveCategory = (record: any) => {
    setLoading(true);
    deleteCategory(record.id)
      .then(() => {
        setLoading(false);
        fetchBills({ project_id: id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CATEGORY_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CATEGORY_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const renderPopOverContent = (record: any) => {
    return (
      <div className="d-flex flex-column">
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={() => RemoveCategory(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            loading={loading}
            type="text"
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
    );
  };

  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

  const BooleanUI = (value:any) => {
    if(value)
      return <CheckCircleFilled style={{color: 'green'}}/>
    else
      return <CloseCircleFilled style={{color: 'red'}}/>

  }
  
  const GetBills = () => {
    if (date)
      fetchBills({ date: date });
    else
      console.log('date is null');
      
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        
        <div style={{width: '100%'}}>
            <div className="col-md-2 mb-3">
              <Form
                form={form}
                initialValues={{
                  game: 100
              }}>
                <div style={{display: "flex", width: '650px'}}>
                  <div className="col-md-3 mb-3">
                    <Form.Item
                          name="date"
                          rules={[{ required: true, message: "Date Required!" }]}
                    >
                      <DatePicker  picker="week" onChange={(e) => {
                        console.log(e?.format("MM-DD-YYYY"));
                        setDate(e?.format("MM-DD-YYYY"))
                        
                      }}/>
                    </Form.Item>
                  </div>
                  <div className="col-md-3 mb-3">
                    <Button style={{paddingBottom: '35px'}} onClick={() => GetBills()} >Get</Button>
                  </div>
                </div>
                
              </Form>
            </div>
          
        </div>
        <ReloadButtonComponent onClick={() => GetBills()} />
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            columns={[
              {
                title: "No.",
                dataIndex: "no",
                width: "50px",
                render: (record: any, value: any, index: any) => index + 1,
              },
              {
                title: "Date",
                dataIndex: "date",
                render: (value: any) => value,
              },
              {
                title: "Game",
                dataIndex: "game",
                render: (value: any, record) => record?.game?.game_number,
              },
              {
                title: "Unique Key",
                dataIndex: "unique_key",
                render: (value: any) => value,
              },
              {
                title: "Selected Numbers",
                dataIndex: "selected_numbers",
                render: (value: any) => value,
              },
              {
                title: "Stake",
                dataIndex: "stake",
                render: (value: any) => value,
              },
              {
                title: "Winner",
                dataIndex: "is_winner",
                render: (value: any) => BooleanUI(value),
              },
              {
                title: "Paid",
                dataIndex: "is_paid",
                render: (value: any) => BooleanUI(value),
              },
              {
                title: "Canceled",
                dataIndex: "is_canceled",
                render: (value: any) => BooleanUI(value),
              },
              {
                title: "Redeemed",
                dataIndex: "is_redeemed",
                render: (value: any) => BooleanUI(value),
              },

              {
                title: "Action",
                fixed: "right",
                render: (record: any) => (
                  <Popover
                    placement="top"
                    overlayClassName="action-popover"
                    trigger="focus"
                    zIndex={2000}
                    content={() => renderPopOverContent(record)}
                  >
                    <Button
                      icon={<MoreOutlined />}
                      className="btn-outline-secondary border-0"
                    ></Button>
                  </Popover>
                ),
              },
            ]}
            dataSource={bills.payload}
            loading={bills.isPending}
          />
        </div>
      </div>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  bills: state.Keno_any_week_bill.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchBills: (action: any) => dispatch(fetchAllAnyWeekKenoBill(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnyWeekComponent);
