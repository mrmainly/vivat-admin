import { Table, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../../../routes";

const { Text } = Typography;

const ProductTable = ({ loading, data }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "id", dataIndex: "id", key: "id" },
        {
            title: "Название товара",
            dataIndex: "name",
            key: "name",
            render: (total_count) => <Text>{total_count} шт</Text>,
        },
        {
            title: "Действие",
            dataIndex: "id",
            key: "x",
            render: (id, record) => (
                <Button
                    type="primary"
                    style={{ background: "#55CD61" }}
                    onClick={() =>
                        navigate(`${ROUTES.PRODUCT_DETAIL}/${id}`, {
                            state: {
                                name: record.name,
                            },
                        })
                    }
                >
                    Посмотреть
                </Button>
            ),
        },
    ];
    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={false} scroll={{ x: true }} />;
};

export default ProductTable;
