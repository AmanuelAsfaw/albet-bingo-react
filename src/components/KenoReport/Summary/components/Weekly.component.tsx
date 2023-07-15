import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    DailyPropType,
    deleteSubCategory,
} from "../util/Summary.util";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { Button, Card, DatePicker, Form, Input, Popconfirm, Popover, Select, Table } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";

import { fetchAllSubCategory } from "../../../../redux/SubCategory/SubCategory.action";
import { fetchAllCategory } from "../../../../redux/Category/Category.action";
import { useParams } from "react-router-dom";
import moment, { Moment } from "moment";

import "./scanner.css"

const { RangePicker } = DatePicker;

const WeeklyComponent: FC<DailyPropType> = ({
    summaries,
    fetchSummary,
}) => {
  const [loading, setLoading] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState<any>();
  const [dateFilter, setDateFilter] = useState<any>(null);
  const [dateFilterStart, setDateFilterStart] = useState<Moment|null>(null);
  const [dateFilterEnd, setDateFilterEnd] = useState<Moment|null>(null);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [form] = Form.useForm();
  
  const { id } = useParams();

  useEffect(() => {
    if(dateFilter && Array.isArray(dateFilter) && dateFilter.length){
        setDateFilterStart(dateFilter[0])
        setDateFilterEnd(dateFilter[1])
    }
  }, [dateFilter]);

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
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-end">
          
            {/* <Button style={{paddingBottom: '35px', marginLeft: '10px'}}>Get</Button> */}
        </div>
        <div className="d-flex justify-content-end">
          <ReloadButtonComponent
            onClick={() =>
                fetchSummary({ category_id: defaultCategory, project_id: id })
            }
          /> 
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
            <Card title={`Weekly Summary`}
                loading={loading}
                hoverable
                actions={[
                  <div></div>,
                  <Button style={{paddingBottom: '35px'}}>Get</Button>
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
                            <DatePicker picker="week"/>
                          </Form.Item>
                          
                        </Form>
                      </div>
                    
                  </div>
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Total Transactions</b> <div className="scanner_draw_row_selected">
                      {120}
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Canceled Transactions</b> <div className="scanner_draw_row_selected">
                      {10}
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Redeemed Transactions</b> <div className="scanner_draw_row_selected">
                      {25}
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Net Transactions</b> <div className="scanner_draw_row_selected">
                      {110}
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Net Gain</b> <div className="scanner_draw_row_selected">
                      {2500} ETB
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Total Loss</b> <div className="scanner_draw_row_selected">
                      {280} ETB
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Total Games</b> <div className="scanner_draw_row_selected">
                      {468}
                    </div>
                  </div>
                  
                  <div className="scanner_draw_row">
                    <b className="scanner_draw_row_field">Total Bills</b> <div className="scanner_draw_row_selected">
                      {1000}
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
    summaries: state.sub_category.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSummary: (action: any) => dispatch(fetchAllCategory(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyComponent);
