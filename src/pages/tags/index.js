import React, { useEffect, useState } from "react";
import { Button, Space, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";
import API from "../../api";
import usePagination from "../../hooks/usePagination";

const Tags = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { totalPage, currentPage, handlePage, getTotalPage } = usePagination();

    useEffect(() => {
        const getTags = async () => {
            setLoading(true);
            await API.getTopic()
                .then((res) => {
                    setData(res.data.results);
                    getTotalPage(res.data.count);
                    console.log(res);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getTags();
    }, [currentPage]);
    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Button type="primary" style={{ background: "#55CD61" }} onClick={() => navigate(ROUTES.TAGS_CREATE)}>
                    + Создать новый тег
                </Button>
            </Space>
            <BlogStocksTable data={data} loading={loading} routes={ROUTES.TAG_DETAIL} />
            <Pagination current={currentPage} total={totalPage} pageSize={20} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default Tags;
