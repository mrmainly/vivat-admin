import React, { useState, useEffect } from "react";
import { Button, Space, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";
import API from "../../api";

const { Search } = Input;
const { Option } = Select;

const Stocks = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getPromotion = async () => {
            setLoading(true);
            await API.getPromotion()
                .then((res) => {
                    setData(res.data.results);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getPromotion();
    }, []);

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
            </Space>
            <BlogStocksTable
                data={data}
                loading={loading}
                routes={ROUTES.STOCK_DETAIL}
            />
        </div>
    );
};

export default Stocks;
