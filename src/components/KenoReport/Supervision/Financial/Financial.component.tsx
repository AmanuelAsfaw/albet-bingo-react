import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { FinancialPropType, deleteFinancial } from "./utils/Category.utils";
import { Button, Popconfirm, Popover, Table } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";

import EditFinancialComponent from "./components/Edit/EditFinancial.component";
import { fetchAllFinancial } from "../../../../redux/Financial/Financial.action";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";

import { ErrorHandler } from "../../../../utilities/utilities";
import AddFinancialComponent from "./components/Add/AddFinancial.component";
import moment from "moment";
import ViewFinancialComponent from "./components/View/ViewFinancial.component";
import { useParams } from "react-router-dom";

const FinancialComponent: FC<FinancialPropType> = ({ fetchAll, financial }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchAll({ project_id: id });
  }, []);

  const RemoveCategory = (record: any) => {
    setLoading(true);
    deleteFinancial(record.id)
      .then(() => {
        setLoading(false);
        fetchAll({ project_id: id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.FINANCIAL_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.FINANCIAL_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const renderPopOverContent = (record: any) => {
    return (
      <div className="d-flex flex-column">
        <EditFinancialComponent id={record.id} />
        <ViewFinancialComponent id={record.id} />
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
      <div className="d-flex justify-content-end">
        <AddFinancialComponent />
        <ReloadButtonComponent onClick={() => fetchAll({ project_id: id })} />
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
                title: "Month",
                dataIndex: "date",
                width: "30%",
                render: (value: any) => moment(value).format("YYYY-MM"),
              },
              {
                title: "Planned In Birr",
                dataIndex: "this_month_planned_in_birr",
                width: "30%",
                render: (value: any) => value,
              },
              {
                title: "Executed In Birr",
                dataIndex: "this_month_executed_in_birr",
                width: "30%",
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
            dataSource={financial.payload}
            loading={financial.isPending}
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
  financial: state.financial.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllFinancial(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinancialComponent);
