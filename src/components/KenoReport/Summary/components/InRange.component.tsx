import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    InRangePropType,
    deleteSubCategory,
} from "../util/Summary.util";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { Button, Card, DatePicker, Popconfirm, Popover, Select, Table } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";

import { fetchAllSubCategory } from "../../../../redux/SubCategory/SubCategory.action";
import { fetchAllCategory } from "../../../../redux/Category/Category.action";
import { useParams } from "react-router-dom";
import { Moment } from "moment";

const { RangePicker } = DatePicker;

const InRangeComponent: FC<InRangePropType> = ({
    summaries,
    fetchSummary,
}) => {
  const [loading, setLoading] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState<any>();
  const [dateFilter, setDateFilter] = useState<any>(null);
  const [dateFilterStart, setDateFilterStart] = useState<Moment|null>(null);
  const [dateFilterEnd, setDateFilterEnd] = useState<Moment|null>(null);
  
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
            <RangePicker onChange={(e)=> {
              console.log(e);
              if(e) setDateFilter(e);
            }}/>
            <Button style={{paddingBottom: '35px', marginLeft: '10px'}}>Get</Button>
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
            <Card title={`Summary from ${dateFilterStart?
                dateFilterStart.format('ddd')+ ' '+ dateFilterStart.format('MMM')+' '+dateFilterStart.date()+' '+dateFilterStart.year().toString():'__'} to ${dateFilterEnd?
                    dateFilterEnd.format('ddd')+ ' '+ dateFilterEnd.format('MMM')+' '+dateFilterEnd.date()+' '+dateFilterEnd.year().toString():'__'}`}
                loading={loading}
                >
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
                            title: "Start Balance",
                            dataIndex: "start_balance",
                            render: (value: any) => value,
                        },
                        {
                            title: "End Balance",
                            dataIndex: "end_balance",
                            render: (value: any) => value,
                        },
                        {
                            title: "Bills",
                            dataIndex: "bills",
                            render: (value: any) => value,
                        },
                        {
                            title: "Games",
                            dataIndex: "games",
                            render: (value: any) => value,
                        },
                        {
                            title: "Canceled",
                            dataIndex: "canceled",
                            render: (value: any) => value,
                        },
                        {
                            title: "Redeemed",
                            dataIndex: "redeemed",
                            render: (value: any) => value,
                        },
                        {
                            title: "Gain",
                            dataIndex: "gain",
                            render: (value: any) => value,
                        },
                        {
                            title: "Loss",
                            dataIndex: "loss",
                            render: (value: any) => value,
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
                        dataSource={summaries.payload}
                        loading={summaries.isPending}
                    />
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
)(InRangeComponent);
