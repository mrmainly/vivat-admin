import { Table, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import ROUTES from "../../../../routes";

const { Text } = Typography;

const CatalogTable = ({ loading, data }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "id", dataIndex: "id", key: "id" },
        {
            title: "Название тематической подборки",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Кол-во товаров",
            dataIndex: "goods",
            key: "goods",
            render: (goods) => <Text>{goods.length} шт</Text>,
        },
        {
            title: "Статус",
            dataIndex: "is_active",
            key: "is_active",
            render: (is_active) => <div style={{ display: "flex" }}>{is_active ? <CheckCircleOutlined style={{ color: "#55CD61" }} /> : <CloseCircleOutlined style={{ color: "red" }} />}</div>,
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
                        navigate(ROUTES.CATALOG_DETAIL, {
                            state: {
                                data: record,
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

export default CatalogTable;
