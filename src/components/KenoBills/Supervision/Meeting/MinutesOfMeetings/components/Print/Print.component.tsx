import { Tag, Table, Statistic } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";
import { PrintPropType } from "../../util/Meeting.util";

import moment from "moment";
import { zeroPad } from "../../../../../../../utilities/utilities";
import { ColumnsType } from "antd/lib/table";
import SignatureComponent from "../../../../../../common/Signature/Signature.component";

const PrintComponent: FC<PrintPropType> = ({
  meeting,
  is_visible,
  setVisibility,
  project,
  index,
}) => {
  useEffect(() => {
    if (!meeting.isPending && is_visible && meeting.payload) window.print();
  }, [meeting, is_visible]);

  window.onafterprint = () => {
    setVisibility(false);
  };

  const attendance_columns: ColumnsType<any> = [
    {
      title: "No",
      render: (value: number, record: any, index: number) => "1." + (index + 1),
      width: "5%",
      sortOrder: "ascend",
      sortDirections: [],
      sorter: (a, b) => a.meeting_attendance?.id - b.meeting_attendance?.id,
    },
    {
      title: "Full Name",
      dataIndex: "user_id",
      key: "date",
      render: (data, record) =>
        record.full_name ? record.full_name : record.name,
      width: "35%",
    },
    {
      title: "Position",
      render: (data, record) => (record.role ? record.role : record.position),
      width: "25%",
    },
    {
      title: "Signature",
      render: (data, record) =>
        record.meeting_attendance?.is_approved ? (
          record.meeting_attendance?.is_approved ? (
            <SignatureComponent user={record} />
          ) : (
            <Tag color="yellow">Not Approved</Tag>
          )
        ) : null,

      width: "25%",
    },
  ];

  const common_columns = (i: number) => [
    {
      title: "No",
      key: "no",
      width: "5%",
      render: (data: any, record: any, index: any) => i + "." + (index + 1),
    },
    {
      title: "Description",
      width: "95%",
      key: "description",
      dataIndex: "description",
    },
  ];

  return (
    <div className=" visible-print">
      {!meeting.isPending ? (
        <>
          <PdfHeaderComponent type="consultant" />
          <div className="row">
            <div className="col-md-8">
              <h6 style={{ fontFamily: "Campton-Book" }}>
                Project:
                <span
                  style={{
                    fontSize: 16,
                    fontFamily: "Campton-Medium",
                    textDecoration: "underline",
                  }}
                >
                  {project.payload?.name}
                </span>
              </h6>
            </div>
            <div className="col-md-8">
              <h6 style={{ fontFamily: "Campton-Book" }}>
                Contractor:
                <span
                  style={{
                    fontSize: 16,
                    fontFamily: "Campton-Medium",
                    textDecoration: "underline",
                  }}
                >
                  {project.payload?.client?.name}
                </span>
              </h6>
            </div>

            <div className="col-md-8">
              <h6 style={{ fontFamily: "Campton-Book" }}>
                Consultant:
                <span
                  style={{
                    fontSize: 16,
                    fontFamily: "Campton-Medium",
                    textDecoration: "underline",
                  }}
                >
                  {project.payload?.consultant?.name}
                </span>
              </h6>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              <h6 style={{ fontFamily: "Campton-Book" }}>
                Contractor:
                <span
                  style={{
                    fontSize: 16,
                    fontFamily: "Campton-Medium",
                    textDecoration: "underline",
                  }}
                >
                  {project.payload?.contractor?.name}
                </span>
              </h6>
            </div>
            <div className="col-md-8">
              <h6 style={{ fontFamily: "Campton-Book" }}>
                Meeting Type:
                <span
                  style={{
                    fontSize: 16,
                    fontFamily: "Campton-Medium",
                    textDecoration: "underline",
                  }}
                >
                  {meeting.payload?.type}
                </span>
              </h6>
            </div>
            <div className="col-md-8">
              <h6 style={{ fontFamily: "Campton-Book" }}>
                Meeting No:
                <span
                  style={{
                    fontSize: 16,
                    fontFamily: "Campton-Medium",
                    textDecoration: "underline",
                  }}
                >
                  {`${zeroPad(index)}`}
                </span>
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <h6 style={{ fontFamily: "Campton-Book" }}>
                Meeting Date:
                <span
                  style={{
                    fontSize: 16,
                    fontFamily: "Campton-Medium",
                    textDecoration: "underline",
                  }}
                >
                  {moment(meeting.payload?.date).format("DD/MM/YYYY")}
                </span>
              </h6>
            </div>
            <div className="col-md-8">
              <h6 style={{ fontFamily: "Campton-Book" }}>
                Meeting Location:
                <span
                  style={{
                    fontSize: 16,
                    fontFamily: "Campton-Medium",
                    textDecoration: "underline",
                  }}
                >
                  {meeting.payload?.location}
                </span>
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-2 mt-5">
              <h6>1. Meeting Attendance</h6>
            </div>
            <div className="col-md-12 mb-2">
              <h6>Signing</h6>
            </div>
            <div className="col-md-12">
              <Table
                columns={attendance_columns}
                loading={meeting.isPending}
                dataSource={
                  meeting.payload?.meeting_attendances &&
                  meeting.payload?.meeting_participants
                    ? [
                        ...meeting.payload?.meeting_attendances,
                        ...meeting.payload?.meeting_participants,
                      ]
                    : []
                }
                pagination={false}
              />
            </div>

            <div className="col-md-12 mt-5 mb-2">
              <h6> 2. Meeting Agenda</h6>
            </div>

            <div className="col-md-12">
              <Table
                columns={common_columns(2)}
                dataSource={meeting.payload.meeting_agendas}
                pagination={false}
              />
            </div>

            <div className="col-md-12 mt-5 mb-2">
              <h6> 3. Meeting Agenda Discussion</h6>
            </div>

            <div className="col-md-12">
              <Table
                columns={common_columns(3)}
                dataSource={meeting.payload.meeting_agenda_discussions}
                pagination={false}
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-4">
              <Statistic
                title="Meeting Completion Time"
                value={moment(meeting.payload.meeting_completion_time).format(
                  "LT"
                )}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>
        </>
      ) : null}
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
  meeting: state.meeting.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrintComponent);
