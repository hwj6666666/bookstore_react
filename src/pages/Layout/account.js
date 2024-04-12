import React from "react";
import { Card, Avatar, Typography } from "antd";
const { Title, Text } = Typography;

function Account() {
  // Replace with your own data
  const user = {
    avatar: "/skeleton.png",
    name: "Hu Wenjie",
    phone: "18379430563",
    signature: "Too young, too simple, sometimes naive.",
    id: "123456",
    level: 1,
  };

  return (
    <Card title="Account" className="h-1/2">
      <Card.Meta
        avatar={<Avatar src={user.avatar} />}
        // title={user.name}

        title={`${user.name} lv.${user.level}`}
        description={user.signature}
      />
      <div style={{ marginTop: 16 }}>
        <Title level={5} style={{ marginTop: 16 }}>
          ID
        </Title>
        <Text>{user.id}</Text>
        <Title level={5}>Phone</Title>
        <Text>{user.phone}</Text>
      </div>
    </Card>
  );
}

export default Account;
