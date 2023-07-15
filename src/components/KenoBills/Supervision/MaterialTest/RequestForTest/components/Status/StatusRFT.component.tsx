import { Button, Popconfirm, Tag } from "antd";
import { toNumber } from "lodash";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllRequestForTest } from "../../../../../../../redux/RequestForTest/RequestForTest.action";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  StatusRFTPropType,
  receivedData,
} from "../../util/RequestForTest.util";

const StatusRFTComponent: FC<StatusRFTPropType> = ({
  project,
  fetchAllRequestForTest,
  test_id,
  is_test_received,
  test_received_by,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const onReceived = (id: number, is_test_received: boolean) => {
    setLoading(true);
    const datas = {
      id: id,
      is_test_received: is_test_received,
    };
    receivedData(datas)
      .then(() => {
        setLoading(false);
        fetchAllRequestForTest({
          project_id: project.payload?.id,
        });
        OpenNotification(
          NotificationType.SUCCESS,
          "Request for test received!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to receive request for test",
            e.message
          )
        );
      });
  };

  const Render = () => {
    const { id } = getUserData();
    const item: any = [];
    if (
      test_received_by &&
      toNumber(test_received_by) === id &&
      !is_test_received
    ) {
      item.push(
        <Popconfirm
          placement="leftTop"
          title="Are you sure you want to receive that?"
          onConfirm={() => onReceived(test_id, true)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            className="ml-1 mr-2"
            style={{ height: "32px" }}
            type="primary"
            disabled={is_test_received}
            loading={loading}
          >
            {is_test_received ? `Received` : `Receive`}
          </Button>
        </Popconfirm>
      );
    } else if (test_received_by) {
      item.push(
        <Tag color={is_test_received ? "green" : "yellow"}>
          {is_test_received ? "Received" : "Receive Pending"}
        </Tag>
      );
    }

    return item;
  };

  return <>{Render()}</>;
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
  fetchAllRequestForTest: (action: any) =>
    dispatch(fetchAllRequestForTest(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusRFTComponent);
