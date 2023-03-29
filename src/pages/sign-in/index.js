import React, { useState } from "react";
import "./sign_in.css";
import API from "../../api";
import ROUTES from "../../routes";

import {
    Form,
    Input,
    Button,
    Space,
    Typography,
    message,
} from "antd";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const SignIn = () => {
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        API.getToken({ ...data })
            .then((res) => {
                message.success("авторизация прошла успешно");
                cookie.set("jwttoken", res.data.token, {
                    expires: 2555,
                    path: "/",
                });
                navigate(ROUTES.ORDERS);
            })
            .catch((error) => {
                message.error("такого пользователя не существует");
            });
    };
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
                    Авторизация
                </Title>
                <Form onFinish={onSubmit}>
                    <Space direction="vertical">
                        <Form.Item
                            name="username"
                            required
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Пожалуйста введите свое имя",
                                },
                            ]}
                            type="email"
                        >
                            <Input placeholder="Электронная почта" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Пожалуйста введите свой пароль!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Пароль"
                                type="password"
                            />
                        </Form.Item>
                        <Button htmlType="submit">Войти</Button>
                    </Space>
                </Form>
            </div>
        </div>
    );
};

export default SignIn;
