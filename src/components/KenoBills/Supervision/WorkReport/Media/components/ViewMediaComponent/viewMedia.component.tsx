import { Button, Modal, Image, Typography } from "antd";
import { useState } from "react";
import { BASE_URI } from "../../../../../../../redux/ApiCall";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Loading from "../../../../../../Images/loading.jpg";
const { Title } = Typography;

const ViewMediaComponent = ({ data }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const countImage = data.Uploads.filter((upload: any) =>
    isImage(upload.fileName)
  );
  const fileData = (
    <Image.PreviewGroup>
      {data.Uploads.filter((upload: any) => isImage(upload.fileName)).map(
        (upload: any) => {
          return <Image width={180} src={`${BASE_URI}/${upload.fileName}`} />;
        }
      )}
    </Image.PreviewGroup>
  );

  const VideoData = data.Uploads.filter(
    (upload: any) => !isImage(upload.fileName)
  ).map((upload: any, i: number) => {
    return (
      <div className="pt-2">
        <a target="_blank" href={`${BASE_URI}/${upload.fileName}`}>
          {`Video ${i + 1}`}
        </a>
      </div>
    );
  });

  const handleOk = () => {
    setIsModalVisible(false);
    setSelected(0);
  };
  return (
    <>
      <Button type="link" onClick={() => setIsModalVisible(true)}>
        Open files
      </Button>
      <Modal
        title="File Viewer"
        className="fixed-modal"
        centered
        visible={isModalVisible}
        onCancel={handleOk}
        width={1000}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
          </>,
        ]}
      >
        <div className="row">
          <div className="col-md-12">
            <Title level={4}>Photos</Title>
            {countImage.length === 0 ? <p>No Photos Present</p> : fileData}
          </div>
          <div className="col-md-12 pt-4">
            <Title level={4}>Videos</Title>
            {VideoData.length === 0 ? <p>No videos present!</p> : VideoData}
          </div>
        </div>
      </Modal>
    </>
  );
};

const isImage = (filename: string) => {
  const extList = ["png", "jpeg", "jpg"];
  const ext: string = filename?.split(".").pop()!;
  return extList.includes(ext || "");
};

export default ViewMediaComponent;
