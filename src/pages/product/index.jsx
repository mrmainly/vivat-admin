import { useEffect, useState } from "react";
import { Pagination } from "antd";

import ProductTable from "./components/table/ProductTable";
import API from "../../api";

const ProductPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    useEffect(() => {
        const getGoodsData = async () => {
            setLoading(true);
            await API.getGoodsEmpty(currentPage)
                .then((res) => {
                    setData(res.data.results);
                    setTotalPage(res.data.count);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getGoodsData();
    }, [currentPage]);

    const onChange = (page) => {
        setCurrentPage(page);
        console.log(page);
    };
    return (
        <div>
            <ProductTable data={data} loading={loading} />
            <Pagination defaultCurrent={1} total={totalPage} pageSize={20} style={{ marginTop: 20 }} onChange={onChange} showSizeChanger={false} />
        </div>
    );
};

export default ProductPage;
