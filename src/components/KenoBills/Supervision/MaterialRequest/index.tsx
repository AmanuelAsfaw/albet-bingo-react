import { MoreOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Popover, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Message, NotificationType } from "../../../../constants/Constants";
import { fetchMaterial } from "../../../../redux/Material/Material.action";
import { fetchAllMaterialRequest } from "../../../../redux/MaterialRequest/MaterialRequest.action";
import { MaterialRequest } from "../../../../redux/MaterialRequest/MaterialRequest.type";
import { fetchAllUser } from "../../../../redux/User/User.action";
import { zeroPad } from "../../../../utilities/utilities";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import AddMaterialRequest from "./components/Add/AddMaterialRequest";
import EditMaterialRequest from "./components/Edit/EditMaterialRequest";
import PrintMaterialRequest from "./components/Print/PrintMaterialRequest";
import {
  deleteMaterialRequest,
  MaterialRequestPropType,
} from "./util/MaterialRequest.util";
import DetailMaterialRequest from "./components/Detail/DetailMaterialRequest";
import AuthenticationComponent from "../../../common/Auth/Authentication.component";

const MaterialRequestComponent: FC<MaterialRequestPropType> = ({
  material_request,
  project,
  fetchMaterialRequests,
  fetchUsers,
  fetchMaterial,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [is_visible, setVisible] = useState(false);

  useEffect(() => {
    fetchMaterialRequests({ project_id: project?.payload.id });
    fetchUsers();
    fetchMaterial();
  }, []);

  const onDeleteMaterialRequest = (id: any) => {
    setDeleteLoading(true);
    deleteMaterialRequest(id)
      .then(() => {
        setDeleteLoading(false);
        fetchMaterialRequests({ project_id: project?.payload.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.MATERIAL_REQUEST_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setDeleteLoading(false);
        OpenNotification(
          NotificationType.ERROR,
          Message.MATERIAL_REQUEST_DELETE_FAILURE,
          "Error occuredd"
        );
      });
  };

  const columns: ColumnsType<MaterialRequest> = [
    {
      title: "Request NO",
      render: (record, data, index) => zeroPad(index + 1),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (record, data, index) => moment(record).format("DD/MM/YYYY"),

      sorter: (a, b) => (moment(a.date).isBefore(b.date) ? 1 : -1),
      sortOrder: "descend",
    },
    {
      title: "Request By",
      // dataIndex: "user",
      render: (record, data, index) => record.user.full_name,
    },
    {
      title: "Action",
      render: (record, data, index) => (
        <div className="row">
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <DetailMaterialRequest
                  material_request={data}
                  index={index + 1}
                />
                <Button
                  type="text"
                  onClick={() => {
                    setSelected(record);
                    setVisible(true);
                  }}
                >
                  Print
                </Button>

                <>
                  <AuthenticationComponent type="EDIT">
                    <EditMaterialRequest
                      material_request={data}
                      index={index + 1}
                    />
                  </AuthenticationComponent>
                  <AuthenticationComponent type="DELETE">
                    <Popconfirm
                      placement="leftTop"
                      title="Are you sure you want to remove the site report"
                      onConfirm={() => onDeleteMaterialRequest(data.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger type="text" loading={deleteLoading}>
                        Delete
                      </Button>
                    </Popconfirm>
                  </AuthenticationComponent>
                </>
              </div>
            }
          >
            <Button
              icon={<MoreOutlined />}
              className="btn-outline-secondary border-0"
            ></Button>
          </Popover>
        </div>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <ReloadButtonComponent onClick={() => fetchMaterialRequests()} />
        <AuthenticationComponent type="WRITE">
          <AddMaterialRequest index={material_request.payload.length + 1} />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2 hidden-print">
        <Table
          pagination={false}
          columns={columns}
          dataSource={material_request.payload.map((e, index) => ({
            ...e,
            key: Date.now() + index,
          }))}
          loading={material_request.isPending}
        />
      </div>
      <PrintMaterialRequest
        dataAction={[selected, setSelected]}
        visibilityAction={[is_visible, setVisible]}
        project={project.payload}
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
  project: state.project.fetchOne,
  employee: state.staff.fetchAll,
  material_request: state.material_request.fetchAll,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMaterialRequests: (action: any) =>
    dispatch(fetchAllMaterialRequest(action)),
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchMaterial: () => dispatch(fetchMaterial()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialRequestComponent);
