import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Table } from "antd";
import { useForm } from "antd/lib/form/Form";
import { isNil } from "lodash";
import { FC, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import {
  TimeExtensionPropType,
  deleteData,
  sendData,
} from "./utils/TimeExtension.util";
import { TimeExtension } from "../../../../../redux/TimeExtension/TimeExtension.type";
import moment from "moment";
import { fetchAllTimeExtension } from "../../../../../redux/TimeExtension/TimeExtension.action";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import { useParams } from "react-router-dom";
import { fetchOneProjects } from "../../../../../redux/Project/Project.action";

const TimeExtensionComponent: FC<TimeExtensionPropType> = ({
  fetchAll,
  time_extension,
  project,
  fetchOneProject,
}) => {
  const [timeExtension, setTimeExtension] = useState<TimeExtension[]>([]);

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [form] = useForm();

  useEffect(() => {
    fetchAll({ project_id: params.id });
  }, [params]);

  useEffect(() => {
    if (!time_extension.isPending && time_extension.payload.length > 0) {
      const temp = time_extension.payload.map((e: any, index: number) => {
        const newObject = {
          ...e,
          key: `${e.id}_${Date.now()}`,
          revised_completion_date: moment(e.revised_completion_date),
        };
        return newObject;
      });
      setTimeExtension(temp);
    } else {
      setTimeExtension([]);
    }
  }, [time_extension.payload]);

  const onChange = (key: any, selector: any, value: any) => {
    let temp = [...timeExtension];
    let index = temp.findIndex((e) => e.key === key);
    if (index !== -1) {
      if (selector == "revised_completion_date") {
        temp[index] = {
          ...temp[index],
          [selector]: value,
        };
        for (let i = 0; i < temp.length; i++) {
          if (i == 0) {
            temp[index] = {
              ...temp[index],
              no_of_days: moment(value)
                .startOf("day")
                .diff(
                  moment(project.payload?.completion_date).startOf("day"),
                  "day"
                ),
            };
          } else {
            temp[i] = {
              ...temp[i],
              no_of_days: moment(temp[i].revised_completion_date)
                .startOf("day")
                .diff(
                  moment(temp[i - 1].revised_completion_date).startOf("day"),
                  "day"
                ),
            };
          }
        }
        setTimeExtension(temp);
      } else {
        temp[index] = {
          ...temp[index],
          [selector]: value,
        };
        setTimeExtension(temp);
      }
    }
  };

  const createNewTimeExtension = () => {
    let diffDays = 0;
    if (project.payload.completion_date) {
      if (!timeExtension.length) {
        const completionDate = moment(project.payload.completion_date).startOf(
          "day"
        );
        const extensionDate = moment().startOf("day");
        const diffTime = extensionDate.diff(completionDate);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      } else {
        const completionDate = moment(
          timeExtension.at(timeExtension.length - 2)?.revised_completion_date
        ).startOf("day");
        const extensionDate = moment(
          timeExtension.at(timeExtension.length - 2)?.revised_completion_date
        ).startOf("day");
        diffDays = extensionDate.diff(completionDate, "day");
      }
      setTimeExtension([
        ...timeExtension,
        {
          key: new Date(),
          description: "",
          revised_completion_date: moment(
            timeExtension.at(-1)?.revised_completion_date
          ),
          no_of_days: diffDays,
          project_id: project.payload.id,
        },
      ]);
    } else {
      OpenNotification(
        NotificationType.ERROR,
        "This project doesn't have a completion date",
        ""
      );
    }
  };

  const Submit = () => {
    setLoading(true);
    sendData(timeExtension)
      .then(() => {
        form.resetFields();
        setTimeout(() => {
          setLoading(false);
          fetchAll({});
          fetchAll();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.TIME_EXTENSION_REGISTERED_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.TIME_EXTENSION_REGISTERED_FAIL,
            e.message
          )
        );
      });
  };

  const remove = (key: any, data: any, setFunction: Function) => {
    let index = data.findIndex((e: any) => e.key === key);
    if (index !== -1) {
      let temp = [...data];
      if (!isNil(temp[index]?.id)) {
        temp[index] = { ...temp[index] };
        setFunction(temp);
      } else {
        temp = temp.filter((e: any) => e.key !== key);
        setFunction(temp);
      }
    }
  };

  const deleteTimeExtension = (id: any) => {
    setLoading(true);
    deleteData(id)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({});
          OpenNotification(
            NotificationType.SUCCESS,
            Message.TIME_EXTENSION_DELETE_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.TIME_EXTENSION_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const columns = [
    {
      title: "No",
      width: "5%",
      render: (value: any, record: any, index: any) => index + 1,
    },
    {
      title: "Description",
      dataIndex: "description",

      render: (value: any, record: any, index: any) => (
        <Form.Item
          name={`description_${record.key}`}
          initialValue={record.description}
        >
          <Input.TextArea
            onChange={(e) =>
              onChange(record.key, "description", e.target.value)
            }
            defaultValue={record.description}
          />
        </Form.Item>
      ),
    },
    {
      title: "Revised Completion Date",
      dataIndex: "revised_completion_date",

      render: (value: any, record: any, index: any) => (
        <Form.Item
          name={`revised_completion_date${record.key}`}
          initialValue={record.revised_completion_date}
        >
          <DatePicker
            onChange={(e) => onChange(record.key, "revised_completion_date", e)}
            allowClear={false}
          />
        </Form.Item>
      ),
    },
    {
      title: "No of Days",
      dataIndex: "no_of_days",
      render: (value: any, record: any, index: any) => <>{value}</>,
    },

    {
      title: "Action",
      width: "10%",
      render: (value: any, record: any, index: any) => (
        <div className="d-flex justify-content-center">
          {
            <div className="px-2">
              {isNil(record.id) ? (
                <MinusOutlined
                  onClick={() =>
                    remove(record.key, timeExtension, setTimeExtension)
                  }
                />
              ) : (
                <DeleteOutlined
                  style={{ color: "red" }}
                  onClick={() => deleteTimeExtension(record.id)}
                />
              )}
            </div>
          }
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="row m-8">
        <div className="col">
          <ReloadButtonComponent
            onClick={() => {
              fetchAll({});
            }}
          />

          <Button
            type="primary"
            style={{ float: "right", height: "32px" }}
            onClick={() => form.submit()}
            loading={loading || time_extension.isPending}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Form form={form} onFinish={Submit}>
        <div className="row">
          <div className="col-12">
            <Table
              dataSource={timeExtension}
              loading={time_extension.isPending}
              columns={columns}
              summary={(data) => {
                let total = 0;
                data.map((items) => (total += items.no_of_days));

                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={2}>
                        Total
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}></Table.Summary.Cell>
                      <Table.Summary.Cell index={5}>{total}</Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
              footer={() => (
                <div className="text-center">
                  <Button
                    style={{
                      width: 300,
                    }}
                    className="btn-outline-secondary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      form.resetFields();
                      createNewTimeExtension();
                    }}
                  >
                    Add
                  </Button>
                </div>
              )}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  time_extension: state.time_extension.fetchAll,
  project: state.project.fetchOne,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllTimeExtension(action)),
  fetchOneProject: (action: any) => dispatch(fetchOneProjects(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeExtensionComponent);
