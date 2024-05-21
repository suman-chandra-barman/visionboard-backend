import { Form, Input, Button, Flex, Row, InputNumber, Select } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { useCreateUserMutation } from "../redux/features/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useState } from "react";
import { jwtVerify } from "../utils/jwtVerify";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";

type TRegisterValue = {
  fName: string;
  lName: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  contactNumber: string;
  address: string;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [createUser, { isError: registerError }] = useCreateUserMutation();
  const [login, { isError: loginError }] = useLoginMutation();

  const [form] = Form.useForm();

  const onFinish = async (value: TRegisterValue) => {
    setLoading(true);
    const user = {
      name: {
        firstName: value.fName,
        lastName: value.lName,
      },
      email: value.email,
      password: value.password,
      gender: value.gender,
      age: value.age,
      contactNo: value.contactNumber,
      address: value.address,
    };

    //register user
    const createdUser = await createUser(user).unwrap();

    if (createdUser.success) {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      //login user
      const res = await login(loginData).unwrap();
      if (res.success) {
        const userInfo = jwtVerify(res?.data?.accessToken);
        dispatch(setUser({ user: userInfo, token: res?.data?.accessToken }));
        form.resetFields();
        setLoading(false);
        navigate("/");
      }
    }
  };

  //if error
  if (registerError) {
    console.error(registerError);
  } else if (loginError) {
    console.error(loginError);
  }

  return (
    <Flex justify="center" align="center">
      <Form
        name="register"
        onFinish={onFinish}
        {...layout}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          margin: "30px 0px",
          backgroundColor: "whitesmoke",
          borderRadius: "15px",
        }}
      >
        <Row justify="center" style={{ marginBottom: "15px" }}>
          <Title level={3}>Create A Lenshub Account</Title>
        </Row>
        <Form.Item
          name="fName"
          label="First Name"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lName"
          label="Last Name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="Select your gender">
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              type: "number",
              required: true,
              min: 0,
              max: 99,
              message: "Please input your age",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contactNumber"
          label="Contact Number"
          rules={[
            { required: true, message: "Please input your contact number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            <p>Create an Account</p>
          </Button>
          <Row
            style={{
              marginTop: "4px",
            }}
          >
            <Text
              style={{
                marginRight: "5px",
              }}
            >
              Already have an account?
            </Text>
            <Link to="/login"> Login</Link>
          </Row>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Register;
