import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TLNSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  rules?: object;
};

const LNSelect = ({ name, label, options, rules }: TLNSelectProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          style={{ marginBottom: "20px", fontWeight: 500 }}
          validateStatus={error ? "error" : ""}
        >
          <Select
            placeholder="Please select"
            style={{ width: "100%" }}
            {...field}
            options={options}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default LNSelect;
