import { FC, useEffect, useRef } from "react";
import { Form, Input, Button, Upload } from "antd";
import { connect } from "react-redux";
import { fetchOneUser } from "../../../../redux/User/User.action";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import {
  removeData,
  sendUserOnlyData,
  sendUserSignature,
  BasicInfoPropType,
} from "../../util/Setting.util";
import LoadingIndicator from "../../../common/Loading";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import Telegram from "../../../../Images/telegram.svg";
import { UploadOutlined } from "@ant-design/icons";
import SignatureComponent from "../../../common/Signature/Signature.component";
const BasicInfoComponent: FC<BasicInfoPropType> = ({
  fetchUser,
  user,
  form,
  setIsModalVisible,
  loadingAction,
}) => {
  const sigCanvas = useRef<any>({});
  const [loading, setLoading] = loadingAction;
  useEffect(() => {
    fetchUser(getUserData().id);
  }, [fetchUser]);

  const clear = () => sigCanvas.current.clear();

  const submit = (value: any) => {
    setLoading(true);
    sendUserOnlyData({ ...value, id: getUserData().id })
      .then(() => {
        fetchUser(getUserData().id);

        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.USER_REGISTRATION_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.USER_REGISTRATION_FAILED,
            e.message
          )
        );
      });
  };

  const remove = () => {
    setLoading(true);
    removeData(user.payload.signature?.id)
      .then(() => {
        fetchUser(getUserData().id);

        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.SIGNATURE_REMOVE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.SIGNATURE_REMOVE_FAILED,
            e.message
          )
        );
      });
  };

  return user.isPending ? (
    <LoadingIndicator />
  ) : (
    <Form
      layout="vertical"
      onFinish={submit}
      initialValues={user.payload}
      form={form}
    >
      <div className="row">
        <div className="col-md-12">
          <Form.Item
            label="Name"
            rules={[{ message: "Please enter your full name", required: true }]}
            name="full_name"
          >
            <Input placeholder="name" />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item
            label="Email"
            rules={[
              { message: "Please enter new email address", required: true },
            ]}
            name="email"
          >
            <Input type="email" placeholder="Enter new email address" />
          </Form.Item>
        </div>

        {`${user.payload.chat_id}`.startsWith("_") ? (
          <>
            <div className="col-md-6">
              <Form.Item label="Telegram Verification Key">
                <Input
                  placeholder="telegram id"
                  value={user.payload?.chat_id.split("_")[1]}
                  readOnly
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `/verify_${user.payload?.chat_id.split("_")[1]}`
                    );
                    OpenNotification(
                      NotificationType.SUCCESS,
                      `Copied to clipboard`,
                      ""
                    );
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-md-6 mt-4 pt-2">
              <Button
                type="link"
                href="http://t.me/ovid_kling_bot"
                target="_blank"
              >
                <img src={Telegram} alt="Telegram Icon" /> Verify account to get
                Notification
              </Button>
            </div>
          </>
        ) : null}

        {/* {user.payload.signature ? (
          <>
            <div className="col-md-6 mt-3">
              <Form.Item label="Signature">
                <SignatureComponent user={user.payload} />
              </Form.Item>
            </div>
            <div className="col-md-6 mt-3">
              <Button loading={loading} onClick={remove} danger>
                Remove
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-12">
              <Form.Item
                label="Signature"
                rules={[{ required: true, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  name="file"
                  beforeUpload={(file) => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button
                    className="btn-outline-secondary"
                    style={{ width: "100%" }}
                  >
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <div className="col">
              <Button
                type="primary"
                className=" signature-clear"
                onClick={clear}
              >
                Clear
              </Button>
            </div>
          </>
        )} */}
      </div>
    </Form>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  user: state.user.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchOneUser(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfoComponent);
