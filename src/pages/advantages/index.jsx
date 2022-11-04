import { useEffect, useState } from "react";
import { Pagination, Button, Space, Select } from "antd";
import { useNavigate } from "react-router-dom";

import API from "../../api";
import usePagination from "../../hooks/usePagination";
import AdvantagesTable from "./compoents/table/AdvantagesTable";
import ROUTES from "../../routes";

const { Option } = Select;

const Advantages = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [deportamentList, setDeportamentList] = useState([]);
    const [department, setDepartment] = useState("");

    const { totalPage, currentPage, handlePage, getTotalPage } = usePagination();
    const navigate = useNavigate();

    useEffect(() => {
        API.getDeportaments().then((res) => {
            setDeportamentList(res.data);
        });
    }, []);

    useEffect(() => {
        const getAdvantages = async () => {
            setLoading(true);
            await API.getAdvantages(currentPage, department).then((res) => {
                setData(res.data.results);
                getTotalPage(res.data.count);
            });
            setLoading(false);
        };
        getAdvantages();
    }, [currentPage, department]);

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Button style={{ background: "#55CD61", color: "white" }} onClick={() => navigate(ROUTES.ADVANTAGES_CREATE)}>
                    Создать
                </Button>
                <Select defaultValue={"47CC211D-EECA-4D38-87A1-E255059DD16F"} style={{ width: 200 }} onChange={(value) => setDepartment(value)}>
                    {deportamentList?.map((item) => (
                        <Option value={item.department.id}>{item.department.name}</Option>
                    ))}
                </Select>
            </Space>
            <AdvantagesTable data={data} loading={loading} deportamentList={deportamentList} />
            <Pagination current={currentPage} total={totalPage} pageSize={20} style={{ marginTop: 20 }} onChange={handlePage} showSizeChanger={false} />
        </div>
    );
};

export default Advantages;
