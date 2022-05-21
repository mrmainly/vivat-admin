import React, { useState } from "react";
import "./create.css";
import { Input, Space, Select, Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";

const { Option } = Select;

const BlogCreate = () => {
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

    return (
        <div>
            <Form>
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

                    <Form.Item label="Тег" labelCol={{ span: 24 }} required>
                        <Select
                            style={{ width: 235 }}
                            defaultValue="Home"
                            name="tag"
                        >
                            <Option value="Home">Home</Option>
                            <Option value="Company">Company</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Автор"
                        name="producer"
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
                        required
                    >
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Button style={{ background: "#55CD61" }} type="primary">
                        Сохранить
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default BlogCreate;
