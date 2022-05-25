import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../routes";

const OrdersTable = ({ loading, data }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "id", dataIndex: "id", key: "id" },
        {
            title: "Количество товаров",
            dataIndex: "total_count",
            key: "total_count",
        },
        {
            title: "Дата и время заказа",
            dataIndex: "registered",
            key: "registered",
        },
        { title: "Сумма", dataIndex: "total_price", key: "total_price" },
        { title: "Статус", dataIndex: "orderStatus", key: "orderStatus" },
        {
            title: "Действие",
            dataIndex: "id",
            key: "x",
            render: (id) => (
                <Button
                    type="primary"
                    style={{ background: "#55CD61" }}
                    onClick={() => navigate(`${ROUTES.ORDERS_DETAIL}/${id}`)}
                >
                    Посмотреть
                </Button>
            ),
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
        />
    );
};

export default OrdersTable;
