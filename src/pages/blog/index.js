import React, { useState, useEffect } from "react";
import { Button, Space, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";
import API from "../../api";

const { Search } = Input;
const { Option } = Select;

const Blog = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getBlog = async () => {
            setLoading(true);
            await API.getBlog()
                .then((res) => {
                    setData(res.data.results);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getBlog();
    }, []);

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Button
                    type="primary"
                    style={{ background: "#55CD61" }}
                    onClick={() => navigate(ROUTES.BLOG_CREATE)}
                >
                    + Создать новый блог
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
            <BlogStocksTable data={data} loading={loading} />
        </div>
    );
};

export default Blog;
