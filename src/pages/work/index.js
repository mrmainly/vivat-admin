import React, { useEffect, useState } from "react";
import { Button, Space, Select, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";
import API from "../../api";
import usePagination from "../../hooks/usePagination";

const { Option } = Select;

const Work = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");

    const navigate = useNavigate();
    const { totalPage, currentPage, handlePage, getTotalPage } = usePagination();

    useEffect(() => {
        const getWork = async () => {
            setLoading(true);
            await API.getWork(city, currentPage)
                .then((res) => {
                    setData(res.data.results);
                    getTotalPage(res.data.count);
                })
                .catch((error) => console.log(error));
            await API.getCity()
                .then((res) => {
                    setCities(res.data);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getWork();
    }, [city, currentPage]);

    const handleSelect = (value) => {
        setCity(value);
    };

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Button type="primary" style={{ background: "#55CD61" }} onClick={() => navigate(ROUTES.WORK_CREATE)}>
                    + Создать новые вакансии
                </Button>
                <Select style={{ width: 200 }} defaultValue={"Города"} onChange={handleSelect}>
                    {cities.map((item, index) => (
                        <Option value={item.name} key={index}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Space>
            <BlogStocksTable data={data} loading={loading} routes={ROUTES.WORK_DETAIL} />
            <Pagination current={currentPage} total={totalPage} pageSize={10} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default Work;
