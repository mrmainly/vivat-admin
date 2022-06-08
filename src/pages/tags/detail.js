import React, { useState, useEffect } from "react";
import "../../create.css";
import { Input, Space, Select, Button, Form, message, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";

const { Option } = Select;

const TagDetail = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const getCity = async () => {
    //         setLoading(true);
    //         await API.getCityId(params.id)
    //             .then((res) => {
    //                 console.log(res);
    //                 setName(res.data.name);
    //             })
    //             .catch((error) => console.log(error));
    //         setLoading(false);
    //     };
    //     getCity();
    // }, []);

    const patchTag = () => {
        API.patchTag(name, params.id)
            .then((res) => {
                message.success("Тег изменен");
                navigate(ROUTES.TAGS);
            })
            .catch((error) => message.error("Тег не изменен"));
    };

    const deleteTag = () => {
        API.deleteTag(params.id)
            .then(() => {
                message.success("Тег удален");
                navigate(ROUTES.TAGS);
            })
            .catch(() => message.error("Тег не найден"));
    };

    return (
        <div>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 135,
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <Form onFinish={patchTag}>
                    <Space direction="vertical">
                        <Form.Item
                            label="Название"
                            labelCol={{ span: 24 }}
                            required
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Item>
                        <Space>
                            <Button
                                style={{ background: "#55CD61" }}
                                type="primary"
                                htmlType="submit"
                            >
                                Сохранить
                            </Button>
                            <Button
                                style={{ background: "#FE5860" }}
                                type="primary"
                                onClick={deleteTag}
                            >
                                Удалить
                            </Button>
                        </Space>
                    </Space>
                </Form>
            )}
        </div>
    );
};

export default TagDetail;
