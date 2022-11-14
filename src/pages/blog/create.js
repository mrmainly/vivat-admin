import React, { useState } from "react";
import "../../create.css";
import { Input, Space, Select, Button, Form, message } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";
import "./blog.css";

const { Option } = Select;

const BlogCreate = () => {
    const [photo, setPhoto] = useState();
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

    const handleCreate = (data) => {
        API.CreateBlog(data, convertedContent, photo)
            .then((res) => {
                message.success("Блог создан");
                navigate(ROUTES.BLOG);
            })
            .catch((error) => message.error("Блог не создан"));
    };

    // const props = {
    //     onChange(info) {
    //         if (info.file.status === "done") {
    //             message.success(`${info.file.name} file uploaded successfully`);
    //         } else if (info.file.status === "error") {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    // };

    const fileSelectHandler = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <div>
            <Form onFinish={handleCreate}>
                <Space direction="vertical">
                    <Form.Item
                        label="Название"
                        name="name"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Введите название",
                            },
                        ]}
                    >
                        <Input placeholder="Basic usage" style={{ width: 235 }} />
                    </Form.Item>

                    <Form.Item
                        label="Короткое описание"
                        name="preview"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Введите название",
                            },
                        ]}
                    >
                        <Input placeholder="Basic usage" style={{ width: 235 }} />
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
                        className="wusi"
                    >
                        <Editor editorState={editorState} onEditorStateChange={handleEditorChange} wrapperClassName="wrapper-class" editorClassName="editor-class" toolbarClassName="toolbar-class" />
                    </Form.Item>

                    <Form.Item
                        label="Изображение"
                        labelCol={{ span: 24 }}
                        style={{ width: 200 }}
                        rules={[
                            {
                                required: true,
                                message: "Загрузите фото",
                            },
                        ]}
                        name="image"
                    >
                        <input
                            type="file"
                            accept=".png, .jpg"
                            onChange={(event) => {
                                fileSelectHandler(event);
                            }}
                        />
                    </Form.Item>
                    <Button style={{ background: "#55CD61" }} type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default BlogCreate;
