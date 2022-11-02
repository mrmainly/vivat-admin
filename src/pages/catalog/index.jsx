import { useEffect, useState } from "react";
import { Button, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

import CatalogTable from "./components/table/CatalogTable";
import API from "../../api";
import usePagination from "../../hooks/usePagination";
import ROUTES from "../../routes";

const Catalog = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { totalPage, currentPage, handlePage, getTotalPage } = usePagination();

    useEffect(() => {
        const getCatalogs = async () => {
            setLoading(true);
            await API.getCatalogs(currentPage)
                .then((res) => {
                    setData(res.data.results);
                    getTotalPage(res.data.count);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getCatalogs();
    }, [currentPage]);

    return (
        <div>
            <Button type="primary" style={{ marginBottom: 20, background: "#55CD61" }} onClick={() => navigate(ROUTES.CATALOG_CREATE)}>
                Создать тематическую подборку
            </Button>
            <CatalogTable data={data} loading={loading} />
            <Pagination current={currentPage} total={totalPage} pageSize={20} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default Catalog;
