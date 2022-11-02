import { useEffect, useState } from "react";
import { Pagination } from "antd";

import ProductTable from "./components/table/ProductTable";
import API from "../../api";
import usePagination from "../../hooks/usePagination";

const ProductPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { totalPage, currentPage, handlePage, getTotalPage } = usePagination();

    useEffect(() => {
        const getGoodsData = async () => {
            setLoading(true);
            await API.getGoodsEmpty(currentPage)
                .then((res) => {
                    setData(res.data.results);
                    getTotalPage(res.data.count);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getGoodsData();
    }, [currentPage]);

    return (
        <div>
            <ProductTable data={data} loading={loading} />
            <Pagination current={currentPage} total={totalPage} pageSize={30} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default ProductPage;
