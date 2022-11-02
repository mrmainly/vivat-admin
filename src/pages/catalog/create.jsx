import { useState } from "react";
import { Button, Form, Input, Switch, Space, message } from "antd";
import { useNavigate } from "react-router-dom";

import API from "../../api";
import FormListGoods from "./components/parts-form/FormListGoods";
import ROUTES from "../../routes";

const CatalogCreate = () => {
    const [options, setOptions] = useState([]);

    const navigate = useNavigate();

    const handleAutoComplite = (searchText) => {
        API.getAutoComplite(searchText)
            .then((res) => {
                const newData = res.data.map((item) => {
                    return { value: item.name, id: item.id };
                });
                setOptions(newData);
            })
            .catch((error) => console.log(error));
    };

    const onFinish = (data) => {
        // if (typeof data.goods[0] === "object" || data.goods?.length === 0) {
        //     message.error("Вы не добавили товары");
        // } else {
        //     API.postCatalog(data)
        //         .then((res) => {
        //             navigate(ROUTES.CATALOG);
        //             message.success("Тематическая подборка создана");
        //         })
        //         .catch((error) => message.error("При создании тематической подборки что то пошло не так :("));
        // }
        console.log(data);
    };

    return (
        <Form layout="vertical" style={{ display: "flex", flexDirection: "column", width: 500 }} onFinish={onFinish}>
            <Form.Item
                name="title"
                label="Название тематической подборки"
                rules={[
                    {
                        required: true,
                        message: "Заполните название тематической подборки",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <div>
                <div style={{ marginBottom: 15 }}>Добавление товаров</div>
                <FormListGoods options={options} handleAutoComplite={handleAutoComplite} />
            </div>
            <Space align="baseline" style={{ marginTop: "-5px", marginBottom: 15 }}>
                <Form.Item name="is_active" valuePropName="checked" noStyle initialValue={true}>
                    <Switch checkedChildren="Да" unCheckedChildren="Нет" />
                </Form.Item>
                <span>Активность тематической подборки</span>
            </Space>
            <Button style={{ width: "max-content" }} htmlType="submit">
                Сохранить
            </Button>
        </Form>
    );
};

export default CatalogCreate;
