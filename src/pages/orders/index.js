import React, { useEffect, useState } from "react";
import { Space, Select, Pagination } from "antd";

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
            await API.getAllOrders(status, currentPage)
                .then((res) => {
                    setData(res.data.results);
                    getTotalPage(res.data.count);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getAllOrders();
    }, [status, currentPage]);

    const handleSelect = (value) => {
        setStatus(value);
    };

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
            </Space>
            <OrdersTable loading={loading} data={data} />
            <Pagination current={currentPage} total={totalPage} pageSize={20} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default Orders;
