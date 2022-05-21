import React from "react";
import "./sign_in.css";

import { Form, Input, Button, Space, Typography } from "antd";

const { Title } = Typography;

const SignIn = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 900,
            }}
        >
            <div className="form">
                <img src="/img/Frame62.png" />
                <Title level={4} style={{ marginTop: 25 }}>
                    Регистрация
                </Title>
                <Form>
                    <Space direction="vertical">
                        <Form.Item>
                            <Input placeholder="Электронная почта" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Номер телефона" />
                        </Form.Item>
                        <Button>Далее</Button>
                    </Space>
                </Form>
            </div>
        </div>
    );
};

export default SignIn;
