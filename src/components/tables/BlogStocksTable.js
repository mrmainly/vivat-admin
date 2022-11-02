import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

const BlogTable = ({ data, loading, routes }) => {
    const navigate = useNavigate();

    const columns = [
        { title: "id", dataIndex: "id", key: "id" },
        { title: "Название", dataIndex: "name", key: "name" },
        {
            title: "Действие",
            dataIndex: "id",
            key: "x",
            render: (id) => (
                <Button style={{ color: "#55CD61", borderColor: "#55CD61" }} onClick={() => navigate(`${routes}/${id}`)}>
                    Редактирование
                </Button>
            ),
        },
    ];
    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={false} />;
};

export default BlogTable;
