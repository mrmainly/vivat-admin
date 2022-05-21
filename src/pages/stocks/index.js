import React from "react";
import { Button, Space, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";

const { Search } = Input;
const { Option } = Select;

const Stocks = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Button
                    type="primary"
                    style={{ background: "#55CD61" }}
                    onClick={() => navigate(ROUTES.STOCK_CREATE)}
                >
                    + Создать новые акции
                </Button>
                <Search
                    placeholder="input search text"
                    enterButton
                    style={{ width: 304 }}
                />
                <Select style={{ width: 200 }} defaultValue="Home">
                    <Option value="Home">Home</Option>
                    <Option value="Company">Company</Option>
                </Select>
            </Space>
            <BlogStocksTable />
        </div>
    );
};

export default Stocks;
