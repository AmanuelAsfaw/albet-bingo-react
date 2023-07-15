import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, DatePicker, Table, InputNumber } from "antd";
import moment from "moment";

import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { fetchAllProjectDuration } from "../../../../../redux/ProjectDuration/ProjectDuration.action";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import {
  ProjectDurationPropType,
  deleteProjectDuration,
  sendProjectDuration,
} from "./utils/ProjectDuration.utils";
import { useParams } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import { ProjectDuration } from "../../../../../redux/ProjectDuration/ProjectDuration.type";
import { isNil } from "lodash";

const ProjectMonthlyReport: FC<ProjectDurationPropType> = ({
  fetchAll,
  project_duration,
}) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [form] = useForm();
  const [duration, setDuration] = useState<ProjectDuration[]>([]);

  useEffect(() => {
    fetchAll({ project_id: id });
  }, []);

  useEffect(() => {
    if (!project_duration.isPending && project_duration.payload) {
      const temp = project_duration.payload.map((e: any, index: number) => {
        const newObject = {
          ...e,
          id: e.id,
          key: `${e.id}_${Date.now()}`,
          site_hand_over_date: moment(e.site_hand_over_date),
        };
        return newObject;
      });
      setDuration(temp);
    }
  }, [project_duration.payload]);

  const RemoveReport = (record: any) => {
    setLoading(true);
    deleteProjectDuration(record.id)
      .then(() => {
        setLoading(false);
        fetchAll({ project_id: id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.PROJECT_DURATION_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.PROJECT_DURATION_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const Submit = () => {
    setLoading(true);
    sendProjectDuration(duration[0])
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({ project_id: id });
          OpenNotification(
            NotificationType.SUCCESS,
            Message.PROJECT_DURATION_REGISTERED_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.PROJECT_DURATION_REGISTERED_FAIL,
            e.message
          )
        );
      });
  };

  const onChange = (key: any, selector: any, value: any) => {
    let temp = [...duration];
    let index = temp.findIndex((e) => e.key === key);
    if (index !== -1) {
      temp[index] = {
        ...temp[index],
        [selector]: value,
      };
      setDuration(temp);
    }
  };

  const remove = (key: any) => {
    let index = duration.findIndex((e: any) => e.id === key);
    if (index !== -1) {
      let temp = [...duration];
      if (!isNil(temp[index]?.id)) {
        temp[index] = { ...temp[index] };
        setDuration(temp);
      } else {
        temp = temp.filter((e: any) => e.key !== key);
        setDuration(temp);
      }
    }
  };

  return (
    <>
      <div className="row m-8">
        <div className="col">
          <ReloadButtonComponent
            onClick={() => {
              fetchAll({ project_id: id });
            }}
          />

          <Button
            type="primary"
            style={{ float: "right", height: "32px" }}
            onClick={() => form.submit()}
            loading={loading || project_duration.isPending}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <Form form={form} onFinish={Submit}>
            <Table
              columns={[
                {
                  title: "No.",
                  dataIndex: "no",
                  width: "50px",
                  render: (record: any, value: any, index: any) => index + 1,
                },
                {
                  title: "Site Hand Over Date",
                  dataIndex: "site_hand_over_date",
                  width: 250,
                  render: (value: any, record: any) => (
                    <Form.Item
                      name={`site_hand_over_date_${record.key}`}
                      rules={[
                        {
                          required: true,
                          message: "Site Hand Over Date required",
                        },
                      ]}
                      initialValue={moment(value)}
                    >
                      <DatePicker
                        allowClear={false}
                        onChange={(e) =>
                          onChange(record.key, "site_hand_over_date", e)
                        }
                        picker="date"
                      />
                    </Form.Item>
                  ),
                },
                {
                  title: "Mobilization Period",
                  dataIndex: "mobilization_period",
                  width: 250,
                  render: (value: any, record: any) => (
                    <Form.Item
                      name={`mobilization_period_${record.key}`}
                      rules={[
                        {
                          required: true,
                          message: "Mobilization Period required",
                        },
                      ]}
                      initialValue={value}
                    >
                      <InputNumber
                        defaultValue={value}
                        onChange={(e) =>
                          onChange(record.key, "mobilization_period", e)
                        }
                      />
                    </Form.Item>
                  ),
                },
                {
                  title: "Action",
                  width: "7%",
                  render: (value: any, record: any, index: any) => (
                    <div className="d-flex justify-content-center">
                      {
                        <div className="px-2">
                          {isNil(record.id) ? (
                            <MinusOutlined onClick={() => remove(record.id)} />
                          ) : (
                            <DeleteOutlined
                              style={{ color: "red" }}
                              onClick={() => RemoveReport(record)}
                            />
                          )}
                        </div>
                      }
                    </div>
                  ),
                },
              ]}
              footer={() => (
                <div className="text-center">
                  <Button
                    style={{
                      width: 300,
                    }}
                    className="btn-outline-secondary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      if (duration.length < 1) {
                        form.resetFields();
                        setDuration([
                          ...duration,
                          {
                            project_id: Number(id),
                            site_hand_over_date: moment().format("YYYY-MM-DD"),
                            mobilization_period: "",
                          },
                        ]);
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              )}
              dataSource={duration}
              loading={project_duration.isPending}
            />
          </Form>
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
  project_duration: state.project_duration.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllProjectDuration(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMonthlyReport);
