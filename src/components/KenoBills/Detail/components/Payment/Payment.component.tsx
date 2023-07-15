import { Button, Form, InputNumber } from "antd";
import { toNumber } from "lodash";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { fetchOneProjects } from "../../../../../redux/Project/Project.action";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { editData, PaymentPropType } from "../../utils/Detail.util";

const PaymentComponent: FC<PaymentPropType> = ({ fetchProject, project }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (project.payload) form.setFieldsValue(project.payload);
  }, [project.payload, form]);

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      id: project.payload?.id,
    };

    editData(data)
      .then(() => {
        form.resetFields();
        fetchProject(project.payload?.id);
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.PROJECT_UPDATE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.PROJECT_UPDATE_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Form
            layout="vertical"
            form={form}
            onFinish={Submit}
            initialValues={project.payload}
          >
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please Input Valid Advance Payment!",
                      type: "number",
                      min: 0,
                    },
                  ]}
                  label="Advance Payment"
                  name={["project_payment", "advance_payment"]}
                >
                  <InputNumber
                    placeholder="0"
                    style={{ width: "100%" }}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) =>
                      toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "")
                    }
                  />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Advance Repayment (in %)"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Valid  Advance RePayment!",
                      min: 0,
                      max: 100,
                      type: "number",
                    },
                  ]}
                  name={["project_payment", "advance_percent"]}
                >
                  <InputNumber
                    placeholder="0"
                    style={{ width: "100%" }}
                    formatter={(value) => `${value}%`}
                    parser={(value) =>
                      toNumber(value ? value.replace("%", "") : "")
                    }
                  />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Rebate (In %)"
                  rules={[
                    {
                      required: true,
                      message: "Please input Valid Rebate!",
                      type: "number",
                      min: 0,
                      max: 100,
                    },
                  ]}
                  name={["project_payment", "rebate"]}
                >
                  <InputNumber
                    placeholder="0"
                    style={{ width: "100%" }}
                    formatter={(value) => `${value}%`}
                    parser={(value) =>
                      toNumber(value ? value.replace("%", "") : "")
                    }
                  />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Retention (In %)"
                  rules={[
                    {
                      required: true,
                      message: "Please input Valid Retention!",
                      type: "number",
                      min: 0,
                      max: 100,
                    },
                  ]}
                  name={["project_payment", "retention"]}
                >
                  <InputNumber
                    placeholder="0"
                    style={{ width: "100%" }}
                    formatter={(value) => `${value}%`}
                    parser={(value) =>
                      toNumber(value ? value.replace("%", "") : "")
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={() => form.submit()}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
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
const mapDispatchToProps = (dispatch: any) => ({
  fetchProject: (action: any) => dispatch(fetchOneProjects(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentComponent);
