import { Form, Input, Button, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { jwtVerify } from "../utils/jwtVerify";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading, isError }] = useLoginMutation();
  const [form] = Form.useForm();

  //is error
  if (isError) {
    console.error(isError);
  }

  const onFinish = async (value: { email: string; password: string }) => {
    const data = {
      email: value.email,
      password: value.password,
    };

    const res = await login(data).unwrap();
    if (res.success) {
      toast.success("Login successful!", { duration: 2000 });
      const userInfo = jwtVerify(res?.data?.accessToken);

      dispatch(setUser({ user: userInfo, token: res?.data?.accessToken }));

      form.resetFields();
      navigate("/");
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Form
        name="register"
        onFinish={onFinish}
        form={form}
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "30px",
          margin: "30px 0px",
          backgroundColor: "whitesmoke",
          borderRadius: "15px",
        }}
      >
        <Row justify="center" style={{ marginBottom: "15px" }}>
          <Title level={3}>Login Lenshub</Title>
        </Row>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your valid email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your valid password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            <p>Login</p>
          </Button>
          <Row
            style={{
              marginTop: "4px",
            }}
          >
            <Text style={{ marginRight: "5px" }}> New Member?</Text>
            <Link to="/register"> Create an Lenshub account!</Link>
          </Row>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
