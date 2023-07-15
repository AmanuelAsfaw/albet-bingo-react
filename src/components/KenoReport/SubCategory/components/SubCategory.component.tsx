import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  SubCategoryPropType,
  deleteSubCategory,
} from "../utils/Category.utils";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { Button, Popconfirm, Popover, Select, Table } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";

import AddSubCategoryComponent from "./Add/AddSubCategory.component";
import EditSubCategoryComponent from "./Edit/EditSubCategory.component";
import { fetchAllSubCategory } from "../../../../redux/SubCategory/SubCategory.action";
import { fetchAllCategory } from "../../../../redux/Category/Category.action";
import { useParams } from "react-router-dom";

const SubCategoryComponent: FC<SubCategoryPropType> = ({
  sub_category,
  fetchAll,
  category,
  fetchAllCategory,
}) => {
  const [loading, setLoading] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    fetchAllCategory({ project_id: id });
  }, []);

  useEffect(() => {
    fetchAll({ category_id: defaultCategory, project_id: id });
  }, [defaultCategory]);

  const RemoveCategory = (record: any) => {
    setLoading(true);
    deleteSubCategory(record.id)
      .then(() => {
        setLoading(false);
        fetchAll({ category_id: defaultCategory, project_id: id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.SUB_CATEGORY_DELETE_FAIL,
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.SUB_CATEGORY_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const renderPopOverContent = (record: any) => {
    return (
      <div className="d-flex flex-column">
        <EditSubCategoryComponent id={record.id} />
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
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-end">
          <Select
            placeholder="select category"
            style={{ width: "150px" }}
            showSearch
            allowClear={false}
            value={defaultCategory}
            onChange={(value) => setDefaultCategory(value)}
            filterOption={(inputValue, option) => {
              return (
                (option?.children?.toString() ?? "")
                  .toLowerCase()
                  .indexOf(inputValue.toLowerCase()) !== -1
              );
            }}
          >
            {category.payload.map((items, index) => (
              <Select.Option value={items.id} key={index}>
                {items.description}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="d-flex justify-content-end">
          <AddSubCategoryComponent defaultCategory={defaultCategory} />
          <ReloadButtonComponent
            onClick={() =>
              fetchAll({ category_id: defaultCategory, project_id: id })
            }
          />
        </div>
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
            dataSource={sub_category.payload}
            loading={sub_category.isPending}
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
  sub_category: state.sub_category.fetchAll,
  category: state.category.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllSubCategory(action)),
  fetchAllCategory: (action: any) => dispatch(fetchAllCategory(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategoryComponent);
