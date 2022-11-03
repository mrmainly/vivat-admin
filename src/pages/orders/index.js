import React, { useEffect, useState } from "react";
import { Space, Select, Pagination, Input } from "antd";

import { OrdersTable } from "../../components";
import API from "../../api";
import { translationStatus } from "../../interpreter";
import usePagination from "../../hooks/usePagination";

const { Option } = Select;

const Orders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState("");
    const [paymantAmountMin, setPaymantAmountMin] = useState("");
    const [paymantAmountMax, setPaymantAmountMax] = useState("");
    const [ordering, setOrdering] = useState("");

    const { totalPage, currentPage, handlePage, getTotalPage } = usePagination();

    useEffect(() => {
        API.getStatuses()
            .then((res) => {
                setStatuses(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        const getAllOrders = async () => {
            setLoading(true);
            await API.getAllOrders(status, currentPage, ordering, paymantAmountMin, paymantAmountMax)
                .then((res) => {
                    setData(res.data.results);
                    getTotalPage(res.data.count);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getAllOrders();
    }, [status, currentPage, ordering, paymantAmountMin, paymantAmountMax]);

    const handleSelect = (value) => {
        setStatus(value);
    };

    const handleOrdering = (value) => {
        setOrdering(value);
    };

    const orderingList = [
        {
            label: "id (по возрастанию)",
            value: "id",
        },
        {
            label: "id (по убыванию)",
            value: "-id",
        },
        {
            label: "цена заказа (по возрастанию)",
            value: "paymentAmount",
        },
        {
            label: "цена заказа (по убыванию)",
            value: "-paymentAmount",
        },
        {
            label: "дата заказа (по возрастанию)",
            value: "date",
        },
        {
            label: "дата заказа (по убыванию)",
            value: "-date",
        },
    ];

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Select style={{ width: 200 }} defaultValue="Статусы" onChange={handleSelect}>
                    {statuses.length > 0 &&
                        statuses.map((item, index) => (
                            <Option value={item} key={index}>
                                {translationStatus(item)}
                            </Option>
                        ))}
                </Select>
                <Select style={{ width: 200 }} defaultValue="Сортировка" onChange={handleOrdering}>
                    {orderingList.map((item, index) => (
                        <Option value={item.value} key={index}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
                <Space>
                    <Input.Search enterButton onSearch={(value) => setPaymantAmountMin(value)} placeholder="Цена заказа мин" />
                    <div style={{ color: "gray" }}>-</div>
                    <Input.Search enterButton onSearch={(value) => setPaymantAmountMax(value)} placeholder="Цена заказа макс" />
                </Space>
            </Space>
            <OrdersTable loading={loading} data={data} />
            <Pagination current={currentPage} total={totalPage} pageSize={20} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default Orders;
