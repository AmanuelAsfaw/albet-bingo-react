import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../constants/Constants";
import { fetchAllUser } from "../../../../redux/User/User.action";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import {
  ContractAdminstrationPropType,
  deleteData,
} from "./util/ContractAdminstration.util";
import { DownloadFile } from "../../../Document/MyDocument/index.util";
import { Table, Button, Popconfirm } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { fetchAllContractAdminstration } from "../../../../redux/ContractAdminstration/ContractAdminstration.action";
import AddContractAdminstrationComponent from "./components/AddContractAdminstration/AddContractAdminstration.component";
import DocumentViewerComponent from "../../../common/DocumentViewer/DocumentViewer.component";
import StatusContractAdminstrationComponent from "./components/Status/StatusContractAdmistration.component";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import AuthenticationComponent from "../../../common/Auth/Authentication.component";

const ContractAdminstrationComponent: FC<ContractAdminstrationPropType> = ({
  project,
  users,
  fetchUser,
  contract_adminstration,
  fetchAllContractAdminstration,
}) => {
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    fetchAllContractAdminstration({ project_id: project.payload?.id });
    fetchUser();
  }, [fetchAllContractAdminstration, project, fetchUser]);

  useEffect(() => {
    if (contract_adminstration.payload.length) {
      let arr = [];
      arr = contract_adminstration.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
      }));
      setDatas(arr);
    }
  }, [contract_adminstration]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllContractAdminstration({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Contract Adminstration delete!",
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete contract adminstaration",
            e.message
          )
        );
      });
  };

  const column: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (value, record) => <span>{record.date}</span>,
    },
    {
      title: "Ref No",
      key: "reference_no",
      dataIndex: "reference_no",
      render: (date, record) => <span>{record.reference_no}</span>,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (date, record) => <span>{record.name}</span>,
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (date, record) => <span>{record.type}</span>,
    },
    {
      title: "Expiry Date",
      key: "expiry_date",
      dataIndex: "expiry_date",
      render: (date, record) => (
        <span>{record.expiry_date ? record.expiry_date : "-"}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (date, record) =>
        record.expiry_date ? (
          <>
            <StatusContractAdminstrationComponent
              expiry_date={record.expiry_date}
            />
          </>
        ) : (
          "-"
        ),
    },
    {
      title: "Uploaded By",
      key: "uploaded_by",
      dataIndex: "uploaded_by",
      render: (date, record) => (
        <span>
          {users.payload.find((e) => e.id === record.uploaded_by)?.full_name}
        </span>
      ),
    },
    {
      title: "File",
      className: "pl-0-td pr-0-td",
      render: (date, record) => (
        <>
          {record.document ? (
            <>
              <Button
                type="link"
                icon={<CloudDownloadOutlined />}
                onClick={() => DownloadFile(record.document)}
              />
              <DocumentViewerComponent document={record.document} />
            </>
          ) : null}
        </>
      ),
    },
    {
      title: "Action",
      className: "pl-0-td pr-0-td",
      render: (data, record) => (
        <AuthenticationComponent type="DELETE">
          <Popconfirm
            placement="leftTop"
            title="Are you sure you want to remove this contract administration?"
            onConfirm={() => OnDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="text">
              Delete
            </Button>
          </Popconfirm>
        </AuthenticationComponent>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AuthenticationComponent type="WRITE">
            <AddContractAdminstrationComponent />
          </AuthenticationComponent>

          <ReloadButtonComponent
            onClick={() =>
              fetchAllContractAdminstration({ project_id: project.payload?.id })
            }
          />
        </div>
        <div className="col-md-12 mt-2 hidden-print">
          <Table
            loading={contract_adminstration.isPending}
            columns={column}
            dataSource={datas}
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
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  contract_adminstration: state.contract_adminstration.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllContractAdminstration: (action: any) =>
    dispatch(fetchAllContractAdminstration(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractAdminstrationComponent);
