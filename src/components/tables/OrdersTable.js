import { Table, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../routes";
import {
    translationDelivery,
    translationStatus,
    translationPayment,
} from "../../interpreter";
import moment from "moment";

const { Text, Title } = Typography;

const OrdersTable = ({ loading, data }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "id", dataIndex: "id", key: "id" },
        {
            title: "Количество товаров",
            dataIndex: "total_count",
            key: "total_count",
            render: (total_count) => <Text>{total_count} шт</Text>,
        },
        {
            title: "Дата и время заказа",
            dataIndex: "date",
            key: "date",
            render: (date) => (
                <Text>{moment(date).format("DD-MM-YYYY hhч:mmм:ssс")}</Text>
            ),
        },
        {
            title: "Сумма",
            key: "total_price",
            render: (_, record) => (
                <Text>{record.total_price + record.delivery_cost} руб</Text>
            ),
        },
        {
            title: "Статус",
            dataIndex: "orderStatus",
            key: "orderStatus",
            render: (orderStatus) => (
                <Text>{translationStatus(orderStatus)}</Text>
            ),
        },
        {
            title: "Тип доставки",
            dataIndex: "delivery_type",
            key: "delivery_type",
            render: (delivery_type) => (
                <Text>{translationDelivery(delivery_type)}</Text>
            ),
        },
        {
            title: "Статус оплаты",
            dataIndex: "transactions",
            key: "transactions",
            render: (transactions) => (
                <Text>{translationPayment(transactions[0].is_payed)}</Text>
            ),
        },
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
