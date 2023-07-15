import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ConsultantResponsePropType } from "../../../util/KlingMaterialApproval.util";
import { Card, Checkbox, DatePicker, Form, Input } from "antd";
import moment from "moment";

const ConsultantResponseComponent: FC<ConsultantResponsePropType> = ({
  response,
  users,
  setResponse,
  is_new,
}) => {
  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...response];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = {
        ...item,
        [name]: value,
      };
      if (name === "is_approved_as") {
        item = {
          ...item,
          is_approved_comments: false,
          is_resubmit: false,
          is_rejected: false,
          is_ignored: false,
        };
      }
      if (name === "is_approved_comments") {
        item = {
          ...item,
          is_approved_as: false,
          is_resubmit: false,
          is_rejected: false,
          is_ignored: false,
        };
      }
      if (name === "is_resubmit") {
        item = {
          ...item,
          is_approved_as: false,
          is_approved_comments: false,
          is_rejected: false,
          is_ignored: false,
        };
      }
      if (name === "is_rejected") {
        item = {
          ...item,
          is_approved_as: false,
          is_approved_comments: false,
          is_resubmit: false,
          is_ignored: false,
        };
      }
      if (name === "is_ignored") {
        item = {
          ...item,
          is_approved_as: false,
          is_approved_comments: false,
          is_resubmit: false,
          is_rejected: false,
        };
      }
      newData.splice(index, 1, item);
      setResponse(newData);
    }
  };

  return (
    <>
      <div className="row mt-2 mx-1">
        <div className="col-md-4">
          <Checkbox
            disabled={is_new}
            checked={response?.[0]?.is_approved_as}
            onChange={(e) =>
              onChangeHandler(
                response?.[0]?.key,
                "is_approved_as",
                e.target.checked
              )
            }
          />
          <span className="pl-2">A. Approved As is</span>
        </div>
        <div className="col-md-4">
          <Checkbox
            disabled={is_new}
            checked={response?.[0]?.is_approved_comments}
            onChange={(e) =>
              onChangeHandler(
                response?.[0]?.key,
                "is_approved_comments",
                e.target.checked
              )
            }
          />
          <span className="pl-2">B. Approved with Comments</span>
        </div>
        <div className="col-md-4">
          <Checkbox
            disabled={is_new}
            checked={response?.[0]?.is_resubmit}
            onChange={(e) =>
              onChangeHandler(
                response?.[0]?.key,
                "is_resubmit",
                e.target.checked
              )
            }
          />
          <span className="pl-2">C. Resubmit (After incorporating)</span>
        </div>
        <div className="col-md-4">
          <Checkbox
            disabled={is_new}
            checked={response?.[0]?.is_rejected}
            onChange={(e) =>
              onChangeHandler(
                response?.[0]?.key,
                "is_rejected",
                e.target.checked
              )
            }
          />
          <span className="pl-2">D. Rejected (See Comments)</span>
        </div>
        <div className="col-md-4">
          <Checkbox
            disabled={is_new}
            checked={response?.[0]?.is_ignored}
            onChange={(e) =>
              onChangeHandler(
                response?.[0]?.key,
                "is_ignored",
                e.target.checked
              )
            }
          />
          <span className="pl-2">E. Ignored - Submittal not Regd</span>
        </div>
      </div>

      <div className="col-md-12 mt-4">
        <Form.Item
          label=" APPROVAL OF THIS SUBMITTAL DOES NOT RELIEVE THE CONTRACTOR OF HIS
        OBLIGATION UNDER CONTRACT"
        >
          <Input.TextArea
            disabled={is_new}
            rows={3}
            value={response?.[0]?.comment}
            onChange={(e) =>
              onChangeHandler(response?.[0]?.key, "comment", e.target.value)
            }
          />
        </Form.Item>
      </div>

      <div className="col-md-4">
        <Form.Item label="Submitted Response By Consultant">
          <Input
            disabled={is_new}
            value={response?.[0]?.submitted_response_by}
          />
        </Form.Item>
      </div>
      <div className="col-md-3">
        <Form.Item label="Date">
          <DatePicker
            picker="date"
            disabled
            value={moment(response?.[0]?.date)}
          />
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
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultantResponseComponent);
