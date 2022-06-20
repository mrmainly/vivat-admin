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
import { OrderDetailTable } from "../../components";

const { Text, Title } = Typography;
const { Option } = Select;

const OrdersDetail = () => {
    const [data, setData] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState("");
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    const params = useParams();

    useEffect(() => {
        const getOrdersId = async () => {
            setLoading(true);
            await API.getOrderId(params.id)
                .then((res) => {
                    setData(res.data);
                    if (res.data.items) {
                        const newTableData = res.data.items.map((item) => {
                            return {
                                id: item.id,
                                name: item.GoodsCode.name,
                                price: item.price,
                                count: item.qnt,
                                total_price: item.price * item.qnt,
                            };
                        });
                        setTableData(newTableData);
                    }
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

    const cancelStatus = () => {
        API.cancelOrderStatus(data.id)
            .then((res) => {
                message.success("Статус отменен");
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
                        <Text style={{ color: "#a6a6a6" }}>Статусы:</Text>
                        <Select
                            style={{ width: 250 }}
                            defaultValue={data.orderStatus}
                            onChange={handleStatus}
                        >
                            {statuses.map((item, index) => (
                                <Option value={item} key={index}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    </Space>
                    <Space align="center">
                        <Text style={{ color: "#a6a6a6" }}>
                            Номер заказчика:
                        </Text>
                        <Text>{data?.customer?.phone}</Text>
                    </Space>
                    <Space align="center">
                        <Text style={{ color: "#a6a6a6" }}>Дата заказа:</Text>
                        <Text>{data.created}</Text>
                    </Space>
                    <Space align="center">
                        <Text style={{ color: "#a6a6a6" }}>Сумма:</Text>
                        <Text>{data.total_price} руб</Text>
                    </Space>
                    <Space align="center" direction="vertical">
                        <Text style={{ color: "#a6a6a6" }}>
                            Список товаров:
                        </Text>
                    </Space>
                    <OrderDetailTable data={tableData} />
                    <Space>
                        <Button
                            type="primary"
                            style={{ background: "#55CD61" }}
                            onClick={putchStatus}
                        >
                            Изменить статус
                        </Button>
                        <Button
                            type="primary"
                            style={{ background: "#FE5860" }}
                            onClick={cancelStatus}
                        >
                            Отменить статус
                        </Button>
                    </Space>
                </Space>
            ) : (
                ""
            )}
        </div>
    );
};

export default OrdersDetail;
