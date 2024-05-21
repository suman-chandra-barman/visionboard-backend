import React from "react";
import { Flex, Spin } from "antd";

const contentStyle: React.CSSProperties = {
  padding: 50,
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Loading: React.FC = () => (
  <Flex justify="center" align="center" style={{ height: "100vh" }}>
    <Flex gap="small">
      <Spin tip="Loading..." size="large">
        {content}
      </Spin>
    </Flex>
  </Flex>
);

export default Loading;
