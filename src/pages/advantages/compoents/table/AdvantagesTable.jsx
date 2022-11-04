import { Table, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../../../routes";

const { Text } = Typography;

const AdvantagesTable = ({ loading, data, deportamentList }) => {
    const navigate = useNavigate();

    //

    const columns = [
        { title: "id", dataIndex: "id", key: "id" },
        {
            title: "Адрес аптеки",
            dataIndex: "department",
            key: "department",
            render: (department) => (
                <Text>
                    {deportamentList?.map((item) => {
                        if (department === item.department.id) {
                            return item.department.name;
                        }
                        return "";
                    })}
                </Text>
            ),
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
                        navigate(`${ROUTES.ADVANTAGES_DETAIL}`, {
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

export default AdvantagesTable;
