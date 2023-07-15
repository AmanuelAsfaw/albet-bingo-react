import { Button, Form, Modal, Statistic } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EyeOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { DetailSiteHandOverPropType } from "../../utils/SiteHandover.util";
import moment from "moment";
import { DownloadFile } from "../../../../../Document/MyDocument/index.util";
import DocumentViewerComponent from "../../../../../common/DocumentViewer/DocumentViewer.component";

const DetailSiteHandoverComponent: FC<DetailSiteHandOverPropType> = ({
  site_handover,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Detail
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Detail"
        width={1000}
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[<></>]}
      >
        <div className="row">
          <div className="col-md-4">
            <Statistic
              title="Date"
              value={moment(site_handover.date).format("DD-MM-YYYY")}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-4">
            <Statistic
              title="Project Name"
              value={site_handover.project_name}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-4">
            <Statistic
              title="Location"
              value={site_handover.location}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4">
            <Statistic
              title="Client"
              value={site_handover.client_name}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-4">
            <Statistic
              title="Contractor"
              value={site_handover.consultant_name}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-4">
            <Statistic
              title="Consultant"
              value={site_handover.consultant_name}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4">
            <Form layout="vertical">
              <Form.Item label="Attached File" className="handover-download">
                <>
                  <Button
                    className="pl-0 mt-0"
                    type="link"
                    icon={<CloudDownloadOutlined />}
                    onClick={() => DownloadFile(site_handover.document)}
                  >
                    Download
                  </Button>
                  {site_handover.document ? (
                    <DocumentViewerComponent
                      document={site_handover.document}
                    />
                  ) : null}
                </>
              </Form.Item>
            </Form>
          </div>
        </div>
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
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailSiteHandoverComponent);
