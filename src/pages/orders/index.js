import React, { useEffect, useState } from "react";
import { Input, Space, Select } from "antd";

import { OrdersTable } from "../../components";
import API from "../../api";
import { translationStatus } from "../../interpreter";

const { Search } = Input;
const { Option } = Select;

const Orders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState("");

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
            await API.getAllOrders(status)
                .then((res) => {
                    setData(res.data);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getAllOrders();
    }, [status]);

    // const Statuses = [
    //     {
    //         label: "Новый",
    //         value: "New",
    //     },
    //     {
    //         label: "Зарегистрирован",
    //         value: "REGISTERED",
    //     },
    //     {
    //         label: "Зарезервирован частично",
    //         value: "RESERVEDPARTIALLY",
    //     },
    //     {
    //         label: "Отменено",
    //         value: "CANCELLED",
    //     },
    //     {
    //         label: "Готов к выдаче",
    //         value: "READYTOPICKUP",
    //     },
    //     {
    //         label: "Отклонен",
    //         value: "REJECTED",
    //     },
    // ];

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
                    {statuses.length
                        ? statuses.map((item, index) => (
                              <Option value={item} key={index}>
                                  {translationStatus(item)}
                              </Option>
                          ))
                        : ""}
                </Select>
            </Space>
            <OrdersTable loading={loading} data={data} />
        </div>
    );
};

export default Orders;
