import { useState } from "react";
import { Button, Upload, message, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import API from "../../../api";
import ROUTES from "../../../routes";

const { Title } = Typography;

const uploadButton = (
    <div>
        <PlusOutlined />
        <div
            style={{
                marginTop: 8,
            }}
        >
            Upload
        </div>
    </div>
);

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ProductDetail = () => {
    const [img, setImg] = useState("");

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const { data } = state;

    const props = {
        beforeUpload: (file) => {
            getBase64(file).then((item) => {
                setImg(item);
            });
            return false;
        },
    };

    const addedPhoto = () => {
        if (data.good_esphoto) {
            API.patchGoodsEmpty(img, params.id)
                .then((res) => {
                    navigate(ROUTES.PRODUCTS);
                    message.success("Фотография изменена");
                })
                .catch((error) => {
                    message.error("Товар не найден");
                });
        } else {
            API.postGoodsEmpty(img, params.id)
                .then((res) => {
                    navigate(ROUTES.PRODUCTS);
                    message.success("Фотография добавлена");
                })
                .catch((error) => {
                    message.error("Товар не найден");
                });
        }
    };

    return (
        <div>
            <Title level={4} style={{ marginBottom: 20 }}>
                {data?.name}
            </Title>
            <Upload listType="picture-card" maxCount={1} {...props}>
                {uploadButton}
            </Upload>
            <Space style={{ marginTop: 20 }}>
                <Button onClick={addedPhoto} disabled={img === "" ? true : false}>
                    Сохранить
                </Button>
                <Button onClick={() => navigate(-1)}>Вернуться назад</Button>
            </Space>
        </div>
    );
};

export default ProductDetail;
