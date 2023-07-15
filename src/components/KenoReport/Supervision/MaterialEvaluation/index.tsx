import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  MaterialEvaluationPropType,
  deleteData,
} from "./util/MaterialEvaluation.util";
import {
  PrinterOutlined,
  MoreOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Popconfirm, Table } from "antd";
import { zeroPad } from "../../../../utilities/utilities";
import moment from "moment";
import { Button, Popover } from "antd";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { fetchAllUser } from "../../../../redux/User/User.action";
import AddMaterialEvaluationComponent from "./components/Add";
import DetailComponent from "./components/Detail/Detail.component";
import PrintComponent from "./components/Print/Print.component";
import EditComponent from "./components/Edit/Edit.component";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import {
  fetchAllMaterialEvaluation,
  fetchOneMaterialEvaluation,
} from "../../../../redux/MaterialEvaluation/MaterialEvaluation.action";
import { MaterialEvaluation } from "../../../../redux/MaterialEvaluation/MaterialEvaluation.type";
import { fetchMaterial } from "../../../../redux/Material/Material.action";
import AuthenticationComponent from "../../../common/Auth/Authentication.component";

const MaterialEvaluationComponent: FC<MaterialEvaluationPropType> = ({
  fetchMaterialEvaluations,
  material_evaluations,
  project,
  fetchUsers,
  fetchMaterialEvaluation,
  fetchMaterial,
}) => {
  const [is_visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected_index, setSelected] = useState(1);
  useEffect(() => {
    fetchMaterialEvaluations({ project_id: project.payload?.id });
    fetchUsers();
  }, [fetchMaterialEvaluations, project, fetchUsers]);

  const onDelete = (id: any) => {
    setLoading(true);
    deleteData(id)
      .then(() => {
        setLoading(false);
        fetchMaterialEvaluations({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.MATERIAL_EVALUATION_REMOVED_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.MATERIAL_EVALUATION_REMOVED_FAILED,
            e.message
          )
        );
      });
  };

  const columns: ColumnsType<MaterialEvaluation> = [
    {
      title: "No",
      dataIndex: "id",
      key: "no",
      render: (value, record, index) => zeroPad(index + 1),
    },
    {
      title: "Evaluation No",
      dataIndex: "evaluation_no",
      key: "evaluation_no",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => (moment(a.date).isBefore(b.date) ? 1 : -1),
      sortOrder: "descend",
      render: (data) => moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
      render: (record, data, index) => {
        const result = material_evaluations.payload.find(
          ({ id }) => id === data.id
        );
        const mat = result?.material_evaluation_items[0].material;
        return mat;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (record, data, index) => {
        const result = material_evaluations.payload.find(
          ({ id }) => id === data.id
        );
        const stat = result?.material_evaluation_items[0].status;
        return stat;
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "20%",
      render: (value, record, index) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <>
                  <AuthenticationComponent type="DELETE">
                    <Popconfirm
                      placement="leftTop"
                      title="Are you sure you want to Remove"
                      onConfirm={() => onDelete(record.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger type="text" loading={loading}>
                        Remove
                      </Button>
                    </Popconfirm>
                  </AuthenticationComponent>
                  <AuthenticationComponent type="EDIT">
                    <EditComponent id={record.id} index={index + 1} />
                  </AuthenticationComponent>
                </>

                <DetailComponent
                  material_evaluation_id={value}
                  index={index + 1}
                />
                <Button
                  loading={loading}
                  type="text"
                  onClick={() => {
                    setSelected(index + 1);
                    fetchMaterialEvaluation(record.id);
                    setVisible(true);
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
    <div className="row mt-1">
      <div className="col-md-12">
        <ReloadButtonComponent
          onClick={() =>
            fetchMaterialEvaluations({ project_id: project.payload?.id })
          }
        />
        <AuthenticationComponent type="WRITE">
          <AddMaterialEvaluationComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2  hidden-print">
        <Table
          columns={columns}
          dataSource={material_evaluations.payload.map((e, index) => ({
            ...e,
            key: Date.now() + index,
          }))}
          loading={material_evaluations.isPending}
        />
      </div>
      <div className="col-md-12 mt-2">
        <PrintComponent
          is_visible={is_visible}
          setVisibility={setVisible}
          index={selected_index}
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
  project: state.project.fetchOne,
  material_evaluations: state.material_evaluation.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMaterialEvaluations: (action: any) =>
    dispatch(fetchAllMaterialEvaluation(action)),
  fetchMaterialEvaluation: (action: any) =>
    dispatch(fetchOneMaterialEvaluation(action)),
  fetchUsers: (action: any) => dispatch(fetchAllUser()),
  fetchMaterial: (action: any) => dispatch(fetchMaterial()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialEvaluationComponent);
