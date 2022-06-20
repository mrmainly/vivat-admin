import React from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../routes";

const OrderDetailTable = ({ data, routes }) => {
    const navigate = useNavigate();
    console.log("data", data);

    const columns = [
        { title: "id", dataIndex: "id", key: "id" },
        { title: "Наименование", dataIndex: "name", key: "name" },
        { title: "Цена", dataIndex: "price", key: "price" },
        { title: "Количество", dataIndex: "count", key: "count" },
        { title: "Сумма", dataIndex: "total_price", key: "total_price" },
        // {
        //     title: "Действие",
        //     dataIndex: "id",
        //     key: "x",
        //     render: (id) => (
        //         <Button
        //             style={{ color: "#55CD61", borderColor: "#55CD61" }}
        //             onClick={() => navigate(`${routes}/${id}`)}
        //         >
        //             Редактирование
        //         </Button>
        //     ),
        // },
    ];
    return <Table columns={columns} rowKey="id" dataSource={data} />;
};

export default OrderDetailTable;
