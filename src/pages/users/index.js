import React, { useEffect, useState } from "react";

import { UsersTable } from "../../components";
import API from "../../api";
import ROUTES from "../../routes";

const Users = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            await API.getUsers()
                .then((res) => {
                    console.log(res);
                    setData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(false);
        };
        getUsers();
    }, []);
    return (
        <div>
            <UsersTable
                loading={loading}
                data={data}
                routes={ROUTES.USERS_DETAIL}
            />
        </div>
    );
};

export default Users;
