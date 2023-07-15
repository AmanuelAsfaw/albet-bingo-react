import { Form, Table, Checkbox, Input, Select } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { User } from "../../../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../../../redux/Utils";
import { getUserData } from "../../../../../../../../../utilities/utilities";
import ImageSelectorComponent from "../../../../../../../../common/ImageSelector/ImageSelector.component";
import RemarkComponent from "../Remark/Remark.component";

const ManpowerComponent: FC<{
  submitAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  resetFormAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
  submit_form: Function;
  users: ApiCallState<User[]>;
}> = ({ dataAction, submit_form, resetFormAction, submitAction, users }) => {
  const [submit, setSubmit] = submitAction;
  const [data, setData] = dataAction;
  const [reset, setReset] = resetFormAction;
  const [form] = Form.useForm();
  const [selected_photo, selectedPhoto] = useState<any[]>([]);
  const [man_power, setManpower] = useState(data.monthly_manpowers);

  useEffect(() => {
    if (submit) {
      form.submit();
      setSubmit(false);
    }

    if (reset) {
      form.resetFields();
      setReset(false);
    }
  }, [data, submit, reset, form, setSubmit, setReset]);

  const onCheckHandler = (date: string, name: string, value: boolean) => {
    const newData = [...man_power];
    const index = newData.findIndex((e) => e.date === date);

    if (index !== -1) {
      let item = newData[index];
      item = { ...item, [name]: value };
      newData.splice(index, 1, item);

      setManpower(newData);
    }
  };

  const Submit = (value: any) => {
    let temp = { ...data };

    temp.general_remark = value.general_remark;
    temp.monthly_photos = selected_photo;
    temp.monthly_manpowers = man_power;
    temp.checked_by = value.checked_by;
    temp.prepared_by = getUserData().id;
    console.log({ temp });
    setData(temp);
    submit_form(temp);
  };

  return (
    <Form layout="vertical" onFinish={Submit} form={form} initialValues={data}>
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>9.2 SITE MANPOWER</b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table
            bordered={true}
            size="small"
            columns={[
              {
                title: "Date",
                key: "date",
                sortOrder: "ascend",
                sortDirections: [],
                sorter: (a, b) =>
                  moment(a.date).isBefore(moment(b.date)) ? -1 : 1,
                render: (value, render) =>
                  moment(render.date).format("DD/MM/YYYY"),
              },
              {
                title: "Project Manager",
                key: "pm",
                render: (value, render) => (
                  <Checkbox
                    checked={render.project_manager}
                    onChange={(e) =>
                      onCheckHandler(
                        render.date,
                        "project_manager",
                        e.target.checked
                      )
                    }
                  />
                ),
              },
              {
                title: "Office Engineer",
                key: "oe",
                render: (value, render) => (
                  <Checkbox
                    checked={render.office_engineer}
                    onChange={(e) =>
                      onCheckHandler(
                        render.date,
                        "office_engineer",
                        e.target.checked
                      )
                    }
                  />
                ),
              },
              {
                title: "Site Engineer",
                key: "se",
                render: (value, render) => (
                  <Checkbox
                    checked={render.site_engineer}
                    onChange={(e) =>
                      onCheckHandler(
                        render.date,
                        "site_engineer",
                        e.target.checked
                      )
                    }
                  />
                ),
              },
              {
                title: "General Forman",
                key: "se",
                render: (value, render) => (
                  <Checkbox
                    checked={render.general_forman}
                    onChange={(e) =>
                      onCheckHandler(
                        render.date,
                        "general_forman",
                        e.target.checked
                      )
                    }
                  />
                ),
              },
            ]}
            dataSource={man_power}
            pagination={false}
          />
        </div>
      </div>
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>
                9.3 GENERAL REMARKS, ACTIONS TO BE TAKEN, ASSESSMENT PAST MONTH
                REPORT
              </b>
            </u>
          </h6>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <RemarkComponent
            name="general_remark"
            placeholder="remark"
            label="Remark"
          />
        </div>
      </div>
      <div className="row mb-3 mt-4 ">
        <div className="col-md-12">
          <h6>
            <u>
              <b>10. PHOTOS TAKEN IN THE REPORTING MONTH</b>
            </u>
          </h6>
        </div>
      </div>
      <ImageSelectorComponent
        key={0}
        photos={data.photos}
        dataAction={[selected_photo, selectedPhoto]}
      />

      {/* {data.photos.map((e: any) => (
            <Image
              width={700}
              src={`${BASE_URI}/${e.fileName}`}
              fallback="data:image/png;base64,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"
              placeholder={<Image preview={false} width={700} height="100%" />}
            />
          ))} */}

      <div className="col-md-4">
        <Form.Item label="Prepared By">
          <Input value={getUserData().full_name} />
        </Form.Item>
      </div>
      <div className="col-md-4">
        <Form.Item
          name="checked_by"
          label="Checked By"
          rules={[{ required: true, message: "Checked By Required!" }]}
        >
          <Select placeholder="Select">
            {users?.payload.map((e, i) => (
              <Select.Option key={i} value={e.id}>
                {e.full_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManpowerComponent);
