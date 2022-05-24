import React, { useState, useEffect } from "react";
import "../../create.css";
import { Input, Space, Select, Button, Form, message, Spin } from "antd";
import { useParams } from "react-router-dom";

import API from "../../api";

const { Option } = Select;

const CityDetail = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const params = useParams();

    useEffect(() => {
        const getCity = async () => {
            setLoading(true);
            await API.getCityId(params.id)
                .then((res) => {
                    console.log(res);
                    setName(res.data.name);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getCity();
    }, []);

    const patchCity = () => {
        API.PatchCity(name, params.id)
            .then((res) => {
                message.success("Город изменен");
            })
            .catch((error) => message.error("Город не изменен"));
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
                <Form onFinish={patchCity}>
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
                        <Button
                            style={{ background: "#55CD61" }}
                            type="primary"
                            htmlType="submit"
                        >
                            Сохранить
                        </Button>
                    </Space>
                </Form>
            )}
        </div>
    );
};

export default CityDetail;
