import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { SubmittalInformationPropType } from "../../../util/KlingMaterialApproval.util";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import moment from "moment";
import { toNumber } from "lodash";
import {
  parseUnit,
  searchProp,
} from "../../../../../../../utilities/utilities";
import { UNITS } from "../../../../../../../constants/Constants";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import DocumentViewerComponent from "../../../../../../common/DocumentViewer/DocumentViewer.component";
import { DownloadFile } from "../../../../../../Document/MyDocument/index.util";

const SubmittalInformationComponent: FC<SubmittalInformationPropType> = ({
  submittal_info,
  setSubmittalInfo,
  is_new,
  klingMaterialApprovals,
}) => {
  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...submittal_info];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      if (name === "description") {
        const foundMaterials = klingMaterialApprovals.payload.filter(
          (elem) => elem?.kling_ma_submittal_information?.description === value
        );
        console.log({ klingMaterialApprovals: klingMaterialApprovals.payload });
        item = {
          ...item,
          [name]: value,
          issue_no: foundMaterials.length,
        };
      } else {
        item = {
          ...item,
          [name]: value,
        };
      }
      newData.splice(index, 1, item);
      setSubmittalInfo(newData);
    }
  };

  const filteredKlingMaterialApprovals = [
    ...new Set(
      klingMaterialApprovals.payload.filter(
        (e) => e?.kling_ma_submittal_information?.description
      ).map((e) => e?.kling_ma_submittal_information?.description)
    ),
  ];

  return (
    <div className="row mt-2">
      <div className="col-md-6">
        <Form.Item label="Submission Date">
          <DatePicker
            value={
              submittal_info?.[0]?.submission_date
                ? moment(submittal_info?.[0]?.submission_date, "YYYY-MM-DD")
                : null
            }
            onChange={(e) =>
              onChangeHandler(
                submittal_info?.[0]?.key,
                "submission_date",
                e?.format("YYYY-MM-DD")
              )
            }
            disabled={!is_new}
          />
        </Form.Item>
      </div>
      <div className="col-md-6">
        <Form.Item label="Issue No">
          <Input
            value={submittal_info?.[0]?.issue_no}
            onChange={(e) =>
              onChangeHandler(
                submittal_info?.[0]?.key,
                "issue_no",
                e.target.value
              )
            }
            disabled={!is_new}
          />
        </Form.Item>
      </div>
      <div className="col-md-6">
        <Form.Item label="Spec Division">
          <Input
            value={submittal_info?.[0]?.spec_division}
            onChange={(e) =>
              onChangeHandler(
                submittal_info?.[0]?.key,
                "spec_division",
                e.target.value
              )
            }
            disabled={!is_new}
          />
        </Form.Item>
      </div>
      <div className="col-md-6">
        <Form.Item label="Section">
          <Input
            value={submittal_info?.[0]?.section}
            onChange={(e) =>
              onChangeHandler(
                submittal_info?.[0]?.key,
                "section",
                e.target.value
              )
            }
            disabled={!is_new}
          />
        </Form.Item>
      </div>
      <div className="col-md-6">
        <Form.Item label="No of Pages in Submittal">
          <InputNumber
            value={submittal_info?.[0]?.no_pages}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => toNumber(value?.replace(/\$\s?|(,*)/g, ""))}
            onChange={(e) =>
              onChangeHandler(submittal_info?.[0]?.key, "no_pages", e)
            }
            disabled={!is_new}
          />
        </Form.Item>
      </div>
      <div className="col-md-6">
        <Form.Item label="Material Description">
          <AutoComplete
            value={submittal_info?.[0]?.description}
            options={filteredKlingMaterialApprovals?.map((elem) => ({
              value: elem,
              label: elem,
            }))}
            style={{ width: 200 }}
            filterOption={(inputValue, option: any) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onSelect={(e: any) => {
              onChangeHandler(submittal_info?.[0]?.key, "description", e);
            }}
            onChange={(e: any) => {
              onChangeHandler(submittal_info?.[0]?.key, "description", e);
            }}
          />
        </Form.Item>
      </div>
      <div className="col-md-6">
        <Form.Item label="Amount of Material">
          <InputNumber
            value={submittal_info?.[0]?.amount}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => toNumber(value?.replace(/\$\s?|(,*)/g, ""))}
            onChange={(e) =>
              onChangeHandler(submittal_info?.[0]?.key, "amount", e)
            }
            disabled={!is_new}
            addonAfter={
              <Select
                style={{ width: "100px" }}
                showSearch
                value={parseUnit(submittal_info?.[0]?.unit)}
                onChange={(e) =>
                  onChangeHandler(submittal_info?.[0]?.key, "unit", e)
                }
                disabled={!is_new}
              >
                {UNITS.map((e, index) => (
                  <Select.Option key={index} value={e.value}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>
            }
          />
        </Form.Item>
      </div>
      <div className="col-md-6">
        <Form.Item label="Picture">
          <Upload
            name="file"
            beforeUpload={() => {
              return false;
            }}
            type="select"
            multiple={false}
            maxCount={1}
            listType="picture"
            onChange={(e) =>
              onChangeHandler(submittal_info?.[0]?.key, "file", e.file)
            }
          >
            <Button className="btn-outline-secondary">
              <UploadOutlined /> Upload
            </Button>
          </Upload>
          {submittal_info?.[0]?.document ? (
            <div className="d-flex">
              <Button
                type="link"
                icon={<DownloadOutlined />}
                className="mr-2"
                onClick={() => DownloadFile(submittal_info?.[0]?.document)}
              ></Button>

              <DocumentViewerComponent
                document={submittal_info?.[0]?.document}
              />
            </div>
          ) : null}
        </Form.Item>
      </div>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  klingMaterialApprovals: state.kling_material_approval.fetchAll,
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
)(SubmittalInformationComponent);
