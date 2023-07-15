import { Button, Modal } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { DetailPropType } from "../../util/Memo.util";
import moment from "moment";
import MemoHeaderComponent from "../../../../../common/MemoHeader/MemoHeader.component";
const DetailComponent: FC<DetailPropType> = ({ memo, project }) => {
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
        className="memo-modal"
        style={{ top: 20 }}
        title="Detail"
        width={1000}
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        <MemoHeaderComponent type={"consultant"} />

        <div className="row justify-content-end">
          <div className="col-md-4">
            <h6>
              <b>Ref No:- </b>
              <u>{memo?.reference_number}</u>
            </h6>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-md-4">
            <h6>
              <b>Date:- </b>
              <u>{moment(memo?.date).format("DD/MM/YYYY")}</u>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h6>
              <b>To:- </b>
              <b className="text-uppercase">{memo?.memo_to?.full_name}</b>
            </h6>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-8">
            <h6>
              <b>Subject:- </b>
              <b className="text-uppercase">
                <u>{memo?.subject}</u>
              </b>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* <Input.TextArea
              className="pl-0"
              readOnly
              bordered={false}
              autoSize={{ minRows: 2, maxRows: 300 }}
              value={memo?.message.replaceAll("*---*", "\n")}
            /> */}
            <pre>{memo?.message.replaceAll("*---*", "\n")}</pre>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <h6>Yours sincerely,</h6>
            <h6>{memo?.memo_from?.full_name}</h6>
            <h6>{memo?.memo_from.role}</h6>
          </div>
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
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
