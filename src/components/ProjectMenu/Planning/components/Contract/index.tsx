import { DeleteColumnOutlined, DeleteOutlined, DownloadOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Form, Popconfirm, Popover } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { toNumber } from "lodash";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { NotificationType } from "../../../../../constants/Constants";
import { fetchAllContracts } from "../../../../../redux/Contract/Contract.action";
import { Contract } from "../../../../../redux/Contract/Contract.type";
import { ErrorHandler, getUserData, zeroPad } from "../../../../../utilities/utilities";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import ShareComponent from "../../../../common/ShareComponent/Share.component";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";
import AddContractComponent from "./components/Add/AddContract.component";
import EditContractComponent from "./components/Edit/EditContract.component";
import { ContractPropType, deleteData, DELETE_STATUS, POST_STATUS,  } from "./utils/Contract.util";

const ContractComponent: FC<ContractPropType> = ({
  fetchContract,
  contract,
}) => {
  // const [incomingData, setIncomingData] = useState<Letter[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);


  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchContract();
        OpenNotification(NotificationType.SUCCESS, "Contract delete!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete Contract",
            e.message
          )
        );
      });
  };

  const [loading,setLoading]=useState(false);
  const onCreateStatus = (data: any) => {
    setLoading(true);
    POST_STATUS(data)
      .then(() => {
        setLoading(false);
        fetchContract();
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
        fetchContract();
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
  const column: ColumnsType<Contract> = [
    {
      title: "No",
      key: "no",
      width: "40px",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Contract Date",
      key: "date",
      width: "100px",
      render: (value, record) => moment(record.date).format("DD/MM/YYYY"),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => (moment(a.date).isBefore(moment(b.date)) ? -1 : 1),
    },
    {
      title: "Contract Ending Date",
      key: "end_date",
      width: "100px",
      render: (value, record) => moment(record.end_date).format("DD/MM/YYYY"),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => (moment(a.end_date).isBefore(moment(b.end_date)) ? -1 : 1),
    },
    {
      title: "Contract Type",
      key: "contract_type",
      dataIndex: "contract_type",
      width: "100px",
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
          feature="Contract"
          project_id={toNumber(param.id)}
          loading={loading}
          onRemove={(id: number) => onStatusRemove(id)
          }
          onShare={(data: { type: string; user_id: number }) =>
            onCreateStatus({
              ...data,
              contract_id: record.id,
              identification: `C-${zeroPad(record.id)}`,
            })
          }
          payload={record.contract_statuses?record.contract_statuses:[]}
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
                <EditContractComponent contract={record} />
                <Popconfirm
                  placement="leftTop"
                  title="Are you sure you want to remove this contract"
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
        <ReloadButtonComponent onClick={() => fetchContract()} />
        <AddContractComponent />
      </div>
      <div className="col-md-12 hidden-print">
        <Table
          columns={column}
          dataSource={contract.payload}
          loading={contract.isPending}
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
  contract: state.contract.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchContract: (action: any) => dispatch(fetchAllContracts(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractComponent);
