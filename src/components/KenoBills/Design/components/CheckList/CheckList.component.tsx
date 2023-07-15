import { Button, Popconfirm, Popover, Table, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CheckListPropType, deleteData } from "./CheckList.util";
import {
  fetchAllStructuralCheckList,
  fetchAllArchitectureCheckList,
  fetchAllPlumbingCheckList,
  fetchAllMechanicalCheckList,
  fetchAllElectricalCheckList,
  fetchAllFireFightingCheckList,
  fetchAllSpecialSystemCheckList,
  fetchAllSanitaryCheckList,
} from "../../../../../redux/CheckList/CheckList.action";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../../utilities/utilities";
import {
  DesignTabs,
  Message,
  NotificationType,
} from "../../../../../constants/Constants";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import AddCheckListComponent from "./components/Add/AddCheckList.component";
import EditCheckListComponent from "./components/Edit/EditCheckList.component";
import ViewCheckListComponentComponent from "./components/View/ViewCheckList.component";
import CheckListStatusComponent from "./components/Status/CheckListStatus.component";
import moment from "moment";
import { useParams } from "react-router-dom";
import { ApiCallState, resetApiCallState } from "../../../../../redux/Utils";
import { CheckList } from "../../../../../redux/CheckList/CheckList.type";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import RemarkComponent from "./components/Remark/Remark.component";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const CheckListComponent: FC<CheckListPropType> = ({
  module,
  fetchAllStructuralCheckList,
  fetchAllArchitectureCheckList,
  fetchAllPlumbingCheckList,
  fetchAllMechanicalCheckList,
  fetchAllElectricalCheckList,
  fetchAllFireFightingCheckList,
  fetchAllSpecialSystemCheckList,
  fetchAllSanitaryCheckList,
  structuralCheckLists,
  architectureCheckLists,
  plumbingCheckLists,
  mechanicalCheckLists,
  electricalCheckLists,
  fireFightingCheckLists,
  specialSystemCheckLists,
  sanitaryCheckLists,
  users,
  fetchUsers,
  project,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const project_id = project.payload?.id;

  const [data, setData] = useState<ApiCallState<CheckList[]>>(
    resetApiCallState([])
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(getData());
  }, [
    structuralCheckLists,
    architectureCheckLists,
    plumbingCheckLists,
    mechanicalCheckLists,
    electricalCheckLists,
    fireFightingCheckLists,
    specialSystemCheckLists,
    sanitaryCheckLists,
  ]);

  const onDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        setDeleteLoading(false);
        fetchData();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CHECK_LIST_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setDeleteLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CHECK_LIST_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const fetchData = () => {
    switch (module) {
      case DesignTabs.STRUCTURAL:
        fetchAllStructuralCheckList({ project_id });
        break;

      case DesignTabs.ARCHITECTURE:
        fetchAllArchitectureCheckList({ project_id });
        break;

      case DesignTabs.ELECTRICAL:
        fetchAllElectricalCheckList({ project_id });
        break;

      case DesignTabs.PLUMBING:
        fetchAllPlumbingCheckList({ project_id });
        break;

      case DesignTabs.MECHANICAL:
        fetchAllMechanicalCheckList({ project_id });
        break;

      case DesignTabs.FIRE_FIGHTING:
        fetchAllFireFightingCheckList({ project_id });
        break;

      case DesignTabs.SPECIAL_SYSTEM:
        fetchAllSpecialSystemCheckList({ project_id });
        break;

      case DesignTabs.SANITARY:
        fetchAllSanitaryCheckList({ project_id });
        break;

      default:
        break;
    }
  };

  const getData = () => {
    switch (module) {
      case DesignTabs.STRUCTURAL:
        return structuralCheckLists;

      case DesignTabs.ARCHITECTURE:
        return architectureCheckLists;

      case DesignTabs.ELECTRICAL:
        return electricalCheckLists;

      case DesignTabs.PLUMBING:
        return plumbingCheckLists;

      case DesignTabs.MECHANICAL:
        return mechanicalCheckLists;

      case DesignTabs.FIRE_FIGHTING:
        return fireFightingCheckLists;

      case DesignTabs.SPECIAL_SYSTEM:
        return specialSystemCheckLists;

      case DesignTabs.SANITARY:
        return sanitaryCheckLists;

      default:
        return resetApiCallState([]);
    }
  };

  const getCompletionData = (record: CheckList) => {
    const total = record?.check_list_items?.filter(
      (e) => !e.is_subtitle
    )?.length;
    const done = record?.check_list_items?.filter(
      (e) => e.value === "C"
    )?.length;
    const result = total / done;

    let color = "";

    if (result === 1) color = "green";
    else if (done >= total / 2) color = "yellow";
    else color = "cyan";

    return { result: `(${done}/${total})`, color };
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col float-right">
          <ReloadButtonComponent onClick={() => fetchData()} />
          <AuthenticationComponent type="WRITE">
            <AddCheckListComponent module={module} fetchData={fetchData} />
          </AuthenticationComponent>
        </div>
      </div>

      <Table
        loading={data.isPending}
        dataSource={data.payload.map((e) => ({ ...e, key: e.id }))}
        columns={[
          {
            title: "No",
            width: 100,
            render: (value, record, index) => index + 1,
          },
          {
            title: "Date",
            dataIndex: "date",
            render: (value) => moment(value).format("DD/MM/YYYY"),
          },
          {
            title: "Prepared By",
            dataIndex: "user",
            render: (value) => value?.full_name,
          },
          {
            title: "Checklist",
            dataIndex: "name",
          },
          {
            title: "Completed",
            align: "center",
            render: (value, record) => (
              <Tag color={getCompletionData(record).color}>
                {getCompletionData(record).result}
              </Tag>
            ),
          },
          {
            title: "Remark",
            render: (data, record) => (
              <RemarkComponent
                fetchData={fetchData}
                remarkData={record}
                users={users.payload}
              />
            ),
          },
          {
            title: "Status",
            render: (value, record) => (
              <CheckListStatusComponent data={record} fetchData={fetchData} />
            ),
          },
          {
            title: "Action",
            width: 100,
            dataIndex: "id",
            render: (value, record, index) => (
              <>
                <Popover
                  placement="rightTop"
                  overlayClassName="action-popover"
                  trigger="focus"
                  content={
                    <div className="d-flex flex-column">
                      <ViewCheckListComponentComponent data={record} />
                      <AuthenticationComponent type="EDIT">
                        <EditCheckListComponent
                          data={record}
                          module={module}
                          fetchData={fetchData}
                        />
                      </AuthenticationComponent>
                      <AuthenticationComponent type="DELETE">
                        <Popconfirm
                          title="Are you sure to delete this check list ?"
                          onConfirm={() => onDelete(value)}
                          okText="Yes"
                          cancelText="No!"
                        >
                          <Button type="text" loading={deleteLoading} danger>
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
                  />
                </Popover>
              </>
            ),
          },
        ]}
      />
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  structuralCheckLists: state.checklist.fetchAllStructural,
  architectureCheckLists: state.checklist.fetchAllArchitecture,
  plumbingCheckLists: state.checklist.fetchAllPlumbing,
  mechanicalCheckLists: state.checklist.fetchAllMechanical,
  electricalCheckLists: state.checklist.fetchAllElectrical,
  fireFightingCheckLists: state.checklist.fetchAllFireFighting,
  specialSystemCheckLists: state.checklist.fetchAllSpecialSystem,
  sanitaryCheckLists: state.checklist.fetchAllSanitary,
  users: state.user.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllStructuralCheckList: (payload: any) =>
    dispatch(fetchAllStructuralCheckList(payload)),
  fetchAllArchitectureCheckList: (payload: any) =>
    dispatch(fetchAllArchitectureCheckList(payload)),
  fetchAllPlumbingCheckList: (payload: any) =>
    dispatch(fetchAllPlumbingCheckList(payload)),
  fetchAllMechanicalCheckList: (payload: any) =>
    dispatch(fetchAllMechanicalCheckList(payload)),
  fetchAllElectricalCheckList: (payload: any) =>
    dispatch(fetchAllElectricalCheckList(payload)),
  fetchAllFireFightingCheckList: (payload: any) =>
    dispatch(fetchAllFireFightingCheckList(payload)),
  fetchAllSpecialSystemCheckList: (payload: any) =>
    dispatch(fetchAllSpecialSystemCheckList(payload)),
  fetchAllSanitaryCheckList: (payload: any) =>
    dispatch(fetchAllSanitaryCheckList(payload)),
  fetchUsers: () => dispatch(fetchAllUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckListComponent);
