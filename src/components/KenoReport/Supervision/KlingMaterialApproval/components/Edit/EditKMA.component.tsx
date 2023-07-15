import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Statistic,
  Upload,
} from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
  EditKMAPropType,
  RequestType,
  sendData,
} from "../../util/KlingMaterialApproval.util";
import { fetchAllKlingMaterialApproval } from "../../../../../../redux/KlingMaterialApproval/KlingMaterialApproval.action";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../constants/Constants";
import {
  ErrorHandler,
  searchProp,
} from "../../../../../../utilities/utilities";
import SubmittalInformationComponent from "../Add/components/SubmittalInformation.component";
import SubmittalInformationItemComponent from "../Add/components/SubmittalInformationItem.component";
import ConsultantResponseItemComponent from "../Add/components/ConsultantResponseItem.component";
import ConsultantResponseComponent from "../Add/components/ConsultantResponse.component";
import moment from "moment";

const EditKMAComponent: FC<EditKMAPropType> = ({
  project,
  users,
  kling_material_approval,
  fetchAllKlingMaterialApproval,
  klingMaterialApprovals,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [is_approval, setIsApproval] = useState(false);
  const [is_selection, setIsSelection] = useState(false);
  const [is_shop, setIsShop] = useState(false);
  const [is_others, setIsOthers] = useState(false);
  const [submittal_info, setSubmittalInfo] = useState<any>([]);
  const [submittal_info_item, setSubmittalInfoItem] = useState<any>([]);
  const [response, setResponse] = useState<any>([]);
  const [response_item, setResponseItem] = useState<any>([]);
  const [requestType, setRequestType] = useState<string>("");
  const [form] = Form.useForm();

  useEffect(() => {
    setSubmittalInfo([
      {
        ...kling_material_approval?.kling_ma_submittal_information,
        key: Date.now(),
      },
    ]);
    setSubmittalInfoItem(
      kling_material_approval?.kling_ma_submittal_information?.kling_ma_submittal_information_items.map(
        (item, index) => ({
          key: index,
          ...item,
        })
      )
    );
    setIsApproval(kling_material_approval.is_approval);
    setIsSelection(kling_material_approval.is_selection);
    setIsShop(kling_material_approval.is_shop);
    setIsOthers(kling_material_approval.is_others);
    setRequestType(kling_material_approval.request_type);
  }, [kling_material_approval]);

  useEffect(() => {
    if (kling_material_approval.kling_ma_consultant_response) {
      setResponse([
        {
          ...kling_material_approval.kling_ma_consultant_response,
          key: Date.now(),
        },
      ]);
    } else {
      setResponse([
        {
          key: Date.now(),
          is_approved_as: false,
          is_approved_comments: false,
          is_resubmit: false,
          is_rejected: false,
          is_ignored: false,
          submitted_response_by_id: 0,
          comment: "",
        },
      ]);
    }

    if (
      kling_material_approval.kling_ma_consultant_response
        ?.kling_ma_consultant_response_items.length
    ) {
      setResponseItem(
        kling_material_approval.kling_ma_consultant_response?.kling_ma_consultant_response_items.map(
          (item, index) => ({
            key: index,
            ...item,
          })
        )
      );
    } else {
      setResponseItem([
        {
          key: 1,
          description:
            "Is Submitted item in Accordance with Contract Requirements",
          yes: false,
          no: false,
        },
        {
          key: 2,
          description:
            "Is Submitted Item Compatible with adjoining construction",
          yes: false,
          no: false,
        },
        {
          key: 3,
          description:
            "Is Submittal Complete with all the information requested on the technical specs",
          yes: false,
          no: false,
        },
        {
          key: 4,
          description:
            "Does Submittal meet specified standards (ASTM, ES, BS, EBCS)",
          yes: false,
          no: false,
        },
      ]);
    }
  }, [kling_material_approval]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("files", submittal_info[0]?.file);
    submittal_info_item.forEach((item: any) => {
      formData.append("files", item?.file);
    });
    let submittal_items_updated = submittal_info_item.map((item: any) => ({
      ...item,
      fileName: item.file?.name,
    }));
    let details = submittal_items_updated.map((item: any) => {
      delete item.file;
      return item;
    });

    let submittal_data = {
      ...submittal_info[0],
      file_name: submittal_info[0]?.file?.name,
      kling_ma_submittal_information_items: details,
    };
    const data = {
      id: kling_material_approval.id,
      project_id: project.payload?.id,
      deliver_order_no: value.deliver_order_no,
      reference_no: value.reference_no,
      request_type: requestType,
      is_approval: is_approval,
      is_selection: is_selection,
      is_shop: is_shop,
      is_others: is_others,
      kling_submittal_information: submittal_data,
    };
    formData.append("datas", JSON.stringify(data));

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllKlingMaterialApproval({
          project_id: project.payload.id,
        });
        OpenNotification(NotificationType.SUCCESS, "Edited!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(NotificationType.ERROR, "Failed to edit", e.message)
        );
      });
  };

  const onChangeSelectors = (name: string, checked: boolean) => {
    if (name === "is_approval") {
      setIsApproval(checked);
      setIsSelection(false);
      setIsShop(false);
      setIsOthers(false);
    } else if (name === "is_selection") {
      setIsApproval(false);
      setIsSelection(checked);
      setIsShop(false);
      setIsOthers(false);
    } else if (name === "is_shop") {
      setIsApproval(false);
      setIsSelection(false);
      setIsShop(checked);
      setIsOthers(false);
    } else if (name === "is_others") {
      setIsApproval(false);
      setIsSelection(false);
      setIsShop(false);
      setIsOthers(checked);
    }
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1200}
        title="Edit Material Approval"
        open={isModalVisible}
        onCancel={handleOk}
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
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            deliver_order_no: kling_material_approval.deliver_order_no,
            reference_no: kling_material_approval?.reference_no,
            request_type: kling_material_approval?.request_type,
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <b>Project Information</b>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 ">
              <Statistic
                title="Client"
                value={project.payload?.client?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-3">
              <Statistic
                title="Consultant Firm"
                value={project.payload?.consultant?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-3">
              <Statistic
                title="Project Title"
                value={project.payload?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-3">
              <Statistic
                title="Contractor"
                value={project.payload?.contractor?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-3">
              <Statistic
                title="Project Location"
                value={project.payload?.location}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-3">
              <Statistic
                title="Contract No."
                value={project.payload?.contract_no}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-3">
              <Form.Item
                style={{ color: "grey" }}
                label="Delivery Order No."
                name="deliver_order_no"
                rules={[
                  { required: true, message: "Delivery Order No. Required!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-2">
              <b>Submittal Information</b>
            </div>
            <div className="col-md-3">
              <Form.Item label="Request Type">
                <Select
                  style={{ width: "100%" }}
                  value={requestType}
                  onChange={(e) => setRequestType(e)}
                >
                  <Select.Option value={RequestType.SUBMISSION}>
                    {RequestType.SUBMISSION}
                  </Select.Option>
                  <Select.Option value={RequestType.RESUBMISSION}>
                    {RequestType.RESUBMISSION}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-3">
              {requestType === RequestType.SUBMISSION && (
                <Form.Item
                  name="reference_no"
                  label="Reference number"
                  rules={[
                    { required: true, message: "Reference NO Is Required!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              {requestType === RequestType.RESUBMISSION && (
                <Form.Item
                  name="reference_no"
                  label="Reference number"
                  rules={[
                    { required: true, message: "Reference NO Is Required!" },
                  ]}
                >
                  <Select style={{ width: "100%" }} {...searchProp}>
                    {klingMaterialApprovals.payload
                      .filter((e) => e?.reference_no)
                      .map((elem) => (
                        <Select.Option value={elem.reference_no}>
                          {elem.reference_no}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              )}
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-6 mt-2">
              <SubmittalInformationComponent
                submittal_info={submittal_info}
                setSubmittalInfo={setSubmittalInfo}
                is_new={true}
              />
            </div>
            <div className="col-md-6">
              <SubmittalInformationItemComponent
                submittal_info_item={submittal_info_item}
                setSubmittalInfoItem={setSubmittalInfoItem}
                is_new={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-2">Purpose</div>
            <div className="ml-3">
              <Checkbox
                checked={is_approval}
                onChange={(e) =>
                  onChangeSelectors("is_approval", e.target.checked)
                }
              >
                Approval
              </Checkbox>
              <Checkbox
                checked={is_selection}
                onChange={(e) =>
                  onChangeSelectors("is_selection", e.target.checked)
                }
              >
                Selection
              </Checkbox>
              <Checkbox
                checked={is_shop}
                onChange={(e) => onChangeSelectors("is_shop", e.target.checked)}
              >
                Shop Drawing Approval
              </Checkbox>
              <Checkbox
                checked={is_others}
                onChange={(e) =>
                  onChangeSelectors("is_others", e.target.checked)
                }
              >
                Others
              </Checkbox>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <Form.Item label="Submitted By">
              <Input value={kling_material_approval.submitted_by} />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item label="Date">
                <DatePicker value={moment(kling_material_approval.updatedAt)} disabled />
              </Form.Item>
            </div>
          </div>
          <Divider style={{ borderTop: "2px solid #000" }} />
          <div className="row">
            <div className="col-md-12 mt-2">
              <ConsultantResponseItemComponent
                is_new={true}
                response_item={response_item}
                setResponseItem={setResponseItem}
              />
            </div>
          </div>

          <div className="row">
            <ConsultantResponseComponent
              response={response}
              setResponse={setResponse}
              is_new={true}
            />
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Item label="Submitted Response By Client">
                <Input
                  disabled={true}
                  value={
                    kling_material_approval.kling_ma_client_response
                      ?.submitted_response_by_client
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item label="Date">
                <DatePicker
                  picker="date"
                  value={moment(
                    kling_material_approval?.kling_ma_client_response?.updatedAt
                  )}
                  disabled
                />
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
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  klingMaterialApprovals: state.kling_material_approval.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllKlingMaterialApproval: (action: any) =>
    dispatch(fetchAllKlingMaterialApproval(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditKMAComponent);
