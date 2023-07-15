import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllTestEvaluation } from "../../../../../redux/TestEvaluation/TestEvaluation.action";
import { TestEvaluationPropType, deleteData } from "./util/TestEvaluation.util";
import { Button, Popconfirm, Popover, Table } from "antd";
import {
  PrinterOutlined,
  MoreOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddTestEvaluationComponent from "./components/Add/AddTestEvaluation.component";
import { fetchAllCasting } from "../../../../../redux/Casting/Casting.action";
import { ColumnsType } from "antd/lib/table";
import { TestEvaluation } from "../../../../../redux/TestEvaluation/TestEvaluation.type";
import DetailComponent from "./components/Detail/Detail.component";
import { getUserData } from "../../../../../utilities/utilities";
import PrintRequestComponent from "./components/Print/Print.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";
const TestEvaluationComponent: FC<TestEvaluationPropType> = ({
  fetchEvaluation,
  project,
  test_evaluation,
  fetchCastings,
}) => {
  useEffect(() => {
    fetchCastings({ project_id: project.payload?.id });
    fetchEvaluation({ project_id: project.payload?.id });
  }, [fetchEvaluation, project, fetchCastings]);
  const [selected, setSelected] = useState<any>();
  const [is_visible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const column: ColumnsType<TestEvaluation> = [
    {
      title: "No",
      key: "no",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Structural Element",
      key: "element",
      render: (value, record) => record.casting?.structure_type,
    },
    {
      title: "Cement Type",
      key: "type",
      render: (value, record) => record.casting?.cement_type,
    },
    {
      title: "Cast Date",
      key: "date",
      render: (value, record) => record.casting?.date,
    },
    {
      title: "Axis",
      key: "axis",
      render: (value, record) => record.casting?.axis,
    },
    {
      title: "Detail",
      key: "detail",
      render: (value, record) => (
        <Popover
          placement="rightTop"
          overlayClassName="action-popover"
          trigger="focus"
          content={
            <div className="d-flex flex-column">
              <DetailComponent test_evaluation={record} />
              <Popconfirm
                placement="leftTop"
                title="Are you sure you want to remove"
                onConfirm={() => onDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                {record.user.id === getUserData().id ? (
                  <Button type="text" loading={loading} className="mr-1" danger>
                    Delete
                  </Button>
                ) : null}
              </Popconfirm>
              <Button
                type="text"
                onClick={() => {
                  setSelected(record);
                  setIsVisible(true);
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
      ),
    },
  ];

  const onDelete = (id: any) => {
    setLoading(true);
    deleteData(id)
      .then(() => {
        setLoading(false);
        fetchEvaluation({ project_id: project.payload?.id });
        OpenNotification(NotificationType.SUCCESS, Message.REMOVE_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.REMOVE_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <AuthenticationComponent type="WRITE">
          <AddTestEvaluationComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 hidden-print">
        <Table
          dataSource={test_evaluation.payload}
          columns={column}
          loading={test_evaluation.isPending}
        />
      </div>

      <PrintRequestComponent
        is_visible={is_visible}
        setVisibility={setIsVisible}
        selected={selected}
        setSelected={setSelected}
        project={project}
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
  test_evaluation: state.test_evaluation.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchCastings: (action: any) => dispatch(fetchAllCasting(action)),
  fetchEvaluation: (action: any) => dispatch(fetchAllTestEvaluation(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestEvaluationComponent);
