import { Table } from "antd";

const columns = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "Количество товаров", dataIndex: "amount", key: "amount" },
    { title: "Дата и время заказа", dataIndex: "date", key: "date" },
    { title: "Сумма", dataIndex: "price", key: "price" },
    { title: "Статус", dataIndex: "status", key: "status" },
    {
        title: "Действие",
        dataIndex: "",
        key: "x",
        render: () => <a style={{ color: "#55CD61" }}>Посмотреть</a>,
    },
];

const data = [
    {
        key: 1,
        id: 1,
        amount: "5 товара",
        date: "21.12.2021 - 19:00",
        price: "13002",
        status: "Ожидает в аптеке",
    },
    {
        key: 2,
        id: 2,
        amount: "5 товара",
        date: "21.12.2021 - 19:00",
        price: "13002",
        status: "Ожидает в аптеке",
    },
    {
        key: 3,
        id: 3,
        amount: "5 товара",
        date: "21.12.2021 - 19:00",
        price: "13002",
        status: "Ожидает в аптеке",
    },
    {
        key: 4,
        id: 4,
        amount: "5 товара",
        date: "21.12.2021 - 19:00",
        price: "13002",
        status: "Ожидает в аптеке",
    },
];

const OrdersTable = () => {
    return <Table columns={columns} dataSource={data} />;
};

export default OrdersTable;
