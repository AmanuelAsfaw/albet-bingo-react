import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  DesignChangeLogPropType,
  deleteDesignChangeLog,
} from "./utils/DesignChangeLog.utils";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { Button, DatePicker, Popconfirm, Popover, Table } from "antd";
import moment from "moment";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import AddDesignChangeLogComponent from "./components/Add/AddDesignChangeLog.component";

import EditDesignChangeLogComponent from "./components/Edit/EditDesignChangeLog.component";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";
import { fetchAllDesignChangeLog } from "../../../../redux/DesignChangeLog/DesignChangeLog.action";
import { useParams } from "react-router-dom";

const DesignChangeLog: FC<DesignChangeLogPropType> = ({
  fetchAll,
  design_change_log,
}) => {
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState<any>(moment().format("YYYY-MM-DD"));
  const { id } = useParams();

  useEffect(() => {
    CustomFetchAll();
  }, [month]);

  const RemoveReport = (record: any) => {
    setLoading(true);
    deleteDesignChangeLog(record.id)
      .then(() => {
        setLoading(false);
        CustomFetchAll();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.DESIGN_CHANGE_LOG_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.DESIGN_CHANGE_LOG_DELETE_FAIL,
            e.message
          )
        );
      });
  };
  const CustomFetchAll = () => {
    let payload: any = {};
    month ? (payload.date = moment(month).format("YYYY-MM-DD")) : null;
    payload.project_id = id;
    fetchAll(payload);
  };
  const renderPopOverContent = (record: any) => {
    return (
      <div className="d-flex flex-column">
        <EditDesignChangeLogComponent id={record.id} />
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={() => RemoveReport(record)}
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
      <div className="d-flex w-100  justify-content-between">
        <div className="w-45 ml-2">
          <DatePicker
            picker="month"
            allowClear={false}
            defaultValue={moment()}
            onChange={(e) => setMonth(e)}
          />
        </div>

        <div className="d-flex justify-content-end">
          <AddDesignChangeLogComponent />
          <ReloadButtonComponent onClick={() => CustomFetchAll()} />
        </div>
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
                width: 250,
                render: (value: any) => moment(value).format("YYYY-MM-DD"),
              },
              {
                title: "Requested By",
                dataIndex: "requested_by",
                width: 250,
                render: (value: any) => value,
              },
              {
                title: "Change Request Description",
                dataIndex: "change_request_description",
                width: 300,
                render: (value: any) => value,
              },
              {
                title: "Reason For Change",
                dataIndex: "reason_for_change",
                width: 300,
                render: (value: any) => value,
              },
              {
                title: "Status",
                dataIndex: "status",
                width: 250,
                render: (value: any) => value,
              },
              {
                title: "Progress of Pending and Approved Changes",
                dataIndex: "progress_of_pending_and_approved_changes",
                width: 500,
                render: (value: any) => value,
              },
              {
                title: "Action Related to Changes",
                dataIndex: "action_related_to_changes",
                width: 300,
                render: (value: any) => value,
              },
              {
                title: "Notes",
                dataIndex: "notes",
                width: 250,
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
            dataSource={design_change_log.payload}
            loading={design_change_log.isPending}
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
  design_change_log: state.design_change_log.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllDesignChangeLog(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DesignChangeLog);
