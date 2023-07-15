import React, { FC } from "react";
import { Checkbox, Input } from "antd";

const CheckboxGroupComponent: FC<{ value: string }> = ({ value = "" }) => {
  const checkIsChecked = (name: string) => {
    return value === name;
  };

  return (
    <div className="row align-content-end" style={{ width: 150 }}>
      <div className="col-4">
        <Input
          type="checkbox"
          name="C"
          value="C"
          checked={checkIsChecked("C")}
        />
      </div>

      <div className="col-4">
        <Input
          type="checkbox"
          name="NC"
          value="NC"
          checked={checkIsChecked("NC")}
        />
      </div>

      <div className="col-4">
        <Input
          type="checkbox"
          name="NA"
          value="NA"
          checked={checkIsChecked("NA")}
        />
      </div>
    </div>
  );
};

export default CheckboxGroupComponent;
