import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined";
import PrinterOutlined from "@ant-design/icons/lib/icons/PrinterOutlined";
import { Button, Popconfirm, Popover, Tag } from "antd";
import Table from "antd/lib/table";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { fetchAllInspection } from "../../../../../redux/Inspection/Inspection.action";
import { Inspection } from "../../../../../redux/Inspection/Inspection.type";
import { ErrorHandler } from "../../../../../utilities/utilities";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import EditInspectionComponent from "./EditInspection/EditInspection.component";
import { deleteData, InspectionPropType } from "./Inspection.util";
import PrintInspectionComponent from "./PrintInspection/PrintInspection.component";
import RegisterInspectionComponent from "./RegisterInspection/RegisterInspection.component";
import RequestInspectionComponent from "./RequestInspection/RequestInspection.component";
import ViewInspectionComponent from "./ViewInspection/ViewInspection.component";

const InspectionComponent: FC<InspectionPropType> = ({
  inspection,
  fetchAllInspection,
  project,
  inspection_forms,
}) => {
  const [selected, setSelected] = useState<Inspection | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (selected) window.print();
  }, [selected]);

  useEffect(() => {
    fetchAllInspection(project.payload?.id);
  }, [fetchAllInspection, project.payload?.id]);

  const onDelete = (id: any) => {
    setDeleteLoading(true);
    deleteData(id)
      .then(() => {
        setDeleteLoading(false);
        fetchAllInspection(project.payload?.id);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.INSPECTION_REQUEST_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setDeleteLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.INSPECTION_REQUEST_DELETE_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <ReloadButtonComponent
          onClick={() => fetchAllInspection(project.payload?.id)}
        />
        <AuthenticationComponent type="WRITE">
          <RequestInspectionComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2 hidden-print">
        <Table
          loading={inspection.isPending}
          dataSource={inspection.payload.map((e, index) => ({
            ...e,
            key: Date.now() + index,
          }))}
          columns={[
            {
              title: "No",
              render: (value: any, record: any, index: number) => index + 1,
            },
            {
              title: "Date",
              dataIndex: "createdAt",
              render: (value: any, record: any) =>
                new Date(record.createdAt).toDateString(),
            },
            {
              title: "Inspection Type",
              dataIndex: "name",
            },
            {
              title: "Location",
              dataIndex: "location",
            },
            {
              title: "Block",
              dataIndex: "block",
            },
            {
              title: "Inspections Fullfilled",
              dataIndex: "is_fullfilled",
              render: (value: any, record: any) =>
                record.is_fullfilled === null ? (
                  <Tag color="warning">Pending</Tag>
                ) : record.is_fullfilled ? (
                  <CheckOutlined />
                ) : (
                  <CloseOutlined />
                ),
            },
            {
              title: "Allowed to Proceed",
              dataIndex: "is_allowed",
              render: (value: any, record: any) =>
                record.is_allowed === null ? (
                  <Tag color="warning">Pending</Tag>
                ) : record.is_allowed ? (
                  <CheckOutlined />
                ) : (
                  <CloseOutlined />
                ),
            },
            {
              title: "Action",
              dataIndex: "id",
              width: "5%",
              render: (value: any, record, index) => (
                <>
                  <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                      <div className="d-flex flex-column">
                        <AuthenticationComponent type="WRITE">
                          <RegisterInspectionComponent inspection={record} />
                        </AuthenticationComponent>
                        <AuthenticationComponent type="EDIT">
                          <EditInspectionComponent inspection={record} />
                        </AuthenticationComponent>
                        <ViewInspectionComponent
                          inspection={record}
                          key={Date.now()}
                        />
                        <AuthenticationComponent type="DELETE">
                          <Popconfirm
                            title="Are you sure to delete this Request?"
                            onConfirm={() => onDelete(record.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button loading={deleteLoading} type="text" danger>
                              Delete
                            </Button>
                          </Popconfirm>
                        </AuthenticationComponent>

                        <Button
                          type="text"
                          onClick={() => {
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
          ]}
        />
      </div>

      <PrintInspectionComponent inspection={selected} project={project} />
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  inspection_forms: state.inspection_form.fetchAll,
  inspection: state.inspection.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllInspection: (project_id: any) =>
    dispatch(fetchAllInspection({ project_id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InspectionComponent);
