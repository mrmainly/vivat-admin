import React, { useState, useEffect } from "react";
import "../../create.css";
import { Input, Space, Button, Form, message, Select, Spin } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { useParams, useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";
import "./work.css";

const { Option } = Select;

const WorkDetail = () => {
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    };

    const createWork = () => {
        API.patchWork(name, city, convertToHTML(editorState.getCurrentContent()), params.id)
            .then((res) => {
                message.success("Вакансия изменена");
                navigate(ROUTES.WORK);
            })
            .catch((error) => message.error("Вакансия не изщменена"));
    };

    const deleteWork = () => {
        API.deleteWork(params.id)
            .then((res) => {
                message.success("вакансия удалена");
                navigate(ROUTES.WORK);
            })
            .catch((error) => message.success("вакансия не удалена"));
    };

    useEffect(() => {
        const getWork = async () => {
            await API.getCity()
                .then((res) => {
                    console.log("city", res.data);
                    setCities(res.data);
                })
                .catch((error) => console.log(error));
            await API.getWorkId(params.id)
                .then((res) => {
                    setName(res.data.name);
                    setCity(res.data.city.id);
                    setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(res.data.description))));
                    console.log(res);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getWork();
    }, []);

    const handleSelect = (value) => {
        setCity(value);
    };

    return (
        <div>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 50,
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <Form onFinish={createWork}>
                    <Space direction="vertical">
                        <Form.Item
                            label="Название"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Basic usage" style={{ width: 235 }} />
                        </Form.Item>
                        <Form.Item
                            label="Описание"
                            required
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Введите описание",
                                },
                            ]}
                            className="wusi"
                        >
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={handleEditorChange}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Города"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Select style={{ width: 200 }} defaultValue={city} onChange={handleSelect}>
                                {cities.map((item, index) => (
                                    <Option value={item.id} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Space>
                            <Button style={{ background: "#55CD61" }} type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                            <Button style={{ background: "#FE5860" }} type="primary" onClick={() => deleteWork()}>
                                Удалить
                            </Button>
                        </Space>
                    </Space>
                </Form>
            )}
        </div>
    );
};

export default WorkDetail;
