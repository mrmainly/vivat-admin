import React from "react";
import { Button, Space, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";

const { Search } = Input;
const { Option } = Select;

const City = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Button
                    type="primary"
                    style={{ background: "#55CD61" }}
                    onClick={() => navigate(ROUTES.CITY_CREATE)}
                >
                    + Создать новый город
                </Button>
            </Space>
            <BlogStocksTable />
        </div>
    );
};

export default City;
