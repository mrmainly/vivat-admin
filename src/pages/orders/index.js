import React, { useEffect, useState } from "react";
import { Input, Space, Select } from "antd";

import { OrdersTable } from "../../components";
import API from "../../api";

const { Search } = Input;
const { Option } = Select;

const Orders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const getAllOrders = async () => {
            setLoading(true);
            await API.getAllOrders(status)
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getAllOrders();
    }, [status]);

    const Statuses = [
        {
            label: "Новый",
            value: "New",
        },
        {
            label: "Зарегистрирован",
            value: "REGISTERED",
        },
        {
            label: "Зарезервирован частично",
            value: "RESERVEDPARTIALLY",
        },
        {
            label: "Отменено",
            value: "CANCELLED",
        },
        {
            label: "Готов к выдаче",
            value: "READYTOPICKUP",
        },
        {
            label: "Отклонен",
            value: "REJECTED",
        },
    ];

    const handleSelect = (value) => {
        setStatus(value);
    };

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                {/* <Search
                    placeholder="input search text"
                    enterButton
                    style={{ width: 304 }}
                /> */}
                <Select
                    style={{ width: 200 }}
                    defaultValue="Статусы"
                    onChange={handleSelect}
                >
                    {Statuses.map((item, index) => (
                        <Option value={item.value} key={index}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
            </Space>
            <OrdersTable loading={loading} data={data} />
        </div>
    );
};

export default Orders;
