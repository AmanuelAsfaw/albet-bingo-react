import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";

import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { Button, Card, DatePicker, Form, Input, Popconfirm, Popover, Select, Table } from "antd";
import { DeleteOutlined, MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";

import { fetchOneData } from "../../../../redux/KenoReport/AnyDayInstantReport/InstantReport.action";
import { Link, useParams } from "react-router-dom";
import moment, { Moment } from "moment";
import { DailyPropType, deleteSubCategory } from "../util/Today.util";

import "./scanner.css"

const { RangePicker } = DatePicker;

const AnyDayInstantComponent: FC<DailyPropType> = ({
    summary,
    fetchSummary,
}) => {
  const today = new Date();
  today.setDate(today.getDate() -1)
  const [loading, setLoading] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState<any>();
  const [dateFilter, setDateFilter] = useState<any>(null);
  const [dateFilterStart, setDateFilterStart] = useState<Moment|null>(null);
  const [dateFilterEnd, setDateFilterEnd] = useState<Moment|null>(null);
  const [date, setDate] = useState(moment().format("MM-DD-YYYY"))
  const [endDate, setEndDate] = useState(Date.now().toString())
  const [startDate, setStartDate] = useState(today.getTime())
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [form] = Form.useForm();
  
  const { id } = useParams();

  // "albet://type=3&casher=user1&branch=Jemo1&date=1233455234&startdate=547234234&enddate=12345098763&bets=8760&tickets=407&redeemed=6960&balance=1800";
  var print_url = "albet://type=3&casher="+summary.payload.casher+"&branch="+summary.payload.branch+"&date="+Date.now().toString()+"&startdate="+startDate+"&enddate="+endDate+"&bets="+summary.payload.total_stake+"&tickets="+summary.payload.count_total_bills+
  "&redeemed="+summary.payload.total_loss+"&balance="+summary.payload.net_profit;

  useEffect(() => {
    fetchSummary({date})
  }, [date]);

  const RemoveCategory = (record: any) => {
    setLoading(true);
    deleteSubCategory(record.id)
      .then(() => {
        setLoading(false);
        fetchSummary({ start: dateFilterStart, end: dateFilterEnd });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.SUB_CATEGORY_DELETE_FAIL,
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.SUB_CATEGORY_DELETE_FAIL,
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
  
  const GetSummary = () => {
    fetchSummary({date})
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-end">
          
            {/* <Button style={{paddingBottom: '35px', marginLeft: '10px'}}>Get</Button> */}
        </div>
        <div className="d-flex justify-content-end">
          <ReloadButtonComponent
            onClick={() =>
                fetchSummary({date})
            }
          /> 
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
            <Card title={`Instant Report`}
                loading={loading}
                hoverable
                actions={[
                  <Button style={{paddingBottom: '35px'}}>
                    
                    <Link to={print_url} style={{
                                backgroundColor: "#0033a1",
                                color: "white",
                                paddingLeft: '12px',
                                paddingRight: '12px',
                                paddingTop: '7px',
                                paddingBottom: '7px',
                                borderRadius: '10px',
                                }}><PrinterOutlined/></Link>
                  </Button>,
                  <Button style={{paddingBottom: '35px'}}
                    onClick={() =>{
                      console.log(date);
                      
                      fetchSummary({date})}
                  }>Get</Button>
                ]}
                >
                  <div>
                      <div className="col-md-2 mb-3">
                        <Form
                          form={form}
                          initialValues={{
                            date: moment()
                        }}>
                          <Form.Item
                            name="date"
                            rules={[{ required: true, message: "Date Required!" }]}
                          >
                            <DatePicker onChange={(e) => {
                              console.log(e?.format("MM-DD-YYYY"));
                              console.log(moment().format("MM-DD-YYYY"));
                              console.log(moment('07-18-2013', 'MM-DD-YYYY').utc().toLocaleString());
                              
                              if(e?.format("MM-DD-YYYY")){
                                setDate(e?.format("MM-DD-YYYY"))
                              }
                              }}/>
                          </Form.Item>
                          
                        </Form>
                      </div>
                    
                  </div>
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Canceled Value</b> <div className="scanner_draw_row_selected">
                      {summary.payload.total_canceled_value} ETB
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Canceled Transactions</b> <div className="scanner_draw_row_selected">
                    {summary.payload.count_canceled}
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Redeemed Transactions</b> <div className="scanner_draw_row_selected">
                    {summary.payload.count_redeemed}
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Redeemed Value</b> <div className="scanner_draw_row_selected">
                    {summary.payload.paid_for_winner} ETB
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Net Transactions</b> <div className="scanner_draw_row_selected">
                    {summary.payload.count_total_bills - summary.payload.count_canceled}
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Net Profit</b> <div className="scanner_draw_row_selected">
                    {summary.payload.net_profit} ETB
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Total Loss</b> <div className="scanner_draw_row_selected">
                      {summary.payload.total_loss} ETB
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Total Games</b> <div className="scanner_draw_row_selected">
                      {summary.payload.total_games}
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Total Bills</b> <div className="scanner_draw_row_selected">
                      {summary.payload.count_total_bills}
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Total Stake with cancel</b> <div className="scanner_draw_row_selected">
                      {summary.payload.total_bill_value} ETB
                    </div>
                  </div>

                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Total Stake with out cancel</b> <div className="scanner_draw_row_selected">
                      {summary.payload.total_stake} ETB
                    </div>
                  </div>
                </Card>
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
    summary: state.keno_any_day_instant_report.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSummary: (action: any) => dispatch(fetchOneData(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnyDayInstantComponent);
