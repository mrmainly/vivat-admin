import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Select, Spin, Form, Button, Space, message, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";

const { Option } = Select;

const UsersDetail = () => {
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    const handleSelect = (value) => {
        setRole(value);
    };

    useEffect(() => {
        const getUsers = async () => {
            await API.getUsersId(params.id)
                .then((res) => {
                    setRole(res.data.role);
                    setActive(res.data.is_active);
                    console.log(res);
                })
                .catch((error) => console.log(error));
            await API.getRoles()
                .then((res) => {
                    setRoles(res.data);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getUsers();
    }, []);

    const patchUsers = () => {
        API.patchUsers(role, params.id)
            .then((res) => {
                message.success("пользователь обновлен");
            })
            .catch((error) => message.error("не обновлен"));
        API.putUsers(params.id, active)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => console.log(error));
    };

    // const deleteUsers = () => {
    //     API.deleteUsers(params.id)
    //         .then(() => {
    //             navigate(ROUTES.USERS);
    //             message.success("пользователь удален");
    //         })
    //         .catch(() => message.success("пользователь удален"));
    // };

    return (
        <div style={{ height: 135 }}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 135,
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <Form onFinish={patchUsers}>
                    <Space direction="vertical">
                        <Form.Item
                            label="Роль"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Select
                                style={{ width: 200 }}
                                defaultValue={role}
                                onChange={handleSelect}
                            >
                                {roles.map((item, index) => (
                                    <Option value={item} key={index}>
                                        {item}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Checkbox
                            onChange={(e) => setActive(e.target.checked)}
                            checked={active}
                        >
                            Активность
                        </Checkbox>
                        <Space>
                            <Button
                                style={{ background: "#55CD61", marginTop: 25 }}
                                type="primary"
                                htmlType="submit"
                            >
                                Сохранить
                            </Button>
                            {/* <Button
                                style={{ background: "#FE5860" }}
                                type="primary"
                                onClick={() => deleteUsers()}
                            >
                                Удалить
                            </Button> */}
                        </Space>
                    </Space>
                </Form>
            )}
        </div>
    );
};

export default UsersDetail;
