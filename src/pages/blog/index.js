import React, { useState, useEffect } from "react";
import { Button, Space, Select, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";
import API from "../../api";
import usePagination from "../../hooks/usePagination";

const { Option } = Select;

const Blog = () => {
    const [data, setData] = useState([]);
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);

    const { totalPage, currentPage, handlePage, getTotalPage } = usePagination();

    const navigate = useNavigate();
    useEffect(() => {
        API.getTopic()
            .then((res) => {
                setTopics(res.data.results);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        const getBlog = async () => {
            setLoading(true);
            await API.getBlog(topic, "topic", currentPage)
                .then((res) => {
                    setData(res.data.results);
                    getTotalPage(res.data.count);
                })
                .catch((error) => console.log(error));

            setLoading(false);
        };
        getBlog();
    }, [topic, currentPage]);

    const handleSelect = (value) => {
        setTopic(value);
    };

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Button type="primary" style={{ background: "#55CD61" }} onClick={() => navigate(ROUTES.BLOG_CREATE)}>
                    + Создать новый блог
                </Button>
                <Button type="primary" style={{ background: "#55CD61" }} onClick={() => navigate(ROUTES.TAGS)}>
                    Создать новую тему
                </Button>
                <Select style={{ width: 200 }} defaultValue={"Теги"} onChange={handleSelect}>
                    {topics.map((item, index) => (
                        <Option value={item.name} key={index}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Space>
            <BlogStocksTable data={data} loading={loading} routes={ROUTES.BLOG_DETAIL} />
            <Pagination current={currentPage} total={totalPage} pageSize={20} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default Blog;
