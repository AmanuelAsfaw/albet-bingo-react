import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import MaterialApproval from "./MaterialApproval";
import MaterialApprovalFile from "./File";
import { useNavigate, useParams } from "react-router-dom";

const MaterialApprovalComponent = () => {
  const [selected_tab, setSelectedTab] = useState("");
  const { menu, id, header, tab }: any = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  const onChange = (event: string) => {
    navigate({
      pathname: `/project/${id}/${header}/${menu}/${event
        .toLocaleLowerCase()
        .replaceAll(" ", "-")}`,
    });
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <Tabs tabPosition="top" activeKey={selected_tab} onChange={onChange}>
          <Tabs.TabPane tab="Material Approval" key="material-approval">
            <MaterialApproval />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab="Material Approval (Files)"
            key="material-approval-(files)"
          >
            <MaterialApprovalFile />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
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
)(MaterialApprovalComponent);
