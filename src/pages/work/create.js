import React, { useState, useEffect } from "react";
import "../../create.css";
import { Input, Space, Button, Form, message, Select } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";

import API from "../../api";

const { Option } = Select;

const WorkCreate = () => {
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(
            editorState.getCurrentContent()
        );
        setConvertedContent(currentContentAsHTML);
    };

    const createWork = (data) => {
        console.log(data);
        API.CreateWork(data, convertedContent)
            .then((res) => {
                message.success("Вакансия создана");
            })
            .catch((error) => message.error("Вакансия не создана"));
    };

    useEffect(() => {
        API.getCity()
            .then((res) => {
                setCities(res.data);
                console.log(res.data[0].name);
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
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Basic usage"
                            style={{ width: 235 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Описание"
                        required
                        labelCol={{ span: 24 }}
                        name="asd"
                        rules={[
                            {
                                required: true,
                                message: "Введите описание",
                            },
                        ]}
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
                        name="city"
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
                    <Button
                        style={{ background: "#55CD61" }}
                        type="primary"
                        htmlType="submit"
                    >
                        Сохранить
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default WorkCreate;