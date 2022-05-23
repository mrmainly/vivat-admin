import React, { useEffect, useState } from "react";
import { Input, Space, Select } from "antd";

import { OrdersTable } from "../../components";
import API from "../../api";

const { Search } = Input;
const { Option } = Select;

const Orders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllOrders = async () => {
            setLoading(true);
            await API.getAllOrders()
                .then((res) => {
                    setData(res.data);
                    console.log(res);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getAllOrders();
    }, []);
    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Search
                    placeholder="input search text"
                    enterButton
                    style={{ width: 304 }}
                />
                {/* <Select style={{ width: 200 }} defaultValue="Home">
                    <Option value="Home">Home</Option>
                    <Option value="Company">Company</Option>
                </Select> */}
            </Space>
            <OrdersTable loading={loading} data={data} />
        </div>
    );
};

export default Orders;
