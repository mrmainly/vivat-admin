import { useEffect, useState } from "react";
import { Form, Select, Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";

const { Option } = Select;

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

const AdvantageDetail = () => {
    const [deportamentList, setDeportamentList] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const { data } = state;

    useEffect(() => {
        API.getDeportaments().then((res) => {
            setDeportamentList(res.data);
        });
        console.log(data);
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

    const onFinish = (postData) => {
        const formData = new FormData();
        if (postData?.image_1 !== undefined) {
            formData.append("image_1", postData?.image_1?.file);
        }
        if (postData?.image_2 !== undefined) {
            formData.append("image_2", postData?.image_2?.file);
        }
        API.patchAdvantage(formData, data.id)
            .then((res) => {
                message.success("Наши преимущества изменены");
                navigate(ROUTES.ADVANTAGES);
            })
            .catch(() => {
                message.error("что то пошло не так ");
            });
    };

    const defualtImgList = [
        {
            uid: "-1",
            name: "image",
            status: "done",
            url: data.image_1,
        },
    ];

    const defualtImgList2 = [
        {
            uid: "-1",
            name: "image",
            status: "done",
            url: data.image_2,
        },
    ];

    return (
        <Form
            layout="vertical"
            style={{ width: 300 }}
            onFinish={onFinish}
            initialValues={{
                department: data.department,
            }}
        >
            <Form.Item label="Выбор аптеки" name="department">
                <Select defaultValue={"аптеки"}>
                    {deportamentList?.map((item, index) => (
                        <Option value={item.department.id} key={index}>
                            {item.department.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Первый баннер" name="image_1">
                <Upload {...props} listType="picture-card" multiple={false} maxCount={1} accept=".jpg,.jpeg,.png" defaultFileList={defualtImgList}>
                    {uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item label="Второй баннер" name="image_2">
                <Upload {...props} listType="picture-card" multiple={false} maxCount={1} accept=".jpg,.jpeg,.png" defaultFileList={defualtImgList2}>
                    {uploadButton}
                </Upload>
            </Form.Item>

            <Button htmlType="submit">Сохранить</Button>
        </Form>
    );
};

export default AdvantageDetail;
