import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Controller } from "react-hook-form";

type TLNFileProps = {
  name: string;
  label?: string;
  rules?: object;
};

const LNFile = ({ name, label, rules }: TLNFileProps) => {
  const [file, setFile] = useState<UploadFile | null>(null);

  const props: UploadProps = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (newFile) => {
      setFile(newFile);
      return false;
    },
    fileList: file ? [file] : [],
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        rules={rules}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <Form.Item
            label={label}
            style={{ fontWeight: 500 }}
            validateStatus={error ? "error" : ""}
          >
            <Upload {...props} onChange={() => onChange(file)}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>

            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default LNFile;
