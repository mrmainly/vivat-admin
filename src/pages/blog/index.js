import React, { useState, useEffect } from "react";
import { Button, Space, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";
import API from "../../api";
import usePagination from "../../hooks/usePagination";

const Blog = () => {
    const [data, setData] = useState([]);
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [ordering, setOrdering] = useState("");

    const { totalPage, currentPage, handlePage, getTotalPage } =
        usePagination();

    const navigate = useNavigate();

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

    // const orderingList = [
    //     {
    //         label: "id (по возрастанию)",
    //         value: "id",
    //     },
    //     {
    //         label: "id (по убыванию)",
    //         value: "-id",
    //     },

    //     {
    //         label: "созданные не давно",
    //         value: "created",
    //     },
    //     {
    //         label: "созданные давно",
    //         value: "-created",
    //     },
    //     {
    //         label: "популярные за все время",
    //         value: "popularity_all_time",
    //     },
    //     {
    //         label: "популярные",
    //         value: "popularity",
    //     },
    // ];

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
            </Space>
            <BlogStocksTable
                data={data}
                loading={loading}
                routes={ROUTES.BLOG_DETAIL}
            />
            <Pagination
                current={currentPage}
                total={totalPage}
                pageSize={20}
                style={{ marginTop: 20 }}
                onChange={handlePage}
                showSizeChanger={false}
            />
        </div>
    );
};

export default Blog;
