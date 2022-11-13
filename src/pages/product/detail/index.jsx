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
    const [slice, setSlice] = useState(22);

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const { data } = state;

    const props = {
        beforeUpload: (file) => {
            if (file.type === "image/jpeg") setSlice(23);
            getBase64(file).then((item) => {
                setImg(item);
            });
            return false;
        },
    };
    //22
    const addedPhoto = () => {
        if (data.good_esphoto) {
            API.patchGoodsEmpty(img.slice(slice), params.id)
                .then((res) => {
                    navigate(ROUTES.PRODUCTS);
                    message.success("Фотография изменена");
                })
                .catch((error) => {
                    message.error("Товар не найден");
                });
        } else {
            API.postGoodsEmpty(img.slice(slice), params.id)
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
            <Upload listType="picture-card" maxCount={1} {...props} accept="image/*">
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
