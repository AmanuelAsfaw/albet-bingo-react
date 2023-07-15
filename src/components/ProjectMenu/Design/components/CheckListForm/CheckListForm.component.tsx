import { Button, Popconfirm, Popover, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CheckListFormPropType, deleteData } from "./CheckListForm.util";
import {
  fetchAllStructuralCheckListForm,
  fetchAllArchitectureCheckListForm,
  fetchAllPlumbingCheckListForm,
  fetchAllMechanicalCheckListForm,
  fetchAllElectricalCheckListForm,
  fetchAllFireFightingCheckListForm,
  fetchAllSpecialSystemCheckListForm,
  fetchAllSanitaryCheckListForm,
} from "../../../../../redux/CheckListForm/CheckListForm.action";
import AddCheckListFormComponent from "./components/Add/AddCheckListForm.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../../utilities/utilities";
import {
  DesignTabs,
  Message,
  NotificationType,
} from "../../../../../constants/Constants";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import EditCheckListFormComponent from "./components/Edit/EditCheckListForm.component";
import ViewCheckListComponentComponent from "./components/View/ViewCheckListForm.component";
import { useParams } from "react-router-dom";
import { ApiCallState, resetApiCallState } from "../../../../../redux/Utils";
import { CheckListForm } from "../../../../../redux/CheckListForm/CheckListForm.type";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const CheckListFormComponent: FC<CheckListFormPropType> = ({
  module,
  architecturalCheckListForms,
  electricalCheckListForms,
  structuralCheckListForms,
  plumbingCheckListForms,
  mechanicalCheckListForms,
  fireFightingCheckListForms,
  specialSystemCheckListForms,
  sanitaryCheckListForms,
  fetchAllStructuralCheckListForm,
  fetchAllArchitectureCheckListForm,
  fetchAllPlumbingCheckListForm,
  fetchAllMechanicalCheckListForm,
  fetchAllElectricalCheckListForm,
  fetchAllFireFightingCheckListForm,
  fetchAllSpecialSystemCheckListForm,
  fetchAllSanitaryCheckListForm,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { project_id }: any = useParams();

  const [data, setData] = useState<ApiCallState<CheckListForm[]>>(
    resetApiCallState([])
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(getData());
  }, [
    architecturalCheckListForms,
    electricalCheckListForms,
    structuralCheckListForms,
    plumbingCheckListForms,
    mechanicalCheckListForms,
    fireFightingCheckListForms,
    specialSystemCheckListForms,
    sanitaryCheckListForms,
  ]);

  const onDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        setDeleteLoading(false);
        fetchData();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CHECK_LIST_FORM_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setDeleteLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CHECK_LIST_FORM_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const fetchData = () => {
    switch (module) {
      case DesignTabs.STRUCTURAL:
        fetchAllStructuralCheckListForm({ project_id });
        break;

      case DesignTabs.ARCHITECTURE:
        fetchAllArchitectureCheckListForm({ project_id });
        break;

      case DesignTabs.PLUMBING:
        fetchAllPlumbingCheckListForm({ project_id });
        break;

      case DesignTabs.MECHANICAL:
        fetchAllMechanicalCheckListForm({ project_id });
        break;

      case DesignTabs.ELECTRICAL:
        fetchAllElectricalCheckListForm({ project_id });
        break;

      case DesignTabs.FIRE_FIGHTING:
        fetchAllFireFightingCheckListForm({ project_id });
        break;

      case DesignTabs.SPECIAL_SYSTEM:
        fetchAllSpecialSystemCheckListForm({ project_id });
        break;

      case DesignTabs.SANITARY:
        fetchAllSanitaryCheckListForm({ project_id });
        break;

      default:
        break;
    }
  };

  const getData = () => {
    switch (module) {
      case DesignTabs.STRUCTURAL:
        return structuralCheckListForms;

      case DesignTabs.ARCHITECTURE:
        return architecturalCheckListForms;

      case DesignTabs.PLUMBING:
        return plumbingCheckListForms;

      case DesignTabs.MECHANICAL:
        return mechanicalCheckListForms;

      case DesignTabs.ELECTRICAL:
        return electricalCheckListForms;

      case DesignTabs.FIRE_FIGHTING:
        return fireFightingCheckListForms;

      case DesignTabs.SPECIAL_SYSTEM:
        return specialSystemCheckListForms;

      case DesignTabs.SANITARY:
        return sanitaryCheckListForms;

      default:
        return resetApiCallState([]);
    }
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col float-right">
          <ReloadButtonComponent onClick={() => fetchData()} />
          <AuthenticationComponent type="WRITE">
            <AddCheckListFormComponent fetchData={fetchData} module={module} />
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
            title: "Name",
            dataIndex: "name",
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
                        <EditCheckListFormComponent
                          data={record}
                          fetchData={fetchData}
                          module={module}
                        />
                      </AuthenticationComponent>
                      <AuthenticationComponent type="DELETE">
                        <Popconfirm
                          title="Are you sure to delete this check list form?"
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
  structuralCheckListForms: state.checklist_form.fetchAllStructural,
  architecturalCheckListForms: state.checklist_form.fetchAllArchitecture,
  plumbingCheckListForms: state.checklist_form.fetchAllPlumbing,
  mechanicalCheckListForms: state.checklist_form.fetchAllMechanical,
  electricalCheckListForms: state.checklist_form.fetchAllElectrical,
  fireFightingCheckListForms: state.checklist_form.fetchAllFireFighting,
  specialSystemCheckListForms: state.checklist_form.fetchAllSpecialSystem,
  sanitaryCheckListForms: state.checklist_form.fetchAllSanitary,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllStructuralCheckListForm: (payload: any) =>
    dispatch(fetchAllStructuralCheckListForm(payload)),
  fetchAllArchitectureCheckListForm: (payload: any) =>
    dispatch(fetchAllArchitectureCheckListForm(payload)),
  fetchAllPlumbingCheckListForm: (payload: any) =>
    dispatch(fetchAllPlumbingCheckListForm(payload)),
  fetchAllMechanicalCheckListForm: (payload: any) =>
    dispatch(fetchAllMechanicalCheckListForm(payload)),
  fetchAllElectricalCheckListForm: (payload: any) =>
    dispatch(fetchAllElectricalCheckListForm(payload)),
  fetchAllFireFightingCheckListForm: (payload: any) =>
    dispatch(fetchAllFireFightingCheckListForm(payload)),
  fetchAllSpecialSystemCheckListForm: (payload: any) =>
    dispatch(fetchAllSpecialSystemCheckListForm(payload)),
  fetchAllSanitaryCheckListForm: (payload: any) =>
    dispatch(fetchAllSanitaryCheckListForm(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckListFormComponent);
