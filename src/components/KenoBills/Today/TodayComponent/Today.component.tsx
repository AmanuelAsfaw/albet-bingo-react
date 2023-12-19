import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { TodayPropType, deleteCategory } from "../util/Today.util";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { Button, Popconfirm, Popover, Table } from "antd";
import { CheckCircleFilled, CloseCircleFilled, DeleteOutlined, MoreOutlined, PrinterOutlined } from "@ant-design/icons";

import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";
import { Link, useParams } from "react-router-dom";
import { fetchAllTodayKenoBill } from "../../../../redux/KenoBills/Today/Today.action";
import { TodayKenoBill } from "../../../../redux/KenoBills/Today/Today.type";
import { getMaximumPayout, getMinimumPayout } from "../../../Ticketing/util/Tecketing.UI.util";
import { returnPrintUrl } from "./Today.utils";

const TodayComponent: FC<TodayPropType> = ({ bills, fetchBills }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetchBills();
    console.log('fetchBills');
    
  }, []);

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

  const BooleanUI = (value:any) => {
    if(value)
      return <CheckCircleFilled style={{color: 'green'}}/>
    else
      return <CloseCircleFilled style={{color: 'red'}}/>

  }
  
  return (
    <>
      <div className="d-flex justify-content-end">
        <ReloadButtonComponent onClick={() => fetchBills()} />
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
                render: (value: any, record:any) => {
                  console.log(record);
                  if(record.has_multiple){
                    console.log(record);
                    
                    return <div>{record.sub_bills.map((e:any) => {
                      return <div style={{display: 'flex'}}>
                          {e.selected_numbers}
                          <div style={{backgroundColor: '#007bff', color: 'white', width: '25px', marginLeft: '5px', marginBottom: '2px', borderRadius: '10px'}}>{e.stake}</div>
                        </div>
                    })}</div>
                  }
                  return <div>{value}</div>
                },
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
                    // content={() => renderPopOverContent(record)}
                  >
                    <Link to={returnPrintUrl(record)} style={{'backgroundColor':'#03a0fb', 'color': 'white'}} target="_blank">
                        <PrinterOutlined />
                    </Link>
                  </Popover>
                ),
              },
            ]}
            dataSource={bills.payload.sort((a,b)=> {
              const a_ = a.id? a.id: 0
              const b_ = b.id? b.id: 0
              return b_ - a_
            })}
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
  bills: state.Keno_today_bill.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchBills: (action: any) => dispatch(fetchAllTodayKenoBill(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodayComponent);
