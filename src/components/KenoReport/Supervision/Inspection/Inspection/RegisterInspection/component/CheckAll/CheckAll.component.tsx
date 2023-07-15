import { Checkbox } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";

const CheckAllComponent: FC<{ dataAction: any; valueAction: any }> = ({
  dataAction,
  valueAction,
}) => {
  const [inspectionData, setInspectionData] = dataAction;

  const [value, setValue] = valueAction;

  useEffect(() => {}, []);

  const onClick = (type: string) => {
    let temp = { ...inspectionData };

    let temp2 = [...temp.inspection_items];

    temp2 = temp2.map((el, index) => {
      if (!el.is_subtitle) {
        el.value = type;
      }

      return {
        ...el,
      };
    });

    setValue(type);

    setInspectionData({ ...temp, inspection_items: temp2 });
  };

  return (
    <div className="row align-content-end" style={{ width: 150 }}>
      <div className="col-4">
        <Checkbox
          name="C"
          value="C"
          onClick={() => onClick("C")}
          checked={value === "C"}
          defaultChecked={false}
        />
      </div>

      <div className="col-4">
        <Checkbox
          name="NC"
          value="NC"
          onClick={() => onClick("NC")}
          checked={value === "NC"}
          defaultChecked={false}
        />
      </div>

      <div className="col-4">
        <Checkbox
          name="NA"
          value="NA"
          onClick={() => onClick("NA")}
          checked={value === "NA"}
          defaultChecked={false}
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CheckAllComponent);
