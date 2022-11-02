import React, { useEffect, useState } from "react";
import { Pagination } from "antd";

import { UsersTable } from "../../components";
import API from "../../api";
import ROUTES from "../../routes";
import usePagination from "../../hooks/usePagination";

const Users = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { totalPage, currentPage, handlePage, getTotalPage } = usePagination();

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            await API.getUsers(currentPage)
                .then((res) => {
                    setData(res.data.results);
                    getTotalPage(res.data.count);
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(false);
        };
        getUsers();
    }, [currentPage]);
    return (
        <div>
            <UsersTable loading={loading} data={data} routes={ROUTES.USERS_DETAIL} />
            <Pagination current={currentPage} total={totalPage} pageSize={20} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default Users;
