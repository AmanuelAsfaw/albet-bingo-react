import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Statistic,
  Upload,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ResponsePropType,
  updateResponseData,
} from "../../util/KlingMaterialApproval.util";
import { fetchAllKlingMaterialApproval } from "../../../../../../redux/KlingMaterialApproval/KlingMaterialApproval.action";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../utilities/utilities";
import SubmittalInformationComponent from "../Add/components/SubmittalInformation.component";
import SubmittalInformationItemComponent from "../Add/components/SubmittalInformationItem.component";
import ConsultantResponseItemComponent from "../Add/components/ConsultantResponseItem.component";
import ConsultantResponseComponent from "../Add/components/ConsultantResponse.component";
import moment from "moment";
const ResponseComponent: FC<ResponsePropType> = ({
  project,
  users,
  kling_material_approval,
  fetchAllKlingMaterialApproval,
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
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

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
    setResponse([
      {
        ...kling_material_approval.kling_ma_consultant_response,
        key: Date.now(),
        submitted_response_by: getUserData().full_name,
      },
    ]);
  }, [kling_material_approval]);

  useEffect(() => {
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

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      id: kling_material_approval.kling_ma_consultant_response?.id,
      kling_material_approval_id: kling_material_approval.id,
      ...response[0],
      date: moment().format("YYYY-MM-DD"),
      submitted_response_by: getUserData().full_name,
      kling_ma_consultant_response_items: response_item,
    };

    updateResponseData(data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllKlingMaterialApproval({
          project_id: project.payload.id,
        });
        OpenNotification(
          NotificationType.SUCCESS,
          "Consultant Response Saved!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save consultant response",
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Consultant Response
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1200}
        title="Consultant Response"
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
        <Form layout="vertical" onFinish={Submit} form={form}>
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
              <Form.Item style={{ color: "grey" }} label="Delivery Order No.">
                <Input
                  value={kling_material_approval.deliver_order_no}
                  disabled
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <b>Submittal Information</b>
            </div>
            <div className="col-md-3">
              <Form.Item label="Request Type">
                <Input value={kling_material_approval.request_type} disabled />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item label="Reference No.">
                <Input value={kling_material_approval.reference_no} disabled />
              </Form.Item>
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-6 mt-2">
              <SubmittalInformationComponent
                submittal_info={submittal_info}
                setSubmittalInfo={setSubmittalInfo}
                is_new={false}
              />
            </div>
            <div className="col-md-6 mt-2">
              <SubmittalInformationItemComponent
                submittal_info_item={submittal_info_item}
                setSubmittalInfoItem={setSubmittalInfoItem}
                is_new={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-2">Purpose</div>
            <div className="col-md-3 d-flex flex-row mt-2">
              <Checkbox checked={is_approval} />
              <span>Approval</span>
            </div>
            <div className="col-md-3 d-flex flex-row mt-2">
              <Checkbox checked={is_selection} />
              <span>Selection</span>
            </div>
            <div className="col-md-3 d-flex flex-row mt-2">
              <Checkbox checked={is_shop} />
              <span>Shop Drawing Approval</span>
            </div>
            <div className="col-md-3 d-flex flex-row mt-2">
              <Checkbox checked={is_others} />
              <span>Others</span>
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
                <DatePicker
                  value={moment(kling_material_approval.updatedAt)}
                  disabled
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-2">
              <ConsultantResponseItemComponent
                is_new={false}
                response_item={response_item}
                setResponseItem={setResponseItem}
              />
            </div>
          </div>
          <div className="row">
            <ConsultantResponseComponent
              response={response}
              setResponse={setResponse}
              is_new={false}
            />
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Comment">
                <Input.TextArea
                  disabled
                  rows={3}
                  value={
                    kling_material_approval?.kling_ma_client_response?.comment
                  }
                />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mt-2">
              <Form.Item label="Submitted Response By Client">
                <Input
                  value={
                    kling_material_approval.kling_ma_client_response
                      ?.submitted_response_by_client
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-3 mt-2">
              <Form.Item label="Date">
                <Input
                  value={moment(
                    kling_material_approval.kling_ma_client_response?.updatedAt
                  ).format("YYYY-MM-DD")}
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

export default connect(mapStateToProps, mapDispatchToProps)(ResponseComponent);
