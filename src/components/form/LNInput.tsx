import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TLNInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  rules?: object;
};

const LNInput = ({ type, name, label, placeholder, rules }: TLNInputProps) => {
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
          <Input {...field} type={type} id={name} placeholder={placeholder} />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default LNInput;
