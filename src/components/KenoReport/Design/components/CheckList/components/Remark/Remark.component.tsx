import {
  Badge,
  Button,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Upload,
} from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { CommentOutlined } from "@ant-design/icons";
import { UploadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { toNumber } from "lodash";
import {
  RemarkPropType,
  sendRemark,
  parseData,
  updateSeen
} from "./Remark.util";
import { ErrorHandler, getUserData } from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../../../constants/Constants";
import { DownloadFile } from "../../../../../../Document/MyDocument/index.util";
import { fetchAllChecklistRemark } from "../../../../../../../redux/ChecklistRemark/ChecklistRemark.action";


const AddRemarkComponent: FC<RemarkPropType> = ({
  remarkData,
  users,
  fetchData,
  checklist_remark,
  fetchAllChecklistRemark
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [remarks,setRemarks] = useState<any>([])
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = getUserData();
  const dateFormat = "DD-MM-YYYY h:mm a";

  useEffect(() => {
    fetchAllChecklistRemark({check_list_id:remarkData.id});
  }, [fetchAllChecklistRemark,isModalVisible,remarkData]);

  useEffect(() => {
    if (checklist_remark.payload.length) {
      let arr = [];
      arr = checklist_remark.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
      }));
      setRemarks(arr);
    }
  }, [checklist_remark]);
 
  const data = parseData(remarkData,id);
  const handleOk = () => {
    let user = remarkData.users.find((e:any)=> e.id === id);
    let sendData = {}
    if(user){
       sendData ={
        id:user?.["user_checklist"].id,
        check_list_id:remarkData.id,
        user_id:id
      }
    }else{
      sendData ={
        check_list_id:remarkData.id,
        user_id:id
    }}
    updateSeen(sendData).then(() => {
        setIsModalVisible(false);
        form.resetFields();
        fetchData();
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Last seen update failed",
            e.message
          )
        );
      });
  };

  
  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("check_list_id", `${remarkData.id}`);
    formData.append("date", moment().format(dateFormat));
    formData.append("remarked_by", `${getUserData().id}`);
    formData.append("file", value?.file?.file);
    formData.append("remark", `${value.remark}`);

    sendRemark(formData)
      .then(() => {
        form.resetFields();
        setLoading(false);
        fetchAllChecklistRemark({check_list_id:remarkData.id});
        OpenNotification(NotificationType.SUCCESS, Message.REMARK_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.REMARK_FAILED,
            e.message
          )
        );
      });
  };

  
  const renderRemark = () => {
    const item: any[] = [];
    remarks
      .sort((a: any, b: any) =>
        moment(a.date).isBefore(moment(b.date)) ? -1 : 1
      )
      .forEach((remark: any) => {
        item.push(
          <>
            <List.Item>
              <List.Item.Meta
                title={
                  users.find((e) => e.id === toNumber(remark.remarked_by))
                    ?.full_name
                }
                description={remark.remark}
              />
              <div className="d-flex flex-column align-items-center">
                <h6
                  style={{
                    color: "#979797",
                    fontSize: "14px",
                    marginBottom: "0px",
                  }}
                >
                  {remark.date}
                </h6>
                {remark?.document ? (
                  <Button
                    type="link"
                    icon={<CloudDownloadOutlined />}
                    onClick={() => DownloadFile(remark.document)}
                  ></Button>
                ) : null}
              </div>
            </List.Item>
          </>
        );
      });

    return item;
  };

 
  return (
    <>
      <a onClick={() => setIsModalVisible(true)}>
      <Badge
        status="error"
        count={data.counter}
        className="mr-1 notification-badge"
      >
        <Button
          type="link"
          icon={<CommentOutlined />}
          onClick={() => setIsModalVisible(true)}
        ></Button>
      </Badge>
      </a>
      <Modal
        centered
        className="fixed-modal"
        title="Add Remark"
        visible={isModalVisible}
        onCancel={handleOk}
        width={900}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-10">
              <Form.Item
                label="Remark"
                name="remark"
                rules={[{ message: "Remark Required", required: true }]}
              >
                <Input.TextArea placeholder="comment" autoSize />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item
                label="File"
                rules={[{ required: false, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                  progress= {{
                    strokeLinecap:"butt",
                    strokeColor: {
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    },
                    strokeWidth: 3,
                    format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
                  }}
                >
                  <Button
                    className="btn-outline-secondary"
                    style={{ width: "100%" }}
                  >
                    <UploadOutlined /> Upload
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-lg-12">
              <List className="remark-list">{renderRemark()}</List>
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
const mapStateToProps = (state: any) => ({
  checklist_remark:state.checklist_remark.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllChecklistRemark:(action:any)=>dispatch(fetchAllChecklistRemark(action))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRemarkComponent);
