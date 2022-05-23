import React, { useState, useEffect } from "react";
import "../../create.css";
import { Input, Space, Select, Button, Form, message } from "antd";
import { useParams } from "react-router-dom";

import API from "../../api";

const { Option } = Select;

const CityDetail = () => {
    const [name, setName] = useState("");

    const params = useParams();

    // useEffect(() => {
    //     const getCity = () => {
    //         API.getCityDetail(params.id)
    //             .then((res) => {
    //                 console.log(res);
    //                 // setName(res)
    //             })
    //             .catch((error) => console.log(error));
    //     };
    //     getCity();
    // }, []);

    const patchCity = (data) => {
        API.PatchCity(data, params.id)
            .then((res) => {
                message.success("Город изменен");
            })
            .catch((error) => message.error("Город не изменен"));
    };

    return (
        <div>
            <Form onFinish={patchCity}>
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

export default CityDetail;
