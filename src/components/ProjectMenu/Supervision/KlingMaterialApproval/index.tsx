import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  KlingMaterialApprovalPropType,
  deleteData,
} from "./util/KlingMaterialApproval.util";
import { fetchAllUser } from "../../../../redux/User/User.action";
import { fetchAllKlingMaterialApproval } from "../../../../redux/KlingMaterialApproval/KlingMaterialApproval.action";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { NotificationType, RoleType } from "../../../../constants/Constants";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import Table, { ColumnsType } from "antd/lib/table";
import { KlingMaterialApproval } from "../../../../redux/KlingMaterialApproval/KlingMaterialApproval.type";
import { Button, Popconfirm, Popover } from "antd";
import {
  MoreOutlined,
  PrinterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import EditKMAComponent from "./components/Edit/EditKMA.component";
import AddKMAComponent from "./components/Add/AddKMA.component";
import ViewKMAComponent from "./components/View/ViewKMA.component";
import ResponseComponent from "./components/Response/Response.component";
import CommentComponent from "./components/Comment/Comment.component";
import ClientResponseComponent from "./components/ClientResponse/ClientResponse.component";
import { UserControlTypes } from "../../../../redux/Project/Project.type";
import PrintMAComponent from "./components/Print/PrintMA.component";
import PrintOvidKlingComponent from "./components/OvidKlingPrint/PrintOvidKling.component";
import ShareKlingMaterialApproval from "./components/Share/ShareKlingMaterialApproval";
import ReviewComponent from "./components/Review/Review.component";
import { useNavigate, useParams } from "react-router-dom";
import RemarkComponent from "./components/Remark/Remark.component";

const KlingMaterialApprovalComponent: FC<KlingMaterialApprovalPropType> = ({
  project,
  kling_material_approval,
  fetchAllKlingMaterialApproval,
  fetchUsers,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const [user_control, setUserControl] = useState<UserControlTypes>();
  const [print_ovid_kling, setPrintOvidKling] =
    useState<null | KlingMaterialApproval>(null);
  const [print_type, setPrintType] = useState<"Ovid" | "OvidKling">("Ovid");

  useEffect(() => {
    fetchAllKlingMaterialApproval({
      project_id: project.payload?.id,
    });
    fetchUsers();
    setUserControl(
      project.payload.user_controls.find((e) => e.user_id === getUserData()?.id)
    );
  }, [fetchUsers, fetchAllKlingMaterialApproval, project]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (print_ovid_kling) window.print();
    }, 2000);

    return () => clearTimeout(timer);
  }, [print_ovid_kling, print_type]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllKlingMaterialApproval({
          project_id: project.payload.id,
        });
        OpenNotification(NotificationType.SUCCESS, "Delete!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete",
            e.message
          )
        );
      });
  };

  const column: ColumnsType<KlingMaterialApproval> = [
    {
      title: "No",
      key: "no",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Date",
      key: "date",
      render: (value, record) => (
        <span>{record.kling_ma_submittal_information?.submission_date}</span>
      ),
    },
    {
      title: "Material Description",
      key: "description",
      render: (date, record) => (
        <span>{record.kling_ma_submittal_information?.description}</span>
      ),
    },
  ];

  if (
    ![
      RoleType.CLIENT.toLowerCase(),
      RoleType.CONSULTANT?.toLowerCase(),
    ].includes(user_control?.role?.name.toLowerCase() ?? "")
  ) {
    column.push({
      title: "Share",
      render: (data, record, id) => (
        <ShareKlingMaterialApproval klingMaterialApproval={record} />
      ),
    });
  }

  column.push({
    title: "Remark",
    width: "80px",
    render: (value, record) => <RemarkComponent remarkData={record} />,
  });

  column.push({
    title: "Action",
    className: "pl-0-td pr-0-td",
    render: (data, record) => (
      <Popover
        placement="rightTop"
        overlayClassName="action-popover"
        trigger="focus"
        content={
          <div className="d-flex flex-column">
            <ViewKMAComponent kling_material_approval={record} />
            {/* <Button
              type="text"
              onClick={() =>
                navigate(
                  `/project/${params?.id}/material-approval/${record?.id}`
                )
              }
            >
              Detail
            </Button> */}
            {user_control?.role?.name?.toLowerCase() === "consultant" && (
              <ResponseComponent kling_material_approval={record} />
            )}
            {user_control?.role?.name?.toLowerCase() === "client" && (
              <ClientResponseComponent kling_material_approval={record} />
            )}
            <Button
              type="text"
              onClick={() => {
                setPrintType("Ovid");
                setPrintOvidKling(record);
              }}
            >
              Print
            </Button>
            {user_control?.role?.name?.toLowerCase() === "contractor" &&
              !record?.kling_ma_client_response?.id &&
              !record?.kling_ma_consultant_response?.id &&
              user_control?.role?.name?.toLowerCase() !== "client" &&
              user_control?.role?.name?.toLowerCase() !== "consultant" && (
                <EditKMAComponent kling_material_approval={record} />
              )}
            {user_control?.role?.name?.toLowerCase() !== "client" &&
              user_control?.role?.name?.toLowerCase() !== "consultant" &&
              user_control?.role?.name?.toLowerCase() !== "contractor" && (
                <>
                  <CommentComponent kling_material_approval={record} />
                  <ReviewComponent kling_material_approval={record} />
                </>
              )}

            {user_control?.role?.name?.toLowerCase() !== "consultant" && (
              <Button
                type="text"
                onClick={() => {
                  setPrintType("OvidKling");
                  setPrintOvidKling(record);
                }}
              >
                Print(Ovid kling)
              </Button>
            )}
            {!(
              record.kling_ma_consultant_response?.id ||
              record.kling_ma_client_response?.id ||
              record.kling_material_approval_remarks.length > 0
            ) &&
              ((user_control?.role?.name?.toLowerCase() !== "contractor" &&
                user_control?.role?.name?.toLowerCase() !== "client" &&
                user_control?.role?.name?.toLowerCase() !== "consultant") ||
                getUserData().is_super_user) && (
                <Popconfirm
                  placement="leftTop"
                  title="Are you sure you want to remove material approval?"
                  onConfirm={() => OnDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger type="text">
                    Delete
                  </Button>
                </Popconfirm>
              )}
          </div>
        }
      >
        <Button
          icon={<MoreOutlined />}
          className="btn-outline-secondary border-0"
        ></Button>
      </Popover>
    ),
  });

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div style={{ float: "right" }}>
            <Button
              className="btn-outline-secondary"
              icon={<ReloadOutlined />}
              onClick={() =>
                fetchAllKlingMaterialApproval({
                  project_id: project.payload.id,
                })
              }
            />
          </div>
          {(user_control?.role?.name.toLowerCase() !== "client" ||
            user_control?.role?.name.toLowerCase() !== "consultant") && (
            <AddKMAComponent />
          )}
        </div>
        <div className="col-md-12 mt-2">
          <Table
            className="hidden-print"
            loading={kling_material_approval.isPending}
            columns={column}
            dataSource={kling_material_approval.payload}
          />
        </div>
      </div>
      {print_type === "Ovid" ? (
        <PrintMAComponent dataAction={[print_ovid_kling, setPrintOvidKling]} />
      ) : (
        <PrintOvidKlingComponent
          dataAction={[print_ovid_kling, setPrintOvidKling]}
        />
      )}
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
  kling_material_approval: state.kling_material_approval.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchAllKlingMaterialApproval: (action: any) =>
    dispatch(fetchAllKlingMaterialApproval(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KlingMaterialApprovalComponent);
