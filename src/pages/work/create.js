import React, { useState, useEffect } from "react";
import "../../create.css";
import { Input, Space, Button, Form, message, Select } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";
import "./work.css";

const { Option } = Select;
const { TextArea } = Input;

const WorkCreate = () => {
    const [cities, setCities] = useState([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState(null);

    const navigate = useNavigate();

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    };

    const createWork = (data) => {
        API.CreateWork(data, convertedContent)
            .then((res) => {
                message.success("Вакансия создана");
                navigate(ROUTES.WORK);
            })
            .catch((error) => message.error("Вакансия не создана"));
    };

    useEffect(() => {
        API.getCity()
            .then((res) => {
                setCities(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <Form onFinish={createWork}>
                <Space direction="vertical">
                    <Form.Item
                        label="Название"
                        name="name"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Название вакансии обязательное поле",
                            },
                        ]}
                    >
                        <Input placeholder="Введите назавние" style={{ width: 235 }} />
                    </Form.Item>
                    <Form.Item label={"Короткое описание"} labelCol={{ span: 24 }} name="preview">
                        <TextArea placeholder={"Введите короткое описание"} style={{ height: 150 }} />
                    </Form.Item>
                    <Form.Item label="Описание" labelCol={{ span: 24 }} className="wusi">
                        <Editor editorState={editorState} onEditorStateChange={handleEditorChange} wrapperClassName="wrapper-class" editorClassName="editor-class" toolbarClassName="toolbar-class" />
                    </Form.Item>
                    <Form.Item
                        label="Города"
                        name="city"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Выбор города обязателен",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: 200 }}
                            defaultValue="Выбор города"
                            // onChange={(e) => setTopic(e.target.value)}
                        >
                            {cities.map((item, index) => (
                                <Option value={item.id} key={index}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button style={{ background: "#55CD61" }} type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default WorkCreate;
