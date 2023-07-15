import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Popconfirm, Popover, Table } from "antd";
import moment from "moment";

import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import AddProjectVariationComponent from "./components/Add/AddProjectVariation.component";
import EditProjectVariationComponent from "./components/Edit/EditProjectVariation.component";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import {
  ProjectVariationPropType,
  deleteProjectVariation,
} from "./utils/ProjectVariation.utils";
import { fetchAllProjectVariations } from "../../../../redux/ProjectVariation/ProjectVariation.action";
import DocumentViewerComponent from "../../../common/DocumentViewer/DocumentViewer.component";

const ProjectVariation: FC<ProjectVariationPropType> = ({
  fetchAll,
  project_variation,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAll({});
  }, []);

  const RemoveReport = (record: any) => {
    setLoading(true);
    deleteProjectVariation(record.id)
      .then(() => {
        setLoading(false);
        fetchAll();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.PROJECT_VARIATION_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.PROJECT_VARIATION_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const renderPopOverContent = (record: any) => {
    return (
      <div className="d-flex flex-column">
        <EditProjectVariationComponent id={record.id} />
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={() => RemoveReport(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            loading={loading}
            type="text"
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-end">
        <AddProjectVariationComponent />
        <ReloadButtonComponent onClick={() => fetchAll()} />
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            columns={[
              {
                title: "No.",
                dataIndex: "no",
                width: "50px",
                render: (record: any, value: any, index: any) => index + 1,
              },
              {
                title: "Date",
                dataIndex: "date",
                width: 250,
                render: (value: any) => moment(value).format("YYYY-MM-DD"),
              },
              {
                title: "Description",
                dataIndex: "description",
                width: 250,
                render: (value: any) => value,
              },
              {
                title: "Amount",
                dataIndex: "amount",
                width: 250,
                render: (value: any) => value,
              },
              {
                title: "File",
                key: "document",
                render: (value, record) => (
                  <>
                    <DocumentViewerComponent document={record?.document} />
                  </>
                ),
              },

              {
                title: "Action",
                fixed: "right",
                render: (record: any) => (
                  <Popover
                    placement="top"
                    overlayClassName="action-popover"
                    trigger="focus"
                    zIndex={2000}
                    content={() => renderPopOverContent(record)}
                  >
                    <Button
                      icon={<MoreOutlined />}
                      className="btn-outline-secondary border-0"
                    ></Button>
                  </Popover>
                ),
              },
            ]}
            dataSource={project_variation.payload}
            loading={project_variation.isPending}
          />
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
  project_variation: state.project_variation.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllProjectVariations(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectVariation);
