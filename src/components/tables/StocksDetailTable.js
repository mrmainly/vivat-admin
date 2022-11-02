import React from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../routes";

const StocksDetailTable = ({ data, loading, deleteItem }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "id", dataIndex: "id", key: "id" },
        { title: "Наименование", dataIndex: "name", key: "name" },
        { title: "Производитель", dataIndex: "producer", key: "producer" },
        { title: "Цена", dataIndex: "price", key: "price" },
        { title: "Количество", dataIndex: "count", key: "count" },
        {
            title: "Действие",
            dataIndex: "id",
            key: "x",
            render: (id) => (
                <Button style={{ color: "#FE5860", borderColor: "#FE5860" }} onClick={() => deleteItem(id)}>
                    Удаление
                </Button>
            ),
        },
    ];
    return <Table columns={columns} rowKey="id" dataSource={data} loading={loading} scroll={{ x: true }} />;
};

export default StocksDetailTable;
