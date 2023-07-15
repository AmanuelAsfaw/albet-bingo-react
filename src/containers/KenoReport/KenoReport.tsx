import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { KenoReportPropType } from "./KenoReport.util";
import KenoReportComponent from "../../components/KenoReport";
const KenoReport: FC<KenoReportPropType> = () => {
  useEffect(() => {}, []);

  return <KenoReportComponent />;
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

export default connect(mapStateToProps, mapDispatchToProps)(KenoReport);
