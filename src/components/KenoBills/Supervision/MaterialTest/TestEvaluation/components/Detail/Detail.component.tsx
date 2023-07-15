import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { DetailPropType } from "../../util/TestEvaluation.util";
import DetailFormComponent from "../Form/DetailForm.component";
const DetailComponent: FC<DetailPropType> = ({ test_evaluation, project }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Detail
      </Button>
      <Modal
        // width={1000}
        className="fixed-modal"
        centered
        title="Detail"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[<div></div>]}
      >
        <DetailFormComponent test_evaluation={test_evaluation} />
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
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
