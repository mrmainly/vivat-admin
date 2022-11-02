import { Table, Button } from "antd";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const UsersTable = ({ loading, data, routes }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "id", dataIndex: "id", key: "id" },
        {
            title: "Номер телефона",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Роль",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Имя",
            dataIndex: "first_name",
            key: "first_name",
        },
        { title: "Фамилия", dataIndex: "last_name", key: "total_price" },
        { title: "Отчество", dataIndex: "patronymic", key: "patronymic" },
        {
            title: "Электронная почта",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Активный",
            dataIndex: "is_active",
            key: "is_active",
            render: (is_active) => (
                <div style={{ display: "flex", justifyContent: "center" }}>{is_active ? <CheckCircleOutlined style={{ color: "#55CD61" }} /> : <CloseCircleOutlined style={{ color: "red" }} />}</div>
            ),
        },
        {
            title: "Действие",
            dataIndex: "id",
            key: "id",
            render: (id) => (
                <Button style={{ color: "#55CD61", borderColor: "#55CD61" }} onClick={() => navigate(`${routes}/${id}`)}>
                    Редактирование
                </Button>
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={false} scroll={{ x: true }} />;
};

export default UsersTable;
