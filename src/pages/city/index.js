import React, { useEffect, useState } from "react";
import { Button, Space, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";
import API from "../../api";

const { Search } = Input;
const { Option } = Select;

const City = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getCity = async () => {
            setLoading(true);
            await API.getCity()
                .then((res) => {
                    setData(res.data);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getCity();
    }, []);
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
            <BlogStocksTable
                data={data}
                loading={loading}
                routes={ROUTES.CITY_DETAIL}
            />
        </div>
    );
};

export default City;
