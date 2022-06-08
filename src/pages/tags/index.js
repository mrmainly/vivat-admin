import React, { useEffect, useState } from "react";
import { Button, Space, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";
import API from "../../api";

const { Search } = Input;
const { Option } = Select;

const Tags = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getTags = async () => {
            setLoading(true);
            await API.getTopic()
                .then((res) => {
                    setData(res.data);
                    console.log(res);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getTags();
    }, []);
    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Button
                    type="primary"
                    style={{ background: "#55CD61" }}
                    onClick={() => navigate(ROUTES.TAGS_CREATE)}
                >
                    + Создать новый тег
                </Button>
            </Space>
            <BlogStocksTable
                data={data}
                loading={loading}
                routes={ROUTES.TAG_DETAIL}
            />
        </div>
    );
};

export default Tags;
