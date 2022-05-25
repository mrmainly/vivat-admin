import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Typography,
    Space,
    Select,
    Divider,
    message,
    Button,
    Spin,
} from "antd";

import API from "../../api";

const { Text, Title } = Typography;
const { Option } = Select;

const OrdersDetail = () => {
    const [data, setData] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const params = useParams();

    useEffect(() => {
        const getOrdersId = async () => {
            setLoading(true);
            await API.getOrderId(params.id)
                .then((res) => {
                    setData(res.data);
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
            await API.getStatuses()
                .then((res) => {
                    setStatuses(res.data);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getOrdersId();
    }, []);

    const putchStatus = () => {
        API.patchOrderStatus(status, params.id)
            .then((res) => {
                message.success("Статус изменен");
            })
            .catch((error) => message.error("Статус не изменен"));
    };

    const handleStatus = (value) => {
        setStatus(value);
    };

    return (
        <div>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 100,
                    }}
                >
                    <Spin />
                </div>
            ) : data ? (
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                    <Space align="center">
                        <Title level={4}>Дата создания:</Title>
                        <Title level={4}>{data.created}</Title>
                    </Space>
                    <Space align="center">
                        <Title level={4}>Cпособ оплаты:</Title>
                        <Title level={4}>{data.payment_type}</Title>
                    </Space>
                    <Space align="center">
                        <Title level={4}>Статус заказа:</Title>
                        <Title level={4}>{data.orderStatus}</Title>
                    </Space>
                    <Space align="center">
                        <Title level={4}>Тип доставки:</Title>
                        <Title level={4}>{data.delivery_type}</Title>
                    </Space>
                    <Space align="center">
                        <Title level={4}>Зарегистрирован:</Title>
                        <Title level={4}>{data.registered}</Title>
                    </Space>
                    <Space align="center">
                        <Title level={4}>Цена всех заказов:</Title>
                        <Title level={4}>{data.total_price} руб</Title>
                    </Space>
                    <Space align="center">
                        <Title level={4}>Кол-во всех заказов:</Title>
                        <Title level={4}>{data.total_count}</Title>
                    </Space>
                    <Select
                        style={{ width: 250 }}
                        defaultValue={"Статусы"}
                        onChange={handleStatus}
                    >
                        {statuses.map((item, index) => (
                            <Option value={item} key={index}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                    <Button
                        type="primary"
                        style={{ background: "#55CD61" }}
                        onClick={putchStatus}
                    >
                        Изменить статус
                    </Button>
                </Space>
            ) : (
                ""
            )}
        </div>
    );
};

export default OrdersDetail;
