import { Table } from "antd";

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
    { title: "Статус", dataIndex: "delivery_type", key: "delivery_type" },
    {
        title: "Действие",
        dataIndex: "",
        key: "x",
        render: () => <a style={{ color: "#55CD61" }}>Посмотреть</a>,
    },
];

const OrdersTable = ({ loading, data }) => {
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
