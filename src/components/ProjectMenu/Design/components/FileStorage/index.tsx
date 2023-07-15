import {
  DeleteOutlined,
  FolderOpenOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Popover, Table } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  DesignTabs,
  NotificationType,
} from "../../../../../constants/Constants";
import {
  fetchAllStructuralFileStorage,
  fetchAllArchitectureFileStorage,
  fetchAllPlumbingFileStorage,
  fetchAllMechanicalFileStorage,
  fetchAllElectricalFileStorage,
  fetchAllFireFightingFileStorage,
  fetchAllSpecialSystemFileStorage,
  fetchAllSanitaryFileStorage,
} from "../../../../../redux/FileStorage/FileStorage.action";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import AddUpload from "./components/AddUpload/AddUpload";
import { deleteData, FileStoragePropType } from "./util/FileStorage.util";
import EditUploadComponent from "./components/EditUpload/EditUpload";
import { BASE_URI } from "../../../../../redux/ApiCall";
import ViewUploadComponent from "./components/ViewUpload/ViewUpload";
import { useParams } from "react-router-dom";
import { ApiCallState, resetApiCallState } from "../../../../../redux/Utils";
import { FileStorage } from "../../../../../redux/FileStorage/FileStorage.type";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const FileStorageComponent: FC<FileStoragePropType> = ({
  module,
  fetchAllStructuralFileStorage,
  fetchAllArchitectureFileStorage,
  fetchAllPlumbingFileStorage,
  fetchAllMechanicalFileStorage,
  fetchAllElectricalFileStorage,
  fetchAllFireFightingFileStorage,
  fetchAllSpecialSystemFileStorage,
  fetchAllSanitaryFileStorage,
  structuralFileStorages,
  architectureFileStorages,
  plumbingFileStorages,
  mechanicalFileStorages,
  electricalFileStorages,
  fireFightingFileStorages,
  specialSystemFileStorages,
  sanitaryFileStorages,

  project,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const project_id = project.payload?.id;

  const [data, setData] = useState<ApiCallState<FileStorage[]>>(
    resetApiCallState([])
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(getData());
  }, [
    structuralFileStorages,
    architectureFileStorages,
    plumbingFileStorages,
    mechanicalFileStorages,
    electricalFileStorages,
    fireFightingFileStorages,
    specialSystemFileStorages,
    sanitaryFileStorages,
  ]);

  const onDelete = (id: number) => {
    setDeleteLoading(true);
    deleteData(id)
      .then(() => {
        setDeleteLoading(false);
        fetchData();
        OpenNotification(NotificationType.SUCCESS, "Upload deleted", "");
      })
      .catch((error) => {
        setDeleteLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Upload not deleted",
            e.message
          )
        );
      });
  };

  const fetchData = () => {
    switch (module) {
      case DesignTabs.STRUCTURAL:
        fetchAllStructuralFileStorage({ project_id });
        break;

      case DesignTabs.ARCHITECTURE:
        fetchAllArchitectureFileStorage({ project_id });
        break;

      case DesignTabs.ELECTRICAL:
        fetchAllElectricalFileStorage({ project_id });
        break;

      case DesignTabs.PLUMBING:
        fetchAllPlumbingFileStorage({ project_id });
        break;

      case DesignTabs.MECHANICAL:
        fetchAllMechanicalFileStorage({ project_id });
        break;

      case DesignTabs.FIRE_FIGHTING:
        fetchAllFireFightingFileStorage({ project_id });
        break;

      case DesignTabs.SPECIAL_SYSTEM:
        fetchAllSpecialSystemFileStorage({ project_id });
        break;

      case DesignTabs.SANITARY:
        fetchAllSanitaryFileStorage({ project_id });
        break;

      default:
        break;
    }
  };

  const getData = () => {
    switch (module) {
      case DesignTabs.STRUCTURAL:
        return structuralFileStorages;

      case DesignTabs.ARCHITECTURE:
        return architectureFileStorages;

      case DesignTabs.ELECTRICAL:
        return electricalFileStorages;

      case DesignTabs.PLUMBING:
        return plumbingFileStorages;

      case DesignTabs.MECHANICAL:
        return mechanicalFileStorages;

      case DesignTabs.FIRE_FIGHTING:
        return fireFightingFileStorages;

      case DesignTabs.SPECIAL_SYSTEM:
        return specialSystemFileStorages;

      case DesignTabs.SANITARY:
        return sanitaryFileStorages;

      default:
        return resetApiCallState([]);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12 mb-3">
        <ReloadButtonComponent onClick={() => fetchData()} />
        <AuthenticationComponent type="WRITE">
          <AddUpload module={module} fetchData={fetchData} />
        </AuthenticationComponent>
      </div>

      <div className="col-md-12">
        <Table
          loading={data.isPending}
          dataSource={data.payload.map((e) => ({ ...e, key: e.id }))}
          pagination={false}
          columns={[
            { title: "No", render: (record, data, index) => index + 1 },
            { title: "Date", dataIndex: "date" },
            { title: "Reference No", dataIndex: "reference_no" },
            {
              title: "Link",
              dataIndex: "link",
              render: (record) =>
                record === "undefined" ? (
                  "-"
                ) : (
                  <a href={record} target="_blank" rel="noreferrer">
                    Open
                  </a>
                ),
            },
            {
              title: "File",
              dataIndex: "file_name",
              render: (record) =>
                record ? (
                  <Button
                    icon={<FolderOpenOutlined />}
                    onClick={() =>
                      window.open(`${BASE_URI}/${record}`, "_blank")
                    }
                  ></Button>
                ) : (
                  "-"
                ),
            },
            {
              title: "Uploaded by",
              render: (render, data) => data.user.full_name,
            },
            {
              title: "Action",
              render: (record, data, index) => (
                <>
                  <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="click"
                    content={
                      <div className="d-flex flex-column">
                        <ViewUploadComponent module={module} upload={data} />
                        <AuthenticationComponent type="EDIT">
                          <EditUploadComponent
                            module={module}
                            upload={data}
                            fetchData={fetchData}
                          />
                        </AuthenticationComponent>
                        <AuthenticationComponent type="DELETE">
                          <Popconfirm
                            title="Are you sure to delete this upload?"
                            onConfirm={() => onDelete(record.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button loading={deleteLoading} type="text" danger>
                              Delete
                            </Button>
                          </Popconfirm>
                        </AuthenticationComponent>
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
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  structuralFileStorages: state.file_storage.fetchAllStructural,
  architectureFileStorages: state.file_storage.fetchAllArchitecture,
  plumbingFileStorages: state.file_storage.fetchAllPlumbing,
  mechanicalFileStorages: state.file_storage.fetchAllMechanical,
  electricalFileStorages: state.file_storage.fetchAllElectrical,
  fireFightingFileStorages: state.file_storage.fetchAllFireFighting,
  specialSystemFileStorages: state.file_storage.fetchAllSpecialSystem,
  sanitaryFileStorages: state.file_storage.fetchAllSanitary,

  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllStructuralFileStorage: (payload: any) =>
    dispatch(fetchAllStructuralFileStorage(payload)),
  fetchAllArchitectureFileStorage: (payload: any) =>
    dispatch(fetchAllArchitectureFileStorage(payload)),
  fetchAllPlumbingFileStorage: (payload: any) =>
    dispatch(fetchAllPlumbingFileStorage(payload)),
  fetchAllMechanicalFileStorage: (payload: any) =>
    dispatch(fetchAllMechanicalFileStorage(payload)),
  fetchAllElectricalFileStorage: (payload: any) =>
    dispatch(fetchAllElectricalFileStorage(payload)),
  fetchAllFireFightingFileStorage: (payload: any) =>
    dispatch(fetchAllFireFightingFileStorage(payload)),
  fetchAllSpecialSystemFileStorage: (payload: any) =>
    dispatch(fetchAllSpecialSystemFileStorage(payload)),
  fetchAllSanitaryFileStorage: (payload: any) =>
    dispatch(fetchAllSanitaryFileStorage(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileStorageComponent);
