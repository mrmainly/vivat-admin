import React from "react";
import "../../create.css";
import { Input, Space, Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";

const TagsCreate = () => {
    const navigate = useNavigate();

    const CreateTag = (data) => {
        API.createTag(data)
            .then((res) => {
                message.success("Тег создан");
                navigate(ROUTES.TAGS);
            })
            .catch((error) => message.error("Тег не создан"));
    };

    return (
        <div>
            <Form onFinish={CreateTag}>
                <Space direction="vertical">
                    <Form.Item
                        label="Название"
                        name="name"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Basic usage"
                            style={{ width: 235 }}
                        />
                    </Form.Item>
                    <Button
                        style={{ background: "#55CD61" }}
                        type="primary"
                        htmlType="submit"
                    >
                        Сохранить
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default TagsCreate;
