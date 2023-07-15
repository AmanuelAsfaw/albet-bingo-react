import { FC, useEffect, useState } from "react";
import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined";
import PrinterOutlined from "@ant-design/icons/lib/icons/PrinterOutlined";
import moment from "moment";
import { connect } from "react-redux";
import { Button, Popconfirm, Popover, Table } from "antd";
import { fetchAllMaterialRequestApproval } from "../../../../../redux/MaterialRequestApproval/MaterialRequestApproval.action";
import { DELETE, MaterialApprovalPropType } from "./util/MaterialApproval.util";
import { ColumnsType } from "antd/lib/table";
import {
  ErrorHandler,
  getRevisionNumber,
  getUserData,
  zeroPad,
} from "../../../../../utilities/utilities";
import { MaterialRequestApproval } from "../../../../../redux/MaterialRequestApproval/MaterialRequestApproval.type";
import AddRequestComponent from "./components/AddRequest/AddRequest.component";
import {
  fetchAllUser,
  fetchOneUser,
} from "../../../../../redux/User/User.action";
import StatusComponent from "./components/Status/Status.component";
import DetailRequestComponent from "./components/Detail/DetailRequest.component";
import PrintRequestComponent from "./components/Print/PrintRequest.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import { DeleteOutlined } from "@ant-design/icons";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const MaterialApprovalComponent: FC<MaterialApprovalPropType> = ({
  material_request_approval,
  fetchMaterialApprovalRequest,
  project,
  fetchUser,
  fetchUsers,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMaterialApprovalRequest({ project_id: project.payload?.id });
    fetchUsers();
    fetchUser(getUserData().id);
  }, [fetchMaterialApprovalRequest, project, fetchUsers, fetchUser]);

  const [selected, setSelected] = useState<any>(null);
  const [is_visible, setVisible] = useState(false);

  const onDelete = (id: number) => {
    setLoading(true);
    DELETE(id)
      .then(() => {
        setLoading(false);
        fetchMaterialApprovalRequest({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Material Approval Removed",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Remove Material Approval",
            e.message
          )
        );
      });
  };

  const column: ColumnsType<MaterialRequestApproval> = [
    {
      title: "Request No",
      render: (value, record) =>
        zeroPad(record.ref === null ? record.id : record.ref),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) =>
        (a.ref === null ? a.id : a.ref) - (b.ref === null ? b.id : b.ref),
    },
    {
      title: "Rev No",

      render: (value, record) =>
        getRevisionNumber(
          material_request_approval.payload,
          record.id,
          record.ref
        ),
    },
    {
      title: "Date",
      render: (value, record) => moment(record.date).format("DD/MM/YYYY"),
    },
    {
      title: "Material Description",
      render: (value, record) => record.description,
    },
    {
      title: "Supplier",
      render: (value, record) => record.manufacturer,
    },
    {
      title: "Status",
      render: (value, record) => (
        <StatusComponent material_request_approval={record} />
      ),
    },

    {
      title: "Action",
      dataIndex: "id",
      width: "20%",
      render: (value: any, record: any, index) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <DetailRequestComponent id={record.id} key={index} />
                <AuthenticationComponent type="DELETE">
                  <Popconfirm
                    placement="leftTop"
                    title="Are you sure you want to this?"
                    onConfirm={() => onDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger type="text" loading={loading}>
                      Delete
                    </Button>
                  </Popconfirm>
                </AuthenticationComponent>
                <Button
                  type="text"
                  onClick={() => {
                    setVisible(true);
                    setSelected(record);
                  }}
                >
                  Print
                </Button>
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
    <div className="row">
      <div className="col-md-12 mb-2">
        <ReloadButtonComponent
          onClick={() =>
            fetchMaterialApprovalRequest({ project_id: project.payload?.id })
          }
        />
        <AuthenticationComponent type="WRITE">
          <AddRequestComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 hidden-print">
        <Table
          columns={column}
          dataSource={material_request_approval.payload}
          loading={material_request_approval.isPending}
        />
      </div>

      <PrintRequestComponent
        material_request_approval={selected}
        setSelected={setSelected}
        is_visible={is_visible}
        setVisibility={setVisible}
      />
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  material_request_approval: state.material_request_approval.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMaterialApprovalRequest: (action: any) =>
    dispatch(fetchAllMaterialRequestApproval(action)),
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchUser: (action: any) => dispatch(fetchOneUser(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialApprovalComponent);
