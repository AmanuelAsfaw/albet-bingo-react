import { Button, Modal, Steps } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { AddCheckListPropType, sendData } from "./AddCheckList.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import FormOneComponent from "./components/FormOne/FormOne.component";
import FormTwoComponent from "./components/FormTwo/FormTwo.component";
import moment from "moment";

const AddCheckListComponent: FC<AddCheckListPropType> = ({
  module,
  fetchData,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  const [data, SetData] = useState<any>({
    user_id: getUserData().id,
    date: moment(),
  });

  const [submitFormOne, setSubmitFormOne] = useState(false);
  const [submitFormTwo, setSubmitFormTwo] = useState(false);

  const [resetFormOne, setResetFormOne] = useState(false);
  const [resetFormTwo, setResetFormTwo] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      resetForm();
    }
  }, [isModalVisible]);

  const { Step } = Steps;

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const resetForm = () => {
    setResetFormOne(true);
    setResetFormTwo(true);
    setCurrent(0);
  };

  const Submit = (value: any) => {
    setLoading(true);

    sendData(value)
      .then(() => {
        handleOk();
        setLoading(false);
        resetForm();
        fetchData();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CHECK_LIST_REGISTERED_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CHECK_LIST_REGISTERED_FAIL,
            e.message
          )
        );
      });
  };

  const steps: {
    title: string;
    content: any;
    status: "wait" | "process" | "finish" | "error";
  }[] = [
    {
      title: "Step 1",
      content: (
        <FormOneComponent
          module={module}
          dataAction={[data, SetData]}
          next={next}
          resetAction={[resetFormOne, setResetFormOne]}
          submitAction={[submitFormOne, setSubmitFormOne]}
        />
      ),
      status: "wait",
    },
    {
      title: "Step 2",
      content: (
        <FormTwoComponent
          module={module}
          dataAction={[data, SetData]}
          sendData={Submit}
          resetAction={[resetFormTwo, setResetFormTwo]}
          submitAction={[submitFormTwo, setSubmitFormTwo]}
        />
      ),
      status: "wait",
    },
  ];

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        New Checklist
      </Button>
      <Modal
        centered
        width={1000}
        className="fixed-modal"
        title="Register Checklist"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <div className="steps-action">
            {current > 0 && (
              <Button
                className="btn-outline"
                style={{ margin: "0 8px" }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}

            {current < steps.length - 1 && (
              <Button
                key="submit"
                htmlType="submit"
                type="primary"
                onClick={() => {
                  switch (steps[current].title) {
                    case "Step 1":
                      setSubmitFormOne(true);
                      break;
                    default:
                      next();
                      break;
                  }
                }}
              >
                Next
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={() => setSubmitFormTwo(true)}
              >
                Register
              </Button>
            )}
          </div>,
        ]}
      >
        <div className="">
          <Steps current={current} status={steps[current].status}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <div className="steps-content">{steps[current].content}</div>
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
)(AddCheckListComponent);
