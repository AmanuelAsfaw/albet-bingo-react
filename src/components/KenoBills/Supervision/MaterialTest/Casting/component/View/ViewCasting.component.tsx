import React, { FC, useState } from "react";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import { Input, Form, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Casting } from "../../../../../../../redux/Casting/Casting.type";

const ViewCastingComponent: FC<{ data: Casting }> = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOnClick = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={handleOnClick}>
        Details
      </Button>
      <Modal
        title="Casting Detail"
        visible={isModalVisible}
        onCancel={handleOk}
        width={800}
        footer={[]}
      >
        <Form layout="vertical" initialValues={data}>
          <div className="row">
            <div className="col-md-4">
              <Form.Item label="Date" name="date">
                <Input readOnly />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Block" name="block">
                <Input readOnly />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Axis" name="axis">
                <Input readOnly />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item label="Concrete Grade" name="concrete_grade">
                <Input readOnly />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Structure Type" name="structure_type">
                <Input readOnly />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Source of Concrete" name="source_of_concrete">
                <Input readOnly />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item label="Concrete Slump" name="concrete_slump">
                <Input readOnly />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Cement Type" name="cement_type">
                <Input readOnly />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCastingComponent);
