import { FC, useState } from "react";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import Table, { ColumnsType } from "antd/lib/table";
import {
  DatePicker,
  Typography,
  Statistic,
  InputNumber,
  Divider,
  Input,
  Form,
  Button,
} from "antd";
import moment from "moment";
import { DetailMaterialRequestPropType } from "./DetailMaterialRequest.util";
import { formatNumber, zeroPad } from "../../../../../../utilities/utilities";
import { PeType } from "../../util/MaterialRequest.util";

const { Text } = Typography;

const DetailMaterialRequest: FC<DetailMaterialRequestPropType> = ({
  project,
  material_request,
  index,
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      render: (record, data, index) => <Input value={record} />,
    },
    {
      title: "Unit Measurement",
      dataIndex: "unit_measurement",
      width: "2%",
      render: (record, data, index) => <Input value={record} />,
    },
    {
      title: "New Request In",
      width: "10%",
      dataIndex: "new_request",
      render: (record, data, index) => (
        <InputNumber controls={false} value={formatNumber(record)} />
      ),
    },
    {
      title: "Approved",
      width: "10%",
      dataIndex: "approved",
      render: (record, data, index) => (
        <InputNumber controls={false} value={formatNumber(record)} />
      ),
    },
    {
      title: "Total quantity received up to this request",
      width: "10%",
      dataIndex: "total_quantity_received",
      render: (record, data, index) => (
        <InputNumber controls={false} value={formatNumber(record)} />
      ),
    },
    {
      title: "Total quantity remaining on site",
      width: "10%",
      dataIndex: "total_quantity_remaining_on_site",
      render: (record, data, index) => (
        <InputNumber controls={false} value={formatNumber(record)} />
      ),
    },
    {
      title: "Total quantity remaining",
      width: "10%",
      dataIndex: "total_quantity_remaining",
      render: (record, data, index) => (
        <InputNumber controls={false} value={formatNumber(record)} />
      ),
    },
    {
      title: "Remark",
      width: "20%",
      dataIndex: "remark",
      render: (record, data, index) => <Input value={record} />,
    },
  ];

  return (
    <div>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        View
      </Button>
      <Modal
        title="View Material Request"
        className="fixed-modal"
        centered
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
        footer={() => <></>}
      >
        <div className="hidden-print">
          <Form
            initialValues={{
              date: moment(material_request?.date),
              parcel_no: material_request?.parcel_no,
              block_no: material_request?.block_no,
              block_type: material_request?.block_type,
              contractor_name: material_request?.contractor_name,
              project_coordinator_name:
                material_request?.project_coordinator_name,
              resident_engineer_name: material_request?.resident_engineer_name,
              shde_head_name: material_request?.shde_head_name,
              site_inspector_name: material_request?.site_inspector_name,
            }}
            layout="vertical"
            form={form}
          >
            <div className="row">
              <div className="col-md-6">
                <Form.Item name="date">
                  <DatePicker name="date" />
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
                <Form.Item label="Parcel No." name="parcel_no">
                  <Input name="Parcel" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Block No." name="block_no">
                  <Input name="BlockNo" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item label="Block type" name="block_type">
                  <Input name="BlockType" />
                </Form.Item>
              </div>
            </div>

            <Divider />

            <div className="col-md-12 pt-2">
              <Text>Personnel and equipment deployed for the day</Text>
            </div>
            <div className="col-md-12">
              <Table
                columns={Pecolumn}
                dataSource={material_request.personnel_equipment
                  .split("---")
                  .map((form: any) => JSON.parse(form))}
                size="small"
                pagination={false}
                bordered={true}
              />
            </div>

            <div className="col-md-6"></div>

            <div className="row mt-4">
              <div className="col-md-4 pt-2">
                <Form.Item label="Contractor" name="contractor_name">
                  <Input name="contractor_name" />
                </Form.Item>
              </div>
              <div className="col-md-4 pt-2">
                <Form.Item label="Site Inspector" name="site_inspector_name">
                  <Input name="site_inspector_name" />
                </Form.Item>
              </div>
              <div className="col-md-4 pt-2">
                <Form.Item
                  label="Resident Engineer"
                  name="resident_engineer_name"
                >
                  <Input name="resident_engineer_name" />
                </Form.Item>
              </div>
              <div className="col-md-4 pt-2">
                <Form.Item
                  label="Project Coordinator"
                  name="project_coordinator_name"
                >
                  <Input name="project_coordinator_name" />
                </Form.Item>
              </div>
              <div className="col-md-4 pt-2">
                <Form.Item
                  label="SHDE Construction process head"
                  name="shde_head_name"
                >
                  <Input name="shde_head_name" />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className="col-md-12"></div>
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
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  // fetchAllInspectionForm: () => dispatch(fetchAllInspectionForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailMaterialRequest);
