import React, { useState, useEffect } from "react";
import { Button, Space, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";
import API from "../../api";
import usePagination from "../../hooks/usePagination";

const Stocks = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { totalPage, currentPage, handlePage, getTotalPage } = usePagination();

    useEffect(() => {
        const getPromotion = async () => {
            setLoading(true);
            await API.getPromotion(currentPage)
                .then((res) => {
                    setData(res.data.results);
                    getTotalPage(res.data.count);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getPromotion();
    }, [currentPage]);

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Button type="primary" style={{ background: "#55CD61" }} onClick={() => navigate(ROUTES.STOCK_CREATE)}>
                    + Создать новые акции
                </Button>
            </Space>
            <BlogStocksTable data={data} loading={loading} routes={ROUTES.STOCK_DETAIL} />
            <Pagination current={currentPage} total={totalPage} pageSize={20} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default Stocks;
