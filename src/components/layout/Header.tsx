import {
  Avatar,
  Dropdown,
  Flex,
  MenuProps,
  Space,
  Typography,
  theme,
} from "antd";
import { useAppDispatch } from "../../redux/hook";
import { NavLink } from "react-router-dom";
import { useGetMeQuery } from "../../redux/features/user/userApi";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "../../redux/features/auth/authSlice";

const { Text, Title } = Typography;

const Header = () => {
  const { data } = useGetMeQuery({});
  const dispatch = useAppDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <NavLink
          target="_blank"
          rel="noopener noreferrer"
          to="https://www.antgroup.com"
          style={{ fontWeight: "bolder", margin: "5px 30px" }}
        >
          Profile
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <p
          onClick={() => dispatch(logout())}
          style={{ fontWeight: "bold", margin: "5px 30px" }}
        >
          Logout
        </p>
      ),
    },
  ];
  return (
    <div style={{ padding: "10px 46px", background: colorBgContainer }}>
      <Flex justify="space-between" align="center">
        <div>
          <Title level={5} style={{ fontWeight: "bold" }}>
            Welcome to LensHub
          </Title>
        </div>
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
          <a onClick={(e) => e.preventDefault()}>
            <Flex justify="center" align="center" gap={10}>
              <Space>
                {data?.data?.image ? (
                  <Avatar size="large" src={data.data?.image} />
                ) : (
                  <Avatar size="large" icon={<UserOutlined />} />
                )}
              </Space>

              {data?.data?.name && (
                <Flex vertical>
                  <Text style={{ fontWeight: "bold" }}>
                    {data?.data?.name?.firstName +
                      " " +
                      data?.data?.name?.lastName}
                  </Text>
                  <Text
                    type="secondary"
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {data?.data?.role}
                  </Text>
                </Flex>
              )}
            </Flex>
          </a>
        </Dropdown>
      </Flex>
    </div>
  );
};

export default Header;
