import React, { useEffect, useState } from "react";
import { Button, Space, Select, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogStocksTable } from "../../components";
import ROUTES from "../../routes";
import API from "../../api";

const { Search } = Input;
const { Option } = Select;

const Work = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getWork = async () => {
            setLoading(true);
            await API.getWork(city)
                .then((res) => {
                    setData(res.data.results);
                })
                .catch((error) => console.log(error));
            await API.getCity()
                .then((res) => {
                    setCities(res.data);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getWork();
    }, [city]);

    const handleSelect = (value) => {
        setCity(value);
    };

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Button
                    type="primary"
                    style={{ background: "#55CD61" }}
                    onClick={() => navigate(ROUTES.WORK_CREATE)}
                >
                    + Создать новые вакансии
                </Button>
                <Select
                    style={{ width: 200 }}
                    defaultValue={"Города"}
                    onChange={handleSelect}
                    // value={topic}
                    // onChange={(e) => setTopic(e.target.value)}
                >
                    {cities.map((item, index) => (
                        <Option value={item.name} key={index}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Space>
            <BlogStocksTable
                data={data}
                loading={loading}
                routes={ROUTES.WORK_DETAIL}
            />
        </div>
    );
};

export default Work;
