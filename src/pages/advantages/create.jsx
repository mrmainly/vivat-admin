import { useEffect, useState } from "react";
import { Form, Select, Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";

const { Option } = Select;

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

const AdvantageCreat = () => {
    const [deportamentList, setDeportamentList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        API.getDeportaments().then((res) => {
            setDeportamentList(res.data);
        });
    }, []);

    const props = {
        beforeUpload: (file) => {
            const isPNG = file.type === "image/png" || file.type === "image/jpeg";

            if (!isPNG) {
                message.error(`${file.name} не является PNG/JPEG файлом`);
                return isPNG || Upload.LIST_IGNORE;
            }

            return false;
        },
    };

    const onFinish = (data) => {
        const formData = new FormData();
        formData.append("image_1", data?.image_1.file);
        formData.append("image_2", data?.image_2.file);
        formData.append("department", data.department);
        API.postAdvantage(formData)
            .then((res) => {
                message.success("Наши преимущества созданы");
                navigate(ROUTES.ADVANTAGES);
            })
            .catch(() => {
                message.error('Нельзя создавать несколько "наши преимущества" в одной аптеке ');
            });
    };

    return (
        <Form layout="vertical" style={{ width: 300 }} onFinish={onFinish}>
            <Form.Item label="Выбор аптеки" name="department">
                <Select defaultValue={"аптеки"}>
                    {deportamentList?.map((item) => (
                        <Option value={item.department.id}>{item.department.name}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Первый баннер" name="image_1">
                <Upload {...props} listType="picture-card" multiple={false} maxCount={1} accept=".jpg,.jpeg,.png">
                    {uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item label="Второй баннер" name="image_2">
                <Upload {...props} listType="picture-card" multiple={false} maxCount={1} accept=".jpg,.jpeg,.png">
                    {uploadButton}
                </Upload>
            </Form.Item>

            <Button htmlType="submit">Сохранить</Button>
        </Form>
    );
};

export default AdvantageCreat;
