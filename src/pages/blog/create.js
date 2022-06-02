import React, { useState, useEffect } from "react";
import "../../create.css";
import { Input, Space, Select, Upload, Button, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { useNavigate } from "react-router-dom";

import API from "../../api";
import ROUTES from "../../routes";

const { Option } = Select;

const BlogCreate = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState();
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);

    const navigate = useNavigate();

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

    useEffect(() => {
        const getBlogDetail = async () => {
            setLoading(true);
            await API.getTopic()
                .then((res) => {
                    setTags(res.data);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getBlogDetail();
    }, []);

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
                        <Input
                            placeholder="Basic usage"
                            style={{ width: 235 }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Тег"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: "Введите тег",
                            },
                        ]}
                        name="tag"
                    >
                        <Select
                            style={{ width: 235 }}
                            defaultValue="Теги"
                            name="tag"
                        >
                            {tags.map((item, index) => (
                                <Option value={item.id} key={index}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
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

export default BlogCreate;
