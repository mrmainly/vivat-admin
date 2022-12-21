import React, { useEffect, useState } from "react";
import { Pagination, Select, Space, Input } from "antd";

import { UsersTable } from "../../components";
import API from "../../api";
import ROUTES from "../../routes";
import usePagination from "../../hooks/usePagination";
import { UserRoleConstant } from "../../constants";

const { Option } = Select;

const Users = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ordering, setOrdering] = useState("");
    const [roleList, setRoleList] = useState([]);
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");

    const { totalPage, currentPage, handlePage, getTotalPage } =
        usePagination();

    useEffect(() => {
        API.getRoles().then((res) => {
            setRoleList(res.data);
        });
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            await API.getUsers(
                currentPage,
                ordering,
                role,
                phone,
                fullName
            )
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
    }, [currentPage, ordering, role, phone, fullName]);

    const handleOrdering = (value) => {
        setOrdering(value);
    };

    const handleRole = (value) => {
        setRole(value);
    };

    const orderingList = [
        {
            label: "id (по возрастанию)",
            value: "id",
        },
        {
            label: "id (по убыванию)",
            value: "-id",
        },
    ];
    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Select
                    style={{ width: 200 }}
                    defaultValue="Сортировка"
                    onChange={handleOrdering}
                >
                    {orderingList.map((item, index) => (
                        <Option value={item.value} key={index}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
                <Select
                    style={{ width: 200 }}
                    defaultValue="Роли"
                    onChange={handleRole}
                >
                    {roleList?.map((item, index) => (
                        <Option value={item} key={index}>
                            {UserRoleConstant[item]}
                        </Option>
                    ))}
                </Select>
                <Input.Search
                    enterButton
                    placeholder="номер телефона"
                    onSearch={(value) => {
                        setPhone(value);
                    }}
                />
                <Input.Search
                    enterButton
                    placeholder="ФИО"
                    onSearch={(value) => {
                        setFullName(value);
                    }}
                />
            </Space>
            <UsersTable
                loading={loading}
                data={data}
                routes={ROUTES.USERS_DETAIL}
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

export default Users;
