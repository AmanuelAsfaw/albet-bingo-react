import { FC } from "react";
import { connect } from "react-redux";
import { CommentsPropType } from "../../../util/KlingMaterialApproval.util";
import { Checkbox, DatePicker, Form, Input } from "antd";
import { getUserData } from "../../../../../../../utilities/utilities";
import moment from "moment";
import KlingMaterialApproval from "../../..";

const CommentsComponent: FC<CommentsPropType> = ({
  comments,
  setComments,
  is_new,
  is_comment,
  is_review,
  users,
  kling_material_approval
}) => {
  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...comments];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = {
        ...item,
        [name]: value,
      };
      if (name === "is_forwarded_to_expert") {
        item = {
          ...item,
          is_miss_document: false,
        };
      }
      if (name === "is_miss_document") {
        item = {
          ...item,
          is_forwarded_to_expert: false,
        };
      }
      if (name === "is_forwarded_to_consultant") {
        item = {
          ...item,
          is_likely_not_to_be: false,
        };
      }
      if (name === "is_likely_not_to_be") {
        item = {
          ...item,
          is_forwarded_to_consultant: false,
        };
      }
      newData.splice(index, 1, item);
      setComments(newData);
    }
  };

  return (
    <>
      <div className="col-md-4">
        <Form.Item label="Comment from Ovid-Kling">
          <Input.TextArea
            disabled={is_new || is_review}
            rows={3}
            value={comments?.[0]?.comment}
            onChange={(e) =>
              onChangeHandler(comments?.[0]?.key, "comment", e.target.value)
            }
          />
        </Form.Item>
      </div>
      <div className="col-md-3">
        <Form.Item label="Date">
          <DatePicker
            picker="date"
            disabled
            value={moment(comments?.[0]?.date)}
          />
        </Form.Item>
      </div>
      <div className="col-md-5"></div>

      <div className="col-md-4">
        <Form.Item label="Submitted Response By">
          <Input value={is_new ? getUserData().full_name : is_comment ? kling_material_approval?.kling_ma_comment?.commented_by : kling_material_approval?.kling_ma_comment?.reviewed_by } />
        </Form.Item>
      </div>
      <div className="col-md-3">
        <Form.Item label="Date">
          <DatePicker value={moment(kling_material_approval?.kling_ma_client_response?.updatedAt)} disabled />
        </Form.Item>
      </div>

      <div className="row mx-1">
        <div className="col-md-12 mt-2">
          <b>Action</b>
        </div>
        <div className="col-md-6 d-flex flex-row mt-2">
          <Checkbox
            disabled={is_new || is_review}
            checked={comments?.[0]?.is_forwarded_to_expert}
            onChange={(e) =>
              onChangeHandler(
                comments?.[0]?.key,
                "is_forwarded_to_expert",
                e.target.checked
              )
            }
          />
          <span className="ml-2">Forwarded to Expert</span>
        </div>
        <div className="col-md-6 d-flex flex-row mt-2">
          <Checkbox
            disabled={is_new || is_review}
            checked={comments?.[0]?.is_miss_document}
            onChange={(e) =>
              onChangeHandler(
                comments?.[0]?.key,
                "is_miss_document",
                e.target.checked
              )
            }
          />
          <span className="ml-2">Miss Document from Supplier</span>
        </div>
        <div className="col-md-12 mt-4 mt-3">
          <b>Comment From Reviewer</b>
        </div>
        <div className="col-md-6">
          <Form.Item label="Quality Wise">
            <Input.TextArea
              disabled={is_new || is_comment}
              rows={2}
              value={comments?.[0]?.quality_wise}
              onChange={(e) =>
                onChangeHandler(
                  comments?.[0]?.key,
                  "quality_wise",
                  e.target.value
                )
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Cost Wise">
            <Input.TextArea
              disabled={is_new || is_comment}
              rows={2}
              value={comments?.[0]?.cost_wise}
              onChange={(e) =>
                onChangeHandler(comments?.[0]?.key, "cost_wise", e.target.value)
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Installation Wise">
            <Input.TextArea
              disabled={is_new || is_comment}
              autoSize
              rows={2}
              value={comments?.[0]?.installation_wise}
              onChange={(e) =>
                onChangeHandler(
                  comments?.[0]?.key,
                  "installation_wise",
                  e.target.value
                )
              }
            />
          </Form.Item>
        </div>
        <div className="col-md-6">
          <Form.Item label="Recommendation">
            <Input.TextArea
              disabled={is_new || is_comment}
              autoSize
              rows={2}
              value={comments?.[0]?.recommendation}
              onChange={(e) =>
                onChangeHandler(
                  comments?.[0]?.key,
                  "recommendation",
                  e.target.value
                )
              }
            />
          </Form.Item>
        </div>

        <div className="col-md-4 mt-2">
          <Form.Item label="Reviewed By">
            <Input value={is_new ? getUserData().full_name : is_review ? kling_material_approval?.kling_ma_comment?.reviewed_by : kling_material_approval?.kling_ma_comment?.commented_by} />
          </Form.Item>
        </div>
        <div className="col-md-3 mt-2">
          <Form.Item label="Date">
            <Input value={moment(kling_material_approval?.updatedAt).format("YYYY-MM-DD")} />
          </Form.Item>
        </div>
        <div className="col-md-12 mt-2">
          <b>Decision</b>
        </div>
        <div className="col-md-6 d-flex flex-row mt-2">
          <Checkbox
            disabled={is_new || is_comment}
            checked={comments?.[0]?.is_forwarded_to_consultant}
            onChange={(e) =>
              onChangeHandler(
                comments?.[0]?.key,
                "is_forwarded_to_consultant",
                e.target.checked
              )
            }
          />
          <span className="ml-2">Forwarded to Consultant</span>
        </div>
        <div className="col-md-6 d-flex flex-row mt-2">
          <Checkbox
            disabled={is_new || is_comment}
            checked={comments?.[0]?.is_likely_not_to_be}
            onChange={(e) =>
              onChangeHandler(
                comments?.[0]?.key,
                "is_likely_not_to_be",
                e.target.checked
              )
            }
          />
          <span className="ml-2">Likely Not To be Accepted</span>
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
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsComponent);
