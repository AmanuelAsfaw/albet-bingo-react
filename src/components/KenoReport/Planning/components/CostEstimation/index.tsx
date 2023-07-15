import { DeleteColumnOutlined, DeleteOutlined, DownloadOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Form, Popconfirm, Popover } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { toNumber } from "lodash";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { NotificationType } from "../../../../../constants/Constants";
import { fetchAllCostEstimations } from "../../../../../redux/CostEstimation/CostEstimation.action";
import { CostEstimation } from "../../../../../redux/CostEstimation/CostEstimation.type";
import { ErrorHandler, getUserData, zeroPad } from "../../../../../utilities/utilities";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import ShareComponent from "../../../../common/ShareComponent/Share.component";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";
import AddCostEstimationComponent from "./components/Add/AddCostEstimation.component";
import EditCostEstimationComponent from "./components/Edit/EditCostEstimation.component";
import { deleteData, CostEstimationPropType, POST_STATUS, DELETE_STATUS } from "./utils/CostEstimation.util";

const CostEstimationComponent: FC<CostEstimationPropType> = ({
  fetchCostEstimation,
  cost_estimation,
}) => {
  // const [incomingData, setIncomingData] = useState<Letter[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCostEstimation();
  }, [fetchCostEstimation]);


  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchCostEstimation();
        OpenNotification(NotificationType.SUCCESS, "Cost Estimation delete!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete Cost Estimation",
            e.message
          )
        );
      });
  };

  const [loading, setLoading] = useState(false);
  const onCreateStatus = (data: any) => {
    setLoading(true);
    POST_STATUS(data)
      .then(() => {
        setLoading(false);
        fetchCostEstimation();
        OpenNotification(NotificationType.SUCCESS, "User Assigned", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Assign User",
            e.message
          )
        );
      });
  };

  const onStatusRemove = (id: number) => {
    setLoading(true);
    DELETE_STATUS(id)
      .then(() => {
        setLoading(false);
        fetchCostEstimation();
        OpenNotification(NotificationType.SUCCESS, "Assigned User Removed", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Remove Assigned User",
            e.message
          )
        );
      });
  };

  const param=useParams()
  const column: ColumnsType<CostEstimation> = [
    {
      title: "No",
      key: "no",
      width: "40px",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Date",
      key: "date",
      width: "100px",
      render: (value, record) => moment(record.date).format("DD/MM/YYYY"),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => (moment(a.date).isBefore(moment(b.date)) ? -1 : 1),
    },
    {
      title: "Reference No",
      key: "ref_no",
      dataIndex: "ref_no",
      width: "100px",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "300px",
    },
    {
      title: "Document",
      key: "document",
      width: "120px",
      className: "px-1",
      render: (value, record) => (
        <div className="d-flex">
          <Button
            type="link"
            icon={<DownloadOutlined />}
            className="mr-2"
            onClick={() => DownloadFile(record.document)}
          ></Button>
          {record.document ? (
            <DocumentViewerComponent document={record.document} />
          ) : null}
        </div>
      ),
    },
    {
      title: "Share",
      render: (value, record) => (
        <ShareComponent
          feature="Cost Estimation"
          project_id={toNumber(param.id)}
          loading={loading}
          onRemove={(id: number) => onStatusRemove(id)
          }
          onShare={(data: { type: string; user_id: number }) =>
            onCreateStatus({
              ...data,
              cost_estimation_id: record.id,
              identification: `CE-${zeroPad(record.id)}`,
            })
          }
          payload={record.cost_estimation_statuses ? record.cost_estimation_statuses : []}
        />
      ),
    },

    {
      title: "Action",
      width: "150px",
      fixed: "right",
      render: (value, record) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <EditCostEstimationComponent cost_estimation={record} />
                <Popconfirm
                  placement="leftTop"
                  title="Are you sure you want to remove this request"
                  onConfirm={() => OnDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger type="text" icon={<DeleteColumnOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            }
          >
            <Button
              icon={<MoreOutlined />}
              className="btn-outline-secondary border-0"
            ></Button>
          </Popover>
        </>
      ),
    },
  ];

  // const onSearch = (value: any) => {
  //   let query = value.target.value.toLowerCase();
  //   let arr = employer_requirement.payload.filter(
  //     (e) =>
  //       e.ref_no.toLowerCase().includes(query) ||
  //   );
  //   setIncomingData(parsePayloadData(arr));
  // };

  return (
    <div className="row">
      {/* <div className="col-md-3">
          <Form form={form} layout="vertical" onChange={onSearch}>
            <Form.Item label="Search Letters" name="query">
              <Input.Search placeholder="search....    reference no, from,subject" />
            </Form.Item>
          </Form>
        </div> */}
      <div className="col-md-12 mb-2">
        <ReloadButtonComponent onClick={() => fetchCostEstimation()} />
        <AddCostEstimationComponent />
      </div>
      <div className="col-md-12 hidden-print">
        <Table
          columns={column}
          dataSource={cost_estimation.payload}
          loading={cost_estimation.isPending}
        />
      </div>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  cost_estimation: state.cost_estimation.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchCostEstimation: (action: any) => dispatch(fetchAllCostEstimations(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CostEstimationComponent);
