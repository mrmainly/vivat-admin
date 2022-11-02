import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Space, Input, Switch, message } from "antd";

import FormListGoods from "./components/parts-form/FormListGoods";
import API from "../../api";
import ROUTES from "../../routes";

const CatalogDetail = () => {
    const [options, setOptions] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state;
    const { data } = state;

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

    const onFinish = (formData) => {
        if (formData.goods?.length === 0) {
            message.error("Вы не добавили товары");
        } else {
            const { goods, ...rest } = formData;

            const newGoodsList = goods?.map((item) => {
                if (typeof item === "number") {
                    return item;
                } else {
                    return item.id;
                }
            });

            API.patchCatalog({ goods: newGoodsList, ...rest }, data?.id)
                .then((res) => {
                    navigate(ROUTES.CATALOG);
                    message.success("Тематическая подборка редактирована");
                })
                .catch((error) => message.error("При редактировании тематической подборки что то пошло не так :("));
        }
    };

    return (
        <Form
            layout="vertical"
            style={{ display: "flex", flexDirection: "column", width: 500 }}
            onFinish={onFinish}
            initialValues={{
                title: data?.title,
                is_active: data?.is_active,
                goods: data?.goods.map((item) => {
                    return {
                        id: item.id,
                        value: item.name,
                    };
                }),
            }}
        >
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
                <Form.Item name="is_active" valuePropName="checked" noStyle>
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

export default CatalogDetail;
