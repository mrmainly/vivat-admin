import { useEffect, useState } from "react";
import { Pagination, Select, Space } from "antd";

import ProductTable from "./components/table/ProductTable";
import API from "../../api";
import usePagination from "../../hooks/usePagination";

const { Option } = Select;

const ProductPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [emptyStatus, setEmptyStatus] = useState("");

    const { totalPage, currentPage, handlePage, getTotalPage } = usePagination();

    useEffect(() => {
        const getGoodsData = async () => {
            setLoading(true);
            await API.getGoodsEmpty(currentPage, emptyStatus)
                .then((res) => {
                    setData(res.data.results);
                    getTotalPage(res.data.count);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getGoodsData();
    }, [currentPage, emptyStatus]);

    const handleEmptyStatus = (value) => {
        setEmptyStatus(value);
    };

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Select style={{ width: 200 }} defaultValue="" onChange={handleEmptyStatus}>
                    <Option value="">Все товары</Option>
                    <Option value="false">Товары с фотографией</Option>
                    <Option value="true">Товары без фотографий</Option>
                </Select>
            </Space>
            <ProductTable data={data} loading={loading} />
            <Pagination current={currentPage} total={totalPage} pageSize={20} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default ProductPage;
