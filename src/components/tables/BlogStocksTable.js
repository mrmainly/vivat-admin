import { Table } from "antd";

const columns = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "Название", dataIndex: "name", key: "name" },
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
        name: "5 товара",
    },
    {
        key: 2,
        id: 2,
        name: "5 товара",
    },
    {
        key: 3,
        id: 3,
        name: "5 товара",
    },
    {
        key: 4,
        id: 4,
        name: "5 товара",
    },
];

const BlogTable = () => {
    return <Table columns={columns} dataSource={data} />;
};

export default BlogTable;
