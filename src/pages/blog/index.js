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
    const [ordering, setOrdering] = useState("");

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
            await API.getBlog(topic, "topic", currentPage, ordering)
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

    const handleOrdering = (value) => {
        setOrdering(value);
    };

    const orderingList = [
        {
            label: "id (по возрастанию)",
            value: "id",
        },
        {
            label: "id (по убыванию)",
            value: "-id",
        },

        {
            label: "созданные не давно",
            value: "created",
        },
        {
            label: "созданные давно",
            value: "-created",
        },
        {
            label: "популярные за все время",
            value: "popularity_all_time",
        },
        {
            label: "популярные",
            value: "popularity",
        },
    ];

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
                <Select style={{ width: 200 }} defaultValue={"Сортировка"} onChange={handleOrdering}>
                    {orderingList.map((item, index) => (
                        <Option value={item.value} key={index}>
                            {item.label}
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
