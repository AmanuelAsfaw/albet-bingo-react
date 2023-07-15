import { FC, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import Table, { ColumnsType } from "antd/lib/table";
import {
  DatePicker,
  Typography,
  Statistic,
  Divider,
  InputNumber,
  AutoComplete,
  Input,
  Form,
  Button,
} from "antd";
import {
  NotificationType,
  Message,
  ItemCategory,
} from "../../../../../../constants/Constants";
import moment from "moment";
import {
  addMaterialRequest,
  AddMaterialRequestPropType,
} from "./AddMaterialRequest.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { formatNumber, zeroPad } from "../../../../../../utilities/utilities";
import { fetchAllMaterialRequest } from "../../../../../../redux/MaterialRequest/MaterialRequest.action";
import {
  formatFieldName,
  InitialPEData,
  PeType,
} from "../../util/MaterialRequest.util";

const { RangePicker } = DatePicker;
const { Text } = Typography;
const { TextArea } = Input;

const AddMaterialRequest: FC<AddMaterialRequestPropType> = ({
  material,
  users,
  fetchMaterialRequest,
  material_request,
  project,
  index,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [materialRequestDate, setMaterialRequestDate] =
    useState<moment.Moment | null>(moment());
  const [pe, setPe] = useState<PeType[]>(InitialPEData);
  const [prev_approved, setPrevApproved] = useState(0);

  const resetForm = () => {
    form.resetFields();
    setPe([
      {
        key: Date.now(),
        description: "",
        unit_measurement: "",
        new_request: 0,
        approved: 0,
        total_quantity_received: 0,
        total_quantity_remaining_on_site: 0,
        total_quantity_remaining: 0,
        remark: "",
      },
    ]);
  };

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...pe];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = {
        ...newData[index],
        [name]: value,
      };
      if (
        name === "new_request" ||
        name === "approved" ||
        name === "total_quantity_received"
      ) {
        item.total_quantity_remaining =
          item.new_request + item.approved + item.total_quantity_received;
      }
      newData.splice(index, 1, item);
      setPe(newData);
    }
  };

  const Pecolumn: ColumnsType<PeType> = [
    {
      title: "No",
      width: "2%",
      render: (record, data, index) => zeroPad(index + 1),
    },
    {
      title: "Description of Material",
      width: "30%",
      dataIndex: "description",
      render: (record, data, index) => (
        <AutoComplete
          value={record}
          placeholder="description"
          onChange={(e) => {
            onChangeHandler(data.key, "description", e);
          }}
          options={material.payload
            .filter(
              (mat) => mat.item_category === ItemCategory.CONSTRUCTION_MATERIAL
            )
            .map((mat, index) => ({
              value: mat.description,
              key: index,
            }))}
          filterOption={(inputValue, option: any) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Unit Measurement",
      width: "2%",
      dataIndex: "unit_measurement",
      render: (record, data, index) => (
        <AutoComplete
          value={record}
          placeholder="unit"
          onChange={(e) => {
            onChangeHandler(data.key, "unit_measurement", e);
          }}
          options={material.payload
            .filter(
              (mat) => mat.item_category === ItemCategory.CONSTRUCTION_MATERIAL
            )
            .filter((mat) => mat.description === data.description)
            .map((mat, index) => ({
              value: mat.unit,
              key: index,
            }))}
          filterOption={(inputValue, option: any) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "New Request In",
      width: "10%",
      dataIndex: "new_request",
      render: (record, data, index) => (
        <InputNumber
          controls={false}
          value={formatNumber(record)}
          onChange={(e) => onChangeHandler(data.key, "new_request", e)}
        />
      ),
    },
    {
      title: "Approved",
      width: "10%",
      dataIndex: "approved",
      render: (record, data, index) => (
        <InputNumber
          controls={false}
          value={formatNumber(record)}
          onChange={(e) => onChangeHandler(data.key, "approved", e)}
        />
      ),
    },
    {
      title: "Total quantity received up to this request",
      width: "10%",
      dataIndex: "total_quantity_received",
      render: (record, data, index) => {
        const approvedList: Array<number> = [];
        material_request.payload
          .filter((mat) =>
            mat.personnel_equipment
              ? JSON.parse(mat.personnel_equipment).description ===
                data.description
              : ""
          )
          .map((mat) => {
            approvedList.push(JSON.parse(mat.personnel_equipment).approved);
            const sumOfPrevApproved = approvedList.reduce(
              (partialSum, a) => partialSum + a,
              0
            );
            setPrevApproved(sumOfPrevApproved);
          });
        console.log(prev_approved);
        record = prev_approved;
        data.total_quantity_received = record;
        return (
          <InputNumber
            controls={false}
            value={formatNumber(record)}
            placeholder={(data.approved + prev_approved).toString()}
            onChange={(e) =>
              onChangeHandler(data.key, "total_quantity_received", e)
            }
          />
        );
      },
    },
    {
      title: "Total quantity remaining on site",
      width: "10%",
      dataIndex: "total_quantity_remaining_on_site",
      render: (record, data, index) => {
        return (
          <InputNumber
            controls={false}
            value={formatNumber(record)}
            onChange={(e) =>
              onChangeHandler(data.key, "total_quantity_remaining_on_site", e)
            }
          />
        );
      },
    },
    {
      title: "Total quantity remaining",
      width: "10%",
      dataIndex: "total_quantity_remaining",
      render: (record, data, index) => formatNumber(record),
    },
    {
      title: "Remark",
      width: "20%",
      dataIndex: "remark",
      render: (record, data, index) => (
        <TextArea
          autoSize
          value={record}
          onChange={(e) => onChangeHandler(data.key, "remark", e.target.value)}
        />
      ),
    },
    {
      title: "Action",
      render: (record, data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = pe;
                fr.push({
                  key: Date.now(),
                  description: "",
                  unit_measurement: "",
                  new_request: 0,
                  approved: 0,
                  total_quantity_received: 0,
                  total_quantity_remaining_on_site: 0,
                  total_quantity_remaining: 0,
                  remark: "",
                });
                setPe([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = pe;
                  fr.splice(index, 1);
                  setPe([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  const Submit = (values: any) => {
    setLoading(true);

    const toSend = {
      project_id: project.payload?.id,
      date: materialRequestDate?.format("YYYY-MM-DD"),
      parcel_no: values.parcel_no,
      block_no: values.block_no,
      block_type: values.block_type,
      contractor_name: values.contractor_name.toString(),
      project_coordinator_name: values.project_coordinator_name.toString(),
      resident_engineer_name: values.resident_engineer_name.toString(),
      shde_head_name: values.shde_head_name.toString(),
      site_inspector_name: values.site_inspector_name.toString(),
      personnel_equipment: pe.map((data) => JSON.stringify(data)).join("---"),
    };

    addMaterialRequest(toSend)
      .then(() => {
        resetForm();
        handleOk();
        setLoading(false);
        fetchMaterialRequest({ project_id: project?.payload.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.MATERIAL_REQUEST_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.MATERIAL_REQUEST_FAILURE,
            e.message
          )
        );
      });
  };

  return (
    <div>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        loading={
          users.isPending || material_request.isPending || project.isPending
        }
      >
        Add Material Request
      </Button>
      <Modal
        title="Add Material Request"
        centered
        className="fixed-modal"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Add Material Request
            </Button>
          </>,
        ]}
      >
        <Form
          initialValues={{
            report_number: zeroPad(index),
          }}
          onFinish={Submit}
          onFinishFailed={(err) => {
            const { values, errorFields, outOfDate } = err;
            console.log("values ", values);
            console.log("error feilds ", errorFields);
            console.log("outofDate ", outOfDate);
            errorFields.map((field) =>
              OpenNotification(
                NotificationType.ERROR,
                formatFieldName(field.name[0].toString()),
                field.errors[0]
              )
            );
          }}
          layout="vertical"
          form={form}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                rules={[{ required: true, message: "Please input date" }]}
              >
                <DatePicker
                  allowClear={false}
                  value={materialRequestDate}
                  onChange={(date) => setMaterialRequestDate(date)}
                />
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="row">
            <div className="col-md-4">
              <Statistic
                title="Contractor"
                value={project.payload?.contractor?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-4">
              <Statistic
                title="Client"
                value={project.payload?.client?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-4">
              <Statistic
                title="Project title"
                value={project.payload?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>

          <Divider />

          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Parcel No."
                name="parcel_no"
                rules={[{ required: true, message: "Parcel No is required" }]}
              >
                <Input name="Parcel" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Block No."
                name="block_no"
                rules={[{ required: true, message: "Block No is required" }]}
              >
                <Input name="BlockNo" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Block type"
                name="block_type"
                rules={[{ required: true, message: "Block type is required" }]}
              >
                <Input name="BlockType" />
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="row mt-4">
            <div className="col-md-12">
              <Text>2. Personnel and equipment deployed for the day</Text>
              <Table
                className="MaterialRequest-table"
                columns={Pecolumn}
                dataSource={pe}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-4 pt-2">
              <Form.Item
                label="Contractor"
                name="contractor_name"
                rules={[{ required: true, message: "Contractor is required" }]}
              >
                <AutoComplete
                  placeholder="Contractor"
                  options={users.payload.map((e, index) => ({
                    value: e.full_name,
                    key: index,
                  }))}
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item
                label="Site Inspector"
                name="site_inspector_name"
                rules={[
                  { required: true, message: "Site Inspector is required" },
                ]}
              >
                <AutoComplete
                  placeholder="Site Inspector"
                  options={users.payload.map((e, index) => ({
                    value: e.full_name,
                    key: index,
                  }))}
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item
                label="Resident Engineer"
                name="resident_engineer_name"
                rules={[
                  { required: true, message: "Resident Engineer is required" },
                ]}
              >
                <AutoComplete
                  placeholder="Resident Engineer"
                  options={users.payload.map((e, index) => ({
                    value: e.full_name,
                    key: index,
                  }))}
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 pt-2">
              <Form.Item
                label="Project Coordinator"
                name="project_coordinator_name"
                rules={[
                  {
                    required: true,
                    message: "Project Coordinator is required",
                  },
                ]}
              >
                <AutoComplete
                  placeholder="Project Coordinator"
                  options={users.payload.map((e, index) => ({
                    value: e.full_name,
                    key: index,
                  }))}
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="col-md-4 pt-2">
              <Form.Item
                label="SHDE Construction process head"
                name="shde_head_name"
                rules={[
                  {
                    required: true,
                    message: "SHDE Construction process head is required",
                  },
                ]}
              >
                <AutoComplete
                  placeholder="SHDE Construction process head"
                  options={users.payload.map((e, index) => ({
                    value: e.full_name,
                    key: index,
                  }))}
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  material: state.material.fetchAll,
  material_request: state.material_request.fetchAll,
  users: state.user.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMaterialRequest: (action: any) =>
    dispatch(fetchAllMaterialRequest(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMaterialRequest);
