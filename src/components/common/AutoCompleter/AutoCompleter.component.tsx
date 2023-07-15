import { AutoComplete } from "antd";
import { Form } from "antd";
import { FC } from "react";
import { connect } from "react-redux";
import { AutoCompleterPropType } from "./AutoCompleter.util";

const AutoCompleterComponent: FC<AutoCompleterPropType> = ({
  options,
  value,
  label,
  onChange,
  placeholder,
  name,
}) => {
  return (
    <Form.Item label={label} name={name}>
      <AutoComplete
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </Form.Item>
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
)(AutoCompleterComponent);
