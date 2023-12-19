import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  A_GameAnyDayPropType,
    A_GamePropType,
    deleteSubCategory,
} from "../util/Today.util";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { Button, Card, DatePicker, Form, Input, Popconfirm, Popover, Select, Table } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";

import { fetchOneData } from "../../../../redux/KenoReport/A-GameAnyDayReport/A-GameAnyDayReport.action";
import { useParams } from "react-router-dom";
import moment, { Moment } from "moment";
import { toNumber } from "lodash";

// import "./scanner.css"

const { RangePicker } = DatePicker;

const A_GameComponent: FC<A_GameAnyDayPropType> = ({
    summary,
    fetchSummary,
}) => {
  const [loading, setLoading] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState<any>();
  const [dateFilter, setDateFilter] = useState<any>(null);
  const [dateFilterStart, setDateFilterStart] = useState<Moment|null>(null);
  const [dateFilterEnd, setDateFilterEnd] = useState<Moment|null>(null);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [form] = Form.useForm();
  
  const [date, setDate] = useState<any>(null);
  const [game, setGame] = useState<number>(100);
  const { id } = useParams();

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
  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

  const GetSummary = () => {
    console.log('GetSummary');
    
    if(date && game)
      fetchSummary({date, game})
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
              GetSummary()
            }
          /> 
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
            <Card title={`Any-Day Report by A Game`}
                loading={loading}
                hoverable
                actions={[
                  <div></div>,
                  <Button style={{paddingBottom: '35px'}} onClick={() => GetSummary()}>Get</Button>
                ]}
                >
                  <div>
                      <div className="col-md-12 mb-8">
                        <Form
                          form={form}
                          initialValues={{
                            game: 100
                        }}>
                          <div style={{display: "flex"}}>
                            <div className="col-md-3 mb-3">
                              <Form.Item
                                    name="date"
                                    rules={[{ required: true, message: "Date Required!" }]}
                              >
                                <DatePicker  onChange={(e) => setDate(e?.format("MM-DD-YYYY"))}/>
                              </Form.Item>
                            </div>
                            
                            <div className="col-md-3 mb-3">
                              <Form.Item
                                name="game"
                                rules={[{ required: true, message: "Game Required!" }]}
                              >
                                <Select options={arrayRange(100, 580,1).map(e => {return { value: e, label: e }})} onChange={(e) => setGame(toNumber(e))}/>
                              </Form.Item>
                            </div>
                            
                          </div>
                          
                          
                        </Form>
                      </div>
                    
                  </div>
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Total Transactions</b> <div className="scanner_draw_row_selected">
                    {summary.payload.count_total_bills}
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
                    {summary.payload.paid_for_winner} ETB
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
    summary: state.keno_any_day_by_game_report.fetchOne,
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
)(A_GameComponent);
