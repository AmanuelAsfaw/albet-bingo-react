import Button from "antd/lib/button";
import React, { FC, useEffect, useState } from "react";
import { ViewInspectionFormPropType } from "./ViewInspectionForm.util";
import { connect } from "react-redux";
import {
  fetchOneInspectionForm,
  fetchOneInspectionFormReset,
} from "../../../../../../redux/InspectionForm/InspectionForm.action";
import Modal from "antd/lib/modal/Modal";
import { Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const ViewInspectionFormComponent: FC<ViewInspectionFormPropType> = ({
  id,
  name,
  fetchOneInspectionForm,
  fetchOneInspectionFormReset,
  fetchOne,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!isModalVisible) {
      fetchOneInspectionFormReset();
    } else {
      fetchOneInspectionForm(id);
    }
  }, [fetchOneInspectionForm, fetchOneInspectionFormReset, id, isModalVisible]);

  const handleOnClick = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "No",
      render: (value: any, record: any, index: number) => index + 1,
    },
    {
      title: "Inspection Item Description",
      dataIndex: "description",
    },
  ];

  return (
    <>
      <Button onClick={handleOnClick} type="text">
        View
      </Button>
      <Modal
        title="Inspection Items"
        style={{ top: 10 }}
        visible={isModalVisible}
        onCancel={handleOk}
        width={800}
        footer={[]}
      >
        <div className="col-md-12">
          <h5>{name}</h5>
          <Table
            columns={columns}
            dataSource={fetchOne.payload.inspection_form_items}
            loading={fetchOne.isPending}
            pagination={false}
          />
        </div>
      </Modal>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  fetchOne: state.inspection_form.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneInspectionForm: (id: any) => dispatch(fetchOneInspectionForm({ id })),
  fetchOneInspectionFormReset: () => dispatch(fetchOneInspectionFormReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewInspectionFormComponent);
