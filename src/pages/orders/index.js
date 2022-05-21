import React from "react";
import { Input, Space, Select } from "antd";

import { OrdersTable } from "../../components";

const { Search } = Input;
const { Option } = Select;

const Orders = () => {
    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Search
                    placeholder="input search text"
                    enterButton
                    style={{ width: 304 }}
                />
                <Select style={{ width: 200 }} defaultValue="Home">
                    <Option value="Home">Home</Option>
                    <Option value="Company">Company</Option>
                </Select>
                <Select style={{ width: 200 }} defaultValue="Home">
                    <Option value="Home">Home</Option>
                    <Option value="Company">Company</Option>
                </Select>
            </Space>
            <OrdersTable />
        </div>
    );
};

export default Orders;
