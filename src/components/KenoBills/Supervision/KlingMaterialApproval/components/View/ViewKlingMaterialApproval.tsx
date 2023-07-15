import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Layout,
  Modal,
  Spin,
  Statistic,
  Upload,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import {
  ViewKMAPropType,
  ViewKlingMaterialApprovalPropType,
} from "../../util/KlingMaterialApproval.util";
import SubmittalInformationComponent from "../Add/components/SubmittalInformation.component";
import SubmittalInformationItemComponent from "../Add/components/SubmittalInformationItem.component";
import ConsultantResponseItemComponent from "../Add/components/ConsultantResponseItem.component";
import ConsultantResponseComponent from "../Add/components/ConsultantResponse.component";
import { useParams } from "react-router-dom";
import { fetchOneKlingMaterialApproval } from "../../../../../../redux/KlingMaterialApproval/KlingMaterialApproval.action";
import HeaderComponent from "../../../../Header/Header.component";
import CommentsComponent from "../Add/components/Comments.component";
import { getUserData } from "../../../../../../utilities/utilities";

const { Header, Content } = Layout;

const ViewKlingMaterialApproval: FC<ViewKlingMaterialApprovalPropType> = ({
  project,
  users,
  fetchKlingMaterialApproval,
  kling_material_approval,
}) => {
  const params = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [is_approval, setIsApproval] = useState(false);
  const [is_selection, setIsSelection] = useState(false);
  const [is_shop, setIsShop] = useState(false);
  const [is_others, setIsOthers] = useState(false);
  const [submittal_info, setSubmittalInfo] = useState<any>([]);
  const [submittal_info_item, setSubmittalInfoItem] = useState<any>([]);
  const [response, setResponse] = useState<any>([]);
  const [response_item, setResponseItem] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchKlingMaterialApproval(params?.id);
  }, []);

  useEffect(() => {
    setSubmittalInfo([
      {
        ...kling_material_approval.payload?.kling_ma_submittal_information,
        key: Date.now(),
      },
    ]);
    setSubmittalInfoItem(
      kling_material_approval.payload?.kling_ma_submittal_information?.kling_ma_submittal_information_items.map(
        (item, index) => ({
          key: index,
          ...item,
        })
      )
    );
    setIsApproval(kling_material_approval.payload?.is_approval ?? false);
    setIsSelection(kling_material_approval.payload?.is_selection ?? false);
    setIsShop(kling_material_approval.payload?.is_shop ?? false);
    setIsOthers(kling_material_approval.payload?.is_others ?? false);
    setResponse([
      {
        ...kling_material_approval.payload?.kling_ma_consultant_response,
        key: Date.now(),
      },
    ]);
    setResponseItem(
      kling_material_approval.payload?.kling_ma_consultant_response?.kling_ma_consultant_response_items.map(
        (item, index) => ({
          key: index,
          ...item,
        })
      )
    );
    setComments([
      { ...kling_material_approval.payload?.kling_ma_comment, key: Date.now() },
    ]);
  }, [kling_material_approval]);

  useEffect(() => {
    if (
      kling_material_approval.payload?.kling_ma_consultant_response
        ?.kling_ma_consultant_response_items.length
    ) {
      setResponseItem(
        kling_material_approval.payload?.kling_ma_consultant_response?.kling_ma_consultant_response_items.map(
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

  const user_control = project.payload.user_controls.find(
    (e) => e.user_id === getUserData()?.id
  );

  if (kling_material_approval.isPending)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );

  return (
    <>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <Card className="overview-card">
          <h4>Material Approval</h4>
        </Card>
      </Header>
      <Card>
        <Form layout="vertical" form={form}>
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
                  value={kling_material_approval.payload?.deliver_order_no}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-2">
              <b>Submittal Information</b>
            </div>
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
              <span className="ml-2">Approval</span>
            </div>
            <div className="col-md-3 d-flex flex-row mt-2">
              <Checkbox checked={is_selection} />
              <span className="ml-2">Selection</span>
            </div>
            <div className="col-md-3 d-flex flex-row mt-2">
              <Checkbox checked={is_shop} />
              <span className="ml-2">Shop Drawing Approval</span>
            </div>
            <div className="col-md-3 d-flex flex-row mt-2">
              <Checkbox checked={is_others} />
              <span className="ml-2">Others</span>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <Form.Item label="Submitted By">
                <Input value={kling_material_approval.payload?.submitted_by} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-2">
              <ConsultantResponseItemComponent
                is_new={true}
                response_item={response_item}
                setResponseItem={setResponseItem}
              />
            </div>
          </div>
          <Divider style={{ borderTop: "2px solid #000" }} />
          <div className="row">
            <ConsultantResponseComponent
              response={response}
              setResponse={setResponse}
              is_new={true}
            />
          </div>
          <div className="row">
            <div className="col-md-6 mt-2">
              <Form.Item label="Submitted Response By Client">
                <Input
                  disabled={true}
                  value={
                    kling_material_approval.payload?.kling_ma_client_response
                      ?.submitted_response_by_client
                  }
                />
              </Form.Item>
            </div>
          </div>
          {user_control?.role?.name?.toLowerCase() !== "consultant" &&
            user_control?.role?.name?.toLowerCase() !== "client" && (
              <div className="row">
                <CommentsComponent
                  comments={comments}
                  setComments={setComments}
                  is_new={false}
                  is_comment={true}
                  is_review={true}
                  kling_material_approval={kling_material_approval.payload!}
                />
              </div>
            )}
        </Form>
      </Card>
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
  kling_material_approval: state.kling_material_approval.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchKlingMaterialApproval: (action: any) =>
    dispatch(fetchOneKlingMaterialApproval(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewKlingMaterialApproval);
