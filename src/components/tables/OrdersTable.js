import { Table, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../routes";
import { translationDelivery, translationStatus } from "../../interpreter";
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
        },
        {
            title: "Дата и время заказа",
            dataIndex: "date",
            key: "date",
            render: (date) => (
                <Text>{moment(date).format("DD-MM-YYYY hhч:mmм:ssс")}</Text>
            ),
        },
        { title: "Сумма", dataIndex: "total_price", key: "total_price" },
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
