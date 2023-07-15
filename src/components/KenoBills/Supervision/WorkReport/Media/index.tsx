import Table, { ColumnsType } from "antd/lib/table";
import { FC, useEffect } from "react";
import AddMediaComponent from "./components/AddMediaComponent/AddMedia.component";
import { MediaPropType } from "./util/media.util";
import { fetchAllMedias } from "../../../../../redux/Media/Media.action";
import { connect } from "react-redux";
import { Media } from "../../../../../redux/Media/Media.type";
import ViewMediaComponent from "./components/ViewMediaComponent/viewMedia.component";
import moment from "moment";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const MediaComponent: FC<MediaPropType> = ({ media, fetchMedia, project }) => {
  useEffect(() => {
    fetchMedia({ project_id: project?.payload?.id });
  }, []);

  const column: ColumnsType<Media> = [
    {
      title: "NO",
      render: (record, data, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (record, data) => moment(data.date).format("DD/MM/YYYY"),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "View",
      render: (record, data, index) => <ViewMediaComponent data={data} />,
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <AuthenticationComponent type="WRITE">
          <AddMediaComponent
            fetchMedia={() => fetchMedia({ project_id: project?.payload?.id })}
          />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 hidden-print">
        <Table
          columns={column}
          dataSource={media.payload}
          loading={media.isPending}
        />
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
  media: state.media.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMedia: (action: any) => dispatch(fetchAllMedias(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaComponent);
