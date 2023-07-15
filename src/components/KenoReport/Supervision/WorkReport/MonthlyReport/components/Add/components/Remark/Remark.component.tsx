import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FC } from "react";

const RemarkComponent: FC<{
  name: string;
  placeholder: string;
  label: string;
}> = ({ name, label, placeholder }) => {
  return (
    <>
      <Form.List name={name}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={index === 0 ? label : ""}
                required={false}
                key={field.key}
                className="font-weight-bold"
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: false,
                      whitespace: true,
                      message: `Please input ${name} or delete this field.`,
                    },
                  ]}
                  noStyle
                >
                  <Input.TextArea
                    rows={3}
                    placeholder={placeholder}
                    style={{ width: "95%" }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button ml-2"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default RemarkComponent;
