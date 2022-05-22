import { Table, Button } from "antd";

const columns = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "Название", dataIndex: "name", key: "name" },
    {
        title: "Действие",
        dataIndex: "",
        key: "x",
        render: () => (
            <Button style={{ color: "#55CD61", borderColor: "#55CD61" }}>
                Редактирование
            </Button>
        ),
    },
];

const BlogTable = ({ data, loading }) => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
        />
    );
};

export default BlogTable;
