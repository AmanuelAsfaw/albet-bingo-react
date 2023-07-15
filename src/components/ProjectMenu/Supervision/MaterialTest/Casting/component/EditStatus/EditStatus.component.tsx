import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { FieldTimeOutlined } from "@ant-design/icons";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { EditCastingStatusPropType, sendData } from "./EditStatus.util";
import moment from "moment";
import { fetchAllCasting } from "../../../../../../../redux/Casting/Casting.action";
import { CastingDateStatus } from "../../Casting.util";
import { CastingDate } from "../../../../../../../redux/Casting/Casting.type";

const EditCastingStatusComponent: FC<EditCastingStatusPropType> = ({
  casting,
  fetchAllCasting,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [castingDatesData, setCastingDatesData] = useState(
    casting.casting_dates
  );

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = () => {
    setLoading(true);
    let data: any = {};

    data = castingDatesData.map((e) => {
      if (e.status === "Reschedule") e.status = CastingDateStatus.PENDING;

      return e;
    });

    sendData(casting.id, data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllCasting();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CASTING_UPDATE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CASTING_UPDATE_SUCCESS,
            e.message
          )
        );
      });
  };

  const onChange = (id: any, key: any, value: any) => {
    let temp = [...castingDatesData];

    let index = temp.findIndex((e) => e.id === id);

    if (index > -1) {
      let newCastingDate = [...temp];

      if (key === "status") newCastingDate[index]["status"] = value;
      if (key === "date") newCastingDate[index]["date"] = value;

      setCastingDatesData(newCastingDate);
    }
  };

  const insertion_Sort = (array: CastingDate[]) => {
    for (let i = 1; i < array.length; i++) {
      let j = i - 1;
      let temp = array[i];
      while (j >= 0 && array[j].period > temp.period) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = temp;
    }
    return array;
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        icon={<FieldTimeOutlined />}
        onClick={() => setIsModalVisible(true)}
      />

      <Modal
        title="Edit Castings' date & status"
        width={600}
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={Submit}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form>
          <Table
            pagination={false}
            dataSource={insertion_Sort(castingDatesData)}
            columns={[
              {
                title: "No.",
                dataIndex: "period",
                render: (value) => `${value}th`,
              },
              {
                title: "Test Dates",
                render: (value, record) =>
                  record.status !== "Reschedule" ? (
                    <Input
                      size="small"
                      defaultValue={moment(value.date).format("DD/MM/YYYY")}
                      bordered={false}
                      readOnly
                    />
                  ) : (
                    <Form.Item
                      name={record.period}
                      rules={[{ required: true, message: "Date is required" }]}
                    >
                      <DatePicker
                        bordered={false}
                        size="small"
                        defaultValue={moment(record.date)}
                        format="DD/MM/YYYY"
                        onChange={(value) =>
                          onChange(
                            record.id,
                            "date",
                            value?.format("YYYY-MM-DD")
                          )
                        }
                      />
                    </Form.Item>
                  ),
              },
              {
                title: "Status",
                render: (value, record) => (
                  <Select
                    onSelect={(value: any) =>
                      onChange(record.id, "status", value)
                    }
                    value={record.status}
                    size="small"
                    bordered={false}
                  >
                    <Select.Option value={CastingDateStatus.PENDING}>
                      Pending
                    </Select.Option>
                    <Select.Option value={CastingDateStatus.TESTED}>
                      Tested
                    </Select.Option>
                    <Select.Option value={CastingDateStatus.NO_CUBE}>
                      No Cube
                    </Select.Option>
                    <Select.Option value="Reschedule">Reschedule</Select.Option>
                  </Select>
                ),
              },
            ]}
          />
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllCasting: () => dispatch(fetchAllCasting()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCastingStatusComponent);
