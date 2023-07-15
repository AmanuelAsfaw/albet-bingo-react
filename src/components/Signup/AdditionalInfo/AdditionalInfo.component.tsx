import { FC } from "react";
import { BUILD, BuildType, RoleType } from "../../../constants/Constants";
import { Message, NotificationType } from "../../../constants/Constants";
import { register } from "./AdditionalInfo.util";
import { OpenNotification } from "../../common/Notification/Notification.component";
import { useNavigate } from "react-router-dom";
import { RouteConstants } from "../../../router/Constants";
import { ErrorHandler } from "../../../utilities/utilities";
import { Form, Input, Select } from "antd";

const AdditionalInfoComponent: FC<{
  form: any;
  data: any;
  setData: Function;
  next: Function;
  setLoading: Function;
}> = ({ data, next, form, setData, setLoading }) => {
  const navigate = useNavigate();

  const getAccessType = (data: string[]) => {
    let parsed: string[] = [];
    if (data.find((e) => e === "Project")) {
      parsed = [
        ...parsed,
        RouteConstants.PROJECTS,
        RouteConstants.PROJECT_LIST,
        RouteConstants.PROJECT,
        RouteConstants.REGISTER_PROJECT,
      ];
    }
    if (data.find((e) => e === "Task")) {
      parsed = [...parsed, RouteConstants.TASK];
    }

    if (data.find((e) => e === "Letter")) {
      parsed = [...parsed, RouteConstants.LETTER];
    }
    if (data.find((e) => e === "Hr")) {
      parsed = [...parsed, RouteConstants.HUMAN_RESOURCE];
    }
    if (data.find((e) => e === "Inventory")) {
      parsed = [...parsed, RouteConstants.INVENTORY];
    }
    if (data.find((e) => e === "Finance")) {
      parsed = [...parsed, RouteConstants.FINANCE];
    }
    if (data.find((e) => e === "Payment")) {
      parsed = [...parsed, RouteConstants.PAYMENT];
    }
    if (data.find((e) => e === "Standard")) {
      parsed = [...parsed, RouteConstants.STANDARDS];
    }
    if (data.find((e) => e === "Payment")) {
      parsed = [...parsed, RouteConstants.PAYMENT];
    }
    if (data.find((e) => e === "Plans")) {
      parsed = [...parsed, RouteConstants.PLANS];
    }
    if (data.find((e) => e === "CashFlow")) {
      parsed = [...parsed, RouteConstants.CASH_FLOW];
    }
    if (data.find((e) => e === "Reports")) {
      parsed = [...parsed, RouteConstants.REPORTS];
    }
    return parsed;
  };

  const onFinish = (value: any) => {
    const user_data = {
      ...data,
      ...value,
      role: BUILD === BuildType.ENTERPRISE ? value.role : RoleType.ROOT,
      access_type: getAccessType(value.access_type),
    };
    const ref: any = localStorage.getItem("reference_user");
    setData({
      ...data,
      ...value,
      role: BUILD === BuildType.ENTERPRISE ? user_data.role : RoleType.ROOT,
      access_type: getAccessType(value.access_type),
    });

    console.log({ user_data });
    setLoading(true);
    register(user_data, ref)
      .then(() => {
        if (BUILD === BuildType.ENTERPRISE) {
          navigate(RouteConstants.LOGIN);
          OpenNotification(
            NotificationType.SUCCESS,
            Message.USER_REGISTRATION_SUCCESS,
            ""
          );
        } else {
          localStorage.setItem("email-to-send", user_data.email);
          navigate(RouteConstants.EMAIL_CONFIRMATION);
        }
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

  return (
    <Form
      form={form}
      layout={"vertical"}
      onFinish={onFinish}
      initialValues={data}
    >
      {BUILD === BuildType.ENTERPRISE ? (
        <Form.Item
          label="Role (Position)"
          name="role"
          rules={[{ required: true, message: "Role Required!" }]}
        >
          <Input placeholder="CEO" />
        </Form.Item>
      ) : null}

      {BUILD === BuildType.ENTERPRISE ? (
        <Form.Item
          label="Access Type"
          name="access_type"
          rules={[{ required: true, message: "Access Type Required!" }]}
        >
          <Select mode="multiple">
            <Select.Option key={0} value={"Project"}>
              Project
            </Select.Option>
            <Select.Option key={1} value={"Task"}>
              Task
            </Select.Option>
            <Select.Option key={3} value={"Letter"}>
              Letter
            </Select.Option>
            <Select.Option key={4} value={"Hr"}>
              Hr
            </Select.Option>
            <Select.Option key={5} value={"Inventory"}>
              Inventory
            </Select.Option>
            <Select.Option key={6} value={"Finance"}>
              Finance
            </Select.Option>
            <Select.Option key={7} value={"Payment"}>
              Payment
            </Select.Option>
            <Select.Option key={8} value={"Standard"}>
              Standard
            </Select.Option>
            <Select.Option key={9} value={"Plans"}>
              Plans
            </Select.Option>
            <Select.Option key={10} value={"Reports"}>
              Reports
            </Select.Option>
            <Select.Option key={11} value={"CashFlow"}>
              Cash Flow
            </Select.Option>
          </Select>
        </Form.Item>
      ) : null}
    </Form>
  );
};
export default AdditionalInfoComponent;
