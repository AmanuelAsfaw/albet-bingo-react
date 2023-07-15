import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CategoryPropType, deleteCategory } from "../utils/Category.utils";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { Button, Popconfirm, Popover, Table } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import AddCategoryComponent from "./Add/Category.component";

import EditCategoryComponent from "./Edit/EditCategory.component";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";
import { fetchAllCategory } from "../../../../redux/Category/Category.action";
import { useParams } from "react-router-dom";

const CategoryComponent: FC<CategoryPropType> = ({ category, fetchAll }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetchAll({ project_id: id });
  }, []);

  const RemoveCategory = (record: any) => {
    setLoading(true);
    deleteCategory(record.id)
      .then(() => {
        setLoading(false);
        fetchAll({ project_id: id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CATEGORY_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CATEGORY_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const renderPopOverContent = (record: any) => {
    return (
      <div className="d-flex flex-column">
        <EditCategoryComponent id={record.id} />
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={() => RemoveCategory(record)}
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
        <AddCategoryComponent />
        <ReloadButtonComponent onClick={() => fetchAll({ project_id: id })} />
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
                title: "Description",
                dataIndex: "description",
                width: "80%",
                render: (value: any) => value,
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
            dataSource={category.payload}
            loading={category.isPending}
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
  category: state.category.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllCategory(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
