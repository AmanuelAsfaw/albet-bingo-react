import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ClientPropType, editData } from "../../utils/Detail.util";
import { fetchAllClients } from "../../../../../redux/Client/Client.action";
import { fetchOneProjects } from "../../../../../redux/Project/Project.action";
import { AutoComplete, Button, Form, Input } from "antd";

import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
const ClientComponent: FC<ClientPropType> = ({
  clients,
  fetchClients,
  fetchProject,
  project,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState("");

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    let found = clients.payload.find((e) => e.name === client);
    if (found) form.setFieldsValue(found);
  }, [clients, client, form]);

  useEffect(() => {
    if (project.payload) form.setFieldsValue(project.payload?.client);
  }, [project, form]);

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      client: { ...value },
      id: project.payload?.id,
    };
    console.log(data);
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
          <Form layout="vertical" form={form} onFinish={Submit}>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Name is Required" }]}
                >
                  <AutoComplete
                    onChange={(e) => setClient(e)}
                    placeholder="name"
                    options={clients.payload.map((e, index) => ({
                      name: e.name,
                      value: e.name,
                      key: index,
                    }))}
                    filterOption={(inputValue, option: any) =>
                      option!.value
                        ?.toUpperCase()
                        ?.indexOf(inputValue?.toUpperCase()) !== -1
                    }
                  />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Region"
                  name="address"
                  rules={[{ required: false, message: "Region is Required" }]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: false, message: "City is Required" }]}
                >
                  <Input placeholder="City" />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  label="Phone Number"
                  name="phone_number"
                  rules={[
                    { required: false, message: "Phone Number is Required" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: false, message: "Email is Required" }]}
                >
                  <Input placeholder="Email" />
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
  clients: state.client.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchClients: (action: any) => dispatch(fetchAllClients(action)),
  fetchProject: (action: any) => dispatch(fetchOneProjects(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientComponent);
