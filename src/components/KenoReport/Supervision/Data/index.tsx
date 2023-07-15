import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllUser } from "../../../../redux/User/User.action";
import { DataPropType, deleteData } from "./util/Data.util";
import { Table, Button, Popconfirm, Popover } from "antd";
import {
  CloudDownloadOutlined,
  DeleteColumnOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../constants/Constants";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import { fetchAllData } from "../../../../redux/Data/Data.action";
import AddDataComponent from "./components/AddData/AddData.component";
import DocumentViewerComponent from "../../../common/DocumentViewer/DocumentViewer.component";
import { DownloadFile } from "../../../Document/MyDocument/index.util";
import EditDataComponent from "./components/EditData/EditData.component";
import ShareDataComponent from "./components/Share/ShareData.component";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import AuthenticationComponent from "../../../common/Auth/Authentication.component";

const DataComponent: FC<DataPropType> = ({
  project,
  users,
  fetchUser,
  data,
  fetchAllData,
}) => {
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    fetchAllData({ project_id: project.payload?.id });
    fetchUser();
  }, [fetchAllData, project, fetchUser]);

  useEffect(() => {
    if (data.payload.length) {
      let arr = [];
      arr = data.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
      }));
      setDatas(arr);
    }
  }, [data]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllData({ project_id: project.payload?.id });
        OpenNotification(NotificationType.SUCCESS, "Data delete!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete data",
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
      title: "Revision No",
      key: "revision_no",
      dataIndex: "revision_no",
      render: (date, record) => <span>{record.revision_no}</span>,
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
      title: "Share",
      width: "100px",
      render: (value, record) => (
        <AuthenticationComponent type="WRITE">
          <ShareDataComponent data_id={record.id} />
        </AuthenticationComponent>
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
                <AuthenticationComponent type="EDIT">
                  <EditDataComponent id={record.id} />
                </AuthenticationComponent>

                {record.uploaded_by === getUserData().id ||
                getUserData().is_super_user ? (
                  <Popconfirm
                    placement="leftTop"
                    title="Are you sure you want to remove this data?"
                    onConfirm={() => OnDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger type="text">
                      Delete
                    </Button>
                  </Popconfirm>
                ) : null}
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

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AuthenticationComponent type="WRITE">
            <AddDataComponent />
          </AuthenticationComponent>

          <ReloadButtonComponent
            onClick={() => fetchAllData({ project_id: project.payload?.id })}
          />
        </div>
        <div className="col-md-12 mt-2 hidden-print">
          <Table loading={data.isPending} columns={column} dataSource={datas} />
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
  data: state.data.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllData: (action: any) => dispatch(fetchAllData(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataComponent);
