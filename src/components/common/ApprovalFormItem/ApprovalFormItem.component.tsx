import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { getUserData } from "../../../utilities/utilities";
import { ApprovalFormItemPropType } from "./ApprovalFormItem.util";
import { Form, Select } from "antd";
import { fetchAllUser } from "../../../redux/User/User.action";
const ApprovalFormItemComponent: FC<ApprovalFormItemPropType> = ({
  fetchUsers,
  users,
  is_disabled,
}) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <div className="col-md-4">
        <Form.Item
          label="Prepared By"
          rules={[{ required: false, message: "Prepared By Required!" }]}
        >
          <Select placeholder="Select" value={getUserData().id} disabled>
            <Select.Option value="">-</Select.Option>
            {users.payload.map((e, i) => (
              <Select.Option key={i} value={e.id}>
                {e.full_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          name="checked_by"
          label="Checked By"
          rules={[{ required: false, message: "Checked By Required!" }]}
        >
          <Select placeholder="Select" disabled={is_disabled ? true : false}>
            <Select.Option value="">-</Select.Option>
            {users.payload.map((e, i) => (
              <Select.Option key={i} value={e.id}>
                {e.full_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          name="authorized_by"
          label="Auth By"
          rules={[{ required: false, message: "Auth By Required!" }]}
        >
          <Select placeholder="Select" disabled={is_disabled ? true : false}>
            <Select.Option value="">-</Select.Option>
            {users.payload.map((e, i) => (
              <Select.Option key={i} value={e.id}>
                {e.full_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
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
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprovalFormItemComponent);
